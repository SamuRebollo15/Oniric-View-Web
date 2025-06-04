document.addEventListener("DOMContentLoaded", function () {
  const colors = ["#fc9c24", "#cd1b7d", "#2a347c"];
  const menuItems = document.querySelectorAll(".menu_item");
  const customCursor = document.getElementById("custom-cursor");
  const cursorText = document.getElementById("cursor-text");
  const header = document.querySelector("header");

  const introVideo = document.getElementById("intro-video");
  const introScreen = document.getElementById("video-intro");

  // Mostrar video solo una vez por sesión
  const videoAlreadyPlayed = sessionStorage.getItem("videoPlayed");
  if (!videoAlreadyPlayed) {
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

  // Cursor personalizado
  document.addEventListener("mousemove", function (e) {
    customCursor.style.top = e.clientY + "px";
    customCursor.style.left = e.clientX + "px";
  });

  menuItems.forEach((item) => {
    item.addEventListener("mouseover", () => {
      const currentColor =
        item.style.getPropertyValue("--hover-color") || colors[0];
      const availableColors = colors.filter((c) => c !== currentColor);
      const randomColor =
        availableColors[Math.floor(Math.random() * availableColors.length)];
      item.style.setProperty("--hover-color", randomColor);
      customCursor.style.borderColor = randomColor;
      cursorText.style.opacity = 1;
    });
    item.addEventListener("mouseout", () => {
      customCursor.style.borderColor = "transparent";
      cursorText.style.opacity = 0;
    });
  });

  // Aparecer al hacer scroll (animación-scroll)
  const elementosAnimados = document.querySelectorAll(".animacion-scroll");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  elementosAnimados.forEach((el) => observer.observe(el));

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
