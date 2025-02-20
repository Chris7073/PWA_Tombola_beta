<template>
  <div class="container text-center mt-3">
    <div class="row">
      <div class="col-md-6 col-12" v-for="(tabella, index) in tabelle" :key="index">
        <table class="table table-bordered text-center bg-white">
          <tbody>
            <tr v-for="riga in 3" :key="'riga-' + riga">
              <td
                v-for="colonna in 5"
                :key="'colonna-' + colonna"
                class="fs-4 cella"
                :class="{
                  'bg-primary text-white': numeriEstratti.includes(tabella[(riga - 1) * 5 + (colonna - 1)]),
                  'bg-light': !numeriEstratti.includes(tabella[(riga - 1) * 5 + (colonna - 1)]),
                  'bg-success':vincite[index]?.tombola
                }"
              >
                {{ tabella[(riga - 1) * 5 + (colonna - 1)] }}
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="vincite[index]?.tombola" class="fw-bold text-danger">🎉 TOMBOLA! 🎉</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Disabilita la selezione del testo */
.cella {
  user-select: none;
  transition: background-color 0.2s ease-in-out;
}

/* Effetto hover */
.cella:hover {
  filter: brightness(85%);
  cursor: pointer;
}

/* Stile della tabella in caso di TOMBOLA */
.table-danger {
  background-color: red !important;
  color: white !important;
}
</style>

<script>
export default {
  props: {
    numeriEstratti: Array,
  },
  data() {
    return {
      tabelle: [
        [1, 2, 3, 4, 5, 11, 12, 13, 14, 15, 21, 22, 23, 24, 25], 
        [6, 7, 8, 9, 10, 16, 17, 18, 19, 20, 26, 27, 28, 29, 30], 
        [31, 32, 33, 34, 35, 41, 42, 43, 44, 45, 51, 52, 53, 54, 55], 
        [36, 37, 38, 39, 40, 46, 47, 48, 49, 50, 56, 57, 58, 59, 60], 
        [61, 62, 63, 64, 65, 71, 72, 73, 74, 75, 81, 82, 83, 84, 85], 
        [66, 67, 68, 69, 70, 76, 77, 78, 79, 80, 86, 87, 88, 89, 90]
      ],
    };
  },
  computed: {
    vincite() {
      const risultati = this.tabelle.map(tabella => ({
        tombola: tabella.every(num => this.numeriEstratti.includes(num)), // Controlla se tutti i numeri della tabella sono stati estratti
      }));
      
      console.log("Vincite:", risultati); // 🔍 Debug
      return risultati;
    },
  },
};
</script>
