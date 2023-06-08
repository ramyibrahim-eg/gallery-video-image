//////////////chose///////////////
const video_item = document.querySelector("#video_item");
const photo_item = document.querySelector("#photo_item");

video_item.addEventListener("click", () => {
  setTimeout(() => {
    $(document).ready(function () {
      $("#section").load("./file_upload/video.html .wrapper", () => {
        $("script").each(function () {
          var src = $(this).attr("src");
          if (src && src.includes("chose.js")) {
            $(this).attr("src", "./file_upload/js/video.js");
          }
        });
      });
    });
  }, 500);
});

photo_item.addEventListener("click", () => {
  setTimeout(() => {
    $(document).ready(function () {
      $("#section").load("./file_upload/image.html .wrapper", () => {
        $("script").each(function () {
          var src = $(this).attr("src");
          if (src && src.includes("chose.js")) {
            $(this).attr("src", "./file_upload/js/image.js");
          }
        });
      });
    });
  }, 500);
});
