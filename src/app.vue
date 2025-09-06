<template>
  <div id="app">
    <Header />
    <SearchBar />
    
    <main class="page-container">
      <Home v-if="currentPage === 'home'" />
      <Products v-else-if="currentPage === 'products'" />
      <ProductDetails v-else-if="currentPage === 'product-details'" />
      <Offers v-else-if="currentPage === 'offers'" />
      <OfferDetails v-else-if="currentPage === 'offer-details'" />
      <CartPage v-else-if="currentPage === 'cart'" />
      <Contact v-else-if="currentPage === 'contact'" />
    </main>
    
    <Navigation />
  </div>
</template>

<script>
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import Navigation from '@/components/Navigation'
import Home from '@/views/Home'
import Products from '@/views/Products'
import ProductDetails from '@/views/ProductDetails'
import Offers from '@/views/Offers'
import OfferDetails from '@/views/OfferDetails'
import CartPage from '@/views/CartPage'
import Contact from '@/views/Contact'

export default {
  name: 'App',
  components: {
    Header,
    SearchBar,
    Navigation,
    Home,
    Products,
    ProductDetails,
    Offers,
    OfferDetails,
    CartPage,
    Contact
  },
  computed: {
    currentPage() {
      return this.$store.state.currentPage
    }
  },
  created() {
    this.$store.dispatch('loadCategories')
    this.$store.dispatch('loadProducts')
    this.$store.dispatch('loadOffers')
    
    // الاستماع للتحديثات في الوقت الحقيقي
    database.ref('products').on('value', (snapshot) => {
      const products = []
      const productMap = {}
      
      if (snapshot.exists()) {
        snapshot.forEach(child => {
          const product = child.val()
          productMap[child.key] = product
          products.push({ id: child.key, ...product })
        })
      }
      
      this.$store.commit('SET_PRODUCTS', products)
      this.$store.commit('SET_PRODUCT_MAP', productMap)
    })
    
    database.ref('offers').on('value', (snapshot) => {
      const offers = []
      const offerMap = {}
      
      if (snapshot.exists()) {
        snapshot.forEach(child => {
          const offer = child.val()
          offerMap[child.key] = offer
          offers.push({ id: child.key, ...offer })
        })
      }
      
      this.$store.commit('SET_OFFERS', offers)
      this.$store.commit('SET_OFFER_MAP', offerMap)
    })
  }
}
</script>

<style>
:root {
  --primary-color: #f97316;
  --primary-dark: #ea580c;
  --secondary-color: #10b981;
  --dark-color: #1e293b;
  --light-color: #f8fafc;
  --gray-color: #64748b;
  --border-radius: 12px;
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  --transition: all 0.3s ease;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Cairo', sans-serif;
  background: linear-gradient(135deg, #f9f9f9, #f1f5f9);
  color: var(--dark-color);
  padding-bottom: 80px;
  line-height: 1.6;
  overflow-x: hidden;
  font-size: 14px;
}

.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px;
  min-height: calc(100vh - 200px);
}

/* الأنيميشنات */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; display: none; }
}

/* الأزرار والعناصر العامة */
.btn {
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 12px 28px;
  font-family: 'Cairo', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
  display: inline-block;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);
  animation: pulse 2s infinite;
}

.btn:hover {
  background: var(--primary-dark);
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(249, 115, 22, 0.5);
  animation: none;
}

.section-title {
  text-align: center;
  margin: 15px 0 25px;
  font-size: 1.7rem;
  color: var(--dark-color);
  position: relative;
  padding-bottom: 12px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 70px;
  height: 3px;
  background: var(--primary-color);
  border-radius: 2px;
}

/* التكيف مع الشاشات المختلفة */
@media (max-width: 768px) {
  .page-container {
    padding: 10px;
  }
  
  .section-title {
    font-size: 1.5rem;
    margin: 10px 0 20px;
  }
  
  .btn {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.3rem;
  }
  
  body {
    font-size: 13px;
    padding-bottom: 70px;
  }
}
</style>
