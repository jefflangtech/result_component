let openState = false;
let timeout = false;
const delay = 250;
const openButton = document.getElementById('toggle-open-button');
const closeButton = document.getElementById('toggle-close-button');
const openSlide = document.getElementById('toggle-slide');
const resultsScores = document.getElementById('results-scores');

const toggleButtons = function() {
  openButton.classList.toggle("hidden");
  closeButton.classList.toggle("hidden");
}

const toggleSlide = function() {
  if(!openState) {
    document.documentElement.style.setProperty('--translate-X', '-0.15');
    openState = true;
    toggleButtons();
    resultsScores.style.opacity = "1";
  } else if(openState) {
    document.documentElement.style.setProperty('--translate-X', '-0.95');
    openState = false;
    setTimeout(toggleButtons, 550);
    resultsScores.style.opacity = "0";
  }
}

const checkTabletSizeOpacity = function() {
  if(window.innerWidth < 720 && window.innerWidth >= 375) {
    resultsScores.style.opacity = "1";
  }
  if(window.innerWidth >= 720) {
    closeButton.classList.forEach(classValue => {
      if(classValue === "hidden") {
        resultsScores.style.opacity = "0";
      }
    });
  }
}

async function getData() {
  const response = await fetch('./data.json');
  const data = await response.json();

  data.forEach(element => {
    let arr = [];
    arr = {...element};
    console.log(arr);
  });
}

getData();

openButton.addEventListener("click", toggleSlide, false);
closeButton.addEventListener("click", toggleSlide, false);
window.addEventListener('resize', function() {
  clearTimeout(timeout);
  timeout = setTimeout(checkTabletSizeOpacity, delay);
});

checkTabletSizeOpacity();