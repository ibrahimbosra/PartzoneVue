<template>
  <div class="hero">
    <h2>أفضل قطع الغيار للدراجات النارية</h2>
    <p>جودة عالية وأسعار تنافسية</p>
    <button class="btn" @click="showPage('products')">تصفح المنتجات الآن</button>
  </div>
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
.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://i.ibb.co/0jF7kWmL/chinese-motorcycles.jpg');
  background-size: cover;
  background-position: center;
  border-radius: var(--border-radius);
  padding: 50px 25px;
  margin: 5px 0 15px;
  color: white;
  text-align: center;
  box-shadow: var(--box-shadow);
  animation: fadeIn 1s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.hero h2 {
  font-size: 2rem;
  margin-bottom: 15px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.hero p {
  font-size: 1rem;
  max-width: 600px;
  margin: 0 auto 25px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

@media (max-width: 768px) {
  .hero {
    padding: 30px 15px;
    min-height: 280px;
  }
  
  .hero h2 {
    font-size: 1.7rem;
  }
  
  .hero p {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 20px 12px;
    min-height: 250px;
  }
  
  .hero h2 {
    font-size: 1.5rem;
  }
  
  .hero p {
    font-size: 0.9rem;
  }
}
</style>
