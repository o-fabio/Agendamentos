<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import axios from "axios";

const email = ref("");
const password = ref("");
const userInfo = ref({
  name: "",
  cpf: "",
  birth: "",
  phone1: "",
  phone2: "",
  cep: "",
  rua: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: "",
});
const isRegistering = ref(false);
const errorMessage = ref("");
const router = useRouter();

const handleAuth = async () => {
  errorMessage.value = "";
  try {
    if (isRegistering.value) {
      const user = await createUserWithEmailAndPassword(auth, email.value, password.value);
      await setDoc(doc(db, "users", user.user.uid), {
        name: userInfo.value.name,
        cpf: userInfo.value.cpf,
        birth: userInfo.value.birth,
        phone1: userInfo.value.phone1,
        phone2: userInfo.value.phone2,
        cep: userInfo.value.cep,
        rua: userInfo.value.rua,
        numero: userInfo.value.numero,
        complemento: userInfo.value.complemento,
        bairro: userInfo.value.bairro,
        cidade: userInfo.value.cidade,
        estado: userInfo.value.estado,
        email: email.value,
      });
      alert("Usuário cadastrado com sucesso!");
    } else {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      router.push("/dashboard");
    }
  } catch (error: any) {
    alert(error.message);
    errorMessage.value = error.message;
  }
};

const buscarEndereco = async () => {
  if (userInfo.value.cep.length === 8) {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${userInfo.value.cep}/json/`);
      if (!response.data.erro) {
        userInfo.value.rua = response.data.logradouro;
        userInfo.value.bairro = response.data.bairro;
        userInfo.value.cidade = response.data.localidade;
        userInfo.value.estado = response.data.uf;
      } else {
        alert("CEP não encontrado!");
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert("Erro ao consultar o CEP!");
    }
  }

  if (userInfo.value.cep.length !== 8) {
    alert("CEP inválido!");
  }
};

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      router.push("/dashboard");
    }
  });
});
</script>

<template>
  <div class="auth-container">
    <h2>{{ isRegistering ? "Cadastro" : "Login" }}</h2>
    <div class="user-info">
      <input v-if="isRegistering" class="span-2" v-model="userInfo.name" type="text" placeholder="Nome" required />
      <input class="span-2" v-model="email" type="email" placeholder="Email" required />
      <input class="span-2" v-model="password" type="password" placeholder="Senha" required />
      <template v-if="isRegistering">
        <input v-model="userInfo.cpf" type="text" placeholder="CPF" required />
        <input v-model="userInfo.birth" type="date" placeholder="Data de Nascimento" required />
        <input v-model="userInfo.phone1" type="text" placeholder="Telefone 1" required />
        <input v-model="userInfo.phone2" type="text" placeholder="Telefone 2" />
        <input class="span-2" v-model="userInfo.cep" type="text" placeholder="CEP" @blur="buscarEndereco" required />
        <input class="span-2" v-model="userInfo.rua" type="text" placeholder="Rua" disabled />
        <input v-model="userInfo.numero" type="text" placeholder="Número" />
        <input v-model="userInfo.complemento" type="text" placeholder="Complemento" />
        <input class="span-2" v-model="userInfo.bairro" type="text" placeholder="Bairro" disabled />
        <input v-model="userInfo.cidade" type="text" placeholder="Cidade" disabled />
        <input v-model="userInfo.estado" type="text" placeholder="Estado" disabled />
      </template>
    </div>

    <button @click="handleAuth">
      {{ isRegistering ? "Cadastrar" : "Entrar" }}
    </button>
    <a @click="isRegistering = !isRegistering">
      {{ isRegistering ? "Já tem uma conta? Faça login" : "Não tem uma conta? Cadastre-se" }}
    </a>
  </div>
</template>

<style scoped>
.auth-container {
  width: 100%;
  max-width: 400px;
  margin: 50px auto;
  background-color: #222;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background-color: #333;
  color: white;
}

input:focus {
  outline: none;
  box-shadow: 0px 0px 5px #4caf50;
}

input:disabled {
  background-color: #1f1f1f;
  cursor: not-allowed;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-block: 10px;
}

button:hover {
  background-color: #45a049;
}

p {
  margin-top: 15px;
}

a {
  color: #4caf50;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}

a:hover {
  text-decoration: underline;
}

.user-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.span-2 {
  grid-column: span 2;
}
</style>
