(function (win, $) {
  let spotSection = document.querySelector(".js-spot-section");
  let spotTitle = document.querySelector(".js-spot-title");
  let spotSectionHeight = getInnerHeight(spotSection);
  let animate = new AnimateCustom();

  let commonSection = document.querySelectorAll(".js-common-section");
  let headerHeight = getInnerHeight(document.querySelector(".js-header"));

  function getInnerHeight(elm) {
    var computed = getComputedStyle(elm),
      padding = parseInt(computed.paddingTop) + parseInt(computed.paddingBottom);

    return elm.clientHeight - padding;
  }

  function isElementInViewport(el, plus) {
    if (!plus) {
      plus = 0;
    }
    // Special bonus for those using jQuery

    let rect = el.getBoundingClientRect();
    return rect.top - plus - 3 <= 0 && rect.bottom - plus - 2 >= 0;
  }

  let smoothScroll = animate.useSmoothScroll({
    duration: 0.5,
    ease: animate.defaultEasing.Power2.easeOut,
    onScrolling: (current) => {
      if (isElementInViewport(spotSection, headerHeight)) {
        let percent = current / spotSectionHeight;
        spotSection.style.backgroundPosition = ` center calc(${spotSectionHeight}px * ${percent})`;
        spotTitle.style.transform = `translate(0px,  ${100 * percent}%) `;
      }
      for (let i = 0; i < commonSection.length; i++) {
        const element = commonSection[i];
        if (isElementInViewport(element, headerHeight)) {
          let imageWrapComponents = element.querySelectorAll(".js-image-wrap");
          imageWrapComponents.forEach((item) => {
            item.classList.add("is-active");
          });
        }
      }
    },
  });
})();
