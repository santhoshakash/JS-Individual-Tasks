const inputField = document.querySelector(".inputfield");
const resultField = document.querySelector(".result");
const openBrackets = ["{" , "[", "("]; 
const closeBrackets = ["}", "]", ")"];
const matchBracket= {"}":"{","]":"[",")":"(",}
 
    //Result fn
	function finalResult(val) {
	if(val===true) {
	resultField.innerText = "True 👍 ";
	}
	else{
	resultField.innerText = "False 📌 ";
	}
	}
	///fprocss fn
	function checkingBrackets(){
	let arr = inputField.value ;
	// console.log(arr);
    // let openBrackets;
    // if (openBrackets == arr.includes("{" , "[", "(")){
    //     console.log("true");
    // }
	var BrakcetsSpace = [];
	 if(arr.length > 0 && arr.includes("{") || arr.includes("}") || arr.includes("[")
       || arr.includes("[") || arr.includes("(") || arr.includes(")")){  

	for(i=0;i<arr.length;i++)
    {
	console.log(arr[i]);
	if(openBrackets.includes(arr[i])){
    BrakcetsSpace.push(arr[i]);//if open brackets push it
    }
	if(closeBrackets.includes(arr[i])){
	const last = BrakcetsSpace.pop();
	console.log(last);
	if(last !== matchBracket[arr[i]]) {
		console.log(matchBracket[arr[i]]);
	return finalResult(false);
	}
	}
	 
	}
	if(BrakcetsSpace.length == 0){ //if its empty its return true
	  return finalResult(true);
	}else{
	  return finalResult(false);
	}
	} 
	
	}
	
	 