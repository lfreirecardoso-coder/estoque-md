// firebase.js — COMPLETO (JS puro, sem <script> tags)

// === Config do seu projeto ===
const firebaseConfig = {
  apiKey: "AIzaSyCGJzbcpA0CWrz1UFZaBlepH_ow3CYNP8o",
  authDomain: "estoque--md.firebaseapp.com",
  projectId: "estoque--md",
  storageBucket: "estoque--md.firebasestorage.app",
  messagingSenderId: "1043695713279",
  appId: "1:1043695713279:web:c6b749a795c22fcaf285ca"
};

// Carrega SDK compat do Firebase via CDN
(function init() {
  const scripts = [
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js",
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js",
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js",
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage-compat.js" // Storage no final para depender dos outros
  ];

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.crossOrigin = 'anonymous';
      s.onload = () => resolve();
      s.onerror = () => reject(new Error(`Falha ao carregar ${src}`));
      document.head.appendChild(s);
    });
  }

  Promise.all(scripts.map(loadScript))
    .then(() => {
      console.log("Todos os scripts do Firebase foram carregados");
      try {
        firebase.initializeApp(firebaseConfig);
        const storage = firebase.app().storage("gs://estoque--md.firebasestorage.app");
        window.firebase = firebase;
        window.auth = firebase.auth();
        window.db = firebase.firestore();
        window.storage = storage;
        console.log("Firebase inicializado com sucesso");
        window.dispatchEvent(new Event('firebase-ready'));
      } catch (e) {
        console.error("Erro ao inicializar Firebase:", e);
      }
    })
    .catch(error => {
      console.error("Erro ao carregar scripts do Firebase:", error);
    });
})();
