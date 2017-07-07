<template>
  <div class="play-list-item">
    <img class="play-list-item-album-cover" :src="albumCover" alt="">
    <div class="play-list-item-info">
      <h3>Boyfriend</h3>
      <h4>Justin Bieber</h4>
    </div>
    <div class="play-list-item-time">20:15</div>
  </div>
</template>

<script>
  export default {
    props: {
      albumCover: {
        type: String,
        'default': 'static/images/default-album-cover.jpg',
      }
    }
  }
</script>

<style lang="less">
  @import "../styles/var";

  .play-list-item {
    display: flex;
    align-items: center;
    height: 50px;
    background-color: @MP-BACKGROUND-COLOR;
    padding: 0 10px;
    border-bottom: 1px solid darken(@MP-BACKGROUND-COLOR, 2%);
    cursor: pointer;

    &:hover {
      background-color: lighten(@MP-BACKGROUND-COLOR, 5%);
    }
  }

  .play-list-item-album-cover {
    display: block;
    width: 35px;
    height: 35px;
    border-radius: 2px;
    border: 1px solid #000;
    margin-right: 7px;
  }

  .play-list-item-info {
    flex: 1;

    h3 {
      font-size: 14px;
      font-weight: normal;
      color: #FFF;
      margin: 0;
    }
    h4 {
      font-size: 10px;
      font-weight: normal;
      color: @MP-TEXT-COLOR;
      margin: 0;
    }
  }

  .play-list-item-time {
    font-size: 10px;
    color: @MP-TEXT-COLOR;
  }
</style>