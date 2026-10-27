function toggleMenu() {
  document.body.classList.toggle("menu-open");
}

const cookieModal = document.querySelector("#cookieModal");
const cookieForm = document.querySelector("#cookieForm");
const webringCheckbox = document.querySelector("#webringCheckbox");

// De opgeslagen voorkeur ophalen
const savedPreference = localStorage.getItem("webring");

if (savedPreference === "true") {
  webringCheckbox.checked = true;
  loadWebring();
}

// De webring alleen laden als de gebruiker toestemming geeft
function loadWebring() {
  if (document.querySelector("#webringScript")) {
    return;
  }

  const script = document.createElement("script");

  script.id = "webringScript";
  script.src = "https://digitaaltuintje.nl/webring.js";
  script.dataset.page = "https://Tharanika.nl";

  document.head.appendChild(script);
}

// De keuze opslaan
cookieForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const action = event.submitter.value;

  if (action === "save") {
    const accepted = webringCheckbox.checked;

    localStorage.setItem("webring", accepted);

    if (accepted) {
      loadWebring();
    }
  }

  if (action === "reject") {
    localStorage.setItem("webring", false);
    webringCheckbox.checked = false;
  }

  cookieModal.close();
});
