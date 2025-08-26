// sidebar.js — injeta a mesma sidebar no desktop e no offcanvas mobile,
// marca link ativo, cuida do logout e do colapso só no desktop.

(function initSidebar() {
  console.log("Iniciando sidebar.js");

  // HTML da sidebar (um único lugar — será injetado no desktop e no mobile)
  const html = `
    <div class="brand text-center mb-3">
      <img src="logo.png" alt="Logo" class="brand-logo" style="width:72px;height:72px;object-fit:contain;border-radius:50%;border:1px solid var(--border)" />
      <h1 class="brand-title mt-2" style="font-size:1.05rem;margin:0">Estoque -MD-</h1>
    </div>

    <nav class="nav flex-column gap-1">
      <a class="nav-link" href="dashboard.html"><span>Gestão de Estoque</span></a>
      <a class="nav-link" href="novo.html"><span>Cadastro de Estoque</span></a>
      <a class="nav-link" href="cadastro_base.html"><span>Cadastro Base</span></a>
      <a class="nav-link" href="rel.html"><span>Relatórios</span></a>
      <a class="nav-link" href="admin_users.html"><span>Cadastro de Usuários</span></a>
      <a class="nav-link" href="mov.html"><span>Log de Movimentações</span></a>
    </nav>

    <div class="mt-3">
      <button class="btn btn-logout w-100" id="btnLogout">Sair</button>
    </div>
  `;

  // 1) Injeção no DESKTOP (sidebar fixa)
  const desktopMount = document.querySelector('[data-sidebar-content]');
  if (desktopMount) desktopMount.innerHTML = html;

  // 2) Injeção no MOBILE (offcanvas)
  const mobileMount = document.getElementById('offcanvasMenuBody');
  if (mobileMount) mobileMount.innerHTML = html;

  // 3) Marca o link ativo com base no arquivo da URL
  const here = (location.pathname.split('/').pop() || 'dashboard.html').toLowerCase();
  document.querySelectorAll('.nav a').forEach(a => {
    const file = a.getAttribute('href').split('/').pop().toLowerCase();
    if (file === here) a.classList.add('active');
  });

  // 4) Fallback da logo
  const logo = document.querySelector('.brand-logo');
  if (logo) {
    logo.addEventListener('error', function onFail() {
      if (this.src.endsWith('logo.png')) { this.src = 'img/logo.png'; return; }
      this.removeEventListener('error', onFail);
      this.outerHTML = `
        <svg class="brand-logo" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" style="width:72px;height:72px">
          <circle cx="32" cy="32" r="30" fill="#1e0f0f" stroke="rgba(255,255,255,.14)" stroke-width="2"/>
          <path d="M20 36l8-12 8 8 6-6 6 10" fill="none" stroke="#c9b6ff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    });
  }

  // 5) Remove botões legados "sair" minúsculo (se existirem)
  Array.from(document.querySelectorAll('input,button')).forEach(el => {
    const txt = (el.value || el.textContent || '').trim().toLowerCase();
    if (txt === 'sair' && el.id !== 'btnLogout' && el.id !== 'btnLogoutTop') {
      try { el.remove(); } catch(_) {}
    }
  });

  // 6) Logout (botão da sidebar e botão do topo)
  function doLogout() {
    if (window.auth && auth.signOut) {
      auth.signOut().then(() => location.href = 'login.html')
                    .catch(()  => location.href = 'login.html');
    } else {
      location.href = 'login.html';
    }
  }
  document.getElementById('btnLogout')?.addEventListener('click', doLogout);
  document.getElementById('btnLogoutTop')?.addEventListener('click', doLogout);

  // 7) Colapso da sidebar (DESKTOP apenas) — não afeta mobile
  const sidebar = document.getElementById('sidebar');
  const toggleDesktop = document.getElementById('toggleDesktop');
  const content = document.querySelector('.content');

  if (toggleDesktop && sidebar && content) {
    toggleDesktop.addEventListener('click', () => {
      sidebar.classList.toggle('sidebar-collapsed');
      if (sidebar.classList.contains('sidebar-collapsed')) {
        content.style.marginLeft = '68px';
      } else {
        content.style.marginLeft = 'var(--sidebar)';
      }
    });
  }
})();
