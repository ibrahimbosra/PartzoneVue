<template>
  <div id="home-page">
    <Hero />
    <RotatingBanners />
  </div>
</template>

<script>
import Hero from '@/components/Hero'
import RotatingBanners from '@/components/RotatingBanners'

export default {
  components: {
    Hero,
    RotatingBanners
  }
}
</script>
