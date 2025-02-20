<template>
  <div class="container mt-3">
    <h5 class="fw-bold">Cronologia</h5>
    <div class="history-container" ref="historyContainer">
      <ul v-if="numeriEstrattiReversed.length > 0" class="list-group p-1">
        <li 
          v-for="(numero, index) in numeriEstrattiReversed" 
          :key="index"
          class="list-group-item fs-5 d-flex justify-content-between align-items-center"
          :class="{ 'bg-primary text-white fw-bold': index === 0 }"
        >
          <span class="fs-4">{{ numero }}</span> 
          <span class="fs-6">{{ testoAssociato(numero) }}</span>
          
          <!-- Mostra il pulsante solo sull'ultimo numero estratto -->
          <button 
            v-if="index === 0" 
            @click="$emit('rimuoviUltimo')"
            class="btn btn-sm btn-danger"
          >
          <i class="bi bi-x-lg"></i>
          </button>
        </li>
      </ul>

      <!-- Testo alternativo se non ci sono numeri estratti -->
      <p v-else class="text-muted text-center pt-3">
        Nessun numero estratto
      </p>
    </div>
  </div>
</template>


<script>
import { smorfia } from "../data/smorfia"; 

export default {
  props: {
    numeriEstratti: Array, // Lista dei numeri estratti
  },
  computed: {
    // Ordina la lista al contrario per mostrare prima il più recente
    numeriEstrattiReversed() {
      return [...this.numeriEstratti].reverse();
    }
  },
  methods: {
    // Mostra il significato del numero dalla Smorfia
    testoAssociato(numero) {
      return smorfia[numero] || "Nessun significato"; // Se non esiste, mostra testo di default
    },
    // Scorrimento automatico verso l'alto quando si aggiunge un numero
    scrollToTop() {
      this.$nextTick(() => {
        const container = this.$refs.historyContainer;
        if (container) {
          container.scrollTop = 0;
        }
      });
    }
  },
  watch: {
    numeriEstratti() {
      this.scrollToTop();
    }
  }
};
</script>

<style scoped>
/* Contenitore con altezza fissa e scroll */
.history-container {
  max-height: 300px; /* Altezza massima */
  overflow-y: auto;  /* Scroll verticale */
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  background-color: #fff;
}

/* Rimuove la selezione del testo */
.list-group-item {
  user-select: none;
}

/* Hover leggero */
.list-group-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
