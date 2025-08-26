// login.js - Lógica para login e reset
function setupAuth() {
  console.log('Tentando configurar autenticação...');

  // Verifica se o firebase está disponível
  if (typeof firebase === 'undefined' || !firebase.auth) {
    console.error('Firebase não inicializado! Aguardando...');
    setTimeout(setupAuth, 500); // Tenta novamente após 500ms
    return;
  }

  console.log('Firebase inicializado com sucesso!');
  const auth = firebase.auth();

  // Já logado? Vai pro dashboard
  auth.onAuthStateChanged(u => {
    if (u) {
      console.log('Usuário já logado, redirecionando...');
      location.href = 'dashboard.html';
    }
  });

  // Login form
  const formLogin = document.getElementById('formLogin');
  if (formLogin) {
    console.log('Formulário de login encontrado!');
    formLogin.addEventListener('submit', async e => {
      e.preventDefault();
      console.log('Form submit disparado!');
      const email = document.getElementById('lEmail').value.trim();
      const senha = document.getElementById('lSenha').value;
      const msg = document.getElementById('lMsg');
      if (msg) {
        console.log('Elemento lMsg encontrado, limpando conteúdo...');
        msg.innerHTML = ''; // Limpa qualquer conteúdo pré-existente
      } else {
        console.error('Elemento lMsg não encontrado!');
      }
      try {
        console.log('Tentando login com:', email);
        await auth.signInWithEmailAndPassword(email, senha);
        console.log('Login OK, redirecionando...');
        location.href = 'dashboard.html';
      } catch (err) {
        console.error('Erro no login capturado:', err.code, err.message);
        if (msg) {
          console.log('Atualizando mensagem de erro no lMsg...');
          msg.innerHTML = ''; // Garante que o conteúdo seja limpo novamente
          if (err.code === 'auth/invalid-credential') {
            msg.textContent = 'Usuário ou Senha inválida. Tente novamente.';
            console.log('Mensagem personalizada aplicada:', msg.textContent);
          } else {
            msg.textContent = err.message || 'Erro ao entrar.';
            console.log('Mensagem padrão aplicada:', msg.textContent);
          }
        }
      }
    });
  } else {
    console.error('Form de login não encontrado!');
  }

  // Reset form (para reset.html)
  const formReset = document.getElementById('formReset');
  if (formReset) {
    formReset.addEventListener('submit', async e => {
      e.preventDefault();
      console.log('Form reset disparado!');
      const email = document.getElementById('rEmail').value.trim();
      const msg = document.getElementById('rMsg');
      if (msg) msg.textContent = '';
      try {
        await auth.sendPasswordResetEmail(email);
        if (msg) msg.textContent = 'Link de redefinição enviado para o e-mail.';
      } catch (err) {
        console.error('Erro no reset:', err);
        if (msg) msg.textContent = err.message || 'Erro ao enviar.';
      }
    });
  }
}

// Inicia a configuração quando o Firebase estiver pronto
window.addEventListener('firebase-ready', setupAuth);