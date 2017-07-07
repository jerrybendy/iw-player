<template>
  <div class="play-box-volume-controller">
    <mu-icon :value="isMute ? 'volume_off' : 'volume_up'" :size="16" color="#DCDCDC" @click="toggleMute"></mu-icon>
    <div class="play-box-volume-controllers-content">
      <mu-slider v-model="currentVolume" :disabled="isMute" class="play-box-volume-slider"></mu-slider>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        currentVolume: 40,
        isMute: false,
      }
    },

    methods: {
      toggleMute () {
        this.isMute = !this.isMute
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