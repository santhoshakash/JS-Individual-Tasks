const Districts = [
  "Madurai",
  "Tirunelveli",
  "Trichy",
  "Chennai",
  "Coimbatore",
  "Salem",
  "Bangalore",
];
const Districts1 = [
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
    Coimbatore: 4
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
let dayspart = [];
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
  while (node) { //it has node value
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
    console.log(distances)
  }

  // using the stored paths from start node to end node
  // save the shortest path
  let shortestPath = [endingPlace];
  let parent = parentElements[endingPlace];
  while (parent) {
    shortestPath.push(parent);
    parent = parentElements[parent];
  }
  shortestPath.reverse();

  //this is the shortest path
  let results = {
    distance: distances[endingPlace],
    path: shortestPath,
  };
// console.log(path);
  // return the shortest path & the end node's distance from the start node
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

  return shortest;
};

let final;

function daycalculated(arr1) {
  for (i = 0; i < arr1.length; i++) {
    const obj1 = route[arr1[i]];
    if (obj1 !== undefined) {
      if (obj1[arr1[i + 1]] !== undefined) {
        dayspart.push(obj1[arr1[i + 1]]);
      }
    }
  }
}


const fetchFrom = function (data) {
  let createoption = "";
  Object.keys(data).forEach((e, index) => {
    createoption += `<option value = '${e}'>${data[e]}</option>`;
  });
  from.insertAdjacentHTML("beforeend", createoption);
};
fetchFrom(Districts);
const fetchTo = function (data) {
  let createoption = "";
  Object.keys(data).forEach((e, index) => {
    createoption += `<option value = '${e}'>${data[e]}</option>`;
  });
  to.insertAdjacentHTML("beforeend", createoption);
};
fetchTo (Districts1);
 
from.addEventListener("change", (e) => {
  result.classList.add('hidden');
  selectFrom = e.target.value;
 result.innerHTML = "";
});

to.addEventListener("change", (e) => {
  result.classList.add('hidden');
  selectTo = e.target.value;
 result.innerHTML = "";
});

 
  // for get the route btn adding the events.
  btn.addEventListener("click", () => {
    let from = Districts[selectFrom];
    let to = Districts1[selectTo];

    // let newAppointment = addDays(appointment, final.distance);
    // console.log(from, to);
    // if the from or to ,anything is undefined,then return
    if (from !== undefined && to !== undefined) {
      final = findpath(route, from, to);
  
      if (
        final &&
        // route[final.path] !== undefined &&
        final.distance !== "Infinity"
      ) {
        daycalculated(final.path);
       front(final.path, final.distance,dayspart);
      //  add= 
       const fas = (final.path,final.distance);
       const sd =fas;
      } else {
       result.innerHTML = "Route not found";
       result.classList.add('show');
     result.classList.remove('hidden');
      }
    }
  });
  
  const front = function (path,totaldays,addpath) {
    // let addpath="";
    let append2 = "";
    let appointment = new Date();
    let date = appointment.getDate();
    let month = months[appointment.getMonth()];
    let newAppointment = addDays(appointment, final.distance);
    // const dateShowing = showdate(totaldays);
    // let dateShowing = dates();
    let Departured = (getBusinessDays(new Date(),final.distance)).toString().split(' ').splice(1,3).join(' ')
      if (dayspart.length !==0){
      path.forEach((e, index) => {
        if (index + 1 === path.length) {
          append2 += `${e} <br> `;
        } else {
          append2 += `${e}→`;  
        }
      });
      addpath.forEach((e, index) => {
        if (addpath.length === 1) {
          append2 += `${e} days.  `;
        } else if (addpath.length === index + 1) {
          append2 += `${e} = ${totaldays} days.`;
        } else {
          append2 += `${e} + `;
        }
      });
      // append2 += `It takes ${final.distance} Days to reach<br>`;
      // if(addpath !== undefined){
     
      // let appointment = new Date();
      // let date = appointment.getDate();
      // let month = months[appointment.getMonth()];

      if (
        final &&
        route[final.path[0]] !== undefined 
      ) 
      {
       append2 += ` Departure-  ${month} ${date} & Arrive- ${Departured}`;
       result.innerHTML = append2;
       result.classList.remove('hidden');
       
      }
      dayspart = []; 
 };
 function addDays(originalDate, days){
  cloneDate = new Date(originalDate.valueOf());
  cloneDate.setDate(cloneDate.getDate() + days);
  return cloneDate;
}
  function getBusinessDays(dateObj, days) {
    for (var i = 0; i < days; i++) {
        if (days > 0) {
            switch (dateObj.getDay()) {
              // 6 being Saturday and 0 being Sunday.
              // case 6, 0:
              //   dateObj.setDate(dateObj.getDate() + 2)
              //   break;
                // sunday.
                case 0:
                  dateObj.setDate(dateObj.getDate() + 1)
                  break;
                  //5 = Friday.
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
   
}