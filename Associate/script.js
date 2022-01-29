const inputField = document.querySelector(".text-field");
const btn = document.querySelector(".btn");
const table = document.querySelector(".table");
const body = document.querySelector("#body-part");
const head = document.querySelector("#table-head");
 

btn.addEventListener('click',(e) =>{
if (inputField.value === "") return;
 const aftercheck = checkValue()
//  console.log(aftercheck);
  const Word = Object.keys(aftercheck);
  const Count = Object.values(aftercheck);
   const tableHead = document.createElement("tr");
    tableHead.innerHTML = `
    <th>Words</th>
    <th>Count</th>
    `;
    head.appendChild(tableHead);
    for (let i = 0; i < Word.length; i++) {
    const tablebody = document.createElement("tr");
    tablebody.innerHTML =`
    <td>${Word[i]}</td>
    <td>${Count[i]}</td>`
    body.appendChild(tablebody);
    }
}); 
 
  


function checkValue() {
const inval = inputField.value;//get value
console.log(inval);
const lower = inval.toLowerCase() 
const Split = lower.replace(/[\.,[()!@#$%^&*~?/\]{}&+:]+/g, " ")
.replace(/['"'`]+/g, "").split(" ");
console.log(Split)
 
let obj = {};//it store the value
for (let i = 0; i < Split.length; i++) {
if (obj[Split[i]] === undefined) {
obj[Split[i]] = 1;
console.log(obj[Split[i]]);
} else {
obj[Split[i]]++;
console.log(obj[Split[i]])
}
}
console.log(obj);
return obj;
}

 
  
 
 