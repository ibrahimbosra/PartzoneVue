<template>
  <div class="product-details-container">
    <div class="product-details-card" v-if="product">
      <div class="product-image-large">
        <img v-if="product.imageUrl" :src="product.imageUrl" :alt="product.name">
        <i v-else class="fas fa-cog"></i>
      </div>
      <h2>{{ product.name }}</h2>
      <p class="description">{{ product.description || 'لا يوجد وصف متاح' }}</p>
      <p class="price">{{ product.price }}</p>
      
      <table v-if="product.specifications" class="specs-table">
        <tr>
          <th colspan="2">مواصفات المنتج</th>
        </tr>
        <tr v-for="(value, key) in product.specifications" :key="key">
          <td>{{ key }}</td>
          <td>{{ value }}</td>
        </tr>
      </table>
      
      <button class="add-to-cart-btn" @click="addToCart">إضافة إلى السلة</button>
      <button class="back-btn" @click="goBack">العودة</button>
    </div>
    
    <div v-else class="empty-category">
      <i class="fas fa-exclamation-circle"></i>
      <h3>المنتج غير موجود</h3>
      <p>عذراً، لم نتمكن من العثور على المنتج المطلوب</p>
      <button class="btn" @click="goBack">العودة إلى المنتجات</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    product() {
      const productId = this.$store.state.productDetailsId
      return this.$store.state.productMap[productId]
    }
  },
  methods: {
    addToCart() {
      this.$store.dispatch('addToCart', {
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        imageUrl: this.product.imageUrl,
        quantity: 1,
        isOffer: false
      })
      
      this.$store.commit('SHOW_NOTIFICATION', `تم إضافة "${this.product.name}" إلى السلة`)
    },
    goBack() {
      if (this.$store.state.isSearching) {
        this.$store.commit('SET_CURRENT_PAGE', 'products')
      } else {
        this.$store.commit('SET_CURRENT_PAGE', 'products')
      }
    }
  }
}
</script>

<style scoped>
.product-details-container {
  max-width: 750px;
  margin: 0 auto;
  padding: 15px;
}

.product-details-card {
  background: white;
  border-radius: var(--border-radius);
  padding: 25px;
  box-shadow: var(--box-shadow);
  text-align: center;
}

.product-image-large {
  height: 250px;
  background-color: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  border-radius: var(--border-radius);
}

.product-image-large img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.product-details-card h2 {
  font-size: 1.7rem;
  margin-bottom: 12px;
  color: var(--dark-color);
}

.description {
  color: var(--gray-color);
  font-size: 1rem;
  margin-bottom: 15px;
}

.price {
  font-size: 1.5rem;
  color: var(--primary-dark);
  font-weight: bold;
  margin-bottom: 25px;
}

.specs-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  text-align: right;
}

.specs-table th, .specs-table td {
  padding: 10px 12px;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.9rem;
}

.specs-table th {
  background-color: #f8fafc;
  color: var(--dark-color);
  font-weight: 700;
}

.specs-table tr:last-child td {
  border-bottom: none;
}

.add-to-cart-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 10px 25px;
  font-family: 'Cairo', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
  display: block;
  width: 100%;
  margin-bottom: 12px;
}

.add-to-cart-btn:hover {
  background: var(--primary-dark);
}

.back-btn {
  background: #e2e8f0;
  color: var(--dark-color);
  border: none;
  border-radius: 30px;
  padding: 10px 25px;
  font-family: 'Cairo', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
  display: block;
  width: 100%;
}

.back-btn:hover {
  background: #cbd5e1;
}

.empty-category {
  text-align: center;
  padding: 35px 15px;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  margin-top: 25px;
}

.empty-category i {
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 15px;
  display: block;
}

.empty-category h3 {
  font-size: 1.4rem;
  color: var(--dark-color);
  margin-bottom: 15px;
}

.empty-category p {
  color: var(--gray-color);
  font-size: 1rem;
  line-height: 1.7;
  max-width: 650px;
  margin: 0 auto 25px;
}
</style>
