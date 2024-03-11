<template>
  <div class="landing-page">
    <h1>Trebaš pomoć ili ju želiš pružiti?</h1>
    <div class="buttons">
      <router-link to="/login" class="button">Prijavi se</router-link>
      <router-link to="/signup" class="button">Registriraj se</router-link>
    </div>
  </div>
</template>

<script>
export default {
  // Component logic goes here
}
</script>

<style scoped>
.landing-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.buttons {
  margin-top: 20px;
}

.button {
  display: inline-block;
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 16px;
  text-decoration: none;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}
</style>
