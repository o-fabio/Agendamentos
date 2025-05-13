<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { useRouter } from "vue-router";
import TheWelcome from "../components/TheWelcome.vue";
import Appointments from "../components/Appointments.vue";
import New from "@/components/New.vue";
import { query, collection, getDocs, collectionGroup } from "firebase/firestore";


const props = defineProps<{ userInfo: IUserInfo }>();
const userAuth = ref<User | null>(null);
const agendamentos = ref<Agendamento[]>([]);

const filtroNome = ref('')
const filtroData = ref('')

const getAtendimentos = async () => {
  agendamentos.value = []
  try {
    const todosOsDados = await getDocs(collectionGroup(db, "appointments"));
    const todosOsDadosArray = todosOsDados.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    agendamentos.value = todosOsDadosArray as unknown as Agendamento[];
  } catch (error) {
    console.error("Erro ao obter dados do Firestore:", error);
  }

}

const onAgendamentoRealizado = async () => {
  filtroNome.value = ''
  filtroData.value = ''
  await getAtendimentos()
}

const onAgendamentoExcluido = async (agendamento: Agendamento) => {
  await getAtendimentos()
  console.log('Agendamento excluído:', agendamento);
}



onMounted(async () => {
  await getAtendimentos()
  onAuthStateChanged(auth, async (currentUser) => {
    if (!currentUser) return
    userAuth.value = currentUser;
  });
});


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

        <New :agendamentos="agendamentos" @agendamento-realizado="onAgendamentoRealizado" :auth="userAuth" class="new" />
      </div>
      <Appointments :agendamentos="agendamentos" :auth="userAuth" class="appointments" :user="userInfo"
        :filtroNome="filtroNome" :filtroData="filtroData" @agendamento-excluido="onAgendamentoExcluido" />
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
  grid-template-columns: 1fr 1fr;
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