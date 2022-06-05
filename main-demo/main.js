import axios from "axios";

const list = document.getElementById("container");

// function that is called when the page is loaded
const initFunction = async () => {
  try {
    const res = await axios.get("./data.json");
    await setupCards(res.data);
  } catch (err) {
    console.log(err);
  }
}


const setupCards = async (arr) => {
  // the goal is to write the function to get the distance btwn the user and all the places
  const places = await getProximityToPlaces(arr);

  let html = "";
  arr.forEach((item) => {
    const card = `
         <div class="place-div"><img src=${item.img}></img><h2>${item.name}</h2></div>
         `;
    html += card;
  });
  list.innerHTML = html;
};

const origin = "Westlands,Nairobi"; // this will be where our user is. Ideally this should be a dynamic value.
const getProximityToPlaces = async(arr) => {
  const places = arr.map(async(item) => {
    let distance = await getDistance(origin, item.location); // get the distance between the user and the place
    item['distance'] = distance; // add the distance value to the place object
    return item;
  })
  return Promise.all(places); // Resolve all the promises
}

const getDistance = async (origin, destination) => {
  let distance;
  try {
    // make a request to the distance matrix API with the origin and destination
    const res = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=YOUR_API_KEY`);
    distance = res.data.rows[0].elements[0].distance.value;
  }catch(err){
    console.log(err);
  }
  return distance;
}


await initFunction();

