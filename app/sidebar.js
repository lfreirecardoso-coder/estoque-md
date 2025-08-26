// sidebar.js — Sidebar unificada (desktop fixo/colapsável + mobile offcanvas)
(function initSidebar() {
  console.log("Iniciando sidebar.js");

  const htmlMenu = `
    <div class="d-flex align-items-center gap-2 mb-3">
      <img src="logo.png" alt="Logo" class="brand-logo" onerror="this.src='img/logo.png'">
      <h1 class="brand-title m-0">Estoque -MD-</h1>
    </div>

    <nav class="nav flex-column">
      <a class="nav-link" href="dashboard.html"><span>Gestão de Estoque</span></a>
      <a class="nav-link" href="novo.html"><span>Cadastro de Estoque</span></a>
      <a class="nav-link" href="cadastro_base.html"><span>Cadastro Base</span></a>
      <a class="nav-link" href="rel.html"><span>Relatórios</span></a>
      <a class="nav-link" href="admin_users.html"><span>Cadastro de Usuários</span></a>
      <a class="nav-link" href="mov.html"><span>Log de Movimentações</span></a>
    </nav>

    <div class="mt-3">
      <button class="btn btn-ghost w-100" id="btnLogout">Sair</button>
    </div>
  `;

  // injeta no sidebar (desktop)
  const mountDesktop = document.querySelector('[data-sidebar-content]');
  if (mountDesktop) mountDesktop.innerHTML = htmlMenu;

  // injeta no offcanvas (mobile)
  const mountCanvas = document.getElementById('offcanvasMenuBody');
  if (mountCanvas) mountCanvas.innerHTML = htmlMenu;

  // marca ativo pela URL
  const here = (location.pathname.split('/').pop() || 'dashboard.html').toLowerCase();
  document.querySelectorAll('.nav-link').forEach(a => {
    const file = a.getAttribute('href').split('/').pop().toLowerCase();
    if (file === here) a.classList.add('active');
  });

  // remove “Sair” legado
  Array.from(document.querySelectorAll('input,button')).forEach(el => {
    const txt = (el.value || el.textContent || '').trim().toLowerCase();
    if (txt === 'sair' && el.id !== 'btnLogout') { try { el.remove(); } catch(_) {} }
  });

  // wire logout (desktop + mobile)
  function wireLogout(){
    document.querySelectorAll('#btnLogout').forEach(btn => {
      btn.onclick = () => {
        if (window.auth && auth.signOut) {
          auth.signOut().then(() => location.href = 'login.html')
                        .catch(err => console.error('Erro no logout:', err));
        } else {
          location.href = 'login.html';
        }
      };
    });
  }
  wireLogout();

  // toggle colapso (apenas desktop)
  const sidebar = document.getElementById('sidebar');
  const toggleDesktop = document.getElementById('toggleDesktop');
  const content = document.querySelector('.content');

  if (sidebar && toggleDesktop && content){
    toggleDesktop.addEventListener('click', () => {
      sidebar.classList.toggle('sidebar-collapsed');
      // margem do conteúdo é controlada no CSS; aqui só cuida do botão flutuante
    });
  }
})();
