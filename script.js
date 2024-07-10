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
      fastestTimeElement.textContent = fastestTime + 'ms';
  } else {
      fastestTimeElement.textContent = '-';
  }

  let intervalId = setInterval(function () {
      if (!timerRunning) {
          let randomTime = Math.random() * 3000 + 1000;
          setTimeout(function () {
              lights.forEach(function (light) {
                  light.classList.add('on');
              });
              startTime = new Date().getTime();
              timerRunning = true;
              jumpStart = false;
              jumpStartElement.classList.add('hidden');
          }, randomTime);
      }
  }, 5000);

  document.addEventListener('click', function () {
      if (!timerRunning) {
          jumpStartElement.classList.remove('hidden');
          jumpStartElement.textContent = 'Jump Start!';
          jumpStart = true;
          return;
      }

      if (jumpStart) {
          jumpStartElement.classList.add('hidden');
          jumpStart = false;
          let randomTime = Math.random() * 3000 + 1000;
          setTimeout(function () {
              lights.forEach(function (light) {
                  light.classList.add('on');
              });
              startTime = new Date().getTime();
              timerRunning = true;
          }, randomTime);
          return;
      }

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
      } 
  });
});
