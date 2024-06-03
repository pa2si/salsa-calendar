v 0.1.37 merged from main

that's new:

- shadCn Carousel installed
- animations for calendar loading and view changing
- UI adaption for especially DayCard view
- now all events are fetched with limit of 1000

to dos:

- skeleton for loading image in eventCard
- implement that when clicking on a dayCard in calendar with event --> link to dayView of calendar only when more than 1 event otherwise direct to /events[day]

- sidebar shall close when hitting the home button or the calendar button
- add a admin route where i can see all events of everyone and CRUD

- filter buttons
- toast for login

- why cant i use my salsa-calender google API KEY?

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
- /events[date] dynamic Url : shows all events for that one day.
- Prisma db integration with form submit
