<template>
  <div class="search-container">
    <input 
      type="text" 
      v-model="searchQuery" 
      class="search-input" 
      placeholder="ابحث عن قطعة غيار..."
      @keypress.enter="performSearch"
    >
    <button class="search-btn" @click="performSearch">
      <i class="fas fa-search"></i>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    performSearch() {
      if (!this.searchQuery.trim()) {
        this.$store.commit('SET_IS_SEARCHING', false)
        this.$store.commit('SET_CURRENT_PAGE', 'products')
        return
      }

      this.$store.commit('SET_CURRENT_SEARCH_QUERY', this.searchQuery.trim())
      this.$store.commit('SET_IS_SEARCHING', true)
      this.$store.commit('SET_CURRENT_PAGE', 'products')
    }
  }
}
</script>

<style scoped>
search-container {
  display: flex;
  margin: 0 auto 5px;
  background: white;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  max-width: 650px;
  border: 2px solid #e2e8f0;
  transition: var(--transition);
}

.search-container:focus-within {
  border-color: var(--primary-color);
  box-shadow: 0 6px 20px rgba(249, 115, 22, 0.2);
}

.search-input {
  flex: 1;
  padding: 14px 22px;
  border: none;
  font-family: 'Cairo', sans-serif;
  font-size: 0.95rem;
  background: transparent;
}

.search-input:focus {
  outline: none;
}

.search-input::placeholder {
  color: #94a3b8;
}

.search-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0 25px;
  cursor: pointer;
  transition: var(--transition);
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-btn:hover {
  background: var(--primary-dark);
}

@media (max-width: 768px) {
  .search-container {
    max-width: 90%;
  }
  
  .search-input {
    padding: 12px 18px;
  }
  
  .search-btn {
    padding: 0 20px;
  }
}
</style>
