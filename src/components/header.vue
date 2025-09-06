<template>
  <header>
    <div class="header-content">
      <div class="logo" @click="showPage('home')">
        <i class="fas fa-motorcycle"></i>
        <h1>PARTZONE</h1>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    showPage(page) {
      this.$store.commit('SET_CURRENT_PAGE', page)
    }
  }
}
</script>

<style scoped>
header {
  background: linear-gradient(to right, var(--dark-color), #0f172a);
  color: var(--light-color);
  text-align: center;
  padding: 0.5rem;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.logo i {
  color: var(--primary-color);
  font-size: 1.5rem;
}

.logo h1 {
  font-size: 1.3rem;
  font-weight: 700;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 12px;
  }
  
  .logo h1 {
    font-size: 1.2rem;
  }
}
</style>
