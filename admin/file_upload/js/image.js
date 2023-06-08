///////////////video/////////////////

const form = document.querySelector("form"),
  fileInput = form.querySelector(".file_input"),
  errorDiv = document.querySelector(".error"),
  file_names = document.querySelector(".file_name"),
  button_upload = document.querySelector(".button_upload"),
  progressArea = document.querySelector(".progress_area"),
  wrapper = document.querySelector(".wrapper"),
  viewVideo = document.querySelector("#viewVideo"),
  uploadedArea = document.querySelector(".uploaded_area");

const types = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

fileInput.setAttribute("accept", types.join(","));

form.addEventListener("click", () => {
  fileInput.click();
});

fileInput.onchange = ({ target }) => {
  let file = target.files[0];

  if (file) {
    let fileType = file.type;
    let fileName = file.name;

    file_names.innerHTML = fileName;

    if (types.indexOf(fileType) === -1) {
      errorDiv.style.transform = "translateY(0)";
      setTimeout(() => {
        errorDiv.style.transform = "translateY(-120%)";
      }, 3000);

      file_names.innerHTML = "";
    } else {
      uploadFile(fileName);
    }
  }
};

function uploadFile(name) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost/admin/php/img/php_img.php");
  xhr.upload.addEventListener("progress", ({ loaded, total }) => {
    let fileLoaded = Math.floor((loaded / total) * 100);
    let fileTotal = Math.floor(total / 1000);
    let fileSize;
    fileTotal < 1024
      ? (fileSize = fileTotal + " KB")
      : (fileSize = (loaded / (1024 * 1024)).toFixed(2) + " MB");
    let progressHTML = `<li class="row">
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.128"><polyline points="44 8 44 16 52 16"></polyline><polygon points="52 16 44 8 12 8 12 56 52 56 52 16"></polygon><polygon points="39 32 25 24 25 40 39 32"></polygon></g><g id="SVGRepo_iconCarrier"><polyline points="44 8 44 16 52 16"></polyline><polygon points="52 16 44 8 12 8 12 56 52 56 52 16"></polygon><polygon points="39 32 25 24 25 40 39 32"></polygon></g></svg>
                          <div class="content">
                            <div class="details">
                              <span class="name">${name} • Uploading</span>
                              <span class="percent">${fileLoaded}%</span>
                            </div>
                            <div class="progress-bar">
                              <div class="progress" style="width: ${fileLoaded}%"></div>
                            </div>
                          </div>
                        </li>`;
    uploadedArea.classList.add("onprogress");
    progressArea.innerHTML = progressHTML;
    if (loaded == total) {
      progressArea.innerHTML = "";
      let uploadedHTML = `<li class="row">
                            <div class="content upload">
                            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.128"><polyline points="44 8 44 16 52 16"></polyline><polygon points="52 16 44 8 12 8 12 56 52 56 52 16"></polygon><polygon points="39 32 25 24 25 40 39 32"></polygon></g><g id="SVGRepo_iconCarrier"><polyline points="44 8 44 16 52 16"></polyline><polygon points="52 16 44 8 12 8 12 56 52 56 52 16"></polygon><polygon points="39 32 25 24 25 40 39 32"></polygon></g></svg>
                              <div class="details">
                                <span class="name">${name} • Uploaded</span>
                                <span class="size">${fileSize}</span>
                              </div>
                            </div>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#151515"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.288"> <g id="Interface / Check"> <path id="Vector" d="M6 12L10.2426 16.2426L18.727 7.75732" stroke="#151515" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g><g id="SVGRepo_iconCarrier"> <g id="Interface / Check"> <path id="Vector" d="M6 12L10.2426 16.2426L18.727 7.75732" stroke="#151515" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                          </li>`;
      uploadedArea.classList.remove("onprogress");
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
      window.addEventListener("click", () => {
        window.location.reload();
      });
    }
  });
  let data = new FormData(form);

  console.log(data);

  button_upload.addEventListener("click", () => {
    xhr.send(data);
  });
}
