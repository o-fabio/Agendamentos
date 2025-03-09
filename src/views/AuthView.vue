<script lang="ts" setup>
import { ref } from "vue";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const isRegistering = ref(false);
const errorMessage = ref("");
const router = useRouter()

const handleAuth = async () => {
  errorMessage.value = "";
  try {
    if (isRegistering.value) {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
      alert("Cadastro realizado com sucesso!");
    } else {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      router.push("/dashboard")
    }

  } catch (error) {
    errorMessage.value = "Erro: " + error.message;
  }
};
</script>

<template>
  <div class="auth-container">
    <h2>{{ isRegistering ? "Cadastro" : "Login" }}</h2>
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Senha" required />
    <button @click="handleAuth">
      {{ isRegistering ? "Cadastrar" : "Entrar" }}
    </button>
    <p @click="isRegistering = !isRegistering">
      {{ isRegistering ? "Já tem uma conta? Faça login" : "Não tem uma conta? Cadastre-se" }}
    </p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.auth-container {
  max-width: 300px;
  margin: auto;
  text-align: center;
}
input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 8px;
}
button {
  background: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}
p {
  color: blue;
  cursor: pointer;
}
</style>
