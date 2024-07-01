document.addEventListener("DOMContentLoaded", function() {
    const bigTextElements = document.querySelectorAll(".element_vakansii");
  
    function handleScroll() {
      bigTextElements.forEach(element => {
        if (!element.classList.contains("visible_vakansii",) && isElementInViewport(element)) {
          element.classList.add("visible_vakansii");
        }
      });
    }
  
    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  
    window.addEventListener('scroll', handleScroll);
  });
  