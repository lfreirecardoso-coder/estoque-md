// login.js - Lógica para login e reset
window.addEventListener('firebase-ready', () => {
  console.log('Firebase pronto! Iniciando auth...');

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
    formLogin.addEventListener('submit', async e => {
      e.preventDefault();
      console.log('Form submit disparado!');
      const email = document.getElementById('lEmail').value.trim();
      const senha = document.getElementById('lSenha').value;
      const msg = document.getElementById('lMsg');
      if (msg) msg.textContent = '';
      try {
        console.log('Tentando login com:', email);
        await auth.signInWithEmailAndPassword(email, senha);
        console.log('Login OK, redirecionando...');
        location.href = 'dashboard.html';
      } catch (err) {
        console.error('Erro no login:', err);
        if (msg) msg.textContent = err.message || 'Erro ao entrar.';
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
});