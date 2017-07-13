<template>
  <div id="play-list" ref="list"
       @dragover="handleDragOver"
       @dragleave="handleDragLeave"
       @dragend="handleDragEnd"
       @drop="handleDrop">


    <play-list-item
        v-for="item in playList"
        :key="item.id"
        :data="item"
    ></play-list-item>
  </div>
</template>

<script>
  import dragula from 'dragula'
  import {shell} from 'electron'
  import audio from '../lib/audio'
  import PlayListItem from '../components/PlayListItem.vue'
  import playStateTypes from '../stores/playState/types'
  import playListTypes from '../stores/playList/types'

  export default {
    components: {
      PlayListItem,
    },

    data () {
      return {
      }
    },

    computed: {
      playList () {
        return this.$store.state.playList.list
      }
    },

    mounted() {
      dragula([this.$refs.list])
        .on('drag', (el) => {
          el.classList.add('is-moving');
        })
        .on('drop', (block, list) => {
          this.$emit('update-block', block.dataset.blockId, list.dataset.status);
        })
        .on('dragend', (el) => {
          el.classList.remove('is-moving');
          window.setTimeout(() => {
            el.classList.add('is-moved');
            window.setTimeout(() => {
              el.classList.remove('is-moved');
            }, 600);
          }, 100);
        });
    },

    methods: {
      handleDragOver (e) {e.stopPropagation(); e.preventDefault();  return false},
      handleDragLeave () {return false},
      handleDragEnd () {return false},
      handleDrop (e) {
        e.stopPropagation()
        e.preventDefault()

        for (let f of e.dataTransfer.files) {
          if (/^audio\//i.test(f.type)) {
            this.$store.commit(playListTypes.ADD, {
              title: f.name,
              path: f.path,
            })
          }
        }
        return false;
      }
    }
  }
</script>

<style lang="less">

</style>