  // getting elements by id and storing in variables
  const form = document.getElementById('form');
  const UsernameInput = document.getElementById('Username');
  const studentNameInput = document.getElementById('studentName');
  const dob = document.getElementById('dob');
  const proInput = document.getElementById('Program');
  const mobileInput = document.getElementById('mobile');
  const ShowJson = document.getElementById('ShowJson');
  const tr = document.getElementById('tr');
  const errorCcaptcha = document.getElementById('error-captcha');
  const textBox = document.getElementById('textBox');
  const UsernameRegex = /^[A-Z]{1}[a-z]*_[0-9]{6}$/;
  const studentNameRegex = /^[\u0621-\u064A\s0-9]+$/i;
  const dobRegex = /^([1-9]|0[1-9]|1[0-2])\/([1-9]|0[1-9]|[12][0-9]|3[0-1])\/\d{4}$/
  const mobileRegex = /^(\(\+963\)9[0-9]{6})$/;
  //const textBoxRegex=

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (validateInputs()) {
      addEmp();
      resetTheForm();
    }
  });
  
  //******************* SHOW ERROR MESSAGE *******************//

  const validateInput = (element, regex, lable) => {
    var error = '';
    if (!regex.test(element.value)) {
      error = 'The ' + lable + ' you entered (' + element.value + ') is not in the correct form. \nPlease fix it';
      element.focus();
      element.select();
    }
    const hasError = error == '';
    const container = element.parentElement;
    
    container.querySelector('.error-text').innerText = error;
    container.classList.remove('success')
    container.classList.remove('error')
    container.classList.add(hasError ? 'error' : 'success');
    return hasError ? true : false;
  }
 


//******************* FORM VALIDATION FUNCTION *******************//

  const validateInputs = () => {
    return validateInput(UsernameInput, UsernameRegex, 'اسم المستخدم')
      && validateInput(studentNameInput, studentNameRegex, 'اسم الطالب')
      && validateInput(dob, dobRegex, 'تاريخ الولادة ')
      && validateInput(mobileInput, mobileRegex, 'رقم الهاتف')
     // && validateInput(textBox, textBoxRegex, 'captcha')
      && validateInput(UsernameInput, UsernameRegex, 'Username');
      
  }


//******************* RESET THE FORM *******************//

 function resetTheForm() {
  document.getElementById("Username").value = '';
  document.getElementById("studentName").value = '';
  document.getElementById("dob").value = '';
  document.getElementById("mobile").value = '';
  document.getElementById("Program").value = '';
  document.getElementById("textBox").value = '';
 
}

//******************* CAPTCHA GENERATOR *******************/
//https://www.makeuseof.com/captcha-validation-html-css-javascript/

// document.querySelector() is used to select an element from the document using its ID
let captchaText = document.querySelector('#captcha');
var ctx = captchaText.getContext("2d");
ctx.font = "30px Roboto";
ctx.fillStyle = "#08e5ff";


let userText = document.querySelector('#textBox');
let submitButton = document.querySelector('#submitButton');
let output = document.querySelector('#output');
let refreshButton = document.querySelector('#refreshButton');


// alphaNums contains the characters with which you want to create the CAPTCHA
let alphaNums = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let emptyArr = [];

// This loop generates a random string of 7 characters using alphaNums
// Further this string is displayed as a CAPTCHA
for (let i = 1; i <= 7; i++) {
    emptyArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
}
var c = emptyArr.join('');
ctx.fillText(emptyArr.join(''),captchaText.width/1.4, captchaText.height/1.4);


// This event listener is stimulated whenever the user press the "Refresh" button
// A new random CAPTCHA is generated and displayed after the user clicks the "Refresh" button
refreshButton.addEventListener('click', function() {
    userText.value = "";
    let refreshArr = [];
    for (let j = 1; j <= 7; j++) {
        refreshArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
    }
    ctx.clearRect(0, 0, captchaText.width, captchaText.height);
    c = refreshArr.join('');
    ctx.fillText(refreshArr.join(''),captchaText.width/1.4, captchaText.height/1.4);
    output.innerHTML = "";
});


  /**********   Add employee table   **********/

  const employees = filteredEmloyees = [];
  var lastId = 1;
  class Employee {
    constructor(Id) {
      this.Id = Id;
    }
  }

  function addEmp() {
    var newEmp = new Employee(lastId++);
    newEmp.Username = UsernameInput.value;
    newEmp.Name = studentNameInput.value;
    newEmp.Mobile = mobileInput.value;
    newEmp.Program = proInput.value;
    newEmp.Bdate = new Date(dob.value).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    employees.push(newEmp);
    refreshTableBody();
  }

  ///******  FILTER EMPLOYEE BY SPECIALIZATION   *******/
  let proFilter = document.getElementById('pro-filter');
  proFilter.addEventListener('change', function () {
    refreshTableBody();
  })

  ///****  SORTING EMPLOYEE BY SPECIALIZATION *****/
  var sortBy = '';
  let number = document.querySelector('#number');
  let user = document.querySelector('#user');
  let program = document.querySelector('#program');

  number.addEventListener('click', function () {
    sortBy = 'number';
    refreshTableBody();
  })

  user.addEventListener('click', function () {
    sortBy = 'user';
    refreshTableBody();
  })

  program.addEventListener('click', function () {
    sortBy = 'program';
    refreshTableBody();
  })

  function refreshTableBody() {

    //THE LIST = FULL EMPLOYEES LIST AT FIRST
    filteredEmloyees = employees;

    if (proFilter.value != 'ALL') {
      filteredEmloyees = filteredEmloyees.filter(e => e.Program == proFilter.value);
    }
    //SORT BY SELECTED OPTION
    switch (sortBy) {
      case 'number':
        filteredEmloyees.sort(function (a, b) {
          if (a.Id < b.Id) return -1;
          if (a.Id > b.Id) return 1;
          return 0;
        });
        break;
      case 'user':
        filteredEmloyees.sort(function (a, b) {
          if (a.Username.toUpperCase() < b.Username.toUpperCase()) return -1;
          if (a.Username.toUpperCase() > b.Username.toUpperCase()) return 1;
          return 0;
        });
        break;
      case 'program':
        filteredEmloyees.sort(function (a, b) {
          if (a.Program.toUpperCase() < b.Program.toUpperCase()) return -1;
          if (a.Program.toUpperCase() > b.Program.toUpperCase()) return 1;
          return 0;
        });
        break;
    }

    //ADD ROWS FOR RESULTED LIST
    var rows = '';
    filteredEmloyees.forEach((e) => rows += '' +
      '<tr>' +
      '<td>' + e.Id + '</td>' +
      '<td>' + e.Username + '</td>' +
      '<td>' + e.Name + '</td>' +
      '<td>' + e.Program + '</td>' +
      '</tr>');
    document.getElementById('table-body').innerHTML = rows;

  }

  function convert() {
    ShowJson.value = JSON.stringify(filteredEmloyees, null, 2);
  }



  /**** THE STUDENTS ****/
  //Reem Kamal Mohammad [Reem_161726]
  //snds aljomaa [Snds_193409]
  //Peter Dali [Peter_187269]
  //Mohammad Ahmad Sweid [Mohammad_216407]
