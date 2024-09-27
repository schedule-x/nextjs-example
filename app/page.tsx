'use client';
import styles from './page.module.css'
import {
  viewDay,
  viewMonthAgenda,
  viewMonthGrid,
  viewWeek,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import {createEventModalPlugin} from "@schedule-x/event-modal";
import {ScheduleXCalendar, useCalendarApp} from "@schedule-x/react";
import {createEventsServicePlugin} from "@schedule-x/events-service";
import {useState} from "react";

export default function Home() {
  const eventsServicePlugin = useState(() => createEventsServicePlugin())[0];

  const calendarApp = useCalendarApp({
    views: [viewWeek, viewMonthGrid, viewDay, viewMonthAgenda],
    defaultView: viewWeek.name,
    callbacks: {
      onRangeUpdate: (range) => {
        calendarApp.eventsService.set([
          {
            id: '12',
            title: 'Event 1',
            start: range.start,
            end: range.end,
          },
        ])
      }
    },
    events: [
      {
        id: '12',
        title: 'Event 1',
        start: '2023-12-15 06:00',
        end: '2023-12-15 08:00',
      },
    ],
    selectedDate: '2023-12-15',
  }, [createDragAndDropPlugin(), createEventModalPlugin(), eventsServicePlugin])

  return (
    <main className={styles.main}>
      <ScheduleXCalendar calendarApp={calendarApp} />
    </main>
  )
}
