// sidebar.js — Sidebar unificada (MD | APP ESTOQUE)
// - Mantém logo (com fallback para arquivo alternativo e SVG)
// - Botão SAIR com estilo discreto e largura total
// - Marca item ativo automaticamente
// - Remove qualquer "Sair" legado minúsculo da página
// - Suporte para toggle retrátil

(function initSidebar() {
  console.log("Iniciando sidebar.js");
  const html = `
    <div class="brand">
      <img src="logo.png" alt="Logo" class="brand-logo" style="width:80px;height:80px;object-fit:contain" />
      <h1 class="brand-title" style="font-size:1.1rem;margin:0">Estoque -MD-</h1>
    </div>

    <nav class="nav">
      <a href="dashboard.html"><span>Gestão de Estoque</span></a>
      <a href="novo.html"><span>Cadastro de Estoque</span></a>
      <a href="cadastro_base.html"><span>Cadastro Base</span></a>
      <a href="rel.html"><span>Relatórios</span></a>     
      <a href="admin_users.html"><span>Cadastro de Usuários</span></a> 
      <a href="mov.html"><span>Log de Movimentações</span></a>
    </nav>

    <div class="bottom">
      <button class="btn-logout" id="btnLogout">Sair</button>
    </div>
  `;

  // Injeta HTML
  const mount = document.querySelector('[data-sidebar-content]');
  if (!mount) {
    console.error("Elemento [data-sidebar-content] não encontrado");
    return;
  }
  mount.innerHTML = html;
  console.log("Sidebar injetada com sucesso");

  // Marca ativo
  const here = (location.pathname.split('/').pop() || 'dashboard.html').toLowerCase();
  document.querySelectorAll('.nav a').forEach(a => {
    const file = a.getAttribute('href').split('/').pop().toLowerCase();
    if (file === here) a.classList.add('active');
  });

  // Fallback da logo
  const logo = document.querySelector('.brand-logo');
  if (logo) {
    logo.addEventListener('error', function onFail() {
      if (this.src === 'logo.png') {
        this.src = 'img/logo.png';
        return;
      }
      this.removeEventListener('error', onFail);
      this.outerHTML = `
        <svg class="brand-logo" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" fill="#1e0f0f" stroke="rgba(255,255,255,.14)" stroke-width="2"/>
          <path d="M20 36l8-12 8 8 6-6 6 10" fill="none" stroke="#c9b6ff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
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
  function wireLogout() {
    const btn = document.getElementById('btnLogout');
    if (!btn) {
      console.warn("Botão #btnLogout não encontrado");
      return;
    }
    btn.onclick = () => {
      window.auth.signOut().then(() => {
        console.log("Logout realizado, redirecionando para login.html");
        location.href = 'login.html';
      }).catch(err => console.error("Erro no logout:", err));
    };
  }
  wireLogout();

  // Toggle da sidebar
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('sidebarToggle');
  const content = document.querySelector('.content');

  if (toggleBtn && sidebar && content) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('sidebar-collapsed');
      if (sidebar.classList.contains('sidebar-collapsed')) {
        content.style.marginLeft = '60px';
      } else {
        content.style.marginLeft = '280px';
      }
    });
  } else {
    console.warn("Elementos de toggle não encontrados:", { sidebar, toggleBtn, content });
  }
})();
