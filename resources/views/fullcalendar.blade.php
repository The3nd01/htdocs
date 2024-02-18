<script>
  console.log(@json($events));
</script>
@extends('layouts.layout2')
<x-app-layout>
  <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.9/index.global.min.js'></script>
  <script>
      document.addEventListener('DOMContentLoaded', function() {
          var calendarEl = document.getElementById('calendar');
          var calendar = new FullCalendar.Calendar(calendarEl, {
              initialView: 'dayGridMonth',
              events: @json($events),
              eventClick: function(info) {
              info.jsEvent.preventDefault();

              if (info.event.url) {
              window.location.href = info.event.url;
              }
          }
          });
          calendar.render();
      });
  </script>
  <div id='calendar'></div>
</x-app-layout>