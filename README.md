# Google Home: GSuite Calendar Sync

_Update: No spreadsheet needed in this version._

## Problem

Google Home doesn't support G Suite (Google's business version of Google Docs).

e.g. if you wanted Google Home to read out both your personal & work calendar events, it won't work.

Even if you were to share your G Suite calendar with your personal Google account, the Google Home will just ignore the G Suite calendar and only read out calendar events associated directly with your personal Google account.

### Solution

To solve this problem I'm utilising [Google Apps Script](https://script.google.com/intro) (executed via my G Suite account) to copy my G Suite calendar events to my personal Google account calendar (i.e. a standard @gmail calendar).

The full code can be found in the [`code.gs`](code.gs) file in this repo.

### Resources Needed

This script requires access to the following resources:

- Personal Google Calendar
- G Suite Email
- ~~G Suite Spreadsheet~~

## Step-by-Step

> Note: use the "[useful reference links](#useful-reference-links)" at the bottom of this README for more information.

1. Share your _personal_ Google calendar (i.e. the standard @gmail account associated with your Google Home) with your G Suite account + be sure to enable "Make changes to events" so your G Suite account can actually create new events in your personal calendar when necessary.

2. Copy the code inside the [`code.gs`](code.gs) file into a new [Google Apps Script](https://script.google.com/intro) project + be sure the new project is setup in your **G Suite account**.

3. Change all template references in the code (e.g. anything inside brackets `<...>`, such as `"<your.name>`) to a real/working value.

4. Setup a "trigger" (in the project UI) for the script, e.g. ~~I set mine to run on a timer (every 5 mins).~~ I set it to run upon any changes in your G Suite calendar. This means if there is a change to an existing event, I'll know about it ~~in 5 minutes time~~ almost immediately. It's also good to set up a daily trigger at some ungodly hour that you're likely asleep. This will make sure events that will happen much further down the road, say, 3 months later, will also be timely updated to your personal calendar. It's not perfect, but then again, this is just a hack after all.

5. Run the script manually (~~_twice_!~~_once_!). ~~The first time you'll need to modify the script (see "[creating the spreadsheet](#creating-the-spreadsheet)" below for details), the second time is because you'll need to authorize the script to access your personal/G Suite calendar/email/spreadsheet features. After the script is authorized it'll run automatically in future without any issues.~~

## Monitoring

You can monitor your script by going to [https://script.google.com/home/my](https://script.google.com/home/my) and selecting your project. You can also view the number of "executions", where it'll show you when _you_ (as the editor) manually ran the code vs the automated/time-based executions that were made.

## How does it work?

[Google Apps Script](https://script.google.com/home) (GAS) will execute the script once you make changes to some future events (within 30 days). ~~on a timer based interval. The value can be in minutes, hours or days.~~ When the script runs, GAS will look for a function called `myFunction` (annoyingly it seems you can't change this).

`myFunction`: acquires references to your personal and G Suite calendars, as well as all the events in both calendars. It first removes all the events within the next 30 days in your personal calendars that were created using the script last time, and then copy over all the events within the next 30 days from the G Suite calendar. ~~as well as tracking the G Suite events found for the current day. It then opens a tracking spreadsheet, which exists to help create a mapping between events that have already been setup in your personal calendar. If an existing id is found in the spreadsheet, the script will attempt to find out if the event has been updated (e.g. has the title or start time changed?) and if there has been a change it'll update the event in your personal calendar.~~

> Note: the script also sends creation/update notification emails to you if anything goes wrong

~~The script also tries to clean up the spreadsheet by deleting tracked events that have already passed. Otherwise, as we loop over the spreadsheet looking for matching events, we would find that (as time goes on and more and more events are added) the length of the operation would increase.~~

## Useful Reference Links

- [Google Apps Script](https://script.google.com/home)
- [Calendar API](https://developers.google.com/apps-script/reference/calendar/calendar-app)
- [Find Calendar ID](https://docs.simplecalendar.io/find-google-calendar-id/)
- [Sharing Calendars](https://support.google.com/calendar/answer/37082?hl=en-GB)
- [Simple Triggers](https://developers.google.com/apps-script/guides/triggers/)
