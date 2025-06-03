let tracks = [];
let currentTrack = 0;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const titleEl = document.getElementById("title");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const tracklist = document.querySelector(".tracklist");

function loadTrack(index) {
  const track = tracks[index];
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
audio.addEventListener("timeupdate", () => {
  progress.value = audio.currentTime;
});
progress.addEventListener("input", () => {
  audio.currentTime = progress.value;
});

// Отображаем треклист
function renderTracklist() {
  tracklist.innerHTML = "";
  tracks.forEach((track, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${track.title}</strong> (${track.duration})
      <button class="buy-btn" data-type="lease">Buy Lease</button>
      <button class="buy-btn" data-type="exclusive">Buy Exclusive</button>
    `;
    li.addEventListener("click", () => {
      currentTrack = index;
      loadTrack(index);
      audio.play();
    });
    tracklist.appendChild(li);
  });

  document.querySelectorAll(".buy-btn").forEach(button => {
    button.addEventListener("click", e => {
      e.stopPropagation(); // Чтобы не запускался трек
      const type = button.dataset.type;
      const trackTitle = button.closest("li").querySelector("strong").textContent;
      alert(`You selected "${trackTitle}" – ${type} license`);
      // Здесь можно вставить логику оплаты или редиректа
    });
  });
}
