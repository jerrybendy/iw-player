<template>
  <div class="loader-line-scale-party" :class="{'loader-pause': pause}"><div></div><div></div><div></div><div></div></div>
</template>

<script>
  /**
   * Line scale party animation
   *
   * @see https://github.com/ConnorAtherton/loaders.css
   */
  export default {
    props: {
      pause: {
        type: Boolean,
        'default': false,
      }
    }
  }
</script>

<style lang="less">

  @keyframes loader-line-scale-party {
    0%, 100% {
      transform: scaleY(1);
    }
    50% {
      transform: scaleY(0.5);
    }
  }

  .loader-line-scale-party {
    width: 20px;
    height: 16px;
    text-align: right;
  }

  .loader-line-scale-party > div {
    display: inline-block;
    width: 2px;
    height: 15px;
    margin: 1px;
    background-color: #DE6E18;

    animation-fill-mode: both;
    animation-name: loader-line-scale-party;
    animation-iteration-count: infinite;
    animation-delay: 0s;
  }

  .loader-line-scale-party.loader-pause > div {
    animation-play-state: paused !important;
  }

  .loader-line-scale-party > div:nth-child(1) {
    animation-delay: .55s;
    animation-duration: 1.23s
  }

  .loader-line-scale-party > div:nth-child(2) {
    animation-delay: .55s;
    animation-duration: .55s
  }

  .loader-line-scale-party > div:nth-child(3) {
    animation-delay: 90ms;
    animation-duration: .39s
  }

  .loader-line-scale-party > div:nth-child(4) {
    animation-delay: .5s;
    animation-duration: .59s
  }
</style>
