document.addEventListener('DOMContentLoaded', function () {
  let lights = document.querySelectorAll('.light');
  let reactionTimeElement = document.getElementById('time');
  let fastestTimeElement = document.getElementById('fastest-time');
  let jumpStartElement = document.getElementById('jump-start');
  let startTime;
  let endTime;
  let timerRunning = false;
  let fastestTime = localStorage.getItem('fastestTime');
  let jumpStart = false;

  if (fastestTime) {
      fastestTimeElement.textContent = fastestTime + 'ms'; // Fix: Ensure 'ms' is added for consistency
  } else {
      fastestTimeElement.textContent = '-';
  }

  let intervalId = setInterval(function () {
      if (!timerRunning) {
          let randomTime = Math.random() * 3000 + 1000; // random time between 1-4 seconds
          setTimeout(function () {
              lights.forEach(function (light) {
                  light.classList.add('on');
              });
              startTime = new Date().getTime();
              timerRunning = true;
              jumpStart = false; // Reset jump start flag
              jumpStartElement.classList.add('hidden'); // Hide jump start message
          }, randomTime);
      }
  }, 5000); // repeat every 5 seconds

  document.addEventListener('click', function () {
      if (timerRunning) {
          endTime = new Date().getTime();
          let reactionTime = endTime - startTime;
          reactionTimeElement.textContent = reactionTime + 'ms';
          lights.forEach(function (light) {
              light.classList.remove('on');
          });
          timerRunning = false;

          if (!fastestTime || reactionTime < fastestTime) {
              fastestTime = reactionTime;
              fastestTimeElement.textContent = fastestTime + 'ms';
              localStorage.setItem('fastestTime', fastestTime);
          }
      } else if (!jumpStart) {
          jumpStart = true;
          jumpStartElement.classList.remove('hidden'); // Show jump start message
      }
  });
});
