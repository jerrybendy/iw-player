<template>
  <div class="play-box-control-button" :class="`play-box-control-button-${ size }`">
    <mu-icon :value="icon" color="#DCDCDC" :size="iconSizeMap[size]"></mu-icon>
  </div>
</template>

<script>
  export default {
    props: {
      size: {
        type: String,
        'default': 'normal',
      },
      icon: {
        type: String,
        'default': '',
      }
    },

    data () {
      return {
        iconSizeMap: {
          big: 20,
          normal: 16,
        }
      }
    }
  }
</script>

<style lang="less">
  .play-box-control-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 6px;
    text-align: center;
    border-radius: 50%;
    background: linear-gradient(135deg,  #494949 0%,#2d2d2d 100%);
    box-shadow: 0 4px 7px rgba(0, 0, 0, .5);
    cursor: pointer;

    &:hover {
      background: #494949;
    }

    &:active {
      transform: translateY(2px);
      transition: transform .2s;
      box-shadow: none;
    }
  }

  .play-box-control-button-normal {
    width: 23px;
    height: 23px;
  }

  .play-box-control-button-big {
    width: 30px;
    height: 30px;
  }
</style>