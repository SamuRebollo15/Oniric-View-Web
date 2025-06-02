document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("../enviar.php", {
      method: "POST",
      body: formData,
    })
    .then(response => response.text())
    .then(data => {
      alert(data); // ✅ Aquí puedes cambiar esto por una animación o texto HTML si lo prefieres
      form.reset();
    })
    .catch(error => {
      alert("❌ Error al enviar el mensaje.");
      console.error("Error:", error);
    });
  });

  // Cursor personalizado
  const customCursor = document.getElementById('custom-cursor');
  const cursorText = document.getElementById('cursor-text');

  document.addEventListener('mousemove', function (e) {
    if (customCursor) {
      customCursor.style.top = e.clientY + 'px';
      customCursor.style.left = e.clientX + 'px';
    }
  });

  const menuItems = document.querySelectorAll('.menu_item');
  const colors = ['#fc9c24', '#cd1b7d', '#2a347c'];

  menuItems.forEach(item => {
    item.addEventListener('mouseover', () => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      item.style.setProperty('--hover-color', randomColor);
      if (customCursor) customCursor.style.borderColor = randomColor;
      if (cursorText) cursorText.style.opacity = 1;
    });
    item.addEventListener('mouseout', () => {
      if (customCursor) customCursor.style.borderColor = 'transparent';
      if (cursorText) cursorText.style.opacity = 0;
    });
  });

  // Video intro control (solo una vez por sesión)
  const introVideo = document.getElementById("intro-video");
  const introScreen = document.getElementById("video-intro");
  const header = document.querySelector("header");

  const videoAlreadyPlayed = sessionStorage.getItem("videoPlayed");
  if (!videoAlreadyPlayed && introVideo) {
    introVideo.playbackRate = 4;
    introVideo.onended = function () {
      introScreen.classList.add("fade-out");
      header.classList.add("animated");
      sessionStorage.setItem("videoPlayed", "true");
      setTimeout(() => {
        introScreen.style.display = "none";
      }, 1000);
    };
  } else {
    introScreen.style.display = "none";
    header.classList.add("animated");
  }
});
