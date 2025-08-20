function loadPage(page) {
  fetch(`/pages/${page}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById("pageContent").innerHTML = html;
      document.querySelectorAll(".sidebar ul li").forEach(li => li.classList.remove("active"));
      document.querySelector(`.sidebar ul li[data-page="${page}"]`).classList.add("active");
      if(page === "home") loadDashboard();
    })
    .catch(err => console.error("Erreur chargement page :", err));
}

// Dashboard dynamique
function loadDashboard() {
  fetch("/api/report")
    .then(res => res.json())
    .then(data => {
      document.getElementById("totalMembers").textContent = data.totalMembers || 0;
      document.getElementById("membersPaid").textContent = data.membersPaid || 0;
      document.getElementById("totalFC").textContent = data.totalFC || 0;
      document.getElementById("totalUSD").textContent = data.totalUSD || 0;
    })
    .catch(err => console.error("Erreur chargement dashboard :", err));
}

// Charger page d'accueil au démarrage
loadPage("home");

// Gestion clic menu
document.querySelectorAll(".sidebar ul li").forEach(li => {
  li.addEventListener("click", () => loadPage(li.dataset.page));
});
