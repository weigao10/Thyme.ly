
var idleButton = document.getElementById('idle-button')
idleButton.addEventListener('click', () => {
  console.log('in event listener!')
  saveIdleTime()
})
//document innerHTML

function saveIdleTime () {
  let idleActivity = document.getElementById("idle-activity").value;
  let idleProductivity = document.getElementById("idle-productivity").value;
  console.log('idle acti is', idleActivity);
  console.log('idle prod is ', idleProductivity)
}