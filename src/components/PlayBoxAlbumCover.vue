<template>
  <div class="frame">
    <img :src="src" alt="">
  </div>
</template>

<script>
  export default {
    props: {
      src: {
        type: String,
        'default': 'static/images/default-album-cover.jpg',
      }
    },
  }
</script>

<style lang="less" scoped>
  .frame {
    width: 90px;
    height: 90px;
    border-radius: 5px;
    border: 1px solid #000;
    margin-right: 8px;
  }

  img {
    width: 90px;
    height: 90px;
    border-radius: 5px;
  }
</style>