<template>
  <nav>
    <button 
      :class="['nav-btn', { active: currentPage === 'home' }]" 
      @click="showPage('home')"
    >
      <i class="fas fa-home"></i>
      <span>الرئيسية</span>
    </button>
    <button 
      :class="['nav-btn', { active: currentPage === 'products' }]" 
      @click="showPage('products')"
    >
      <i class="fas fa-motorcycle"></i>
      <span>المنتجات</span>
    </button>
    <button 
      :class="['nav-btn', { active: currentPage === 'offers' }]" 
      @click="showPage('offers')"
    >
      <i class="fas fa-tags"></i>
      <span>العروض</span>
    </button>
    <button 
      :class="['nav-btn', { active: currentPage === 'cart' }]" 
      @click="showPage('cart')"
    >
      <i class="fas fa-shopping-cart"></i>
      <span>السلة</span>
      <span class="cart-count-nav">{{ cartCount }}</span>
    </button>
    <button 
      :class="['nav-btn', { active: currentPage === 'contact' }]" 
      @click="showPage('contact')"
    >
      <i class="fas fa-phone"></i>
      <span>التواصل</span>
    </button>
  </nav>
</template>

<script>
export default {
  computed: {
    currentPage() {
      return this.$store.state.currentPage
    },
    cartCount() {
      return this.$store.getters.cartCount
    }
  },
  methods: {
    showPage(page) {
      this.$store.commit('SET_CURRENT_PAGE', page)
    }
  }
}
</script>

<style scoped>
nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #e2e8f0;
  box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.08);
  padding: 8px 0;
  z-index: 100;
}

.nav-btn {
  background: none;
  border: none;
  padding: 6px 4px;
  text-align: center;
  flex: 1;
  color: var(--gray-color);
  font-size: 0.75rem;
  transition: var(--transition);
  position: relative;
}

.nav-btn.active, .nav-btn:hover {
  color: var(--primary-color);
}

.nav-btn.active::after {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 3px;
  background: var(--primary-color);
  border-radius: 2px;
}

.nav-btn i {
  display: block;
  font-size: 1.3rem;
  margin-bottom: 4px;
}

.cart-count-nav {
  position: absolute;
  top: 0;
  right: 2px;
  background: var(--secondary-color);
  color: white;
  font-size: 0.65rem;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
