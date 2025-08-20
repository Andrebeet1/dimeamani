// main.js
document.addEventListener('DOMContentLoaded', () => {
  const pageContent = document.getElementById('pageContent');
  const sidebarItems = document.querySelectorAll('.sidebar ul li');

  // --- Fonction pour charger une page ---
  function loadPage(page) {
    fetch(`/pages/${page}.html`)
      .then(res => {
        if (!res.ok) throw new Error('Page introuvable');
        return res.text();
      })
      .then(html => {
        pageContent.innerHTML = html;

        // Sidebar active
        sidebarItems.forEach(li => li.classList.remove('active'));
        const activeItem = document.querySelector(`.sidebar ul li[data-page="${page}"]`);
        if (activeItem) activeItem.classList.add('active');

        // Initialisation spécifique à la page
        if (window.initPage) window.initPage();
      })
      .catch(err => {
        pageContent.innerHTML = `<p style="color:red;">Erreur de chargement : ${err.message}</p>`;
        console.error(err);
      });
  }

  // --- Sidebar click ---
  sidebarItems.forEach(li => {
    li.addEventListener('click', () => loadPage(li.dataset.page));
  });

  // --- Page d'accueil par défaut ---
  loadPage('home');

  // --- Fonctions globales pour la liste des membres ---
  window.membersData = [];
  window.currentPageM = 1;
  const rowsPerPageM = 10;

  window.fetchMembersList = function() {
    fetch('/members/list')
      .then(res => res.json())
      .then(members => {
        window.membersData = members;
        displayMembers(filteredMembers(), window.currentPageM);
      });
  };

  function displayMembers(members, page = 1) {
    const tbody = document.querySelector('#membersTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const start = (page - 1) * rowsPerPageM;
    const end = start + rowsPerPageM;
    const pageMembers = members.slice(start, end);

    pageMembers.forEach(m => {
      tbody.innerHTML += `
        <tr>
          <td>${m.id}</td>
          <td>${m.nom}</td>
          <td>${m.postnom}</td>
          <td>${m.telephone}</td>
          <td>${m.adresse}</td>
          <td>${m.section}</td>
          <td>
            <button onclick="editMember(${m.id})">Modifier</button>
            <button onclick="deleteMember(${m.id})" style="background:#e74c3c;color:white;">Supprimer</button>
          </td>
        </tr>`;
    });

    renderPaginationMembers(members, page);
  }

  function renderPaginationMembers(members, page) {
    const totalPages = Math.ceil(members.length / rowsPerPageM);
    const paginationDiv = document.getElementById('paginationMembers');
    if (!paginationDiv) return;
    paginationDiv.innerHTML = '';

    for(let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.style.padding = '5px 10px';
      btn.style.cursor = 'pointer';
      btn.style.background = (i === page) ? '#007acc' : '#f0f0f0';
      btn.style.color = (i === page) ? 'white' : 'black';
      btn.style.border = 'none';
      btn.style.borderRadius = '5px';
      btn.addEventListener('click', () => {
        window.currentPageM = i;
        displayMembers(filteredMembers(), window.currentPageM);
      });
      paginationDiv.appendChild(btn);
    }
  }

  function filteredMembers() {
    const input = document.getElementById('searchMembers');
    if (!input) return window.membersData;
    const term = input.value.toLowerCase();
    return window.membersData.filter(m =>
      m.nom.toLowerCase().includes(term) ||
      m.postnom.toLowerCase().includes(term) ||
      m.telephone.includes(term) ||
      m.adresse.toLowerCase().includes(term) ||
      m.section.toLowerCase().includes(term)
    );
  }

  // --- Fonctions globales pour la liste des dîmes ---
  window.dimesData = [];
  window.currentPageD = 1;
  const rowsPerPageD = 10;

  window.fetchDimesList = function() {
    fetch('/dimes/list')
      .then(res => res.json())
      .then(dimes => {
        window.dimesData = dimes;
        displayDimes(filteredDimes(), window.currentPageD);
      });
  };

  function displayDimes(dimes, page = 1) {
    const tbody = document.querySelector('#dimesTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const start = (page - 1) * rowsPerPageD;
    const end = start + rowsPerPageD;
    const pageDimes = dimes.slice(start, end);

    pageDimes.forEach(d => {
      tbody.innerHTML += `
        <tr>
          <td>${d.id}</td>
          <td>${d.nom}</td>
          <td>${d.postnom}</td>
          <td>${d.section}</td>
          <td>${d.date.split('T')[0]}</td>
          <td>${d.montant_fc || 0}</td>
          <td>${d.montant_usd || 0}</td>
        </tr>`;
    });

    renderPaginationDimes(dimes, page);
  }

  function renderPaginationDimes(dimes, page) {
    const totalPages = Math.ceil(dimes.length / rowsPerPageD);
    const paginationDiv = document.getElementById('paginationDimes');
    if (!paginationDiv) return;
    paginationDiv.innerHTML = '';

    for(let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.style.padding = '5px 10px';
      btn.style.cursor = 'pointer';
      btn.style.background = (i === page) ? '#007acc' : '#f0f0f0';
      btn.style.color = (i === page) ? 'white' : 'black';
      btn.style.border = 'none';
      btn.style.borderRadius = '5px';
      btn.addEventListener('click', () => {
        window.currentPageD = i;
        displayDimes(filteredDimes(), window.currentPageD);
      });
      paginationDiv.appendChild(btn);
    }
  }

  function filteredDimes() {
    const input = document.getElementById('searchDimes');
    if (!input) return window.dimesData;
    const term = input.value.toLowerCase();
    return window.dimesData.filter(d =>
      d.nom.toLowerCase().includes(term) ||
      d.postnom.toLowerCase().includes(term) ||
      d.section.toLowerCase().includes(term) ||
      d.date.includes(term) ||
      (d.montant_fc && d.montant_fc.toString().includes(term)) ||
      (d.montant_usd && d.montant_usd.toString().includes(term))
    );
  }

  // --- Fonctions globales pour formulaires ---
  window.submitAddMemberForm = function(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(form);
      fetch('/members/add', { method: 'POST', body: new URLSearchParams(formData) })
        .then(res => res.json())
        .then(data => data.success ? alert('Membre ajouté !') : alert(data.error));
    });
  };

  window.submitRecordDimeForm = function(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(form);
      fetch('/dimes/add', { method: 'POST', body: new URLSearchParams(formData) })
        .then(res => res.json())
        .then(data => data.success ? alert('Dîme enregistrée !') : alert(data.error));
    });
  };

  // --- Fonctions d’action membre ---
  window.editMember = function(id) {
    alert('Modifier le membre ID: ' + id);
  };

  window.deleteMember = function(id) {
    if (confirm('Voulez-vous vraiment supprimer ce membre ?')) {
      fetch(`/members/delete/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            window.membersData = window.membersData.filter(m => m.id !== id);
            displayMembers(filteredMembers(), window.currentPageM);
            alert('Membre supprimé !');
          } else alert(data.error);
        });
    }
  };

  // --- Input search events ---
  document.addEventListener('input', e => {
    if (e.target.id === 'searchMembers') {
      window.currentPageM = 1;
      displayMembers(filteredMembers(), window.currentPageM);
    }
    if (e.target.id === 'searchDimes') {
      window.currentPageD = 1;
      displayDimes(filteredDimes(), window.currentPageD);
    }
  });
});
