let currentSongIndex = 0;
let isPlaying = false;
let audio = new Audio();
let songs = [
  {
    title: "3x5",
    artist: "John Mayer",
    src: "music/3x5.mp3",
  },
  {
    title: "Tennessee Whiskey",
    artist: "Chris Stapleton",
    src: "music/tennessee-whiskey.mp3",
  },
  {
    title: "Hands Cover Bruise",
    artist: "Trent Reznor and Atticus Ross",
    src: "music/hcb.mp3",
  },
  {
    title: "The Eye",
    artist: "Brandi Carlile",
    src: "music/the-eye.mp3",
  },
  {
    title: "Take Me Out",
    artist: "Franz Ferdinand",
    src: "music/take-me-out.mp3",
  },
];

// Initialize player
function initializePlayer() {
  loadSong(currentSongIndex);
  audio.volume = 0.5;
  audio.addEventListener("timeupdate", updateProgress);
  audio.addEventListener("ended", nextSong);
  updateSongInfo();
}

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  updateSongInfo();
}

function updateSongInfo() {
  const song = songs[currentSongIndex];
  document.querySelector(".song-title").textContent = song.title;
  document.querySelector(".song-artist").textContent = song.artist;
}

function togglePlayPause() {
  const playBtn = document.querySelector(".play-btn");

  if (isPlaying) {
    audio.pause();
    playBtn.textContent = "▶";
    isPlaying = false;
  } else {
    audio.play().catch((e) => {
      console.log("Playback failed:", e);
      alert("Unable to play audio. Please check if the audio file exists.");
    });
    playBtn.textContent = "⏸";
    isPlaying = true;
  }
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);

  if (isPlaying) {
    audio.play().catch((e) => console.log("Playback failed:", e));
  }
}

function previousSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);

  if (isPlaying) {
    audio.play().catch((e) => console.log("Playback failed:", e));
  }
}

function updateProgress() {
  const progressBar = document.querySelector(".progress-bar");
  if (audio.duration) {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + "%";
  }
}

function setProgress(e) {
  const progressContainer = document.querySelector(".progress-container");
  const clickX = e.offsetX;
  const width = progressContainer.offsetWidth;
  const duration = audio.duration;

  if (duration) {
    audio.currentTime = (clickX / width) * duration;
  }
}

function setVolume(value) {
  audio.volume = value / 100;
}

document.addEventListener("DOMContentLoaded", function () {
  const cursor = document.querySelector(".cursor");
  const navbar = document.getElementById("nav-bar");

  document.addEventListener("mousemove", function (e) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  const clickableElements = document.querySelectorAll(
    "a, button, [onclick], .progress-container, .volume-slider"
  );

  clickableElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      cursor.classList.add("hover");
    });

    element.addEventListener("mouseleave", function () {
      cursor.classList.remove("hover");
    });
  });

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  initializePlayer();

  // Scroll progress bar
  function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.querySelector('.progress-bar-scroll').style.width = scrollPercent + '%';
  }

  window.addEventListener('scroll', updateScrollProgress);

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('#Projects, #Experience, #About, #Contact').forEach(section => {
    section.classList.add('fade-in-up');
    observer.observe(section);
  });
});
