<template>
  <div class="welcome-container">
    <p class="happy">Estamos felizes em ter você aqui! 😊</p>

    <div class="construction-box">
      <h2>🛠️ Página de agendamentos em construção</h2>
      <p>Nossa equipe está trabalhando para trazer a melhor experiência para você. 🚀</p>
      <p>Em breve, você poderá marcar suas consultas de forma rápida e fácil! 🏥</p>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.welcome-container {
  text-align: center;
  padding: 40px;
  background-color: #1a1a1a;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  margin-bottom: 10px;
}

.construction-box {
  margin-top: 20px;
  padding: 20px;
  background-color: #333;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.25);
}

h2 {
  margin-bottom: 10px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.happy {
  margin-bottom: 10px;
  line-height: 1.5;
  background-color: rgb(223, 223, 223);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.05);
  color: black;
}
</style>
