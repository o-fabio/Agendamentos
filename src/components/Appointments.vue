<template>
  <div class="painel-container">
    <div class="grid-container">
      <div class="appointment-card" v-for="agendamento in agendamentosFiltrados" :key="agendamento.id">
        <h3>
          <span>
            {{ agendamento.paciente }}
            <span class="status">
              {{ agendamento.status || 'Aguardando consulta' }}
            </span>
          </span>
          <strong>Dr(a): {{ agendamento.doutor.nome }} - {{ agendamento.doutor.especialidade }}</strong>
        </h3>

        <button @click="cancelarAgendamento(agendamento)">Deletar</button>
        <ul>

          <li><strong>Data:</strong> {{ agendamento.data }} - {{ agendamento.horario }}</li>
          <li><strong>Tipo:</strong> {{ agendamento.tipo }}</li>
          <li><strong>Observações:</strong> {{ agendamento.observacoes || 'Nenhuma' }}</li>
        </ul>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { doc, deleteDoc } from "firebase/firestore";
import { db, type User } from "../firebase";

const props = defineProps<{
  auth: User
  user: IUserInfo
  filtroNome: string
  filtroData: string
  agendamentos: Agendamento[]
}>()
const emit = defineEmits(['agendamento-excluido'])


const agendamentosFiltrados = computed(() => {
  return props.agendamentos.filter((item) => {
    const nomeMatch = item.paciente.toLowerCase().includes(props.filtroNome.toLowerCase())
    const dataMatch = props.filtroData ? item.data === props.filtroData : true
    return nomeMatch && dataMatch
  })
})

const cancelarAgendamento = async (agendamento: Agendamento) => {
  const isToExcloi = window.confirm(`Cancelar esse agendamento?

Doutor: ${agendamento.doutor.nome} | Paciente: ${agendamento.paciente}
Data: ${agendamento.data} | Horário: ${agendamento.horario}
Tipo: ${agendamento.tipo}
Observações: ${agendamento.observacoes || 'Nenhuma'}
Status: ${agendamento.status || 'Aguardando consulta'}`)

  if (isToExcloi) {
    try {
      await deleteDoc(doc(db, "appointments", agendamento.id));
      emit('agendamento-excluido', agendamento)
    } catch (error) {
      console.error("Erro ao excluir agendamento:", error);
    }
  }
}
</script>

<style scoped>
.painel-container {
  max-width: 1200px;
}


.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  overflow-y: auto;
}

.appointment-card {
  background: #00582f;
  padding: 15px;
  display: grid;
  grid-template-columns: 1fr 100px;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.75);
  font-size: 14px;
  color: #fff;
  font-family: 'Segoe UI', sans-serif;
  height: 200px;
}

.appointment-card h3 {
  font-size: 16px;
  color: #d3d3d3;
  font-weight: 900;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
}

.appointment-card p strong {
  color: #fff;
  font-weight: 600;
}

.appointment-card h3 strong {
  font-size: 14px;
  color: #fff;
  font-weight: 600;
  font-style: italic;
}

.appointment-card button {
  background-color: #f32121;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  height: 32px;
  transition: background-color 0.1s ease;
}

.appointment-card button:hover {
  background-color: #d21919;
}

.appointment-card ul {
  color: white;
  text-align: left;
  border-top: 1px solid #ccc;
  padding-top: 10px;
  grid-column: span 2;
}

.appointment-card .status {
  font-size: 14px;
  color: #fff;
  background-color: #4caf50;
  padding: 5px;
  border-radius: 5px;
  margin-left: 8px;
}

@media (min-width: 600px) {
  .filter-container {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>