<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { useRouter } from "vue-router";
import { doc, getDoc } from "firebase/firestore";
import TheWelcome from "../components/TheWelcome.vue";
import Appointments from "../components/Appointments.vue";
import New from "@/components/New.vue";


const props = defineProps<{ userInfo: IUserInfo }>();
const userAuth = ref<User | null>(null);


onMounted(() => {
  onAuthStateChanged(auth, async (currentUser) => {
    if (!currentUser) return
    userAuth.value = currentUser;
  });
});

const filtroNome = ref('')
const filtroData = ref('')
</script>

<template>
  <div class="dashboard">
    <template v-if="userAuth === null"></template>
    <template v-else>
      <!-- <p v-if="userAuth">Logado como: {{ userInfo.name }}</p> -->
      <!-- <TheWelcome class="welcome" :user="userInfo" /> -->
      <div class="sticky">
        <div class="filter-container">
          <h1>Painel de Agendamentos</h1>
          <input v-model="filtroNome" type="text" placeholder="Filtrar por nome" />
          <input v-model="filtroData" type="date" />
        </div>

        <New class="new" />
      </div>
      <Appointments class="appointments" :user="userInfo" :filtroNome="filtroNome" :filtroData="filtroData" />
    </template>
  </div>
</template>

<style scoped>
.dashboard {
  text-align: center;
  padding: 24px;
  display: grid;
  grid-template-areas: "new appointments"
    "new appointments";
  height: 100%;
  overflow-y: auto;
  gap: 16px;
}

.sticky {
  position: sticky;
  top: 0;
  z-index: 10;
}

.filter-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-container input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  background-color: #f9f9f9;

}


.filter-container button {
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

.filter-container button:hover {
  background-color: #45a049;
}


.filter-container h1 {
  text-align: center;
  margin-bottom: 20px;
  grid-column: span 2;
}

.welcome {
  grid-area: welcome;
}

.new {
  grid-area: new;
}

.appointments {
  grid-area: appointments;
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