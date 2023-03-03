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

/* Checks each break point where opacity is changed in the results-scores
div, and corrects it if it gets out of sync during a resize event
*/
const checkTabletSizeOpacity = function() {
  // Tablet size screens
  if(window.innerWidth < 720 && window.innerWidth >= 375) {
    resultsScores.style.opacity = "1";
  }
  // Desktop screens
  if(window.innerWidth >= 720) {
    // If the close button is hidden, the slide is closed, and opacity should be 0
    closeButton.classList.forEach(classValue => {
      if(classValue === "hidden") {
        resultsScores.style.opacity = "0";
      }
    });
  }
}

const displayData = function(data) {
  const scores = document.getElementsByClassName('score-category');
  if(data.length !== scores.length) {
    console.log("Data overflow in JSON file");
  }
  for(let x = 0; x < scores.length; x++) {
    let source = data[x].icon.slice(data[x].icon.search('resources'));
    scores[x].children[0].src += source;
    scores[x].children[1].innerHTML = data[x].category;
    scores[x].children[2].innerHTML = data[x].score;
  }
}

async function getData() {
  const response = await fetch('./data.json');
  const data = await response.json();
  let dataArray = [];
  let counter = 0;

  data.forEach(element => {
    dataArray[counter] = {...element};
    counter++;
  });

  displayData(dataArray);
}

getData();

openButton.addEventListener("click", toggleSlide, false);
closeButton.addEventListener("click", toggleSlide, false);

/* Listens for window resizing and checks whether opacity 
in the results-scores div is correct. The delay is to ensure
opacity change does not happen until resizing has stopped
for at least a quarter-second.
*/
window.addEventListener('resize', function() {
  clearTimeout(timeout);
  timeout = setTimeout(checkTabletSizeOpacity, delay);
});
checkTabletSizeOpacity();