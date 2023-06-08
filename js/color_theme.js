///////////////////color_theme/////////////////////
const dark_theme = document.querySelector(".dark_theme");
const light_theme = document.querySelector(".light_theme");

dark_theme.addEventListener("click", () => {
  let changeBackground = "0.08%";
  let changeColor = "100%";

  document.documentElement.style.setProperty(
    "--change-background",
    changeBackground
  );
  document.documentElement.style.setProperty("--change-color", changeColor);
  dark_theme.style.display = "none";
  light_theme.style.display = "inline-block";

  localStorage.setItem("darkBackground", changeBackground);
  localStorage.setItem("darkColor", changeColor);
});

light_theme.addEventListener("click", () => {
  let changeBackground = "100%";
  let changeColor = "0.08%";

  document.documentElement.style.setProperty(
    "--change-background",
    changeBackground
  );
  document.documentElement.style.setProperty("--change-color", changeColor);

  light_theme.style.display = "none";
  dark_theme.style.display = "inline-block";

  localStorage.setItem("darkBackground", changeBackground);
  localStorage.setItem("darkColor", changeColor);
});

document.documentElement.style.setProperty(
  "--change-background",
  localStorage.getItem("darkBackground")
);

document.documentElement.style.setProperty(
  "--change-color",
  localStorage.getItem("darkColor")
);

if (localStorage.getItem("darkBackground") === "100%") {
  light_theme.style.display = "none";
  dark_theme.style.display = "inline-block";
}
if (localStorage.getItem("darkBackground") === "0.08%") {
  light_theme.style.display = "inline-block";
  dark_theme.style.display = "none";
}
