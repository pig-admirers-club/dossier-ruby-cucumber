<template>
  <div>
    <div v-if="type == 'image'">
      <a @click="openWindow(embedding)">
        <img  width="400" :src="`data:${embedding.mime_type};base64,${embedding.data}`">
      </a>
    </div>
    <div v-if="type == 'html'" v-html="src"></div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    embedding: Object,
  },
  computed: {
    type() {
      switch(this.embedding.mime_type) {
        case 'image/png': 
          return 'image'
          break;
        case 'text/html': 
          return 'html'
          break;
      }
    },
    src() {
      return atob(this.embedding.data)  
    }
  },
  methods: {
    openWindow(embedding) {
      var win = window.open();
      win.document.write(`<iframe src='data:${embedding.mime_type};base64,${embedding.data}' frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`)
    }
  }
}
</script>

<style>
 a { cursor: pointer; }
</style>