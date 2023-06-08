////////////////login/////////////////////
const eye = document.querySelector(".eye");
const eyeoff = document.querySelector(".eye-off");
const passwordField = document.querySelector("input[type=password]");
const button = document.querySelector(".button");
const text_error = document.querySelector(".text_error");
let section = $("#section");
let body = $("body");

eye.addEventListener("click", () => {
  eye.style.display = "none";
  eyeoff.style.display = "block";

  passwordField.type = "text";
});

eyeoff.addEventListener("click", () => {
  eyeoff.style.display = "none";
  eye.style.display = "block";

  passwordField.type = "password";
});

if (localStorage.getItem("login")) {
  $(document).ready(function () {
    section.load("./file_upload/chose.html .radio-section", () => {
      let myScript = $("<script>");
      myScript.attr("src", "./file_upload/js/chose.js");

      body.append(myScript);
    });
  });
}

passwordField.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    button.click();
  }
});

button.addEventListener("click", () => {
  const passwordInput = passwordField.value;
  if (passwordInput !== "") {
    localStorage.setItem("login", passwordInput);
    $(document).ready(function () {
      section.load("./file_upload/chose.html .radio-section", () => {
        let myScript = $("<script>");
        myScript.attr("src", "./file_upload/js/chose.js");

        body.append(myScript);
      });
    });
  } else {
    text_error.style.transform = "translateY(0)";

    setTimeout(() => {
      text_error.style.transform = "translateY(-100%)";
    }, 3000);
  }
});
