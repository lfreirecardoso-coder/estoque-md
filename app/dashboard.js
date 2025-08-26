<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Estoque | Dashboard</title>

  <!-- Bootstrap 5 -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

  <!-- Tema personalizado -->
  <link rel="stylesheet" href="theme.css"/>
</head>
<body>
  <div class="layout">
    <!-- Sidebar -->
    <aside class="sidebar" id="sidebar">
      <div class="brand">
        <img src="logo.png" alt="Logo" class="brand-logo">
        <span class="brand-title">Estoque -MD-</span>
      </div>
      <nav class="nav flex-column">
        <a class="nav-link" href="dashboard.html">Gestão de Estoque</a>
        <a class="nav-link" href="cadastro.html">Cadastro de Estoque</a>
        <a class="nav-link" href="cadastro_base.html">Cadastro Base</a>
        <a class="nav-link" href="relatorios.html">Relatórios</a>
        <a class="nav-link" href="usuarios.html">Cadastro de Usuários</a>
        <a class="nav-link" href="movimentacoes.html">Log de Movimentações</a>
        <a class="btn btn-logout mt-3" href="login.html" onclick="auth?.signOut?.()">Sair</a>
      </nav>
    </aside>

    <!-- Conteúdo -->
    <main class="content" id="page-dashboard">
      <!-- Topbar -->
      <nav class="navbar navbar-dark topbar">
        <div class="container-fluid d-flex justify-content-between align-items-center">
          <button class="navbar-toggler" type="button" id="sidebarToggle">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div>
            <a href="relatorios.html" class="btn btn-outline-light btn-sm">Relatórios</a>
            <a href="login.html" class="btn btn-outline-danger btn-sm" onclick="auth?.signOut?.()">Sair</a>
          </div>
        </div>
      </nav>

      <!-- Conteúdo principal -->
      <header class="page-header">
        <h2 class="page-title">Estoque | Dashboard</h2>
        <p class="page-subtitle">
          Filtre, exporte e movimente itens do estoque. Clique na imagem para pré-visualizar.
        </p>
      </header>

      <!-- FILTROS -->
      <section class="card flat p-3 mb-3">
        <div class="row g-3">
          <div class="col-md-4">
            <label for="fNome" class="form-label">Filtrar por nome</label>
            <input id="fNome" class="form-control" placeholder="Ex.: Fio, Tomada, Cabo..."/>
          </div>
          <div class="col-md-4">
            <label for="fCategoria" class="form-label">Categoria</label>
            <input id="fCategoria" class="form-control" placeholder="Ex.: Elétrica, Som..."/>
          </div>
          <div class="col-md-4">
            <label for="fLocal" class="form-label">Local de Armazenamento</label>
            <input id="fLocal" class="form-control" placeholder="Ex.: Caixa A1, Depósito..."/>
          </div>
        </div>
        <div class="mt-3">
          <button type="button" class="btn btn-outline-light" id="btnCsv">Exportar CSV</button>
          <button type="button" class="btn btn-outline-light" id="btnPdf">Exportar PDF</button>
        </div>
      </section>

      <!-- TABELA -->
      <section class="table-responsive">
        <table id="tblItens" class="table table-dark table-striped align-middle">
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Qtd</th>
              <th>Unid.</th>
              <th>Local</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </section>
    </main>
  </div>

  <!-- Scripts -->
  <script src="firebase.js"></script>
  <script src="sidebar.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
