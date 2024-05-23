v 0.1.24

that's new:

- events can be seen without beeing logged in in calendar view
- when clicking on a dayCard in calendar with no event --> link to /add-event
- when clicking on a dayCard in calendar with event --> link to dayView of calendar

to dos:

- implement that when clicking on a dayCard in calendar with event --> link to dayView of calendar only when more than 1 event otherwise direct to /events[day]
- in that dynamic route we need to show a list of events of that day

- sidebar shall close when hitting the home button or the calendar button
- add a admin route where i can see all events of everyone and CRUD

- filter buttons
- toast for login

done:

- edgestore image hoster integrated for image uploading
- Sidebar with login option
- create Event route with submit form
- Calendar
  - Navigation
  - ViewButton
  - DayCard
- /add-event Url with Form using also Google Javascript API
- /my-events Url : shows all events with pagination.
- Prisma db integration with form submit
