<template>
  <div class="play-box-progress">
    <mu-linear-progress mode="determinate" :value="50"></mu-linear-progress>
    <span class="play-box-time-span">03:17 / 20:26</span>
  </div>
</template>

<script>

</script>

<style lang="less">
  @import "../styles/var";

  .play-box-progress {
    display: flex;
    align-items: center;
  }

  .play-box-time-span {
    display: block;
    color: @MP-TEXT-COLOR;
    font-size: 10px;
    text-align: right;
    width: 9em;
  }
</style>