<template>
  <div class="play-box-progress">
    <!--<mu-linear-progress mode="determinate" :value="50"></mu-linear-progress>-->
    <mu-slider :step="1" :min="0" :max="duration"
               :value="playbackTime"
               :disabled="duration === 0"
               @change="changePlaybackTime"></mu-slider>
    <span class="play-box-time-span">{{ playbackTime | numberToTime }} / {{ duration | numberToTime }}</span>
  </div>
</template>

<script>
  import playStateTypes from '../stores/playState/types'

  export default {
    computed: {
      duration () {
        return parseInt(this.$store.state.playState.current.duration)
      },
      playbackTime () {
        return parseInt(this.$store.state.playState.playbackTime)
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