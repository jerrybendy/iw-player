<template>
  <div class="play-box-volume-controller">
    <mu-icon :value="isMute ? 'volume_off' : 'volume_up'" :size="16" color="#DCDCDC" @click="toggleMute"></mu-icon>
    <div class="play-box-volume-controllers-content">
      <mu-slider :value="currentVolume"
                 :disabled="isMute"
                 :step="1"
                 :min="0"
                 :max="100"
                 @change="changeVolume"
      ></mu-slider>
    </div>
  </div>
</template>

<script>
  import playStateTypes from '../stores/playState/types'

  export default {
    data () {
      return {
      }
    },

    computed: {
      isMute () {
        return this.$store.state.playState.isMute
      },
      currentVolume () {
        return this.$store.state.playState.volume
      }
    },

    methods: {
      toggleMute () {
        this.$store.commit(playStateTypes.TOGGLE_MUTE)
      },
      changeVolume (volume) {
        this.$store.commit(playStateTypes.CHANGE_GAIN, volume)
      }
    }
  }
</script>

<style lang="less" scoped>
  .play-box-volume-controller {
    flex: 1;
    height: 30px;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    .mu-icon {
      cursor: pointer;
    }
  }
  .play-box-volume-controllers-content {
    width: 80px;
    margin-left: 5px;

    .mu-slider {
      margin: 0;
    }
  }
</style>