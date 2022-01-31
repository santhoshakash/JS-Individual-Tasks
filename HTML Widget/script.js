// const main = document.querySelectorAll(".main")
const orgstar = document.querySelectorAll(".icon");
 

function Activestate(val) {
    console.log(val);
    for (let i = 0; i <= val; i++) {
        orgstar[i].classList.add("active");
        console.log(orgstar[i]);
    }
}

orgstar.forEach((icon) => {
    icon.addEventListener('click', (e) => {
        // for(i=0;i<=orgstar.length;i++)
        // orgstar[i].classList.remove("active");
        orgstar.forEach((Element) => Element.classList.remove("active")); 
        Activestate(icon.id);
        console.log(icon.id);
    });
});