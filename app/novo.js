import { db, storage } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

// Preview da imagem
const fileInput = document.getElementById("itemImage");
const preview = document.getElementById("preview");
const removeBtn = document.getElementById("removeImageBtn");

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) {
    preview.src = URL.createObjectURL(file);
  }
});

removeBtn.addEventListener("click", () => {
  fileInput.value = "";
  preview.src = "img/placeholder.png";
});

// Formulário
const form = document.getElementById("itemForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = form.nome.value;
  const categoria = form.categoria.value;
  const quantidade = form.quantidade.value;
  const unidade = form.unidade.value;
  const local = form.local.value;

  let imageUrl = "img/placeholder.png";
  if (fileInput.files[0]) {
    const file = fileInput.files[0];
    const storageRef = ref(storage, "itens/" + file.name);
    await uploadBytes(storageRef, file);
    imageUrl = await getDownloadURL(storageRef);
  }

  await addDoc(collection(db, "itens"), {
    nome,
    categoria,
    quantidade: parseInt(quantidade),
    unidade,
    local,
    imagem: imageUrl,
    criadoEm: new Date()
  });

  alert("Item cadastrado com sucesso!");
  form.reset();
  preview.src = "img/placeholder.png";
});
