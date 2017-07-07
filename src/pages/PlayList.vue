<template>
  <div id="play-list">
    <play-list-item></play-list-item>
    <play-list-item></play-list-item>
    <play-list-item></play-list-item>
    <play-list-item></play-list-item>
    <play-list-item></play-list-item>
  </div>
</template>

<script>
  import PlayListItem from '../components/PlayListItem.vue'

  export default {
    components: {
      PlayListItem,
    }
  }
</script>

<style lang="less">

</style>