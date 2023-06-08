$(document).ready(function () {
  $.get("../php/images/img_php.php", function (imgData) {
    console.log(imgData);
    let numToShow = 8;
    let divContianer = $(".images_linear");
    let showMore = $("#show_more");
    let loader = $(".loader");
    let close = $(".close");
    let fullScreen = $(".full_screen");
    let img_play = $(".img_play");
    let i = numToShow;

    if (imgData.length === 0) {
      let divContaint = $("<h2>").addClass("text").text("No Data");
      divContianer.append(divContaint);
      showMore.hide();
    }

    if (i >= imgData.length) {
      showMore.hide();
    }

    $.each(imgData.reverse().slice(0, numToShow), function (i, item) {
      let divContaint = $("<div>").addClass("images");
      let filename = $("<img/>")
        .addClass("image")
        .attr("src", `../upload/images/${item}`)
        .attr("alt", item);
      divContianer.append(divContaint);
      divContaint.append(filename);
    });

    showMore.click(function () {
      setTimeout(() => {
        $.each(imgData.slice(i, i + numToShow), function (i, item) {
          let divContaint = $("<div>").addClass("images");
          let filename = $("<img/>")
            .addClass("image")
            .attr("src", `../upload/images/${item}`)
            .attr("alt", item);
          divContianer.append(divContaint);
          divContaint.append(filename);
        });
        i += numToShow;
      }, 2000);

      showMore.css("display", "none");
      loader.css("display", "inline-block");

      setTimeout(function () {
        showMore.css("display", "inline-block");
        loader.css("display", "none");
        if (i >= imgData.length) {
          showMore.hide();
        }
      }, 2000);
    });

    $("#gallery_images").on("click", ".images", function () {
      const img = $(this).find(".image");
      const src = img.attr("src");
      fullScreen.css("display", "flex");
      img_play.attr("src", src);
      $(".download_click").attr("href", src);
    });

    close.click(() => {
      fullScreen.css("display", "none");
      img_play.attr("src", "");
    });

    fullScreen.click(() => {
      fullScreen.css("display", "none");
      img_play.attr("src", "");
    });

    $(".mini-player-btn").click(() => {
      fullScreen.css("display", "none");
    });

    $(".button_view , .img_play").click(function (e) {
      e.stopPropagation();
    });
  });
});
