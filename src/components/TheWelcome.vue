<template>
  <div class="conv-card">
    <div class="card-header">
      <span class="brand">MED+</span>
      <span class="title">Convênio</span>
    </div>

    <div class="card-number">
      {{ formattedCpf }}
    </div>

    <div class="card-info">
      <div class="name">{{ user.name.toUpperCase() }}</div>
      <div class="company">CLÍNICA EXEMPLO</div>
    </div>

    <div class="logo"><!-- 
      <img src="/logo.svg" alt="logo" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  user: {
    name: string,
    cpf: string
  }
}>()

const formattedCpf = `${props.user.cpf.slice(0, 4)} **** **** **`
</script>

<style scoped>
.conv-card {
  width: 340px;
  height: 200px;
  border-radius: 16px;
  padding: 20px;
  background: linear-gradient(to bottom, #008040 50%, #eeeeee 50%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  position: relative;
  color: #000;
  font-family: 'Segoe UI', sans-serif;
  overflow: hidden;
  transition: transform 0.3s ease;
}
.conv-card:hover {
  transform: scale(1.02);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 16px;
}

.brand {
  font-size: 20px;
  font-weight: 800;
  color: #ffeb3b;
  text-shadow: 1px 1px 2px #000;
}

.title {
  background: #00582f;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 14px;
}

.card-number {
  font-size: 20px;
  font-family: monospace;
  letter-spacing: 3px;
  margin: 20px 0 12px;
  color: #111;
}

.card-info .name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.card-info .company {
  font-size: 14px;
  color: #444;
}

.logo {
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 48px;
  height: 48px;
}
.logo img {
  width: 100%;
  height: auto;
}
</style>
