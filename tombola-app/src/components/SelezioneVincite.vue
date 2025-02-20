<template>
  <div class="container mt-4">
    <h5 class="fw-bold">Seleziona Vincite</h5>
    <div class="list-group">
      <div v-for="(vincita, key) in vincite" :key="key" class="list-group-item d-flex flex-column">
        <div class="d-flex align-items-center w-100">
          <input 
            type="checkbox" 
            :id="key" 
            v-model="vincita.checked"
            :disabled="vincita.winners.length > 0"
            class="form-check-input me-2"
            @change="openModal(key)"
          />
          <label :for="key" class="me-auto fw-bold">{{ vincita.label }}</label>
        </div>

        <!-- Lista dei vincitori con pulsante "Annulla" per ciascuno -->
        <ul v-if="vincita.winners.length > 0" class="mt-2 ps-3">
          <li v-for="(winner, index) in vincita.winners" :key="index" class="d-flex align-items-center justify-content-between p-1">
            <span class="text-success fw-semibold">{{ winner }}</span>
            <button @click="removeWinner(key, index)" class="btn btn-sm btn-outline-danger"><i class="bi bi-x"></i></button>
          </li>
        </ul>

        <!-- Pulsante "Aggiungi Altro" -->
        <button v-if="vincita.winners.length > 0" @click="openModal(key)" class="btn btn-sm btn-primary mt-2">
          <i class="bi bi-plus pe-2"></i>Aggiungi Vincitore
        </button>
      </div>
    </div>

    <!-- Modal gestito con Vue -->
    <div v-if="showModal" class="modal modal-backdrop">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Inserisci il nome del vincitore</h5>
            <button type="button" class="btn-close" @click="cancelSelection"></button>
          </div>
          <div class="modal-body">
            <input v-model="winnerName" type="text" class="form-control" placeholder="Nome vincitore" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="cancelSelection">Annulla</button>
            <button type="button" class="btn btn-primary" @click="confirmWinner">Conferma</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const vincite = ref({
      ambo: { label: 'Ambo', checked: false, winners: [] },
      terno: { label: 'Terno', checked: false, winners: [] },
      quaterna: { label: 'Quaterna', checked: false, winners: [] },
      cinquina: { label: 'Cinquina', checked: false, winners: [] },
      tombola: { label: 'Tombola', checked: false, winners: [] }
    });

    const winnerName = ref('');
    const selectedKey = ref(null);
    const showModal = ref(false);

    function openModal(key) {
      selectedKey.value = key;
      winnerName.value = '';
      showModal.value = true;
    }

    function confirmWinner() {
      if (winnerName.value.trim()) {
        vincite.value[selectedKey.value].winners.push(winnerName.value);
        vincite.value[selectedKey.value].checked = true;
      } else {
        vincite.value[selectedKey.value].checked = false;
      }
      showModal.value = false;
    }

    function cancelSelection() {
      if (selectedKey.value && vincite.value[selectedKey.value].winners.length === 0) {
        vincite.value[selectedKey.value].checked = false;
      }
      showModal.value = false;
    }

    function removeWinner(key, index) {
      vincite.value[key].winners.splice(index, 1);
      if (vincite.value[key].winners.length === 0) {
        vincite.value[key].checked = false;
      }
    }

    return { vincite, winnerName, showModal, openModal, confirmWinner, removeWinner, cancelSelection };
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-dialog {
  background: white;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
