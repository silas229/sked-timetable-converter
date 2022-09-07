/**
 * CONFIGURATION
 */
const mode = "url" // either 'url' or 'file'
const timetableUrl = "https://timetable.your-college.com/"
const inputPath = "timetable.html"
const outputPath = "calendar.ics"

/**
 * CODE
 */
const ical = require("ical-generator")
const moment = require("moment")
const fs = require("fs")
const jsdom = require("jsdom")
const { JSDOM } = jsdom

let calendar = ical()
let currentDate;

if (mode === 'url') {
  fetch(timetableUrl)
    .then(function (response) {
      console.log("Fetched timetable successfully")
      return response.text()
    })
    .then(function (html) {
      parseCalendar(new JSDOM(html).window.document)
    })
    .catch(function (err) {
      console.log("Failed to fetch page: ", err)
    })
} else if (mode === 'file') {
  fs.readFile(inputPath, 'utf8', function (err, html) {
    if (err) {
      console.log("Failed to read file: ", err)
      return
    }

    parseCalendar(new JSDOM(html).window.document)
  })
}

function parseCalendar(document) {
  const events = document.querySelectorAll("table tr[class^=tr]")

  console.log(`Found ${events.length} events`)

  events.forEach(parseEvent)

  calendar.name = document.querySelector(".w1").textContent

  calendar.save(outputPath)

  console.log(`Calendar "${calendar.name}" was saved at ${outputPath}`)
}


function parseEvent(event) {
  /**
   * 0: Date
   * 1: Start time
   * 2: End time
   * 3: Name
   * 4: Lecturer
   * 5: Location
   * 6: Annotation
   */
  const details = Array.from(event.querySelectorAll("td.z")).map(detail => detail.textContent)

  if (details.length !== 7) {
    return
  }

  if (details[0] !== " ") {
    currentDate = details[0].slice(4)
  }

  calendar.createEvent({
    start: moment(`${currentDate} ${details[1].slice(0, details[1].length - 2)}`, "DD.MM.YYYY H:m").toDate(),
    end: moment(`${currentDate} ${details[2]}`, "DD.MM.YYYY H:m").toDate(),
    summary: details[3],
    description: `Dozent: ${details[4]}\n\n${details[6]}`,
    location: details[5],
  })
}
