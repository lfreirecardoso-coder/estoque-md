// login.js - Lógica de autenticação para a tela de login

window.addEventListener('firebase-ready', () => {
  console.log("Firebase pronto para login no domínio: ", window.location.hostname);
  const formLogin = document.getElementById('formLogin');
  const lEmail = document.getElementById('lEmail');
  const lSenha = document.getElementById('lSenha');
  const lMsg = document.getElementById('lMsg');

  if (!formLogin || !lEmail || !lSenha || !lMsg) {
    console.error("Elementos do formulário não encontrados:", { formLogin, lEmail, lSenha, lMsg });
    lMsg.textContent = 'Erro: Formulário não carregou corretamente.';
    return;
  }

  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("Usuário já logado, redirecionando para /dashboard.html");
      location.href = '/dashboard.html'; // Caminho relativo para o hosting
    } else {
      console.log("Nenhum usuário logado, mostrando formulário");
      lMsg.textContent = '';
    }
  });

  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("Botão Entrar clicado, enviando formulário com:", { email: lEmail.value, senha: lSenha.value });
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
          console.log("Redirecionando para /dashboard.html");
          location.href = '/dashboard.html'; // Garante redirecionamento no hosting
        }, 1000);
      })
      .catch((error) => {
        console.error("Erro no login:", error.code, error.message);
        lMsg.textContent = 'Erro: ' + error.message;
      });
  });
});
