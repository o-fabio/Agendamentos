<template>
  <div class="container">
    <form class="manual-appointment-form" @submit.prevent="cadastrarAgendamento">
      <h2>Cadastrar Agendamento Manual</h2>

      <input type="text" v-model="novoAgendamento.paciente" placeholder="Nome do Paciente" required />
      <select v-model="novoAgendamento.doutor" required>
        <option disabled value="">Selecione o Doutor</option>
        <option v-for="doutor in doutores" :key="doutor.id" :value="doutor.id">
          {{ doutor.nome }} - {{ doutor.especialidade }}
        </option>
      </select>
      <input type="date" v-model="novoAgendamento.data" required />

      <select v-model="novoAgendamento.horario" required>
        <option disabled value="">Selecione o Horário</option>
        <option v-for="horario in horarios" :key="horario" :value="horario">
          {{ horario }}
        </option>
      </select>

      <select v-model="novoAgendamento.tipo">
        <option disabled value="">Tipo de Consulta</option>
        <option value="Primeira consulta">Primeira consulta</option>
        <option value="Retorno">Retorno</option>
      </select>

      <textarea v-model="novoAgendamento.observacoes" placeholder="Observações (opcional)" rows="2"></textarea>

      <button type="submit">Cadastrar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { User } from 'firebase/auth';

const props = defineProps<{ auth: User }>()
const emit = defineEmits(['agendamento-realizado'])
const doutores = [
  { id: 'joao-cardiologia', nome: 'Dr. João', especialidade: 'Cardiologia' },
  { id: 'maria-pediatria', nome: 'Dr. Maria', especialidade: 'Pediatria' },
  { id: 'ana-dermatologia', nome: 'Dr. Ana', especialidade: 'Dermatologia' },
];

const horarios = [
  '08:00', '08:30', '09:00', '09:30', '10:00',
  '10:30', '11:00', '11:30',
  '13:30', '14:00', '14:30', '15:00',
  '15:30', '16:00', '16:30', '17:00',
  '17:30', '18:00', '18:30', '19:00',
  '19:30'
]

const novoAgendamento = ref({
  paciente: '',
  doutor: '',
  especialidade: '',
  data: '',
  horario: '',
  tipo: '',
  observacoes: ''
});

const cadastrarAgendamento = async () => {
  const doutor = doutores.find(d => d.id === novoAgendamento.value.doutor);
  if (doutor) {
    novoAgendamento.value.doutor = doutor.nome;
    novoAgendamento.value.especialidade = doutor.especialidade;
    const agendamentoId = `${novoAgendamento.value.paciente}-${Date.now()}`;
    await setDoc(doc(db, "appointments", doutor.id, novoAgendamento.value.horario, agendamentoId), {
      ...novoAgendamento.value,
    });
  }

  // Limpar os campos após o cadastro
  novoAgendamento.value = {
    paciente: '',
    doutor: '',
    especialidade: '',
    data: '',
    horario: '',
    tipo: '',
    observacoes: ''
  };

  alert('Agendamento cadastrado com sucesso!');

  emit('agendamento-realizado')
};
</script>

<style scoped>
.container {
  border: 1px solid #ccc;
  padding: 8px;
}

.manual-appointment-form {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, 1fr);
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  position: sticky;
  top: 16px;
  margin: 0 auto;
}

.manual-appointment-form h2 {
  grid-column: span 2;
  text-align: center;
  margin-bottom: 10px;
  color: #333;
}

.manual-appointment-form input,
.manual-appointment-form select,
.manual-appointment-form textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
}

.manual-appointment-form select {
  background-color: white;
}

.manual-appointment-form textarea {
  resize: vertical;
  grid-column: span 2;
}

.manual-appointment-form button {
  grid-column: span 2;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.manual-appointment-form button:hover {
  background-color: #45a049;
}

@media (max-width: 600px) {
  .manual-appointment-form {
    grid-template-columns: 1fr;
  }

  .manual-appointment-form textarea,
  .manual-appointment-form button,
  .manual-appointment-form h2 {
    grid-column: span 1;
  }
}
</style>
