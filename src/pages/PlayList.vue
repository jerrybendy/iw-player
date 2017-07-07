<template>
  <div id="play-list" ref="list"
       @dragover="handleDragOver"
       @dragleave="handleDragLeave"
       @dragend="handleDragEnd"
       @drop="handleDrop">
    <play-list-item></play-list-item>
    <play-list-item></play-list-item>
    <play-list-item></play-list-item>
    <play-list-item></play-list-item>
    <play-list-item></play-list-item>

    <audio :src="audioSrc" controls></audio>
  </div>
</template>

<script>
  import dragula from 'dragula'
  import {shell} from 'electron'
  import PlayListItem from '../components/PlayListItem.vue'
  import 'dragula/dist/dragula.css'

  export default {
    components: {
      PlayListItem,
    },

    data () {
      return {
        audioSrc: '',
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
          console.log('File(s) you dragged here: ', f)
//          this.audioSrc = window.URL.createObjectURL(f.path)
          shell.openItem(f.path)
        }
        return false;
      }
    }
  }
</script>

<style lang="less">

</style>