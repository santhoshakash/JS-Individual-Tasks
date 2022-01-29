const select = document.querySelectorAll(".currency");
const btn = document.getElementById("btn");
const num = document.getElementById("num");
const ans = document.getElementById("answer");

fetch("https://api.frankfurter.app/currencies")//fetch the data
  .then((data) => data.json())
  .then((data) => {
    console.log(data);//get the data as obj
    display(data);
     
  });

function display(data) {
  const entries = Object.entries(data);//convert the data into array
  console.log(entries);
  for (var i = 0; i < entries.length; i++) {
    select[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;//add the fecthed data in select place
    console.log(entries[i][0]);
    select[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
    console.log(entries[i][0]);
  }
}

btn.addEventListener("click", () => {//it pass the our inputs to api
  let currency1 = select[0].value;//select the one of option in fetched data
  console.log(currency1);
  let currency2 = select[1].value;
  console.log(currency2);

  let value = num.value;
  console.log(value);
   //if selected option is not same then call the
  if (currency1 != currency2) {
    convert(currency1, currency2, value);
  } else {
    alert("Choose Different Currencies !!!");
  }
});

function convert(currency1, currency2, value){
 
  fetch(
    `https://api.frankfurter.app/latest?amount=${value}&from=${currency1}&to=${currency2}`
  )
    .then((val) => val.json())
    .then((val) => {
        console.log(val)
      console.log(Object.values(val.rates)[0]);
      ans.value = Object.values(val.rates)[0];//it display the resultts of ans value
    });
}
