let openState = false;
const openSlide = document.getElementById('toggle-slide');

const toggleSlide = function() {
  if(!openState) {
    document.documentElement.style.setProperty('--translate-X', '-0.15');
    openState = true;
    console.log("Opened slide");
  } else if(openState) {
    document.documentElement.style.setProperty('--translate-X', '-0.95');
    openState = false;
    console.log("Closed slide");
  }
}

async function getData() {
  const response = await fetch('./data.json');
  const data = await response.json();
  // console.log(data);

  data.forEach(element => {
    let arr = [];
    arr = {...element};
    console.log(arr);
  });


}

getData();

openSlide.addEventListener("click", toggleSlide, false);