// login.js - Lógica de autenticação para a tela de login

// Aguarda o evento 'firebase-ready' para garantir que o Firebase esteja inicializado
window.addEventListener('firebase-ready', () => {
  console.log("Firebase pronto para login"); // Log de depuração
  const formLogin = document.getElementById('formLogin');
  const lEmail = document.getElementById('lEmail');
  const lSenha = document.getElementById('lSenha');
  const lMsg = document.getElementById('lMsg');

  if (!formLogin || !lEmail || !lSenha || !lMsg) {
    console.error("Elementos do formulário não encontrados:", { formLogin, lEmail, lSenha, lMsg });
    return;
  }

  // Verifica o estado de autenticação
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("Usuário já logado, redirecionando para dashboard.html");
      location.href = 'dashboard.html'; // Redireciona se já estiver logado
    } else {
      console.log("Nenhum usuário logado, mostrando formulário");
      lMsg.textContent = ''; // Limpa mensagens
    }
  });

  // Lida com o envio do formulário
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    console.log("Formulário enviado", { email: lEmail.value, senha: lSenha.value }); // Log de depuração
    lMsg.textContent = 'Carregando...'; // Mostra mensagem de carregamento

    const email = lEmail.value.trim();
    const senha = lSenha.value.trim();

    if (!email || !senha) {
      console.log("E-mail ou senha vazios");
      lMsg.textContent = 'Por favor, preencha e-mail e senha.';
      return;
    }

    // Tenta fazer login com Firebase
    auth.signInWithEmailAndPassword(email, senha)
      .then((userCredential) => {
        console.log("Login bem-sucedido", userCredential.user.email);
        lMsg.textContent = 'Login bem-sucedido!';
        setTimeout(() => {
          location.href = 'dashboard.html';
        }, 1000); // Redireciona após 1 segundo
      })
      .catch((error) => {
        console.error("Erro no login:", error.code, error.message); // Log de depuração
        lMsg.textContent = 'Erro: ' + error.message; // Mostra erro ao usuário
      });
  });
});
