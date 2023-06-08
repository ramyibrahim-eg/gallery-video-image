$(document).ready(function () {
  $.get("../php/video/videos_height.php", function (data) {
    let numToShow = 8;
    let divContianer = $("#gallery");
    let showMore = $("#show_more");
    let loader = $(".loader");
    let close = $(".close");
    let fullScreen = $(".full_screen");
    let videoPlay = $(".videoPlay");
    let containers = $(".containers");
    let i = numToShow;
    let play_ads = $(".play_ads");

    if (data.length === 0) {
      let divContaint = $("<h2>").addClass("text").text("No Data");
      divContianer.append(divContaint);
      showMore.hide();
    }

    if (i >= data.length) {
      showMore.hide();
    }

    $.each(data.reverse().slice(0, numToShow), function (i, item) {
      let divContaint = $("<div>").addClass("content");
      let filename = $("<video/>")
        .addClass("video")
        .attr("src", `../upload/videos/videos_height/${item}`)
        .attr("preload", "metadata");
      divContianer.append(divContaint);
      divContaint.append(filename);
    });

    showMore.click(function () {
      setTimeout(() => {
        $.each(data.slice(i, i + numToShow), function (i, item) {
          let divContaint = $("<div>").addClass("content");
          let filename = $("<video>")
            .addClass("video")
            .attr("src", `../upload/videos/videos_height/${item}`)
            .attr("preload", "metadata");

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
        if (i >= data.length) {
          showMore.hide();
        }
      }, 2000);
    });

    $("#gallery").on("click", ".content", function () {
      const video = $(this).find(".video");
      const src = video.attr("src");
      fullScreen.css("display", "flex");
      videoPlay.attr("src", src);
      $(".download_click").attr("href", src);
      $(".play-pause-btn").click();
    });

    close.click(() => {
      fullScreen.css("display", "none");
      videoPlay.attr("src", "");
      $(".video-container").removeClass("active");
      play_ads.css("display", "none");
    });

    fullScreen.click(() => {
      fullScreen.css("display", "none");
      videoPlay.attr("src", "");
      $(".video-container").removeClass("active");
      play_ads.css("display", "none");
    });

    $(".mini-player-btn").click(() => {
      fullScreen.css("display", "none");
    });

    containers.click(function (e) {
      e.stopPropagation();
    });
  });
});

/////////////////Video_Player/////////////////////
const playPauseBtn = document.querySelector(".play-pause-btn");
const fullScreenBtn = document.querySelector(".full-screen-btn");
const miniPlayerBtn = document.querySelector(".mini-player-btn");
const muteBtn = document.querySelector(".mute-btn");
const speedBtn = document.querySelector(".speed-btn");
const currentTimeElem = document.querySelector(".current-time");
const totalTimeElem = document.querySelector(".total-time");
const volumeSlider = document.querySelector(".volume-slider");
const videoContainer = document.querySelector(".video-container");
const timelineContainer = document.querySelector(".timeline-container");
const video = document.querySelector(".videoPlay");
const fullscreen = document.querySelector(".full_screen");

document.addEventListener("keydown", (e) => {
  const tagName = document.activeElement.tagName.toLowerCase();

  if (tagName === "input") return;

  switch (e.key.toLowerCase()) {
    case " ":
      if (tagName === "button") return;
    case "k":
      togglePlay();
      break;
    case "i":
      toggleMiniPlayerMode();
      break;
    case "m":
      toggleMute();
      break;
    case "arrowleft":
    case "j":
      skip(-5);
      break;
    case "arrowright":
    case "l":
      skip(5);
      break;
    case "c":
      toggleCaptions();
      break;
  }
});

// Timeline
timelineContainer.addEventListener("mousemove", handleTimelineUpdate);
timelineContainer.addEventListener("mousedown", toggleScrubbing);
document.addEventListener("mouseup", (e) => {
  if (isScrubbing) toggleScrubbing(e);
});
document.addEventListener("mousemove", (e) => {
  if (isScrubbing) handleTimelineUpdate(e);
});

let isScrubbing = false;
let wasPaused;
function toggleScrubbing(e) {
  const rect = timelineContainer.getBoundingClientRect();
  const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
  isScrubbing = (e.buttons & 1) === 1;
  videoContainer.classList.toggle("scrubbing", isScrubbing);
  if (isScrubbing) {
    wasPaused = video.paused;
    video.pause();
  } else {
    video.currentTime = percent * video.duration;
    if (!wasPaused) video.play();
  }

  handleTimelineUpdate(e);
}

function handleTimelineUpdate(e) {
  const rect = timelineContainer.getBoundingClientRect();
  const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
  timelineContainer.style.setProperty("--preview-position", percent);
}

// Playback Speed
speedBtn.addEventListener("click", changePlaybackSpeed);

function changePlaybackSpeed() {
  let newPlaybackRate = video.playbackRate + 0.25;
  if (newPlaybackRate > 2) newPlaybackRate = 0.25;
  video.playbackRate = newPlaybackRate;
  speedBtn.textContent = `${newPlaybackRate}x`;
}

// Duration
video.addEventListener("loadeddata", () => {
  totalTimeElem.textContent = formatDuration(video.duration);
});

video.addEventListener("timeupdate", () => {
  currentTimeElem.textContent = formatDuration(video.currentTime);
  const percent = video.currentTime / video.duration;
  timelineContainer.style.setProperty("--progress-position", percent);
});

const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});
function formatDuration(time) {
  const seconds = Math.floor(time % 60);
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);
  if (hours === 0) {
    return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
  } else {
    return `${hours}:${leadingZeroFormatter.format(
      minutes
    )}:${leadingZeroFormatter.format(seconds)}`;
  }
}

function skip(duration) {
  video.currentTime += duration;
}

// Volume
muteBtn.addEventListener("click", toggleMute);
volumeSlider.addEventListener("input", (e) => {
  video.volume = e.target.value;
  video.muted = e.target.value === 0;
});

function toggleMute() {
  video.muted = !video.muted;
}

video.addEventListener("volumechange", () => {
  volumeSlider.value = video.volume;
  let volumeLevel;
  if (video.muted || video.volume === 0) {
    volumeSlider.value = 0;
    volumeLevel = "muted";
  } else if (video.volume >= 0.5) {
    volumeLevel = "high";
  } else {
    volumeLevel = "low";
  }

  videoContainer.dataset.volumeLevel = volumeLevel;
});

// View Modes
fullScreenBtn.addEventListener("click", toggleFullScreenMode);
miniPlayerBtn.addEventListener("click", toggleMiniPlayerMode);

function toggleFullScreenMode() {
  if (document.fullscreenElement == null) {
    videoContainer.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function toggleMiniPlayerMode() {
  if (videoContainer.classList.contains("mini-player")) {
    document.exitPictureInPicture();
  } else {
    video.requestPictureInPicture();
  }
}

document.addEventListener("fullscreenchange", () => {
  videoContainer.classList.toggle("full-screen", document.fullscreenElement);
});

video.addEventListener("enterpictureinpicture", () => {
  videoContainer.classList.add("mini-player");
});

video.addEventListener("leavepictureinpicture", () => {
  videoContainer.classList.remove("mini-player");
  fullscreen.style.display = "flex";
  videoContainer.classList.add("active");
});

// Play/Pause
playPauseBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);

function togglePlay() {
  video.paused ? video.play() : video.pause();
}

video.addEventListener("play", () => {
  videoContainer.classList.remove("paused");
  videoContainer.classList.toggle("active");
});

video.addEventListener("pause", () => {
  videoContainer.classList.add("paused");
  videoContainer.classList.toggle("active");
});
