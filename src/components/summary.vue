<template>
  <div id="summary">
    <div id="summary__charts">
      <h1> Summary</h1>
    </div>
    <div id="summary__calendar">
      <summary-item 
      v-for="(summary, index) in summaries" 
      v-bind:uuid="summary.uuid"
      v-bind:date="summary.date" 
      v-bind:skipped="summary.skipped"
      v-bind:passed="summary.passed"
      v-bind:key="index"
      ></summary-item>
    </div>
  </div>
</template>

<script lang="ts">
  import SummaryItem from './summary-item/summary-item.vue'

  export default {
    mounted() {
      console.log('hello')
    },
    components: {
      'summary-item': SummaryItem
    },
    computed: {
      summaries(): string {
        let summaries = this.$store.getters['reports/summaries']
        console.log(summaries)
        return summaries
      }
    }
  }

</script>

<style>
  #summary {
    width: calc(100% - 60px);
    display: flex; 
    flex-direction: column;
    padding: 10px;
  }

  #summary h1 { 
    padding-left: 20px;
  }
  #summary__calendar {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
</style>
