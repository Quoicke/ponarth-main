const hoverText = document.getElementById("hoverText");

      hoverText.addEventListener("mouseenter", function () {
        hoverText.classList.add("hovered");
      });

      hoverText.addEventListener("mouseleave", function () {
        hoverText.classList.remove("hovered");
      });