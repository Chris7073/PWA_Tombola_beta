<template>
  <nav class="navbar sticky-top navbar-light bg-light shadow-sm">
    <div class="container-fluid d-flex justify-content-around">
      <span class="navbar-text">
        <i class="bi bi-2-circle-fill fs-3 pe-1 text-success"></i>
        <i class="bi bi-8-circle-fill fs-5 pe-2 text-danger"></i>
        <span class="fs-2">Tombola</span>
        <span class="fs-6"> (beta)</span>
      </span>

      <div class="d-flex align-items-center gap-3">
        <div class="d-flex align-items-center bg-white shadow-sm px-3 py-2 rounded">
          <span class="text-muted fs-6">
            Estratti: <strong class="text-primary">{{ numeriEstratti.length }}/90</strong>
          </span>
        </div>

        <button @click="$emit('estrai')" class="btn btn-primary d-flex align-items-center">
          <i class="bi bi-check-lg fs-6 me-2"></i> Estrai
        </button>

        <div class="dropdown" @click="toggleDropdown" @mouseleave="closeDropdown">
          <button class="btn btn-outline-primary dropdown-toggle" type="button">
            <i class="bi bi-list"></i> Partita
          </button>
          <ul v-show="isDropdownOpen" class="dropdown-menu show">
            <li>
              <button class="dropdown-item" @click="openSettingsModal">
                <i class="bi bi-gear me-2"></i> Impostazioni
              </button>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li>
              <button class="dropdown-item text-danger" @click="$emit('reset')">
                <i class="bi bi-arrow-counterclockwise me-2"></i> Reset partita
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>

  <!-- Modal Impostazioni -->
  <div class="modal fade" id="settingsModal" tabindex="-1" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"><i class="bi bi-gear-fill me-2"></i> Impostazioni Partita</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4">

          <!-- SEZIONE ANIMAZIONI -->
          <h5 class="fw-bold pt-2">Overlay Numero Estratto</h5>
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="overlayCheckbox" v-model="settings.mostraOverlay">
            <label class="form-check-label" for="overlayCheckbox">Attiva Overlay</label>
          </div>

          <div v-if="settings.mostraOverlay" class="mb-3">
            <label for="overlayDuration" class="form-label">
              Durata Overlay: {{ settings.animDuration }}s
            </label>
            <input type="range" class="form-range" id="overlayDuration" v-model="settings.animDuration" min="1" max="10">
          </div>

        </div>

        <!-- PULSANTI AZIONE -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
          <button type="button" class="btn btn-primary" @click="saveSettings">
            <i class="bi bi-save me-2"></i> Salva Impostazioni
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";

export default {
  props: {
    numeriEstratti: {
      type: Array,
      required: true
    }
  },
  emits: ["estrai", "reset", "updateSettings"],
  setup(_, { emit }) {
    const settings = ref({
      mostraOverlay: true,
      animDuration: 3
    });

    let modal = null;
    const isDropdownOpen = ref(false);

    onMounted(() => {
      modal = new Modal(document.getElementById("settingsModal"));
    });

    function openSettingsModal() {
      modal.show();
      isDropdownOpen.value = false;
    }

    function saveSettings() {
      emit("updateSettings", settings.value);
      modal.hide();
    }

    function toggleDropdown() {
      isDropdownOpen.value = !isDropdownOpen.value;
    }

    function closeDropdown() {
      isDropdownOpen.value = false;
    }

    return { settings, openSettingsModal, saveSettings, isDropdownOpen, toggleDropdown, closeDropdown };
  }
};
</script>
