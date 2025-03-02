<template>
    <div class="error-page">
      <h1>Oops! Something went wrong.</h1>
      <p>{{ error.statusCode }} - {{ error.statusMessage }}</p>
      <button @click="handleError">Go back to home</button>
    </div>
</template>
  
<script setup lang="ts">
  defineProps(['error']);
  const handleError = () => clearError({ redirect: '/' });
</script>
  
<style scoped>
  .error-page {
    text-align: center;
    padding: 50px;
  }
</style>
  