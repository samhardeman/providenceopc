"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, MapPin, Clock } from "lucide-react";
import type { CalendarEvent } from "@/app/api/calendar/route";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function startOfMonth(year: number, month: number) {
  return new Date(year, month, 1);
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatTime(date: Date, allDay: boolean) {
  if (allDay) return "All day";
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDateLong(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function EventCalendar() {
  const [today, setToday] = useState<Date | null>(null);
  const [viewYear, setViewYear] = useState(0);
  const [viewMonth, setViewMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Date and locale values are browser-specific. Wait until hydration is
  // complete before rendering the calendar grid so server and client markup
  // always match.
  useEffect(() => {
    const now = new Date();
    setToday(now);
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth());
  }, []);

  // Fetch events once on mount.
  // NEXT_PUBLIC_CALENDAR_SRC is set at build time via next.config.ts:
  //   - Replit / server: "/api/calendar" (live, server-side parsed)
  //   - GitHub Pages static build: "/providenceopc/calendar-events.json" (pre-generated)
  useEffect(() => {
    const src = process.env.NEXT_PUBLIC_CALENDAR_SRC || "/api/calendar";
    fetch(src)
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json();
      })
      .then((data: CalendarEvent[]) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // ── Calendar grid ────────────────────────────────────────────────────────
  const firstDay = startOfMonth(viewYear, viewMonth).getDay(); // 0=Sun
  const totalDays = daysInMonth(viewYear, viewMonth);
  const calendarToday = today ?? new Date(0);

  // Map: "YYYY-MM-DD" → CalendarEvent[]
  const eventsByDay = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    for (const ev of events) {
      const d = new Date(ev.start);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      if (!map[key]) map[key] = [];
      map[key].push(ev);
    }
    return map;
  }, [events]);

  function eventsForDate(date: Date) {
    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    return eventsByDay[key] || [];
  }

  // ── Navigation ────────────────────────────────────────────────────────────
  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
    setSelectedDay(null);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
    setSelectedDay(null);
  }

  // ── Upcoming events (next 10 from today) ─────────────────────────────────
  const upcoming = useMemo(() => {
    return events
      .filter((ev) => today !== null && new Date(ev.start) >= today)
      .slice(0, 10);
  }, [events, today]);

  // ── Events for selected day ───────────────────────────────────────────────
  const selectedEvents = selectedDay ? eventsForDate(selectedDay) : [];

  if (!today) {
    return (
      <div
        className="min-h-[260px] flex items-center justify-center text-sm tracking-widest uppercase text-neutral-400"
        aria-live="polite"
      >
        Loading calendar…
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-12">

      {/* ── Calendar grid + sidebar ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">

        {/* Calendar */}
        <div className="lg:col-span-2">
          {/* Month header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevMonth}
              aria-label="Previous month"
              className="p-2 rounded-sm hover:bg-neutral-900/5 transition-colors"
            >
              <ChevronLeft size={20} className="text-neutral-600" />
            </button>
            <h3 className="text-2xl md:text-3xl font-serif tracking-tight text-neutral-900">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </h3>
            <button
              onClick={nextMonth}
              aria-label="Next month"
              className="p-2 rounded-sm hover:bg-neutral-900/5 transition-colors"
            >
              <ChevronRight size={20} className="text-neutral-600" />
            </button>
          </div>

          {/* Day-of-week labels */}
          <div className="grid grid-cols-7 mb-2">
            {DAY_LABELS.map((d) => (
              <div
                key={d}
                className="text-center text-[10px] md:text-xs uppercase tracking-widest text-neutral-400 font-sans py-1"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Grid cells */}
          <div className="grid grid-cols-7 border-l border-t border-neutral-900/10">
            {/* Leading blanks */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div
                key={`blank-${i}`}
                className="border-r border-b border-neutral-900/10 aspect-square md:aspect-auto md:h-16"
              />
            ))}

            {/* Day cells */}
            {Array.from({ length: totalDays }).map((_, i) => {
              const day = i + 1;
              const date = new Date(viewYear, viewMonth, day);
              const isToday = sameDay(date, calendarToday);
              const isSelected = selectedDay ? sameDay(date, selectedDay) : false;
              const dayEvents = eventsForDate(date);
              const hasEvents = dayEvents.length > 0;

              return (
                <button
                  key={day}
                  onClick={() =>
                    setSelectedDay(isSelected ? null : date)
                  }
                  className={`
                    relative border-r border-b border-neutral-900/10 aspect-square md:aspect-auto md:h-16
                    flex flex-col items-center justify-start pt-1.5 px-1 transition-colors
                    ${isSelected
                      ? "bg-neutral-900 text-white"
                      : isToday
                      ? "bg-neutral-900/5"
                      : "hover:bg-neutral-900/5"
                    }
                  `}
                >
                  <span
                    className={`
                      text-xs md:text-sm font-serif leading-none
                      ${isSelected ? "text-white" : isToday ? "font-semibold text-neutral-900" : "text-neutral-700"}
                    `}
                  >
                    {day}
                  </span>
                  {hasEvents && (
                    <div className="flex gap-0.5 mt-1.5 flex-wrap justify-center max-w-full">
                      {dayEvents.slice(0, 3).map((_, di) => (
                        <span
                          key={di}
                          className={`block w-1 h-1 rounded-full ${isSelected ? "bg-white/70" : "bg-neutral-900/40"}`}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar: selected day events or upcoming */}
        <div className="lg:col-span-1">
          {loading ? (
            <LoadingPane />
          ) : error ? (
            <ErrorPane />
          ) : selectedDay ? (
            <DayPane date={selectedDay} dayEvents={selectedEvents} />
          ) : (
            <UpcomingPane events={upcoming} />
          )}
        </div>
      </div>
    </div>
  );
}

// ── Sub-panes ──────────────────────────────────────────────────────────────────

function LoadingPane() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-5 bg-neutral-900/8 rounded-sm w-1/2" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-neutral-900/10 p-4 rounded-sm space-y-2">
          <div className="h-4 bg-neutral-900/8 rounded-sm w-3/4" />
          <div className="h-3 bg-neutral-900/5 rounded-sm w-1/2" />
        </div>
      ))}
    </div>
  );
}

function ErrorPane() {
  return (
    <p className="text-neutral-500 font-sans text-sm italic">
      Unable to load events. Please try again later.
    </p>
  );
}

function DayPane({ date, dayEvents }: { date: Date; dayEvents: CalendarEvent[] }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-neutral-400 font-sans mb-4">
        {formatDateLong(date)}
      </p>
      {dayEvents.length === 0 ? (
        <p className="text-neutral-500 font-sans text-sm italic">
          No events on this day.
        </p>
      ) : (
        <ul className="space-y-4">
          {dayEvents.map((ev) => (
            <EventCard key={ev.id} ev={ev} />
          ))}
        </ul>
      )}
    </div>
  );
}

function UpcomingPane({ events }: { events: CalendarEvent[] }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-neutral-400 font-sans mb-4">
        Upcoming Events
      </p>
      {events.length === 0 ? (
        <p className="text-neutral-500 font-sans text-sm italic">
          No upcoming events.
        </p>
      ) : (
        <ul className="space-y-4">
          {events.map((ev) => (
            <EventCard key={ev.id} ev={ev} showDate />
          ))}
        </ul>
      )}
    </div>
  );
}

function EventCard({ ev, showDate = false }: { ev: CalendarEvent; showDate?: boolean }) {
  const start = new Date(ev.start);
  return (
    <li className="border-l-2 border-neutral-900/20 pl-4 py-0.5 group hover:border-neutral-900 transition-colors">
      {showDate && (
        <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-sans mb-0.5">
          {start.toLocaleDateString("en-US", { month: "short", day: "numeric", weekday: "short" })}
        </p>
      )}
      <p className="font-serif text-base md:text-lg text-neutral-900 leading-snug">
        {ev.title}
      </p>
      <div className="flex flex-col gap-1 mt-1.5">
        <span className="flex items-center gap-1.5 text-xs text-neutral-500 font-sans">
          <Clock size={11} className="shrink-0" />
          {formatTime(start, ev.allDay)}
        </span>
        {ev.location && (
          <span className="flex items-center gap-1.5 text-xs text-neutral-500 font-sans">
            <MapPin size={11} className="shrink-0" />
            {ev.location}
          </span>
        )}
      </div>
    </li>
  );
}
