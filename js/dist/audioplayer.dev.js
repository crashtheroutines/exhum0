"use strict";

var tracks = [];
var currentTrack = 0;
var audio = document.getElementById("audio");
var playBtn = document.getElementById("play");
var nextBtn = document.getElementById("next");
var prevBtn = document.getElementById("prev");
var titleEl = document.getElementById("title");
var durationEl = document.getElementById("duration");
var progress = document.getElementById("progress");
var tracklist = document.querySelector(".tracklist");

function loadTrack(index) {
  var track = tracks[index];
  titleEl.textContent = track.title;
  durationEl.textContent = track.duration;
  audio.src = track.file;
  audio.load();
}

function playPause() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  audio.play();
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
  audio.play();
}

playBtn.addEventListener("click", playPause);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);
audio.addEventListener("timeupdate", function () {
  progress.value = audio.currentTime;
});
progress.addEventListener("input", function () {
  audio.currentTime = progress.value;
}); // Отображаем треклист

function renderTracklist() {
  tracklist.innerHTML = "";
  tracks.forEach(function (track, index) {
    var li = document.createElement("li");
    li.innerHTML = "\n      <strong>".concat(track.title, "</strong> (").concat(track.duration, ")\n      <button class=\"buy-btn\" data-type=\"lease\">Buy Lease</button>\n      <button class=\"buy-btn\" data-type=\"exclusive\">Buy Exclusive</button>\n    ");
    li.addEventListener("click", function () {
      currentTrack = index;
      loadTrack(index);
      audio.play();
    });
    tracklist.appendChild(li);
  });
  document.querySelectorAll(".buy-btn").forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.stopPropagation(); // Чтобы не запускался трек

      var type = button.dataset.type;
      var trackTitle = button.closest("li").querySelector("strong").textContent;
      alert("You selected \"".concat(trackTitle, "\" \u2013 ").concat(type, " license")); // Здесь можно вставить логику оплаты или редиректа
    });
  });
}