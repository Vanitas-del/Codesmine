let lights = document.querySelectorAll('.light');
let reactionTimeElement = document.getElementById('time');
let startTime;
let endTime;

document.addEventListener('DOMContentLoaded', function() {
    let intervalId = setInterval(function() {
        let randomTime = Math.random() * 3000 + 1000; // random time between 1-4 seconds
        setTimeout(function() {
            lights.forEach(function(light) {
                light.classList.add('on');
            });
            startTime = new Date().getTime();
        }, randomTime);
    }, 5000); // repeat every 5 seconds
});

document.addEventListener('click', function() {
    endTime = new Date().getTime();
    let reactionTime = endTime - startTime;
    reactionTimeElement.textContent = reactionTime + ' ms';
    lights.forEach(function(light) {
        light.classList.remove('on');
    });
});