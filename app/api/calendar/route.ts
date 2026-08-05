import { NextResponse } from "next/server";

// For GitHub Pages static export (`output: "export"`), Next.js requires API
// routes to declare force-static so they can be pre-rendered at build time.
// This tells Next.js to execute the GET handler once during the build and
// write the result as a static file instead of a live server endpoint.
export const dynamic = "force-static";

const CALENDAR_ID =
  "d605e5c06e5a6695fcbc1f06bd3c84b6a071457f60a603dc86f5693475f3285c@group.calendar.google.com";
const ICAL_URL = `https://calendar.google.com/calendar/ical/${encodeURIComponent(
  CALENDAR_ID
)}/public/basic.ics`;

export interface CalendarEvent {
  id: string;
  title: string;
  start: string; // ISO string
  end: string;   // ISO string
  allDay: boolean;
  location?: string;
  description?: string;
}

// ── Minimal iCal parser ───────────────────────────────────────────────────────

/** Unfold continued lines (RFC 5545 §3.1) */
function unfold(text: string): string {
  return text.replace(/\r\n[ \t]/g, "").replace(/\r\n/g, "\n");
}

/** Parse a DTSTART / DTEND value like 20260805T100000Z or 20260805 */
function parseIcalDate(value: string): { date: Date; allDay: boolean } {
  const allDay = !value.includes("T");
  if (allDay) {
    // DATE value: YYYYMMDD
    const y = parseInt(value.slice(0, 4));
    const m = parseInt(value.slice(4, 6)) - 1;
    const d = parseInt(value.slice(6, 8));
    return { date: new Date(Date.UTC(y, m, d)), allDay: true };
  }
  // DATE-TIME: YYYYMMDDTHHMMSS[Z]
  const y = parseInt(value.slice(0, 4));
  const mo = parseInt(value.slice(4, 6)) - 1;
  const d = parseInt(value.slice(6, 8));
  const h = parseInt(value.slice(9, 11));
  const mi = parseInt(value.slice(11, 13));
  const s = parseInt(value.slice(13, 15));
  const utc = value.endsWith("Z");
  const date = utc
    ? new Date(Date.UTC(y, mo, d, h, mi, s))
    : new Date(y, mo, d, h, mi, s);
  return { date, allDay: false };
}

/** Strip any property params (e.g. DTSTART;TZID=America/Phoenix:20260805T100000) */
function stripParams(line: string): { key: string; value: string } {
  const colon = line.indexOf(":");
  const key = line.slice(0, colon).split(";")[0].toUpperCase();
  const value = line.slice(colon + 1).trim();
  return { key, value };
}

/** Parse RRULE string into a map */
function parseRrule(val: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const part of val.split(";")) {
    const [k, v] = part.split("=");
    map[k] = v;
  }
  return map;
}

/** Add `count` of the given unit to a date */
function addUnit(date: Date, freq: string, count: number): Date {
  const d = new Date(date);
  switch (freq) {
    case "DAILY":   d.setDate(d.getDate() + count); break;
    case "WEEKLY":  d.setDate(d.getDate() + 7 * count); break;
    case "MONTHLY": d.setMonth(d.getMonth() + count); break;
    case "YEARLY":  d.setFullYear(d.getFullYear() + count); break;
  }
  return d;
}

interface RawEvent {
  uid: string;
  summary: string;
  dtstart: string;
  dtend?: string;
  location?: string;
  description?: string;
  rrule?: string;
}

function parseIcal(text: string): RawEvent[] {
  const lines = unfold(text).split("\n");
  const events: RawEvent[] = [];
  let current: Partial<RawEvent> | null = null;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    if (line === "BEGIN:VEVENT") {
      current = {};
      continue;
    }
    if (line === "END:VEVENT") {
      if (current?.uid && current.summary && current.dtstart) {
        events.push(current as RawEvent);
      }
      current = null;
      continue;
    }
    if (!current) continue;

    const { key, value } = stripParams(line);
    switch (key) {
      case "UID":         current.uid = value; break;
      case "SUMMARY":     current.summary = value.replace(/\\,/g, ",").replace(/\\n/g, "\n"); break;
      case "DTSTART":     current.dtstart = value; break;
      case "DTEND":       current.dtend = value; break;
      case "LOCATION":    current.location = value.replace(/\\,/g, ","); break;
      case "DESCRIPTION": current.description = value.replace(/\\n/g, "\n").replace(/\\,/g, ","); break;
      case "RRULE":       current.rrule = value; break;
    }
  }
  return events;
}

function expandEvent(raw: RawEvent, now: Date, cutoff: Date): CalendarEvent[] {
  const { date: start, allDay } = parseIcalDate(raw.dtstart);
  const duration = raw.dtend
    ? parseIcalDate(raw.dtend).date.getTime() - start.getTime()
    : allDay
    ? 86400000
    : 3600000;

  const makeEv = (s: Date, suffix = ""): CalendarEvent => ({
    id: suffix ? `${raw.uid}_${suffix}` : raw.uid,
    title: raw.summary,
    start: s.toISOString(),
    end: new Date(s.getTime() + duration).toISOString(),
    allDay,
    location: raw.location,
    description: raw.description,
  });

  if (!raw.rrule) {
    return start >= now && start <= cutoff ? [makeEv(start)] : [];
  }

  // Expand recurring events
  const rule = parseRrule(raw.rrule);
  const freq = rule.FREQ;
  if (!freq) return [];

  const interval = parseInt(rule.INTERVAL || "1");
  const maxCount = rule.COUNT ? parseInt(rule.COUNT) : 200;
  const until = rule.UNTIL ? parseIcalDate(rule.UNTIL).date : null;

  const results: CalendarEvent[] = [];
  let current = new Date(start);
  let count = 0;

  while (count < maxCount) {
    const effective = until && current > until ? null : current;
    if (!effective || effective > cutoff) break;
    if (effective >= now) {
      results.push(makeEv(effective, effective.toISOString()));
    }
    current = addUnit(current, freq, interval);
    count++;
  }

  return results;
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function GET() {
  try {
    const res = await fetch(ICAL_URL, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const text = await res.text();
    const raw = parseIcal(text);

    const now = new Date();
    const cutoff = new Date(now);
    cutoff.setMonth(cutoff.getMonth() + 12);

    const events: CalendarEvent[] = [];
    for (const ev of raw) {
      events.push(...expandEvent(ev, now, cutoff));
    }

    events.sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );

    return NextResponse.json(events, {
      headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate" },
    });
  } catch (err) {
    console.error("Calendar fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch calendar" },
      { status: 500 }
    );
  }
}
