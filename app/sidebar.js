// sidebar.js — injeta menu no desktop e no mobile (offcanvas)
(function initSidebar() {
  console.log("Iniciando sidebar.js");

  const menuHTML = `
    <div class="mb-3 d-flex align-items-center gap-2">
      <img src="logo.png" alt="Logo" class="brand-logo" style="width:38px;height:38px;border-radius:50%;object-fit:cover;border:1px solid var(--border)">
      <div class="brand-title fw-semibold">Estoque -MD-</div>
    </div>

    <nav class="nav flex-column gap-1">
      <a class="nav-link" href="dashboard.html"><span>Gestão de Estoque</span></a>
      <a class="nav-link" href="novo.html"><span>Cadastro de Estoque</span></a>
      <a class="nav-link" href="cadastro_base.html"><span>Cadastro Base</span></a>
      <a class="nav-link" href="rel.html"><span>Relatórios</span></a>
      <a class="nav-link" href="admin_users.html"><span>Cadastro de Usuários</span></a>
      <a class="nav-link" href="mov.html"><span>Log de Movimentações</span></a>
    </nav>
  `;

  // injeta no desktop
  const sideMount = document.querySelector('[data-sidebar-content]');
  if (sideMount) sideMount.innerHTML = menuHTML;

  // injeta no offcanvas (mobile)
  const canvasMount = document.querySelector('[data-offcanvas-content]');
  if (canvasMount) canvasMount.innerHTML = menuHTML;

  // marca link ativo
  const here = (location.pathname.split('/').pop() || 'dashboard.html').toLowerCase();
  document.querySelectorAll('.nav a').forEach(a=>{
    const file = a.getAttribute('href').split('/').pop().toLowerCase();
    if(file===here) a.classList.add('active');
  });

  // fallback da logo
  document.querySelectorAll('.brand-logo').forEach(logo=>{
    logo.addEventListener('error', function onFail(){
      if (this.src.endsWith('logo.png')) { this.src='img/logo.png'; return; }
      this.removeEventListener('error', onFail);
    });
  });
})();
