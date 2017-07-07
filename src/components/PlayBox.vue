<template>
  <div id="play-box">
    <div class="play-box-main">
      <play-box-album-cover></play-box-album-cover>
      <div class="play-box-controllers">
        <h1>Boyfriend</h1>
        <h2>Justin Bieber</h2>
        <div class="play-box-controller-buttons">
          <play-box-control-button size="big" icon="play_arrow"></play-box-control-button>
          <play-box-control-button icon="skip_previous"></play-box-control-button>
          <play-box-control-button icon="skip_next"></play-box-control-button>
          <play-box-volume-controller></play-box-volume-controller>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PlayBoxAlbumCover from './PlayBoxAlbumCover.vue'
  import PlayBoxControlButton from './PlayBoxControlButton.vue'
  import PlayBoxVolumeController from './PlayBoxVolumeController.vue'

  export default {
    components: {
      PlayBoxAlbumCover,
      PlayBoxControlButton,
      PlayBoxVolumeController,
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