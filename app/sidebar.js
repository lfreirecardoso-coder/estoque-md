// sidebar.js — Sidebar unificada (MD | APP ESTOQUE)
// - Mantém logo (com fallback para arquivo alternativo e SVG)
// - Botão SAIR com estilo discreto e largura total
// - Marca item ativo automaticamente
// - Remove qualquer "Sair" legado minúsculo da página

(function initSidebar() {
  const html = `
    <div class="brand">
      <img src="logo.png" alt="Logo" class="brand-logo" style="width:80px;height:80px;object-fit:contain" />
      <h1 class="brand-title" style="font-size:1.1rem;margin:0">Estoque -MD-</h1>
    </div>

    <nav class="nav">
      <a href="/dashboard.html">Gestão de Estoque</a>
      <a href="/novo.html">Cadastro de Estoque</a>
      <a href="/cadastro_base.html">Cadastro Base</a>
      <a href="/rel.html">Relatórios</a>     
      <a href="/admin_users.html">Cadastro de Usuários</a> 
      <a href="/mov.html">Log de Movimentações</a>
    </nav>

    <div class="bottom">
      <button class="btn-logout btn btn-ghost-danger w-100" id="btnLogout">Sair</button>
    </div>
  `;

  // Injeta HTML
  const mount = document.querySelector('[data-sidebar]');
  if (mount) mount.innerHTML = html;

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
    if (!btn) return;

    const attach = () => btn.onclick = () => {
      window.auth.signOut().then(() => {
        console.log("Logout realizado, redirecionando para /login.html");
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
