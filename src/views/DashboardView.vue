<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const user = ref(null);
const router = useRouter();

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
  });
});

const logout = async () => {
  await signOut(auth);
  router.push("/");
};
</script>

<template>
  <div class="dashboard">
    <h1>Bem-vindo ao sistema!</h1>
    <p v-if="user">Logado como: {{ user.email }}</p>
    <button @click="logout">Sair</button>
  </div>
</template>

<style scoped>
.dashboard {
  text-align: center;
  margin-top: 50px;
}
button {
  margin-top: 20px;
  padding: 10px;
  background: red;
  color: white;
  border: none;
  cursor: pointer;
}
</style>