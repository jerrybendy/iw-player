<template>
  <div class="play-box-progress">
    <mu-slider :step="1" :min="0" :max="duration"
               :value="playbackTime"
               :disabled="duration === 0"
               @change="changePlaybackTime"></mu-slider>
    <span class="play-box-time-span">{{ playbackTime | numberToTime }} / {{ duration | numberToTime }}</span>
  </div>
</template>

<script>
  import audio from '../lib/audio'
  import playStateTypes from '../stores/playState/types'

  let getProgressTimer

  export default {

    created () {
      getProgressTimer = setInterval(() => {
        this.playbackTime = audio.currentTime
      }, 500)
    },

    destroyed () {
      if (getProgressTimer)
        clearInterval(getProgressTimer)
    },

    data () {
      return {
        playbackTime: 0,
      }
    },

    computed: {
      duration () {
        return parseInt(this.$store.state.playState.current.duration)
      },
    },

    methods: {
      changePlaybackTime (time) {
        this.$store.commit(playStateTypes.SEEK, time)
      }
    }
  }
</script>

<style lang="less">
  @import "../styles/var";

  .play-box-progress {
    display: flex;
    align-items: center;

    .mu-slider {
      margin: 0;
      cursor: pointer;

      .mu-slider-thumb {
        display: none !important;
      }
    }
  }

  .play-box-time-span {
    display: block;
    color: @MP-TEXT-COLOR;
    font-size: 10px;
    text-align: right;
    width: 9em;
  }
</style>