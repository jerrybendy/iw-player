<template>
  <div id="play-box" class="mu-paper mu-paper-3">
    <div class="play-box-main">
      <play-box-album-cover :src="albumCover"></play-box-album-cover>
      <div class="play-box-controllers">
        <h1>{{ title }}</h1>
        <h2>{{ artist }}</h2>
        <div class="play-box-controller-buttons">
          <play-box-control-button size="big"
                                   :icon="isPlaying ? 'pause' : 'play_arrow'"
                                   @click.native="togglePlayState"
          ></play-box-control-button>
          <play-box-control-button icon="skip_previous"></play-box-control-button>
          <play-box-control-button icon="skip_next"></play-box-control-button>
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
      title () {
        return this.$store.state.playState.title || '-'
      },
      artist () {
        return this.$store.state.playState.artist || '-'
      },
      albumCover () {
        return this.$store.state.playState.albumCover
      }
    },

    methods: {
      togglePlayState () {
        if (this.isPlaying) {
          this.$store.commit(playStateTypes.PAUSE)
        } else {
          this.$store.commit(playStateTypes.PLAY)
        }
      }
    }
  }
</script>

<style lang="less">
  @import '../styles/var';

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

      // Song's name
      h1 {
        color: #FFF;
        font-size: 14px;
        font-weight: 500;
        margin: 5px 0 0;
      }

      // Artist or album
      h2 {
        color: #DCDCDC;
        font-size: 12px;
        font-weight: 200;
        margin: 0 0 10px;
      }
    }

    .play-box-controller-buttons {
      display: flex;
      align-items: center;
    }
  }

</style>