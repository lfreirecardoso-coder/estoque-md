// sidebar.js — Sidebar unificada (MD | APP ESTOQUE)
// - Mantém logo (com fallback para arquivo alternativo e SVG)
// - Botão SAIR com estilo discreto e largura total
// - Marca item ativo automaticamente
// - Remove qualquer "Sair" legado minúsculo da página
// - Suporte para toggle retrátil + persistência de estado

(function initSidebar() {
  console.log("Iniciando sidebar.js");

  const html = `
    <div class="brand d-flex align-items-center gap-2 mb-3">
      <img src="logo.png" alt="Logo" class="brand-logo" style="width:80px;height:80px;object-fit:contain" />
      <h1 class="brand-title" style="font-size:1.1rem;margin:0">Estoque -MD-</h1>
    </div>

    <nav class="nav flex-column">
      <a class="nav-link" href="dashboard.html"><span>Gestão de Estoque</span></a>
      <a class="nav-link" href="novo.html"><span>Cadastro de Estoque</span></a>
      <a class="nav-link" href="cadastro_base.html"><span>Cadastro Base</span></a>
      <a class="nav-link" href="rel.html"><span>Relatórios</span></a>
      <a class="nav-link" href="admin_users.html"><span>Cadastro de Usuários</span></a>
      <a class="nav-link" href="mov.html"><span>Log de Movimentações</span></a>
    </nav>

    <div class="bottom mt-3">
      <button class="btn-logout" id="btnLogout">Sair</button>
    </div>
  `;

  // Injeta HTML
  const mount = document.querySelector('[data-sidebar-content]');
  if (mount) {
    mount.innerHTML = html;
    console.log("Sidebar injetada com sucesso");
  } else {
    console.error("Elemento [data-sidebar-content] não encontrado");
  }

  // Marca item ativo
  try {
    const here = (location.pathname.split('/').pop() || 'dashboard.html').toLowerCase();
    document.querySelectorAll('.nav a').forEach(a => {
      const file = (a.getAttribute('href') || '').split('/').pop().toLowerCase();
      if (file === here) a.classList.add('active');
    });
  } catch (e) {
    console.warn('Falha ao marcar item ativo:', e);
  }

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
        <svg class="brand-logo" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" style="width:80px;height:80px">
          <circle cx="32" cy="32" r="30" fill="#1e0f0f" stroke="rgba(255,255,255,.14)" stroke-width="2"/>
          <path d="M20 36l8-12 8 8 6-6 6 10" fill="none" stroke="#e48a8a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    });
  }

  // Remove qualquer "Sair" legado minúsculo
  Array.from(document.querySelectorAll('input,button')).forEach(el => {
    const txt = (el.value || el.textContent || '').trim().toLowerCase();
    if (txt === 'sair' && el.id !== 'btnLogout') {
      try { el.remove(); } catch(_) {}
    }
  });

  // Wire do logout
  (function wireLogout() {
    const btn = document.getElementById('btnLogout');
    if (!btn) return console.warn("Botão #btnLogout não encontrado");
    btn.onclick = () => {
      try {
        window.auth?.signOut?.().finally(() => location.href = 'login.html');
      } catch (err) {
        console.error("Erro no logout:", err);
        location.href = 'login.html';
      }
    };
  })();

  // ===== Toggle retrátil + persistência =====
  const sidebar = document.getElementById('sidebar');
  const btnA = document.getElementById('sidebarToggle');     // seu ID
  const btnB = document.getElementById('btnDesktopToggle');  // fallback (caso exista)
  const KEY = 'sb:collapsed';

  // aplica estado salvo
  try {
    if (localStorage.getItem(KEY) === '1') {
      sidebar?.classList.add('sidebar-collapsed');
    }
  } catch {}

  function doToggle() {
    if (!sidebar) return;
    sidebar.classList.toggle('sidebar-collapsed');
    // salva estado
    try {
      localStorage.setItem(KEY, sidebar.classList.contains('sidebar-collapsed') ? '1' : '0');
    } catch {}
  }

  btnA?.addEventListener('click', doToggle);
  btnB?.addEventListener('click', doToggle);

  // Remove um botão “Colapsar” legado, se existir
  document.querySelectorAll('button, a').forEach(el => {
    const t = (el.textContent || '').trim().toLowerCase();
    if (t === 'colapsar') { try { el.remove(); } catch {} }
  });
})();
