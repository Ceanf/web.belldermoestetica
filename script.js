window.addEventListener("scroll", () => {
      const header = document.querySelector(".header-contenido");
      if (window.scrollY > 50) {
        header.style.backgroundColor = "#08306b";
        header.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.2)";
      } else {
        header.style.backgroundColor = "#0d47a1";
        header.style.boxShadow = "none";
      }
    });

    document.querySelectorAll(".cta-button, .filtro, .menu li a").forEach(btn => {
      btn.addEventListener("mouseover", () => {
        btn.style.transform = "scale(1.05)";
        btn.style.transition = "all 0.2s ease";
      });
      btn.addEventListener("mouseout", () => {
        btn.style.transform = "scale(1)";
      });
    });
    
