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
  const add = (src) => {
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.crossOrigin = 'anonymous';
    document.head.appendChild(s);
    return s;
  };

  add("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
  add("https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js");
  add("https://www.gstatic.com/firebasejs/10.12.2/firebase-storage-compat.js");
  const last = add("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js");

  last.onload = () => {
    try {
      // Inicializa o app
      firebase.initializeApp(firebaseConfig);
      const storage = firebase.app().storage("gs://estoque--md.firebasestorage.app");
      window.firebase = firebase;
      window.auth = firebase.auth();
      window.db = firebase.firestore();
      window.storage = storage;
      console.log("Firebase inicializado com sucesso"); // Log de depuração
      window.dispatchEvent(new Event('firebase-ready'));
    } catch (e) {
      console.error("Erro ao inicializar Firebase:", e);
    }
  };
})();
