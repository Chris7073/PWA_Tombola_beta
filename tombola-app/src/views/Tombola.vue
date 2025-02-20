<template>
  <div class="app">
    <NavbarGame 
      :numeriEstratti="numeriEstratti" 
      @estrai="estraiNumero" 
      @reset="resetGame"
      @updateSettings="aggiornaSettings"
    />

    <!-- Overlay per il numero estratto (compare solo se attivato dalle impostazioni) -->
    <div v-if="settings.mostraOverlay && mostraOverlay" class="overlay d-flex align-items-center justify-content-center text-center">
      <div class="estrazione badge text-bg-primary animate__animated animate__zoomIn">
        <div class="numero">{{ ultimoNumero }}</div>
        <div class="significato mt-2">{{ smorfia[ultimoNumero] || "Nessun significato" }}</div>
      </div>
    </div>

    <div class="container-fluid mt-3">
      <div class="row">
        <!-- Tabellone -->
        <div class="col-12 col-md-9">
          <Tabellone :numeriEstratti="numeriEstratti" />
        </div>

        <!-- Cronologia -->
        <div class="col-12 col-md-3 overflow-auto" style="max-height: 80vh;">
  <Cronologia :numeriEstratti="numeriEstratti" @rimuoviUltimo="rimuoviUltimoNumero" />
  <SelezioneVincite />
</div>

      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { smorfia } from "../data/smorfia";
import { Modal } from "bootstrap";
import NavbarGame from "../components/NavbarGame.vue";
import Tabellone from "../components/Tabellone.vue";
import Cronologia from "../components/Cronologia.vue";
import SelezioneVincite from "../components/SelezioneVincite.vue";

export default {
  components: {
    NavbarGame,
    Tabellone,
    Cronologia,
    SelezioneVincite,
  },
  setup() {
    const numeriEstratti = ref([]);
    const numeriDisponibili = ref([...Array(90).keys()].map(n => n + 1));
    const ultimoNumero = ref(null);
    const mostraOverlay = ref(false);
    const isDropdownOpen = ref(false);
    
    // Impostazioni iniziali
    const settings = ref({
      mostraOverlay: true,
      animDuration: 3
    });

    function estraiNumero() {
      if (numeriDisponibili.value.length === 0) return;

      const index = Math.floor(Math.random() * numeriDisponibili.value.length);
      const numero = numeriDisponibili.value[index];
      numeriEstratti.value.push(numero);
      numeriDisponibili.value.splice(index, 1);

      ultimoNumero.value = numero;

      if (settings.value.mostraOverlay) {
        mostraOverlay.value = true;
        setTimeout(() => {
          mostraOverlay.value = false;
          ultimoNumero.value = null;
        }, settings.value.animDuration * 1000);
      } else {
        setTimeout(() => {
          ultimoNumero.value = null;
        }, 3000);
      }
    }

    function resetGame() {
      numeriEstratti.value = [];
      numeriDisponibili.value = [...Array(90).keys()].map(n => n + 1);
      ultimoNumero.value = null;
    }

    function rimuoviUltimoNumero() {
      if (numeriEstratti.value.length > 0) {
        const numeroRimosso = numeriEstratti.value.pop();
        numeriDisponibili.value.push(numeroRimosso);
        numeriDisponibili.value.sort((a, b) => a - b);
      }
    }

    function aggiornaSettings(newSettings) {
      settings.value = newSettings;
    }

    return { 
      numeriEstratti, 
      estraiNumero, 
      resetGame, 
      rimuoviUltimoNumero, 
      ultimoNumero, 
      mostraOverlay, 
      settings,
      aggiornaSettings,
      smorfia,
      isDropdownOpen
    };
  }
};
</script>


<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  z-index: 1050;
}

.estrazione {
  font-size: 6rem;
  padding: 20px 40px;
  border-radius: 20px;
}

.numero {
  font-size: 8rem;
  font-weight: bold;
}

.significato {
  font-size: 2rem;
  font-style: italic;
  color: #fff;
}
</style>
