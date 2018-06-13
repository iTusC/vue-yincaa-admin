<template>
    <div class="pr">
      <template v-if="online">
        <img src="../../src/assets/invalid-name2.png" alt="">
      </template>
      <template v-else>
        <img src="../../src/assets/invalid-name2.png" alt="">
      </template>
    </div>
</template>
<script >
export default {
  props: {
    online: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      
    };
  }
};
</script>

<style scoped>
.pr{
  position: relative;
}

</style>