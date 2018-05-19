import { ipcRenderer } from 'electron';
import moment from "moment";
import momentFormat from "moment-duration-format";

const idleButton = document.getElementById('idle-button')
const idleTime = document.getElementById("idle-time");

let idleDuration, start, end;
idleButton.addEventListener('click', () => {
  saveIdleTime()
})

ipcRenderer.on('gone-to-idle', (event, message) => {
  idleTime.innerHTML = '<span id="idle-time">Idle time: </span>'
})

ipcRenderer.on('wake-from-idle', (event, {idleStart, idleEnd, duration}) => {
  let formatDuration = moment
    .duration(duration, "seconds")
    .format("h[h], m[m] s[s]");

  idleDuration = formatDuration
  start = idleStart
  end = idleEnd
  idleTime.innerHTML += '<span>'+formatDuration+'</span>'
})

function saveIdleTime () {
  let activity = document.getElementById("idle-activity").value;
  let idleProductivity = document.getElementById("idle-productivity").value;

  let idleActivity = {
    app: 'Idle',
    title: activity,
    startTime: start,
    endTime: end,
    productivity: {
      source: 'user',
      class: idleProductivity
    },
    duration: idleDuration
  }

  ipcRenderer.send('got-idle-activity', idleActivity)
}