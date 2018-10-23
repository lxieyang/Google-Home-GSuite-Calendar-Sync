// myFunction is the entry point to this program (and you can't rename this function!?)
function myFunction() {
  // track when this script was executed
  logTriggerStart()

  var companyName = "<Your G Suite Company Name>"

  // change to `true` for the first run to create a new tracking spreadsheet
  // otherwise leave this conditional check set to `false`
  if (false) { createSpreadsheet(companyName); return }

  // set your personal google account id (i.e. your personal google account email)
  var personalGoogleAccountID = "<your.name>@gmail.com"

  // acquire a reference to your personal google account calendar
  var personalCalendar = CalendarApp.getCalendarById(personalGoogleAccountID)

  // acquire a reference to your default calendar (which will be relative to the account this script executes under)
  // note: this script should be executed within your g suite account for this lookup to work as expected
  var gSuiteCalendar = CalendarApp.getDefaultCalendar()
  
  var daysAhead = 30

  var personalEvents = getCalendarEvents(personalCalendar, daysAhead)
  
  var companyIdentifier = "(from " + companyName + ")"
  
  // remove all events from this company
  for (i = 0; i < personalEvents.length; i++) {
    var ev = personalEvents[i]
    // Logger.log("Processing event: " + ev.getTitle() + " | " + ev.getDescription())
    if (ev.getDescription().toString().indexOf(companyIdentifier) !== -1) {
      ev.deleteEvent()
    }
  }
  
  // create the new events
  var gSuiteEvents = getCalendarEvents(gSuiteCalendar, daysAhead)

  gSuiteEvents.forEach(function(event){
    Logger.log(event.getTitle() + " | " + event.getStartTime())
    var startTime = new Date(event.getStartTime())
    var endTime = new Date(event.getEndTime())
    var eventTitle = event.getTitle()
    var eventDescription = event.getDescription() + " " + companyIdentifier
    var eventLocation = event.getLocation()
    personalCalendar.createEvent(eventTitle, startTime, endTime, {description: eventDescription, location: eventLocation})
  })
  
}

function getCalendarEvents(calendar, daysAhead) {
  // day in seconds
  var dayLengthInSeconds = 24 * 60 * 60 * 1000
  
  // today's date
  var today = new Date()
  
  // dates
  var dates = []
  dates.push(today) // today
  for (i = 1; i <= daysAhead; i++) {
    dates.push(new Date(today.getTime() + dayLengthInSeconds * i)) // i days ahead
  }
  
  // get events
  var days = []  // each day's event
  for (j = 0; j < dates.length; j++) {
    days.push(calendar.getEventsForDay(dates[j]))
  }
  var events = [].concat.apply([], days); // https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays-in-javascript
  
  return events
}

function logTriggerStart() {
  var d = new Date()
  var hour = d.getHours().toString()
  var minute = d.getMinutes().toString()

  Logger.log("Event has been triggered: %s:%s", hour, minute)
}
