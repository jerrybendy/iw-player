<template>
  <div id="play-box" class="mu-paper mu-paper-3">
    <div class="play-box-main">
      <play-box-album-cover :src="current.albumCover"></play-box-album-cover>
      <div class="play-box-controllers">
        <h1>{{ current.title || '-' }}</h1>
        <h2>{{ current.artist || '-' }}</h2>
        <div class="play-box-controller-buttons">
          <play-box-control-button size="big"
                                   :icon="isPlaying ? 'pause' : 'play_arrow'"
                                   @click.native="togglePlayState"
          ></play-box-control-button>
          <play-box-control-button icon="skip_previous" @click.native="prevSound"></play-box-control-button>
          <play-box-control-button icon="skip_next" @click.native="nextSound"></play-box-control-button>
          <play-box-volume-controller></play-box-volume-controller>
        </div>
      </div>
    </div>
    <play-box-progress></play-box-progress>
  </div>
</template>

<script>
  import PlayBoxAlbumCover from './PlayBoxAlbumCover.vue'
  import PlayBoxControlButton from './PlayBoxControlButton.vue'
  import PlayBoxVolumeController from './PlayBoxVolumeController.vue'
  import PlayBoxProgress from './PlayBoxProgress.vue'
  import playStateTypes from '../stores/playState/types'

  export default {
    components: {
      PlayBoxAlbumCover,
      PlayBoxControlButton,
      PlayBoxVolumeController,
      PlayBoxProgress,
    },

    computed: {
      isPlaying () {
        return this.$store.state.playState.isPlaying
      },
      current () {
        return this.$store.state.playState.current
      },
    },

    methods: {
      togglePlayState () {
        if (this.isPlaying) {
          this.$store.commit(playStateTypes.PAUSE)
        } else {
          this.$store.commit(playStateTypes.PLAY)
        }
      },
      prevSound () {
        const prev = this.$store.getters.prevSound
        this.$store.commit(playStateTypes.PLAY_FROM_LIST, prev)
      },
      nextSound () {
        const next = this.$store.getters.nextSound
        this.$store.commit(playStateTypes.PLAY_FROM_LIST, next)
      },
    }
  }
</script>

<style lang="less">
  @import '../styles/var';
  @import '../styles/mixins';

  #play-box {
    padding: 10px;
    border-radius: 5px 5px 0 0;
    background: linear-gradient(to bottom,  #393939 0%,#262626 100%);

    .play-box-main {
      display: flex;
      margin-bottom: 6px;
    }

    .play-box-controllers {
      flex: 1;
      width: 0;

      // Song's name
      h1 {
        color: #FFF;
        font-size: 14px;
        font-weight: 500;
        margin: 5px 0 0;
        .ellipsis();
      }

      // Artist or album
      h2 {
        color: #DCDCDC;
        font-size: 12px;
        font-weight: 200;
        margin: 0 0 10px;
        .ellipsis();
      }
    }

    .play-box-controller-buttons {
      display: flex;
      align-items: center;
    }
  }

</style>