const Districts = [
    "Madurai",
    "Tirunelveli",
    "Trichy",
    "Chennai",
    "Coimbatore",
    "Salem",
    "Bangalore",
    "Mumbai",
  ];
  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC",];
  
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
  
  function calculatingDays(arr) {
    for (i = 0; i < arr.length; i++) {
      const obj1 = route[arr[i]];
      if (obj1 !== undefined) {
        if (obj1[arr[i + 1]] !== undefined) {
          daysFlow.push(obj1[arr[i + 1]]);
        }
      }
    }
  }
  
  const fetchingFrom = function (data) {
    let createFrom = "";
    Object.keys(data).forEach((e, index) => {
      createFrom += `<option value = '${e}'>${data[e]}</option>`;
    });
    from.insertAdjacentHTML("beforeend", createFrom);
    to.insertAdjacentHTML("beforeend", createFrom);
  };
  fetchingFrom(Districts);
  
  from.addEventListener("change", (e) => {
    selectFrom = e.target.value;
   result.innerHTML = "";
  });
  
  to.addEventListener("change", (e) => {
    selectTo = e.target.value;
   result.innerHTML = "";
  });
  
  btn.addEventListener("click", () => {
    let from = Districts[selectFrom];
    let to = Districts[selectTo];
    console.log(from, to);
    // if (from === to && from === undefined && to === undefined) {
    //   result.innerHTML = "Please Enter a Valid Input";
    //   return;
    // }
    if (from !== undefined && to !== undefined) {
      final = findpath(route, from, to);
  
      if (
        final &&
        // route[final.path] !== undefined &&
        final.distance !== "Infinity"
      ) {
        calculatingDays(final.path);
       UI(final.path, final.distance, daysFlow);
      } else {
       result.innerHTML = "No Route";
      }
    }
  });
  console.log(final);
  
  const UI = function (path, totaldays, numberPath) {
    let append = "";
    let startingDate = new Date();
    let dayFrom1 = startingDate.getDate();
    let dayFrom = lastvalue(dayFrom1);
    let monthFrom = months[startingDate.getMonth()];
    const dateShowing = displayDate(totaldays);
    let dayTo2 = dateShowing.getDate();
    let dayTo = lastvalue(dayTo2);
    let monthTo = months[dateShowing.getMonth()];
    if (daysFlow.length !== 0) {
      path.forEach((e, index) => {
        if (index + 1 === path.length) {
          append += `${e}<br>`;
        } else {
          append += `${e} ➡`;
        }
      });
      append +=`Departure ${dayFrom} ${monthFrom} & Arrive ${dayTo} ${monthTo}`;
     result.innerHTML = append;
     result.classList.remove('hidden');
    } else {
     result.innerHTML = "No Route";
    }
  
    daysFlow = [];
  };
  const lastvalue = function (d) {
    if (d > 3 && d < 21) return `${d}`;
    switch (d % 10) {
      case 1:
        return `${d}`;
      case 2:
        return `${d}`;
      case 3:
        return `${d}`;
      default:
        return `${d}`;
    }
  };
  function displayDate(days) {
    let startDate = new Date();
    let endDate;
    let DaysToAdd = days;
    let count = 0;
    while (count < DaysToAdd) {
      endDate = new Date(startDate.setDate(startDate.getDate() + 1));
      if (endDate.getDay() != 0 && endDate.getDay() != 6) {
        count++;
      }
    }
     
    return endDate;
  }
  
   