<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useStorage } from "@vueuse/core";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { useRouter } from "vue-router";
import { doc, getDoc } from "firebase/firestore";

const router = useRouter();
const user = useStorage<User | null>("user-session", null, localStorage);
const userInfo = ref<IUserInfo | null>({
  birth: "",
  cep: "",
  cpf: "",
  name: "",
  phone1: "",
  phone2: "",
  email: "",
  rua: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: ""
});
const sessionStartTime = useStorage("session-start", Date.now(), localStorage);
const logout = async () => {
  await signOut(auth);
  user.value = null;
  sessionStartTime.value = null;
  router.push("/");
};
onMounted(() => {
  try {
    onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
    
      userInfo.value = (await getDoc(doc(db, "users", currentUser.uid))).data() as IUserInfo;
      if (!userInfo.value) {
        console.error("Usuário não encontrado no Firestore");
        logout();
        return;
      }
      user.value = currentUser;
      sessionStartTime.value = Date.now();
    } else {
      user.value = null;
      sessionStartTime.value = null;
    }
  });
  } catch (error) {
    console.error("Erro ao obter dados do usuário:", error);
  }
});

// Verifica se a sessão expirou a cada minuto
setInterval(() => {
  if (user.value && sessionStartTime.value) {
    const elapsedTime = Date.now() - sessionStartTime.value;
    if (elapsedTime > 60 * 60 * 1000) { // 1 hora
      logout();
    }
  }
}, 60000);


</script>

<template>
  <div class="container" :class="{ 'container-grid': user && userInfo }">
    <nav v-if="user && userInfo">
      <h1>👋 Olá, {{ userInfo.name }}</h1>
      <button @click="logout">Sair</button>
    </nav>
    <router-view :userInfo="userInfo" />
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
    overflow-x: hidden;
    overflow-y: hidden;
    height: 100vh;
    display: grid;
}

.container-grid {
  grid-template-rows: 50px 1fr;
}

nav {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #4caf50;
  color: white;
}
button {
  border: 1px solid rgb(216, 0, 0);
  background: rgba(216, 0, 0, 0.5);
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 10px;
}
</style>
