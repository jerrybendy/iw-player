<template>
  <div id="app">
    <play-box></play-box>

    <mu-tabs id="main-nav" :value="currentTab" @change="changeTab">
      <mu-tab value="PlayList" icon="queue_music"></mu-tab>
      <mu-tab value="2" icon="album"></mu-tab>
      <mu-tab value="3" icon="radio"></mu-tab>
    </mu-tabs>

    <play-list v-show="currentTab === 'PlayList'" class="main-page-content"></play-list>
  </div>
</template>

<script>
  import PlayBox from './components/PlayBox.vue'
  import PlayList from './pages/PlayList.vue'
  import 'muse-ui/dist/muse-ui.css'
  import './styles/style.less'

  export default {
    name: 'app',
    components: {
      PlayBox,
      PlayList,
    },
    data () {
      return {
        currentTab: 'PlayList',
      }
    },
    methods: {
      changeTab (val) {
        this.currentTab = val
      }
    }
  }
</script>

<style lang="less">
  @import "styles/var";

  html, body, #app {
    height: 100%;
  }

  #app {
    display: flex;
    flex-direction: column;
  }

  .main-page-content {
    flex: 1;
  }

  #main-nav {
    height: 30px;

    .mu-tab-link {
      min-height: 30px;
      padding: 0;

      .mu-icon {
        font-size: 20px;
      }
    }

    .mu-tab-active {
      .mu-icon {
        color: @MP-PRIMARY-COLOR;
      }
    }

    .mu-tab-link-highlight {
      background-color: @MP-PRIMARY-COLOR;
    }
  }
</style>
