let seekbar = document.querySelector("#seekbar");
let plength = document.querySelector("#length");
let checkboxs1 = document.querySelector("#smalls");
let checkboxs2 = document.querySelector("#caps");
let checkboxs3 = document.querySelector("#digits");
let checkboxs4 = document.querySelector("#specials");
let indigater = document.querySelector("#indigater");
let strength_text = document.querySelector("#strength");
let generator = document.querySelector("#generator");
let display = document.querySelector("#password")
let copy = document.querySelector("#copy")
let copypopup = document.querySelector(".copied");
let countcheckbox = 0;
let passwordlenght = 5;
seekbar.value=5;

const smallChars = 'abcdefghijklmnopqrstuvwxyz'.split('');
const capitalChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const digits = '0123456789'.split('');
const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?/~`-='.split('');


plength.innerHTML = seekbar.value; // Initial display

seekbar.addEventListener('input', () => {
    plength.innerHTML = seekbar.value;
    passwordlenght=parseInt(plength.innerHTML);
    passwordStrength();
});

checkboxs1.addEventListener('change', passwordStrength);
checkboxs2.addEventListener('change', passwordStrength);
checkboxs3.addEventListener('change', passwordStrength);
checkboxs4.addEventListener('change', passwordStrength);

function passwordStrength() {
    let strength = 0;
    if (checkboxs1.checked) strength++;
    if (checkboxs2.checked) strength++;
    if (checkboxs3.checked) strength++;
    if (checkboxs4.checked) strength++;

    countcheckbox =strength;

    switch (strength) {
        case 0:
            strength_text.innerHTML = "No Password";
            indigater.style.backgroundColor = "black";
            indigater.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.8)";
            break;
        case 1:
        case 2:
            strength_text.innerHTML = "Weak password";
            indigater.style.backgroundColor = "red";
            indigater.style.boxShadow = "0px 0px 10px rgba(255, 0, 0, 0.8)";
            break;
        case 3:
            strength_text.innerHTML = "Intermediate password";
            indigater.style.backgroundColor = "yellow";
            indigater.style.boxShadow = "0px 0px 10px rgba(100, 100, 0, 0.9)";
            break;
        case 4:
            strength_text.innerHTML = "Strong password";
            indigater.style.backgroundColor = "green";
            indigater.style.boxShadow = "0px 0px 10px rgba(0, 255, 0, 0.8)";
            break; 
    }
}

function getrandomInt(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

function getrandomSmall(min,max){
     let small = getrandomInt(1,26);
     return smallChars[small];
}


function getrandomCap(min,max){
    let caps = getrandomInt(1,26);
    return capitalChars[caps];
}

function getrandomDigit(min,max){
    let digit = getrandomInt(0,9);
    return digits[digit];
}

function getrandomSpecial(){
 let special = getrandomInt(0,specialChars.length)
 return specialChars[special];
}

generator.addEventListener('click', () => {
if (countcheckbox === 0) {
    alert("Please select at least one checkbox");
    return;
}

let password = [];

if (checkboxs1.checked) password.push(getrandomSmall());
if (checkboxs2.checked) password.push(getrandomCap());
if (checkboxs3.checked) password.push(getrandomDigit());
if (checkboxs4.checked) password.push(getrandomSpecial());

let i = passwordlenght - password.length;

while (i) {
    if (checkboxs1.checked) { password.push(getrandomSmall()); i = i - 1; }
    if (i === 0) { break; }
    if (checkboxs2.checked) { password.push(getrandomCap()); i = i - 1; }
    if (i === 0) { break; }
    if (checkboxs3.checked) { password.push(getrandomDigit()); i = i - 1; }
    if (i === 0) { break; }
    if (checkboxs4.checked) { password.push(getrandomSpecial()); i = i - 1; }
    if (i === 0) { break; }
}

for(let i=0; i< 20; i++){
  let j=getrandomInt(0,password.length-1);
  let k=getrandomInt(0,password.length-1);
  let temp = password[j];
  password[j] =password [k];
  password [k] =temp;
} 

         
display.innerHTML = password.join('');
});

copy.addEventListener('click',()=>{
 
 navigator.clipboard.writeText(display.innerHTML)
 copypopup.classList.remove('hidden');
 setInterval(()=>{
    copypopup.classList.add('hidden');
 },1000)
})