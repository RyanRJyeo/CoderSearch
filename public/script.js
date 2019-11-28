// ===================================================
//              File is linked up
console.log('Client-side code running');
// ===================================================


// ===================================================
//        Switching the registration form


const coder = document.getElementById('coder');
const coderForm = document.getElementById('coderForm');
const searcher = document.getElementById('searcher');
const searcherForm = document.getElementById('searcherForm');


searcher.addEventListener('click', function(e) {
  coder.setAttribute("class", "btn btn-outline-secondary mr-5")
  searcher.setAttribute("class", "btn button-outline-primary")
  searcherForm.setAttribute("class", "showcase2")
  coderForm.setAttribute("class", "d-none")
});

coder.addEventListener('click', function(e) {
  searcher.setAttribute("class", "btn btn-outline-secondary")
  coder.setAttribute("class", "btn button-outline-primary  mr-5")
  coderForm.setAttribute("class", "showcase2")
  searcherForm.setAttribute("class", "d-none")
});
// ===================================================



// =======================================================
// Coder Password Check
// =======================================================
var password = document.getElementById("password")
  , confirm_password = document.getElementById("confirm_password");

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}


password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;





// =======================================================
// Searcher Password Check
// =======================================================
var passwordS = document.getElementById("password_searcher")
  , confirm_passwordS = document.getElementById("confirm_password_searcher");

function validatePasswordS(){
  if(passwordS.value != confirm_passwordS.value) {
    confirm_passwordS.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_passwordS.setCustomValidity('');
  }
}


passwordS.onchange = validatePasswordS;
confirm_passwordS.onkeyup = validatePasswordS;