<template>
    <div class="numero-estratto">
      <h1 v-if="numero">{{ numero }}</h1>
      <h1 v-else>Premi "Estrai" per iniziare!</h1>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      numero: Number,
    },
  };
  </script>
  
  <style scoped>
  .numero-estratto {
    text-align: center;
    font-size: 3rem;
    margin-top: 20px;
  }
  </style>
  