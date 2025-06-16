document.addEventListener("DOMContentLoaded", () => {
 

  // Cursor personalizado
  const customCursor = document.getElementById("custom-cursor");
  const cursorText = document.getElementById("cursor-text");

  document.addEventListener("mousemove", function (e) {
    if (customCursor) {
      customCursor.style.top = e.clientY + "px";
      customCursor.style.left = e.clientX + "px";
    }
  });

  const menuItems = document.querySelectorAll(".menu_item");
  const colors = ["#fc9c24", "#cd1b7d", "#2a347c"];

  menuItems.forEach((item) => {
    item.addEventListener("mouseover", () => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      item.style.setProperty("--hover-color", randomColor);
      if (customCursor) customCursor.style.borderColor = randomColor;
      if (cursorText) cursorText.style.opacity = 1;
    });
    item.addEventListener("mouseout", () => {
      if (customCursor) customCursor.style.borderColor = "transparent";
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
  // Menú móvil flotante
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeBtn = document.getElementById("close-menu");

  menuBtn?.addEventListener("click", () => {
    mobileMenu?.classList.add("active");

    // Reiniciar animaciones para los enlaces del menú
    const links = mobileMenu?.querySelectorAll("a");
    links?.forEach((link) => {
      link.style.animation = "none";
      link.offsetHeight; // Forzar reflujo
      link.style.animation = "";
    });
  });

  closeBtn?.addEventListener("click", () => {
    mobileMenu?.classList.remove("active");
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  });
});
