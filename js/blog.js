document.addEventListener("DOMContentLoaded", function () {
  const colors = ['#fc9c24', '#cd1b7d', '#2a347c'];
  const menuItems = document.querySelectorAll('.menu_item');
  const customCursor = document.getElementById('custom-cursor');
  const cursorText = document.getElementById('cursor-text');
  const header = document.querySelector('header');
  const introVideo = document.getElementById('intro-video');
  const introScreen = document.getElementById('video-intro');

  // Intro solo una vez por sesión
  const videoAlreadyPlayed = sessionStorage.getItem('videoPlayed');
  if (!videoAlreadyPlayed && introVideo) {
    introVideo.playbackRate = 4;
    introVideo.onended = function () {
      introScreen.classList.add('fade-out');
      header.classList.add('animated');
      sessionStorage.setItem('videoPlayed', 'true');
      setTimeout(() => {
        introScreen.style.display = 'none';
      }, 1000);
    };
  } else {
    if (introScreen) introScreen.style.display = 'none';
    header.classList.add('animated');
  }

  // Cursor personalizado
  document.addEventListener('mousemove', function (e) {
    if (customCursor) {
      customCursor.style.top = e.clientY + 'px';
      customCursor.style.left = e.clientX + 'px';
    }
  });

  menuItems.forEach(item => {
    item.addEventListener('mouseover', () => {
      const currentColor = item.style.getPropertyValue('--hover-color') || colors[0];
      const availableColors = colors.filter(c => c !== currentColor);
      const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
      item.style.setProperty('--hover-color', randomColor);
      if (customCursor) customCursor.style.borderColor = randomColor;
      if (cursorText) cursorText.style.opacity = 1;
    });

    item.addEventListener('mouseout', () => {
      if (customCursor) customCursor.style.borderColor = 'transparent';
      if (cursorText) cursorText.style.opacity = 0;
    });
  });

  // Animaciones en bloques al hacer scroll
  const contentBlocks = document.querySelectorAll('.content_container');
  const blogEntries = document.querySelectorAll('.blog-entry');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 });

  function applyAnimationAndHoverEffect(blocks) {
    blocks.forEach(block => {
      observer.observe(block);

      block.addEventListener('mouseenter', () => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        block.style.boxShadow = `0 0 0 4px ${color}`;
        block.style.transform = 'translateY(-10px)';
      });

      block.addEventListener('mouseleave', () => {
        block.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
        block.style.transform = 'translateY(0)';
      });
    });
  }

  applyAnimationAndHoverEffect(contentBlocks);
  applyAnimationAndHoverEffect(blogEntries);

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
