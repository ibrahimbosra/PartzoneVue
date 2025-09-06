<template>
  <div class="notification">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.$emit('close')
    }, 3000)
  }
}
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: var(--secondary-color);
  color: white;
  padding: 15px 25px;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  z-index: 1000;
  animation: fadeIn 0.3s ease, fadeOut 0.3s ease 2.5s forwards;
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; display: none; }
}
</style>
