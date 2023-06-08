$(document).ready(function () {
  $.get("../php/video/videos_width.php", function (sliderData) {
    let numToShow = 10;
    let divContianer = $(".video_linear");
    let showRight = $("#right");
    let showLeft = $("#left");
    let fullScreen = $(".full_screen");
    let videoPlay = $(".videoPlay");
    let buttom_more = $(".buttom_more");
    let i = numToShow;

    if (sliderData.length === 0) {
      let divContaint = $("<h2>").addClass("text").text("No Data");
      divContianer.append(divContaint);
      buttom_more.hide();
    }

    $.each(sliderData.reverse().slice(0, numToShow), function (i, item) {
      let divContaint = $("<li>").addClass("card");
      let filename = $("<video/>")
        .addClass("video")
        .attr("src", `../upload/videos/videos_width/${item}`)
        .attr("preload", "metadata");
      divContianer.append(divContaint);
      divContaint.append(filename);
    });

    showRight.click(() => {
      let cardWidth = $(".card").width();
      let cardWidthFinal = cardWidth + 8;
      let scrollDuration = 500;

      var leftPos = $("#gallery_linear").scrollLeft();
      $("#gallery_linear").animate(
        { scrollLeft: leftPos + cardWidthFinal },
        scrollDuration
      );

      $.each(sliderData.slice(i, i + numToShow), function (i, item) {
        let divContaint = $("<li>").addClass("card");
        let filename = $("<video>")
          .addClass("video")
          .attr("src", `../upload/videos/videos_width/${item}`)
          .attr("preload", "metadata");

        divContianer.append(divContaint);
        divContaint.append(filename);
      });
      i += numToShow;
    });

    showLeft.on("click", () => {
      let cardWidth = $(".card").width();
      let cardWidthFinal = cardWidth + 8;
      let scrollDuration = 500;

      var leftPos = $("#gallery_linear").scrollLeft();
      $("#gallery_linear").animate(
        { scrollLeft: leftPos - cardWidthFinal },
        scrollDuration
      );
    });

    divContianer.on("click", ".card", function () {
      const video = $(this).find(".video");
      const src = video.attr("src");
      fullScreen.css("display", "flex");
      videoPlay.attr("src", src);
      $(".download_click").attr("href", src);
      $(".play-pause-btn").click();
    });
  });
});
