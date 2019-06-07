<template>
  <div @click="closeModal" class="modal">
    <div @click.stop.prevent="doNothing" class="modal__body">
      <div @click="closeModal" class="modal__body--actions">X</div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
 export default  {
   props: {
   },
   methods: {
     closeModal() {
       this.$emit('close')
     },
     doNothing() {
     }
   }
 }
</script>

<style>
  .modal { 
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.5);
    position: fixed;
    width: 100%;
    min-height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  
  .modal_body {
    background-color: white;
    width: 800px;
    min-height: 300px;
  }

  .modal__body--actions {
    color: white;
    font-size: 20px;
    top: 10px;
    right: 10px;
    cursor: pointer;
    position: absolute;
  }
</style>