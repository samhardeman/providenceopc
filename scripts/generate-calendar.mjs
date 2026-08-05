/**
 * Generates public/calendar-events.json from the Google Calendar iCal feed.
 * Run before `next build` when building for static export (GitHub Pages).
 *
 *   node scripts/generate-calendar.mjs
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const CALENDAR_ID =
  "d605e5c06e5a6695fcbc1f06bd3c84b6a071457f60a603dc86f5693475f3285c@group.calendar.google.com";
const ICAL_URL = `https://calendar.google.com/calendar/ical/${encodeURIComponent(
  CALENDAR_ID
)}/public/basic.ics`;

// ── Minimal iCal parser (duplicated from app/api/calendar/route.ts) ───────────

function unfold(text) {
  return text.replace(/\r\n[ \t]/g, "").replace(/\r\n/g, "\n");
}

function parseIcalDate(value) {
  const allDay = !value.includes("T");
  if (allDay) {
    const y = parseInt(value.slice(0, 4));
    const m = parseInt(value.slice(4, 6)) - 1;
    const d = parseInt(value.slice(6, 8));
    return { date: new Date(Date.UTC(y, m, d)), allDay: true };
  }
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

function stripParams(line) {
  const colon = line.indexOf(":");
  const key = line.slice(0, colon).split(";")[0].toUpperCase();
  const value = line.slice(colon + 1).trim();
  return { key, value };
}

function parseRrule(val) {
  const map = {};
  for (const part of val.split(";")) {
    const [k, v] = part.split("=");
    map[k] = v;
  }
  return map;
}

function addUnit(date, freq, count) {
  const d = new Date(date);
  switch (freq) {
    case "DAILY":   d.setDate(d.getDate() + count); break;
    case "WEEKLY":  d.setDate(d.getDate() + 7 * count); break;
    case "MONTHLY": d.setMonth(d.getMonth() + count); break;
    case "YEARLY":  d.setFullYear(d.getFullYear() + count); break;
  }
  return d;
}

function parseIcal(text) {
  const lines = unfold(text).split("\n");
  const events = [];
  let current = null;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (line === "BEGIN:VEVENT") { current = {}; continue; }
    if (line === "END:VEVENT") {
      if (current?.uid && current.summary && current.dtstart) events.push(current);
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

function expandEvent(raw, now, cutoff) {
  const { date: start, allDay } = parseIcalDate(raw.dtstart);
  const duration = raw.dtend
    ? parseIcalDate(raw.dtend).date.getTime() - start.getTime()
    : allDay ? 86400000 : 3600000;

  const makeEv = (s, suffix = "") => ({
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

  const rule = parseRrule(raw.rrule);
  const freq = rule.FREQ;
  if (!freq) return [];

  const interval = parseInt(rule.INTERVAL || "1");
  const maxCount = rule.COUNT ? parseInt(rule.COUNT) : 200;
  const until = rule.UNTIL ? parseIcalDate(rule.UNTIL).date : null;

  const results = [];
  let current = new Date(start);
  let count = 0;

  while (count < maxCount) {
    if ((until && current > until) || current > cutoff) break;
    if (current >= now) results.push(makeEv(current, current.toISOString()));
    current = addUnit(current, freq, interval);
    count++;
  }
  return results;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`Fetching calendar from ${ICAL_URL}…`);
  const res = await fetch(ICAL_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching iCal feed`);

  const text = await res.text();
  const raw = parseIcal(text);

  const now = new Date();
  const cutoff = new Date(now);
  cutoff.setMonth(cutoff.getMonth() + 12);

  const events = [];
  for (const ev of raw) events.push(...expandEvent(ev, now, cutoff));
  events.sort((a, b) => new Date(a.start) - new Date(b.start));

  const outPath = join(__dirname, "..", "public", "calendar-events.json");
  mkdirSync(join(__dirname, "..", "public"), { recursive: true });
  writeFileSync(outPath, JSON.stringify(events, null, 2));
  console.log(`✓ Wrote ${events.length} event(s) to public/calendar-events.json`);
}

main().catch((err) => {
  console.error("Error generating calendar:", err.message);
  process.exit(1);
});
