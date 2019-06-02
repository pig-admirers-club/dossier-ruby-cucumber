<template>
 <div id="damage-report">
   <div id="damage-report__details">
     <h1>Damage Report</h1>
      <pre class="damage-report__details__error">{{ erroredStep.result.error_message }}</pre>
       <embedding v-for="(embed,index) in embeds"
        v-bind:key="index"
        v-bind:embedding="embed"/>
   </div>
  </div>  
</template>

<script lang="ts">
import Embedding from './embedding.vue'
export default {
  components: {
    embedding: Embedding
  },
  props: {
    scenario: Object
  },
  computed: {
    erroredStep() {
      return this.$store.getters['app/erroredStep']
    },
    embeds() {
      return this.$store.getters['app/getEmbeds'](this.scenario)
    }
  }
}
</script>

<style>
  div#damage-report {
    width: calc(100vw - 500px);
    height: calc(100vh - 200px);
    margin: 0px auto;
    overflow-y: scroll;
    background-color: white;
    display: flex;

  }
  #damage-report__details{
    width: calc(100% - 40px);
    height: calc(100% - 20px);
    padding: 20px;
    padding-bottom: 50px;
    border: 1px solid #ccc;
  }

  .damage-report__details__error {
    background-color: rgb(150, 28, 54);
    padding: 10px;
    overflow-x: scroll;
    color: white;
    font-size: 15px;
  }
</style>