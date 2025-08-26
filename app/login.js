// login.js - Lógica de autenticação para a tela de login

window.addEventListener('firebase-ready', () => {
  console.log("Firebase pronto para login");
  const formLogin = document.getElementById('formLogin');
  const lEmail = document.getElementById('lEmail');
  const lSenha = document.getElementById('lSenha');
  const lMsg = document.getElementById('lMsg');

  if (!formLogin || !lEmail || !lSenha || !lMsg) {
    console.error("Algum elemento do formulário não foi encontrado:", { formLogin, lEmail, lSenha, lMsg });
    return;
  }

  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("Usuário já logado, redirecionando para dashboard.html");
      location.href = 'dashboard.html';
    } else {
      console.log("Nenhum usuário logado, mostrando formulário");
      lMsg.textContent = '';
    }
  });

  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("Botão Entrar clicado, enviando formulário");
    lMsg.textContent = 'Carregando...';

    const email = lEmail.value.trim();
    const senha = lSenha.value.trim();

    if (!email || !senha) {
      console.log("E-mail ou senha vazios");
      lMsg.textContent = 'Por favor, preencha e-mail e senha.';
      return;
    }

    auth.signInWithEmailAndPassword(email, senha)
      .then((userCredential) => {
        console.log("Login bem-sucedido para:", userCredential.user.email);
        lMsg.textContent = 'Login bem-sucedido!';
        setTimeout(() => {
          location.href = 'dashboard.html';
        }, 1000);
      })
      .catch((error) => {
        console.error("Erro no login:", error.code, error.message);
        lMsg.textContent = 'Erro: ' + error.message;
      });
  });
});
