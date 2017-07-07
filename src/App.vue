<template>
  <div id="app">
    <play-box></play-box>

    <router-view></router-view>
  </div>
</template>

<script>
  import PlayBox from './components/PlayBox.vue'
  import 'muse-ui/dist/muse-ui.css'
  import './styles/style.less'

  export default {
    name: 'app',
    components: {
      PlayBox,
    }
  }
</script>
