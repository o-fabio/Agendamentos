<template>
 <div class="container">
  <form class="manual-appointment-form" @submit.prevent="cadastrarAgendamento">
    <h2>Cadastrar Agendamento Manual</h2>

    <input type="text" v-model="novoAgendamento.paciente" placeholder="Nome do Paciente" required />
    <input type="text" v-model="novoAgendamento.doutor" placeholder="Nome do Doutor" required />
    <input type="text" v-model="novoAgendamento.especialidade" placeholder="Especialidade" required />

    <input type="date" v-model="novoAgendamento.data" required />
    <input type="time" v-model="novoAgendamento.horario" required />

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
  // Aqui você pode adicionar a lógica para cadastrar o agendamento
  console.log('Novo agendamento:', novoAgendamento.value);
  await setDoc(doc(db, "appointments", props.auth.uid), {
    ...novoAgendamento.value,
  });

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
