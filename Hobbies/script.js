const inputField = document.querySelector(".search-field");
const result = document.querySelector(".final");
const btn = document.querySelector(".btn");


let hobbies = {
    Steve: ["Fashion","Piano","Reading"],
    Patty: ["Drama","Magic","Pets"],
    Chad: ["Puzzles","Pets","Yoga"],
  };
  
  btn.addEventListener("click", () => {
    const inputs = inputField.value;
    console.log(findHobbyists(hobbies,inputs))
    const last = findHobbyists( hobbies,inputs);
    console.log(last)
    result.innerText = last;
   
  });

  function findHobbyists(hobbies, hobby) { ///given input
    return Object.keys(hobbies)
    .filter((k) => hobbies[k].includes(hobby));
}
// console.log(findHobbyists(hobbies,inputs))