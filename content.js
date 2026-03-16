const subtitle = document.createElement("div");

subtitle.style.position = "fixed";
subtitle.style.bottom = "10%";
subtitle.style.left = "50%";
subtitle.style.transform = "translateX(-50%)";
subtitle.style.background = "rgba(0,0,0,0.7)";
subtitle.style.color = "white";
subtitle.style.padding = "10px";
subtitle.style.fontSize = "20px";
subtitle.style.zIndex = "999999";

subtitle.innerText = "Subtitles will appear here";

document.body.appendChild(subtitle);