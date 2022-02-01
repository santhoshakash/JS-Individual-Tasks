const inputField = document.querySelector(".text-field");
const btn = document.querySelector(".btn");
const table = document.querySelector(".table");
const body = document.querySelector("#body-part");
const head = document.querySelector("#table-head");
 

btn.addEventListener('click',(e) =>{

    let val = inputField.value
    if(val !==""){
    table.classList.remove('hidden')
 const aftercheck = checkValue()
  const Word = Object.keys(aftercheck);
  console.log(Word);
  const Count = Object.values(aftercheck);
  console.log(Count);
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
    console.log(Word);
    console.log(Count);
    body.appendChild(tablebody);
    }
    clear();
}
    
}); 
const clearing = function(){
    table.classList.add('hidden')
    body.innerText = ""
    head.innerText =""
}


function checkValue(){
const inval = inputField.value;//get value
console.log(inval);
const lower = inval.toLowerCase() 
const desired = lower.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g,' ');
console.log(desired);
const Split = desired.split(' ',lower.length);
console.log(Split)
// Split= Split.replace(/ /g,'$1');
// console.log(Split)
let arr= Split;
let array = [];
arr.forEach((el)=>
{
if (el !== '')
{
  array.push(el)
}
})
console.log(array);
let obj = {};//it store the value
for (let i = 0; i < array.length; i++) {
if (obj[array[i]] === undefined) {
obj[array[i]] = 1;
console.log(obj[array[i]]);
} else {
obj[array[i]]++;
console.log(obj[array[i]])
}
}
console.log(obj);
return obj;
}

const clear = function(){
    inputField.value = "";

};