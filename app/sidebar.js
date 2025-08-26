// sidebar.js — Sidebar unificada (MD | APP ESTOQUE)
// - Mantém logo (com fallback para arquivo alternativo e SVG)
// - Botão SAIR com estilo discreto (outline vermelho) e largura total
// - Marca item ativo automaticamente
// - Remove qualquer "Sair" legado minúsculo da página

(function initSidebar() {
  const html = `
    <div class="brand">
      <img class="brand-logo" id="brandLogo" src="img/logo.png" alt="Logo">
      <h3 class="brand-title">Estoque -MD-</h3>
    </div>

    <nav class="nav flex-column">
      <a class="nav-link" href="/dashboard.html">Gestão de Estoque</a>
      <a class="nav-link" href="/novo.html">Cadastro de Estoque</a>
      <a class="nav-link" href="/cadastro_base.html">Cadastro Base | Listas Mestras</a>
      <a class="nav-link" href="/admin_users.html">Cadastro de Usuários</a>       
      <a class="nav-link" href="/rel.html">Relatórios</a>     
      <a class="nav-link" href="/mov.html">Log de Movimentações</a>
    </nav>

    <div class="bottom mt-auto">
      <button id="btnLogout" class="btn btn-outline-danger w-100">⎋ Sair</button>
    </div>
  `;

  // Injeta HTML
  const mount = document.querySelector('[data-sidebar]');
  if (mount) mount.innerHTML = html;

  // Marca ativo
  const here = (location.pathname.split('/').pop() || 'dashboard.html').toLowerCase();
  document.querySelectorAll('.nav-link').forEach(a => {
    const file = a.getAttribute('href').split('/').pop().toLowerCase();
    if (file === here) a.classList.add('active');
  });

  // Fallback da logo
  const logo = document.getElementById('brandLogo');
  if (logo) {
    logo.addEventListener('error', function onFail() {
      if (this.src.indexOf('img/logo.png') !== -1) {
        this.src = '/logo.png'; // Caminho relativo para hosting
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
    if (!btn) return;

    const attach = () => btn.onclick = () => {
      window.auth.signOut().then(() => {
        console.log("Logout realizado, redirecionando para login.html");
        location.href = '/login.html';
      }).catch((error) => console.error("Erro no logout:", error.message));
    };

    if (window.auth && typeof window.auth.signOut === 'function') {
      attach();
    } else {
      window.addEventListener('firebase-ready', () => {
        if (window.auth && typeof window.auth.signOut === 'function') attach();
      }, { once: true });
    }
  }
  wireLogout();
})();
