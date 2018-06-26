<template>
    <div class="pr">
      <template v-if="online === 1">
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
      type: Number,
      default: 1
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