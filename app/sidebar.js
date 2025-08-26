// sidebar.js — Sidebar unificada (MD | APP ESTOQUE)
// - Injeção do menu
// - Marca item ativo
// - Fallback da logo
// - Remove “sair” legado
// - Logout no topo (#btnLogoutTop) e na sidebar (#btnLogout)
// - Toggle por #sidebarToggleDesk (topo) e mantém compatibilidade com #sidebarToggle antigo

(function initSidebar() {
  console.log("Iniciando sidebar.js");

  const html = `
    <div class="d-flex align-items-center mb-3">
      <img src="logo.png" alt="Logo" class="brand-logo"
           style="width:40px;height:40px;object-fit:cover" />
      <h1 class="brand-title">Estoque -MD-</h1>
    </div>

    <nav class="nav d-grid gap-1">
      <a href="dashboard.html"><span>Gestão de Estoque</span></a>
      <a href="novo.html"><span>Cadastro de Estoque</span></a>
      <a href="cadastro_base.html"><span>Cadastro Base</span></a>
      <a href="rel.html"><span>Relatórios</span></a>
      <a href="admin_users.html"><span>Cadastro de Usuários</span></a>
      <a href="mov.html"><span>Log de Movimentações</span></a>
    </nav>
  `;

  // Injeta HTML
  const mount = document.querySelector('[data-sidebar-content]');
  if (mount) {
    mount.innerHTML = html;
    console.log("Sidebar injetada com sucesso");
  } else {
    console.error("Elemento [data-sidebar-content] não encontrado");
  }

  // Marca ativo
  const here = (location.pathname.split('/').pop() || 'dashboard.html').toLowerCase();
  document.querySelectorAll('.nav a').forEach(a => {
    const file = (a.getAttribute('href') || '').split('/').pop().toLowerCase();
    if (file === here) a.classList.add('active');
  });

  // Fallback da logo
  const logo = document.querySelector('.brand-logo');
  if (logo) {
    logo.addEventListener('error', function onFail() {
      if (this.src.endsWith('logo.png')) {
        this.src = 'img/logo.png';
        return;
      }
      this.removeEventListener('error', onFail);
      this.outerHTML = `
        <svg class="brand-logo" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" fill="#1e0f0f" stroke="rgba(255,255,255,.14)" stroke-width="2"/>
          <path d="M20 36l8-12 8 8 6-6 6 10" fill="none" stroke="#e48a8a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    });
  }

  // Remove “sair” legado
  Array.from(document.querySelectorAll('input,button')).forEach(el => {
    const txt = (el.value || el.textContent || '').trim().toLowerCase();
    if (txt === 'sair' && el.id !== 'btnLogout' && el.id !== 'btnLogoutTop') {
      try { el.remove(); } catch(_) {}
    }
  });

  // Wires de logout (topo e sidebar)
  function wireLogout(id) {
    const btn = document.getElementById(id);
    if (btn) {
      btn.onclick = () => {
        window.auth?.signOut?.().then(() => {
          location.href = 'login.html';
        }).catch(err => console.error('Erro no logout:', err));
      };
    }
  }
  wireLogout('btnLogout');
  wireLogout('btnLogoutTop');

  // Toggle da sidebar: topo (#sidebarToggleDesk) e compatível com antigo (#sidebarToggle)
  const sidebar  = document.getElementById('sidebar');
  const content  = document.querySelector('.content');
  const tDesk    = document.getElementById('sidebarToggleDesk');
  const tLegacy  = document.getElementById('sidebarToggle');

  function doToggle(){
    if (!sidebar || !content) return;
    sidebar.classList.toggle('sidebar-collapsed');
    // margem do conteúdo é controlada pelo CSS com media-queries,
    // então aqui não forçamos margin-left manualmente.
  }

  if (tDesk)   tDesk.addEventListener('click', doToggle);
  if (tLegacy) tLegacy.addEventListener('click', doToggle);
})();
