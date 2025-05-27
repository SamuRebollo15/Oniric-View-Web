document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll('.menu_item');
  const contentBlocks = document.querySelectorAll('.content_container');
  const customCursor = document.getElementById('custom-cursor');
  const cursorText = document.getElementById('cursor-text');
  const header = document.querySelector('header');
  const introVideo = document.getElementById('intro-video');
  const introScreen = document.getElementById('video-intro');

  const videoAlreadyPlayed = sessionStorage.getItem('videoPlayed');

  // Reproducción del video de introducción
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
    introScreen.style.display = 'none';
    header.classList.add('animated');
  }

  // Cursor personalizado
  document.addEventListener('mousemove', function (e) {
    customCursor.style.top = e.clientY + 'px';
    customCursor.style.left = e.clientX + 'px';
  });

  // Hover en menú (colores aleatorios siguen aquí si deseas)
  const hoverColors = ['#fc9c24', '#cd1b7d', '#2a347c'];
  menuItems.forEach(item => {
    item.addEventListener('mouseover', () => {
      const currentColor = item.style.getPropertyValue('--hover-color');
      const filtered = hoverColors.filter(c => c !== currentColor);
      const newColor = filtered[Math.floor(Math.random() * filtered.length)];
      item.style.setProperty('--hover-color', newColor);
      customCursor.style.borderColor = newColor;
      cursorText.style.opacity = 1;
    });

    item.addEventListener('mouseout', () => {
      customCursor.style.borderColor = 'transparent';
      cursorText.style.opacity = 0;
    });
  });

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  }, { threshold: 0.5 });

  contentBlocks.forEach(block => {
    observer.observe(block);

    // Hover color fijo según categoría
    block.addEventListener('mouseenter', () => {
      let color = '#fc9c24'; // por defecto: formación

      if (block.classList.contains('software')) {
        color = '#2a347c';
      } else if (block.classList.contains('multimedia')) {
        color = '#cd1b7d';
      } else if (block.classList.contains('formacion')) {
        color = '#fc9c24';
      }

      block.style.boxShadow = `0 0 0 4px ${color}`;
      block.style.transform = 'translateY(-10px)';
    });

    block.addEventListener('mouseleave', () => {
      block.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
      block.style.transform = 'translateY(0)';
    });
  });

  // Scroll lateral infinito
  const scrollers = document.querySelectorAll(".scroller");
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    scrollers.forEach(scroller => {
      scroller.setAttribute("data-animated", true);
      const scrollerInner = scroller.querySelector(".scroller__inner");
      const scrollerContent = Array.from(scrollerInner.children);
      scrollerContent.forEach(item => {
        const duplicated = item.cloneNode(true);
        duplicated.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicated);
      });
    });
  }
});
