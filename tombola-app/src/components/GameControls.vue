<template>
    <div class="d-flex justify-content-center mt-3">
      <button @click="estraiNumero" class="btn btn-primary mx-2">Estrai Numero</button>
      <button @click="resetGame" class="btn btn-danger mx-2">Reset</button>
    </div>
  </template>
  
  <script>
  export default {
    emits: ['estrai', 'reset'],
    methods: {
      estraiNumero() {
        this.$emit('estrai');
      },
      resetGame() {
        this.$emit('reset');
      },
    },
  };
  </script>
  