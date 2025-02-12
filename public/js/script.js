// Example starter JavaScript for disabling form submissions if there are invalid fields
() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
};

let taxSwitch = document.getElementById("flexSwitchCheckDefault");
taxSwitch.addEventListener("click", () => {
  let taxInfo = document.getElementsByClassName("tax-info");
  for (info of taxInfo) {
    if (info.style.display !== "inline") {
      info.style.display = "inline";
    } else {
      info.style.display = "none";
    }
  }
});

let icons = document.querySelectorAll("#filters .filter i");
for (let icon of icons) {
  icon.addEventListener("click", (event) => {
    event.preventDefault();
    const name = icon.getAttribute("data-name");
    let parentAnchor = icon.closest("a");
    parentAnchor.href = `/listings/category/${name}`;
    window.location.href = parentAnchor.href;
  });
}

function updateAction() {
  const input = document.getElementById("countryName").value;
  const form = document.getElementById("searchForm");
  form.action = `/listings/country/${encodeURIComponent(input)}`;
}

function openSlideMenu() {
  document.getElementById("slideMenu").style.width = "250px";
}

function closeSlideMenu() {
  document.getElementById("slideMenu").style.width = "0";
}
document
  .querySelector(".navbar-toggler")
  .addEventListener("click", openSlideMenu);

document.addEventListener("DOMContentLoaded", function () {
  const filters = document.getElementById("filters");
  let isDown = false;
  let startX;
  let scrollLeft;

  filters.addEventListener("mousedown", (e) => {
    isDown = true;
    filters.classList.add("active");
    startX = e.pageX - filters.offsetLeft;
    scrollLeft = filters.scrollLeft;
  });

  filters.addEventListener("mouseleave", () => {
    isDown = false;
    filters.classList.remove("active");
  });

  filters.addEventListener("mouseup", () => {
    isDown = false;
    filters.classList.remove("active");
  });

  filters.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - filters.offsetLeft;
    const walk = (x - startX) * 2; // Multiply to increase scroll speed
    filters.scrollLeft = scrollLeft - walk;
  });

  // Enable touch scrolling
  filters.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    scrollLeft = filters.scrollLeft;
  });

  filters.addEventListener("touchmove", (e) => {
    const x = e.touches[0].clientX;
    const walk = (x - startX) * 2;
    filters.scrollLeft = scrollLeft - walk;
  });
});
