// ===== Dashboard.js =====
// Este arquivo assume que firebase.js já carregou e expôs: window.firebase, window.auth, window.db
// e que o HTML já foi atualizado para o layout com Bootstrap + modal #modalImg (do passo 1).

console.log('[dashboard] start');

// Helpers de DOM
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const fNome      = $('#fNome');
const fCategoria = $('#fCategoria');
const fLocal     = $('#fLocal');
const tbody      = $('#tblItens tbody');

// Modal de imagem (Bootstrap)
function openImg(url) {
  $('#bigImg').src = url || '';
  const modal = new bootstrap.Modal($('#modalImg'), { backdrop: true });
  modal.show();
}
window.openImg = openImg; // expõe para onclick no HTML gerado

// Estado
let ITENS_CACHE = [];
let MOV_ITEM    = null;
let MOV_TIPO    = 'entrada';

// Utils
const n = (v) => typeof v === 'number' ? v : (Number(v) || 0);
const esc = (s='') => String(s).replaceAll('"','&quot;').replaceAll("'", '&#39;');

// Render da tabela com filtros
function render() {
  const qNome = (fNome?.value || '').trim().toLowerCase();
  const qCat  = (fCategoria?.value || '').trim().toLowerCase();
  const qLoc  = (fLocal?.value || '').trim().toLowerCase();

  const rows = ITENS_CACHE
    .filter(i => {
      const okN = !qNome || (i.nome || '').toLowerCase().includes(qNome);
      const okC = !qCat  || (i.categoria || '').toLowerCase().includes(qCat);
      const okL = !qLoc  || (i.local || '').toLowerCase().includes(qLoc);
      return okN && okC && okL;
    })
    .map(i => {
      const url = i.imageUrl || 'sem-imagem.png';
      const img = `<img class="thumb" src="${esc(url)}" alt="${esc(i.nome || 'item')}" onclick="openImg('${esc(url)}')">`;

      return `
        <tr data-id="${esc(i.id)}">
          <td>${img}</td>
          <td>${esc(i.nome || '-')}</td>
          <td>${esc(i.categoria || '-')}</td>
          <td>${n(i.qtd)}</td>
          <td>${esc(i.unidade || '-')}</td>
          <td>${esc(i.local || '-')}</td>
          <td class="text-end">
            <button class="btn btn-primary btn-entrada me-1" data-id="${esc(i.id)}">Entrada</button>
            <button class="btn btn-danger btn-saida me-1" data-id="${esc(i.id)}">Saída</button>
            <a class="btn btn-ghost me-1" href="novo.html?id=${esc(i.id)}">Editar</a>
            <button class="btn btn-ghost btn-excluir" data-id="${esc(i.id)}">Excluir</button>
          </td>
        </tr>
      `;
    })
    .join('');

  tbody.innerHTML = rows || `<tr><td colspan="7" class="text-muted">Nenhum item encontrado.</td></tr>`;

  // liga eventos dos botões a cada render
  $$('.btn-entrada', tbody).forEach(b => b.onclick = () => openMov(b.dataset.id, 'entrada'));
  $$('.btn-saida',   tbody).forEach(b => b.onclick = () => openMov(b.dataset.id, 'saida'));
  $$('.btn-excluir', tbody).forEach(b => b.onclick = () => excluirItem(b.dataset.id));
}

// Abertura do modal de movimentação
const modalMov     = $('#modalMov');
const mvQtd        = $('#mvQtd');
const mvObs        = $('#mvObs');
const mvMsg        = $('#mvMsg');
const mvTipoInput  = $('#mvTipo');
const movTitle     = $('#movTitle');

$('#closeMov')?.addEventListener('click', () => modalMov.classList.remove('open'));

function openMov(id, tipo) {
  const item = ITENS_CACHE.find(x => x.id === id);
  if (!item) return;

  MOV_ITEM = item;
  MOV_TIPO = tipo;

  mvQtd.value = '';
  mvObs.value = '';
  mvMsg.textContent = '';
  mvMsg.style.color = '';
  mvTipoInput.value = tipo;
  movTitle.textContent = `${tipo === 'entrada' ? 'Entrada' : 'Saída'} — ${item.nome || ''} (estoque: ${n(item.qtd)})`;

  // Modal simples (CSS próprio do seu projeto)
  modalMov.classList.add('open');
}

async function confirmarMov() {
  if (!MOV_ITEM) return;

  const qtd = Number(mvQtd.value);
  if (!qtd || qtd < 1) {
    mvMsg.textContent = 'Informe uma quantidade válida.';
    mvMsg.style.color = '#FFD2D2';
    return;
  }

  const obs  = (mvObs.value || '').trim();
  const tipo = MOV_TIPO;
  const user = auth.currentUser;
  if (!user) { location.href = 'login.html'; return; }

  const itemRef = db.collection('itens').doc(MOV_ITEM.id);
  const movRef  = db.collection('movimentacoes').doc();

  try {
    await db.runTransaction(async t => {
      const snap = await t.get(itemRef);
      if (!snap.exists) throw new Error('Item não encontrado.');

      const atual = Number(snap.data().qtd || 0);
      const novo  = (tipo === 'entrada') ? (atual + qtd) : (atual - qtd);
      if (novo < 0) throw new Error(`Estoque insuficiente: atual ${atual}.`);

      const inc = firebase.firestore.FieldValue.increment(tipo === 'entrada' ? qtd : -qtd);

      t.update(itemRef, { qtd: inc });
      t.set(movRef, {
        itemId      : MOV_ITEM.id,
        itemNome    : MOV_ITEM.nome || '',
        tipo, qtd,
        obs         : obs || '',
        usuario     : user.uid,
        usuarioNome : user.email || user.displayName || '',
        data        : firebase.firestore.FieldValue.serverTimestamp()
      });
    });

    mvMsg.textContent = 'Movimentação registrada!';
    mvMsg.style.color = '#9BE39B';
    setTimeout(() => modalMov.classList.remove('open'), 700);

  } catch (err) {
    console.error(err);
    mvMsg.textContent = err.message || 'Erro ao movimentar.';
    mvMsg.style.color = '#FFD2D2';
  }
}
$('#btnConfirmMov')?.addEventListener('click', confirmarMov);

// Excluir item
async function excluirItem(id) {
  if (!confirm('Tem certeza que deseja excluir este item?')) return;
  try {
    await db.collection('itens').doc(id).delete();
  } catch (e) {
    alert('Erro ao excluir: ' + (e.message || e));
  }
}

// Exportações
function exportCSV() {
  const ths = $$('#tblItens thead th').map(th => th.textContent.trim());
  const trs = Array.from(tbody.querySelectorAll('tr')).map(tr =>
    Array.from(tr.children).slice(0, 6).map(td => `"${(td.textContent || '').replaceAll('"','""')}"`).join(',')
  );
  const csv = [ths.slice(0, 6).join(','), ...trs].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `estoque_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
}
function exportPDF(){ window.print(); }

$('#btnCsv')?.addEventListener('click', exportCSV);
$('#btnPdf')?.addEventListener('click', exportPDF);

// Filtros
[fNome, fCategoria, fLocal].forEach(el => el?.addEventListener('input', render));

// Carregar itens em tempo real
function watchItens() {
  // se esbarrar em índice do Firestore, troque para .get() simples ou remova orderBy
  db.collection('itens').orderBy('nome').onSnapshot(snap => {
    ITENS_CACHE = [];
    snap.forEach(doc => ITENS_CACHE.push({ id: doc.id, ...(doc.data() || {}) }));
    console.log('[dashboard] itens:', ITENS_CACHE.length);
    render();
  }, err => {
    console.error('[dashboard] erro onSnapshot:', err);
    tbody.innerHTML = `<tr><td colspan="7" class="text-danger">Erro ao carregar: ${err.message}</td></tr>`;
  });
}

// Start: espera Firebase e autenticação
window.addEventListener('firebase-ready', () => {
  console.log('[dashboard] firebase-ready');
  auth.onAuthStateChanged(u => {
    if (!u) { location.href = 'login.html'; return; }
    watchItens();
  });
});

// ===== FIM =====
