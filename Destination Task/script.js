
const cities = [
  "Madurai",
  "Tirunelveli",
  "Trichy",
  "Chennai",
  "Coimbatore",
  "Salem",
  "Bangalore",
];
const cities1 = [
  "Madurai",
  "Tirunelveli",
  "Trichy",
  "Chennai",
  "Coimbatore",
  "Salem",
  "Bangalore",
  "Mumbai",
];
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",];

const from = document.querySelector(".from");
const to = document.querySelector(".to");
const result = document.querySelector(".result");
const btn = document.querySelector(".btn");

let selectFrom;
let selectTo;
let inputsValue;

const route = {
  Madurai: {
    Tirunelveli: 2,
    Trichy: 2,
    Coimbatore: 3,
    Salem: 3,
  },
  Tirunelveli: {
    Madurai: 2,
  },
  Trichy: {
    Chennai: 3,
  },
  Chennai: {
    Bangalore: 2,
    Mumbai: 5,
  },
  Coimbatore: {
    Chennai: 3,
    Bangalore: 3,
  },
  Salem: {
    Bangalore: 2,
  },
  Bangalore: {
    Mumbai: 3,
  },
};

let daysFlow = [];

let findpath = (way, startPlace, endingPlace) => {
  if (way[startPlace] === undefined) {
    return;
  }

  // Its trackthe distances from start node using a object
  let distances = {};
  //set infinity to calculate later
  distances[endingPlace] = "Infinity";
  distances = Object.assign(distances, way[startPlace]);

  // track paths use to a  object
  let parentElements = { endingPlace: null };
  for (let child in way[startPlace]) {
    parentElements[child] = startPlace;
  }

  let alredyPathVisited = [];
  let node = findShortWay(distances, alredyPathVisited);
  while (node) {
    let distance = distances[node];
    let children = way[node];
    for (let child in children) {
      if (String(child) === String(startPlace)) {
        continue;
      } else {
        let newdistance = distance + children[child];
        if (!distances[child] || distances[child] > newdistance) {
          // saving distance to current object
          distances[child] = newdistance;
          parentElements[child] = node;
        }
      }
    }
    // move current node to alredyPathVisited set
    alredyPathVisited.push(node);
    // move to nearest neighbor node
    node = findShortWay(distances, alredyPathVisited);
  }

  // using the stored paths from start node to end node
  // save the shortest path
  let shortestPath = [endingPlace];
  let parent = parentElements[endingPlace];
  console.log(parent);
  while (parent) {
    console.log(parent);
    shortestPath.push(parent);
    parent = parentElements[parent];
  }
  shortestPath.reverse();

  //this is the shortest path
  let results = {
    distance: distances[endingPlace],
    path: shortestPath,
  };

  // return the shortest path & the end node's distance from the start node
  console.log(results);
  return results;
};

let findShortWay = (distances, alredyPathVisited) => {
  let shortest = null;
  for (let node in distances) {
    let currentIsShortest =
      shortest === null || distances[node] < distances[shortest];
    if (currentIsShortest && !alredyPathVisited.includes(node)) {
      // if (route[node] !== undefined) {
      shortest = node;
      // } else {
      //   return;
      // }
    }
  }
  console.log(shortest, "short");

  return shortest;
};

let final;


const fetchingFrom = function (data) {
  let createoption = "";
  Object.keys(data).forEach((e, index) => {
    createoption += `<option value = '${e}'>${data[e]}</option>`;
  });
  from.insertAdjacentHTML("beforeend", createoption);
  to.insertAdjacentHTML("beforeend", createoption);
};
fetchingFrom(cities);

 
from.addEventListener("change", (e) => {
  selectFrom = e.target.value;
 result.innerHTML = "";
});

to.addEventListener("change", (e) => {
  selectTo = e.target.value;
 result.innerHTML = "";
});

btn.addEventListener("click", () => {
  let from = cities[selectFrom];
  let to = cities1[selectTo];
  console.log(from, to);
   
  if (from !== undefined && to !== undefined) {
    let append2="";
    final = findpath(route, from, to);
    // getBusinessDays();
    // getBusinessDays(dateObj, days);
    let appointment = new Date();
    let date = appointment.getDate();
    let month = months[appointment.getMonth()];
    // let month1 =months[appointment.getMonth()]
    let newAppointment = addDays(appointment, final.distance);
    // let date2 = newAppointment.getDate();
    // let month2 =months[newAppointment.getMonth()]
    let weekendday = (getBusinessDays(new Date(),final.distance)).toString().split(' ').splice(1,2).join(' ')
    console.log(final)

  for(index =0 ; index < 1 ; index++){
    final.path.forEach((e) => {
      if (index === final.path.length) {
        append2 += `${e}`;
        console.log(append2)
      } else {
        append2 += `${e}➡`;
      }
    });
  }
    append2 += `It takes ${final.distance} Days to go &`

  if (
      final &&
      route[final.path[0]] !== undefined 
    ) {
     append2 += ` Departure-  ${month} ${date} & Arrive- ${weekendday}`;
     result.innerHTML = append2;
     result.classList.remove('hidden');
     
     
    } 
     else {
            answer.innerHTML = "Route Not Found";
            result.classList.remove('hidden');
          }
        }
  //   if(final.distance ===  'Infinity') {
  //     // console.log('hi')
  //    result.textContent = "No Route";
  //    result.classList.remove('hidden');
  //   }
  // }
  
});
let dateObj;
let days;
function getBusinessDays(dateObj, days) {
  for (var i = 0; i < days; i++) {
      if (days > 0) {
          switch (dateObj.getDay()) {
            // 6 being Saturday and 0 being Sunday.
            case 6, 0:
              dateObj.setDate(dateObj.getDate() + 2)
              break;
              //sunday
              case 0:
                dateObj.setDate(dateObj.getDate() + 1)
                break;
                //saturday
                case 6:
                  dateObj.setDate(dateObj.getDate() + 2)
                  break;
                //handle Monday, Tuesday, Wednesday and Thursday!
                default:
                  dateObj.setDate(dateObj.getDate() + 1)
                  //console.log(dateObj)
                  break;
                }
               
      }
  }

  return dateObj;
}

// console.log('hii');
// //Mon Dec 20 2021 18:56:01 GMT+0530 (India Standard Time)
console.log(getBusinessDays(new Date(), final.distance))


function addDays(originalDate, days){
  cloneDate = new Date(originalDate.valueOf());
  cloneDate.setDate(cloneDate.getDate() + days);
  return cloneDate;
}