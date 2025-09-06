import Vue from 'vue'
import Vuex from 'vuex'
import { database } from './firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPage: 'home',
    currentCategory: 'الكل',
    categories: [],
    products: [],
    offers: [],
    cart: [],
    productMap: {},
    offerMap: {},
    isSearching: false,
    currentSearchQuery: '',
    rotatingBanners: [
      {
        icon: 'fas fa-heart',
        title: 'راحتكم أولويتنا',
        description: 'تسوقوا بثقة – متجركم المفضل أصبح بين يديكم!',
        color: '#f97316',
        background: '#fff7ed'
      },
      {
        icon: 'fas fa-star',
        title: 'إختيارك يبدأ من هنا',
        description: 'نوفر الأفضل، ونختار بعناية!',
        color: '#3b82f6',
        background: '#eff6ff'
      },
      {
        icon: 'fas fa-eye',
        title: 'الشفافية أساس تعاملنا',
        description: 'أسعارنا وعروضنا واضحة للجميع، ولا تختلف من شخص لآخر!',
        color: '#8b5cf6',
        background: '#f5f3ff'
      },
      {
        icon: 'fas fa-smile',
        title: 'نسعد بخخدمتكم دائمًا',
        description: 'رضاكم هدفنا – وخدمتكم فخر لنا!',
        color: '#ec4899',
        background: '#fdf2f8'
      }
    ],
    currentBannerIndex: 0
  },
  mutations: {
    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page
    },
    SET_CURRENT_CATEGORY(state, category) {
      state.currentCategory = category
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_OFFERS(state, offers) {
      state.offers = offers
    },
    SET_PRODUCT_MAP(state, productMap) {
      state.productMap = productMap
    },
    SET_OFFER_MAP(state, offerMap) {
      state.offerMap = offerMap
    },
    ADD_TO_CART(state, item) {
      const existingItem = state.cart.find(cartItem => 
        cartItem.id === item.id && cartItem.isOffer === item.isOffer
      )
      
      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
        state.cart.push(item)
      }
    },
    REMOVE_FROM_CART(state, { id, isOffer }) {
      state.cart = state.cart.filter(item => 
        !(item.id === id && item.isOffer === isOffer)
      )
    },
    UPDATE_QUANTITY(state, { id, isOffer, quantity }) {
      const item = state.cart.find(item => 
        item.id === id && item.isOffer === isOffer
      )
      if (item) {
        item.quantity = quantity
      }
    },
    SET_IS_SEARCHING(state, isSearching) {
      state.isSearching = isSearching
    },
    SET_CURRENT_SEARCH_QUERY(state, query) {
      state.currentSearchQuery = query
    },
    CLEAR_CART(state) {
      state.cart = []
    },
    ROTATE_BANNER(state) {
      state.currentBannerIndex = (state.currentBannerIndex + 1) % state.rotatingBanners.length
    }
  },
  actions: {
    async loadCategories({ commit }) {
      const snapshot = await database.ref('categories').once('value')
      let categories = []
      
      if (snapshot.exists()) {
        categories = Object.values(snapshot.val())
      } else {
        categories = [
          "الكل",
          "القطع الهيكلية",
          "قطع المحرك",
          "القطع الإلكترونية والكهربائية",
          "نظام الحركة",
          "المصابيح والإشارات",
          "الإطارات",
          "الزينة والإكسسوارات",
          "القطع العامة",
          "الزيوت"
        ]
      }

      if (!categories.includes('الكل')) {
        categories.unshift('الكل')
      }

      commit('SET_CATEGORIES', categories)
    },
    async loadProducts({ commit }) {
      const snapshot = await database.ref('products').once('value')
      const products = []
      const productMap = {}
      
      if (snapshot.exists()) {
        snapshot.forEach(child => {
          const product = child.val()
          productMap[child.key] = product
          products.push({ id: child.key, ...product })
        })
      }
      
      commit('SET_PRODUCTS', products)
      commit('SET_PRODUCT_MAP', productMap)
    },
    async loadOffers({ commit }) {
      const snapshot = await database.ref('offers').once('value')
      const offers = []
      const offerMap = {}
      
      if (snapshot.exists()) {
        snapshot.forEach(child => {
          const offer = child.val()
          offerMap[child.key] = offer
          
          // حذف العروض المنتهية
          if (offer.autoDelete && offer.endDate) {
            const endDate = new Date(offer.endDate)
            const now = new Date()
            
            if (endDate <= now) {
              database.ref('offers/' + child.key).remove()
              return
            }
          }
          
          offers.push({ id: child.key, ...offer })
        })
      }
      
      commit('SET_OFFERS', offers)
      commit('SET_OFFER_MAP', offerMap)
    },
    addToCart({ commit }, item) {
      commit('ADD_TO_CART', item)
    },
    removeFromCart({ commit }, payload) {
      commit('REMOVE_FROM_CART', payload)
    },
    updateQuantity({ commit }, payload) {
      commit('UPDATE_QUANTITY', payload)
    },
    clearCart({ commit }) {
      commit('CLEAR_CART')
    },
    rotateBanner({ commit }) {
      commit('ROTATE_BANNER')
    }
  },
  getters: {
    cartCount: state => {
      return state.cart.reduce((total, item) => total + item.quantity, 0)
    },
    filteredProducts: state => {
      if (state.currentCategory === 'الكل') {
        return state.products
      }
      return state.products.filter(product => 
        product.category === state.currentCategory
      )
    },
    searchResults: state => {
      const query = state.currentSearchQuery.toLowerCase()
      return state.products.filter(product => {
        const searchFields = [
          product.name,
          product.description,
          product.category,
          product.brand
        ].join(' ').toLowerCase()
        return searchFields.includes(query)
      })
    },
    cartTotal: state => {
      return state.cart.reduce((total, item) => {
        const priceStr = item.price.replace(/[^0-9]/g, '')
        const price = parseInt(priceStr) || 0
        return total + (price * item.quantity)
      }, 0)
    },
    currentBanner: state => {
      return state.rotatingBanners[state.currentBannerIndex]
    }
  }
})
