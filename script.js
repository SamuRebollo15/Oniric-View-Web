document.addEventListener("DOMContentLoaded", function () {
  const colors = ['#fc9c24', '#cd1b7d', '#2a347c'];
  const menuItems = document.querySelectorAll('.menu_item');
  const contentBlocks = document.querySelectorAll('.content_container');
  const customCursor = document.getElementById('custom-cursor');
  const cursorText = document.getElementById('cursor-text');

  const introVideo = document.getElementById('intro-video');
  const introScreen = document.getElementById('video-intro');
  const header = document.querySelector('header');

  introVideo.playbackRate = 4;

  introVideo.onended = function () {
    introScreen.classList.add('fade-out');
    header.classList.add('animated');
    setTimeout(() => {
      introScreen.style.display = 'none';
    }, 1000);
  };

  document.addEventListener('mousemove', function (e) {
    customCursor.style.top = e.clientY + 'px';
    customCursor.style.left = e.clientX + 'px';
  });

  menuItems.forEach(item => {
    item.addEventListener('mouseover', () => {
      let currentColor = item.style.getPropertyValue('--hover-color');
      if (!colors.includes(currentColor)) currentColor = null;

      const availableColors = colors.filter(color => color !== currentColor);
      const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)] || colors[0];

      item.style.setProperty('--hover-color', randomColor);
      customCursor.style.borderColor = randomColor;
      cursorText.style.opacity = 1;
    });

    item.addEventListener('mouseout', () => {
      customCursor.style.borderColor = 'transparent';
      cursorText.style.opacity = 0;
    });
  });

  contentBlocks.forEach(block => {
    block.addEventListener('mouseover', () => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      block.style.boxShadow = `0 0 0 4px ${randomColor}`;
      block.style.transform = 'translateY(-10px)';
    });

    block.addEventListener('mouseout', () => {
      block.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)';
      block.style.transform = 'translateY(0)';
    });
  });

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
  });

  // Scroll lateral infinito
  const scrollers = document.querySelectorAll(".scroller");

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    scrollers.forEach((scroller) => {
      scroller.setAttribute("data-animated", true);

      const scrollerInner = scroller.querySelector(".scroller__inner");
      const scrollerContent = Array.from(scrollerInner.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }
});
