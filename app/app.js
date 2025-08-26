// === App.js (Estoque -MD-) ===
// Requer: firebase.js (compat) antes deste arquivo
// firebase.js deve expor: window.firebase, window.auth, window.storage

// -------- Boot --------
window.addEventListener('firebase-ready', () => {
  console.log("Evento firebase-ready disparado");
  auth.onAuthStateChanged((u) => {
    console.log("Estado de autenticação:", u ? "Usuário logado" : "Nenhum usuário logado");
    if (!u) {
      console.log("Redirecionando para /login.html");
      location.href = '/login.html';
      return;
    }
    // Verifica a página atual e redireciona se necessário
    const currentPath = location.pathname.toLowerCase();
    console.log("Caminho atual:", currentPath);
    if (currentPath === '/index.html' || currentPath === '/' || currentPath === '') {
      console.log("Redirecionando para /dashboard.html por usuário logado");
      location.href = '/dashboard.html';
    } else {
      console.log("Inicializando página:", currentPath);
      initByPage();
    }
  });
});

// -------- Router --------
function initByPage() {
  document.getElementById('btnLogout')?.addEventListener('click', () => {
    auth.signOut().then(() => location.href = '/login.html');
  });

  if (document.getElementById('page-estoque')) {
    initEstoque();
    loadItens();
    bootLightbox();
    document.getElementById('tblItens')?.addEventListener('click', (e) => {
      const img = e.target.closest('img.thumb');
      if (img) openLightbox(img.src, img.alt || 'Imagem');
    });
  }

  if (document.getElementById('page-novo')) {
    initNovo();  // <- inclui upload/câmera
  }
}

// -------- Firestore helpers --------
const colItens = () => firebase.firestore().collection('itens');

// =================== DASHBOARD (já conhecido) ===================
function initEstoque() {
  ['fNome', 'fCategoria', 'fLocal'].forEach((id) =>
    document.getElementById(id)?.addEventListener('input', loadItens)
  );

  document.getElementById('btnExport')?.addEventListener('click', () => {
    const tb = document.querySelector('#tblItens');
    if (!tb) return;
    let csv = 'Nome,Categoria,Qtd,Unid.,Local\n';
    tb.querySelectorAll('tbody tr').forEach((row) => {
      const cols = row.querySelectorAll('td');
      csv += [
        esc(cols[1]?.textContent),
        esc(cols[2]?.textContent),
        esc(cols[3]?.textContent),
        esc(cols[4]?.textContent),
        esc(cols[5]?.textContent),
      ].join(',') + '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'estoque.csv'; a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('btnExportPDF')?.addEventListener('click', exportarPDFsemAcoes);
}

async function loadItens() {
  const tb = document.querySelector('#tblItens tbody');
  if (!tb) return;
  tb.innerHTML = '<tr><td class="muted" colspan="7">Carregando…</td></tr>';

  const nome = (document.getElementById('fNome')?.value || '').toLowerCase();
  const cat  = (document.getElementById('fCategoria')?.value || '').toLowerCase();
  const loc  = (document.getElementById('fLocal')?.value || '').toLowerCase();

  try {
    const snap = await colItens().orderBy('nome').get();
    tb.innerHTML = '';
    if (snap.empty) {
      tb.innerHTML = '<tr><td class="muted" colspan="7">Nenhum item cadastrado.</td></tr>';
      return;
    }

    snap.forEach((doc) => {
      const d = doc.data() || {};
      const ok = (!nome || (d.nome || '').toLowerCase().includes(nome))
              && (!cat  || (d.categoria || '').toLowerCase().includes(cat))
              && (!loc  || (d.local || '').toLowerCase().includes(loc));
      if (!ok) return;

      let imgSrc = d.imageUrl || '';
      if (!imgSrc) {
        const key = (d.nome || doc.id)
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-zA-Z0-9]+/g, '_').toLowerCase();
        imgSrc = `https://firebasestorage.googleapis.com/v0/b/estoque--md.appspot.com/o/imagens%2F${key}.jpg?alt=media`;
      }

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><img class="thumb" src="${imgSrc}" alt="${esc(d.nome)}" width="48" height="48" style="object-fit:cover;border-radius:8px"></td>
        <td>${esc(d.nome)}</td>
        <td>${esc(d.categoria)}</td>
        <td>${n0(d.qtd)}</td>
        <td>${esc(d.unidade)}</td>
        <td>${esc(d.local)}</td>
        <td class="right">
          <a class="btn btn-ghost" href="novo.html?id=${doc.id}">Editar</a>
          <button class="btn btn-ghost btnDel" data-id="${doc.id}">Excluir</button>
        </td>
      `;
      tr.querySelector('.btnDel')?.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja excluir este item?')) {
          colItens().doc(doc.id).delete().then(() => loadItens());
        }
      });

      tb.appendChild(tr);
    });
  } catch (e) {
    tb.innerHTML = `<tr><td class="muted" colspan="7">Erro ao carregar: ${esc(e.message || e)}</td></tr>`;
  }
}

function exportarPDFsemAcoes() {
  const table = document.getElementById('tblItens');
  if (!table) return;

  const headHTML = table.tHead?.outerHTML || '';
  const bodyHTML = table.tBodies[0]?.outerHTML || '';

  const css = `
    *{box-sizing:border-box;font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,'Helvetica Neue','Noto Sans',Arial}
    body{padding:24px}
    header{display:flex;align-items:center;gap:12px;margin-bottom:16px}
    header img{width:64px;height:64px;object-fit:contain}
    h1{font-size:20px;margin:0}
    .muted{color:#666;font-size:12px}
    table{width:100%;border-collapse:collapse}
    th,td{border:1px solid #ddd;padding:8px;font-size:12px;text-align:left;vertical-align:middle}
    th{background:#f2f2f2}
    img{width:36px;height:36px;object-fit:cover;border-radius:6px}
    thead tr th:last-child, tbody tr td:last-child { display: none !important; }
    @page { size: A4 landscape; margin: 12mm; }
  `;

  const hoje = new Date().toLocaleString('pt-BR');

  const win = window.open('', '_blank', 'width=900,height=700');
  win.document.write(`
    <html>
      <head>
        <meta charset="utf-8">
        <title>Estoque -MD- • Itens</title>
        <style>${css}</style>
      </head>
      <body>
        <header>
          <img src="logo.png" alt="Logo">
          <div>
            <h1>Relatório de Itens</h1>
            <div class="muted">Gerado em ${hoje}</div>
          </div>
        </header>
        <table>
          ${headHTML}
          ${bodyHTML}
        </table>
        <script>
          window.onload = () => { window.print(); setTimeout(()=>window.close(), 400); };
        </script>
      </body>
    </html>
  `);
  win.document.close();
}

// =================== NOVO / EDITAR (com upload) ===================
function initNovo() {
  const urlParams  = new URLSearchParams(location.search);
  const itemId     = urlParams.get('id');

  const formItem   = document.getElementById('formItem');
  const iNome      = document.getElementById('iNome');
  const iCategoria = document.getElementById('iCategoria');
  const iQtd       = document.getElementById('iQtd');
  const iUnidade   = document.getElementById('iUnidade');
  const iLocal     = document.getElementById('iLocal');
  const iImageUrl  = document.getElementById('iImageUrl'); // hidden, recebe o URL final
  const iFoto      = document.getElementById('iFoto');
  const iPreview   = document.getElementById('iPreview');
  const iMsg       = document.getElementById('iMsg');
  const iInfo      = document.getElementById('iUploadInfo');
  const btnSalvar  = document.getElementById('btnSalvar');
  const iContexto  = document.getElementById('iContexto');

  let selectedFile = null;

  // Pré-visualização quando escolhe/tira foto
  iFoto?.addEventListener('change', () => {
    selectedFile = iFoto.files && iFoto.files[0] ? iFoto.files[0] : null;
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => { iPreview.src = e.target.result; };
      reader.readAsDataURL(selectedFile);
      iInfo.textContent = `Imagem selecionada: ${selectedFile.name} (${Math.round(selectedFile.size/1024)} KB)`;
    } else {
      iPreview.src = '';
      iInfo.textContent = '';
    }
  });

  // Se for edição, carrega dados
  if (itemId) {
    iContexto.textContent = 'Editando item existente. Altere os campos e clique em Salvar.';
    colItens().doc(itemId).get().then((doc) => {
      if (doc.exists) {
        const d = doc.data() || {};
        iNome.value      = d.nome || '';
        iCategoria.value = d.categoria || '';
        iQtd.value       = d.qtd ?? 0;
        iUnidade.value   = d.unidade || '';
        iLocal.value     = d.local || '';
        iImageUrl.value  = d.imageUrl || '';
        if (d.imageUrl) iPreview.src = d.imageUrl;
      }
    }).catch((e) => {
      iMsg.textContent = 'Erro ao carregar: ' + (e.message || e);
    });
  }

  formItem.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    iMsg.textContent = '';

    if (!iNome.value.trim() || !iCategoria.value.trim() || !iUnidade.value.trim() || !iLocal.value.trim()) {
      iMsg.textContent = 'Preencha todos os campos obrigatórios (*)';
      return;
    }

    btnSalvar.disabled = true;

    try {
      // 1) Se tem foto nova, sobe para o Storage e obtém o URL
      if (selectedFile) {
        const normName = normalizeKey(iNome.value || 'item');
        const ext = extFromMime(selectedFile.type) || 'jpg';
        const path = `imagens/${normName}_${Date.now()}.${ext}`;  // pasta imagens/
        const ref = storage.ref(path);
        iInfo.textContent = 'Enviando imagem...';
        await ref.put(selectedFile);
        const url = await ref.getDownloadURL();
        iImageUrl.value = url; // preenche o hidden com a URL final
        iInfo.textContent = 'Imagem enviada com sucesso!';
      }

      // 2) Monta o objeto para salvar
      const data = {
        nome: iNome.value.trim(),
        categoria: iCategoria.value.trim(),
        qtd: parseInt(iQtd.value, 10) || 0,
        unidade: iUnidade.value.trim(),
        local: iLocal.value.trim(),
        imageUrl: iImageUrl.value.trim() || ''  // preenchido acima se houve upload
      };

      // 3) Salva no Firestore
      if (itemId) await colItens().doc(itemId).set(data);
      else        await colItens().add(data);

      iMsg.textContent = 'Item salvo com sucesso!';
      setTimeout(() => location.href = '/dashboard.html', 900);
    } catch (e) {
      iMsg.textContent = 'Erro ao salvar: ' + (e.message || e);
      btnSalvar.disabled = false;
    }
  });
}

// -------- Lightbox --------
function bootLightbox() {
  const lb = document.getElementById('imgLightbox');
  if (!lb) return;
  lb.addEventListener('click', (ev) => {
    if (ev.target.hasAttribute('data-lb-close')) closeLightbox();
  });
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') closeLightbox();
  });
}
function openLightbox(url, caption) {
  const lb   = document.getElementById('imgLightbox');
  const img  = document.getElementById('lbImage');
  const cap  = document.getElementById('lbCaption');
  if (!lb || !img) return;
  img.src = url; img.alt = caption || 'Imagem';
  if (cap) cap.textContent = caption || '';
  lb.classList.remove('lb-hidden'); lb.setAttribute('aria-hidden','false');
}
function closeLightbox() {
  const lb  = document.getElementById('imgLightbox');
  const img = document.getElementById('lbImage');
  if (!lb) return;
  lb.classList.add('lb-hidden'); lb.setAttribute('aria-hidden','true');
  if (img) img.src = '';
}

// -------- Utils --------
function esc(v){ return (v==null?'':String(v)).replace(/[<>"&]/g, s => ({'<':'&lt;','>':'&gt;','"':'&quot;','&':'&amp;'}[s])); }
function n0(v){ const n = Number(v||0); return Number.isFinite(n) ? n : 0; }
function normalizeKey(s){
  return String(s||'')
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-zA-Z0-9]+/g,'_').replace(/^_+|_+$/g,'')
    .toLowerCase();
}
function extFromMime(mime){
  if (!mime) return '';
  if (mime.includes('jpeg')) return 'jpg';
  if (mime.includes('png'))  return 'png';
  if (mime.includes('webp')) return 'webp';
  return '';
}
