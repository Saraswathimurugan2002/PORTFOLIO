// app.js
document.addEventListener("DOMContentLoaded", function () {
  // ---------- NAV TOGGLE ----------
  const menu = document.getElementById("navMenu");
  const hamburger = document.querySelector(".hamburger");

  if (!menu) {
    console.error("navMenu element not found (check id='navMenu').");
  }
  if (!hamburger) {
    console.error("hamburger element not found (check class='hamburger').");
  }

  // Expose toggleMenu so your inline onclick still works
  window.toggleMenu = function () {
    menu.classList.toggle("open"); // match .nav-menu.open in CSS
  };

  // Close menu when scrolling
  window.addEventListener("scroll", function () {
    menu.classList.remove("open");
  });

  // Close when clicking outside nav
  document.addEventListener("click", function (e) {
    const isClickInside = menu.contains(e.target) || (hamburger && hamburger.contains(e.target));
    if (!isClickInside) menu.classList.remove("open");
  });

  // ---------- PIE CHART ----------
  if (typeof Chart === "undefined") {
    console.error("Chart.js is not loaded. Ensure chart.js CDN is placed before app.js");
    return;
  }

  const canvas = document.getElementById("skillPie");
  if (!canvas) {
    console.warn("Canvas #skillPie not found — pie chart will not render.");
    return;
  }

  // ensure canvas has explicit pixel size for Chart to render reliably
  canvas.style.width = "260px";
  canvas.style.height = "260px";

  const data = {
    labels: ["Adaptability", "Time Management", "Team Collaboration", "Administrative Support"],
    datasets: [{
      data: [25, 25, 30, 20],
      backgroundColor: ["#3c31d8", "#df23b3", "#ebe01c", "#f97e20"],
      hoverOffset: 6
    }]
  };

  const config = {
    type: "pie",
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || "";
              const value = context.raw || 0;
              return `${label}: ${value}`;
            }
          }
        }
      }
    }
  };

  try {
    new Chart(canvas, config);
  } catch (err) {
    console.error("Error creating Chart:", err);
  }
});

