<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { useRouter } from "vue-router";
import { doc, getDoc } from "firebase/firestore";
import TheWelcome from "@/components/TheWelcome.vue";


const props = defineProps<{ userInfo: IUserInfo }>();
const userAuth = ref<User | null>(null);

const router = useRouter();

onMounted(() => {
  onAuthStateChanged(auth, async (currentUser) => {
    if (!currentUser) return
    userAuth.value = currentUser;
  });
});
</script>

<template>
  <div class="dashboard">
    
    <!-- <p v-if="userAuth">Logado como: {{ userInfo.name }}</p> -->
    <TheWelcome />
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