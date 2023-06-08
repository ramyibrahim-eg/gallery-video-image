$(document).ready(function () {
  const videoElement = $(".videoPlay")[0];
  let play_ads = $(".play_ads");
  let countdown = $(".skip_ads");
  let button = $(".pause_ads");
  let text_skip = $(".text_skip");
  const progressValue = $("#progress-value");
  const video_ads = $(".video_ads")[0];
  const videoAds = $(".video_ads");
  let count = 10;
  let newCount = count;
  let timesADS = 1000 * 10;

  countdown.text(count);

  button.prop("disabled", true);

  const handelTimer = () => {
    let timer = setInterval(() => {
      count--;
      if (count >= 0) {
        const progressPercent = ((10 - count) / 10) * 100;
        progressValue.css("width", `${progressPercent}%`);
        countdown.text(count);
      } else {
        clearInterval(timer);
        button.prop("disabled", false);
        text_skip.text("Skip ADS");
        countdown.text("");
      }
      if (play_ads.is(":hidden")) {
        clearInterval(timer);
        count = newCount;
        countdown.text(count);
        progressValue.css("width", "0%");
        videoAds.attr("src", "");
        text_skip.text("Waiting...");
      }
    }, 1000);
  };

  setInterval(() => {
    if (videoElement && videoElement.duration) {
      if (play_ads.is(":hidden")) {
        play_ads.css("display", "flex");
        video.pause();
        countdown.text(count);
        handelTimer();
        count = newCount;
        countdown.text(count);
        progressValue.css("width", "0%");
        text_skip.text("Waiting...");
        $.getJSON("../js/videoAds.json", (data) => {
          const randomIndex = Math.floor(Math.random() * data.videos.length);
          const randomVideo = data.videos[randomIndex].url;
          videoAds.attr("src", randomVideo);
          video_ads.load();
          video_ads.play();
        });
      }
    }
  }, timesADS);

  button.on("click", () => {
    play_ads.css("display", "none");
    video.play();
    button.prop("disabled", true);
    count = newCount;
    countdown.text(count);
    videoAds.attr("src", "");
    text_skip.text("Waiting...");
  });
});
