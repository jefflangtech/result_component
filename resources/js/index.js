console.log("hey!");

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