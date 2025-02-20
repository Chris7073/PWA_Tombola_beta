<template>
    <div class="background">
      <div class="overlay d-flex justify-content-center align-items-center vh-100">
        <div class="row">
          <div class="col-12">
            <div class="card text-center shadow-lg p-4">
              <div class="card-body">
                <h1 class="fw-bold mb-4">🎉 Tombola</h1>
                <div class="d-grid gap-2">
                  <router-link to="/tombola" class="btn btn-primary btn-lg d-flex align-items-center">
                    <i class="bi bi-play fs-4"></i>
                    <span class="ms-3 flex-grow-1">Inizia il Gioco</span>
                  </router-link>
                </div>
              </div>
              <p>Tombola 2025 (beta)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .background {
    background: url("../assets/bg.jpg") no-repeat center center fixed;
    background-size: cover;
    height: 100vh;
    position: relative;
  }
  
  .overlay {
    backdrop-filter: blur(6px); /* Effetto sfocato */
    width: 100%;
    height: 100%;
  }
  </style>
  