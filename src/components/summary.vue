<template>
  <div id="summary">
    <div id="summary__charts">
      <h1> Summary</h1>
    </div>
    <div id="summary__calendar">
      <div @click="toggleModal(summaries)" :class="{ 'summary__group': true, 'summary__modal': isModal(summaries) }" v-for="(summaries, date) in summaryGroups"
      v-bind:key="date">
          <summary-item
          v-for="(summary, index) in summaries"
          v-bind:clickable="isClickable(summaries)"
          v-bind:index="index"
          v-bind:uuid="summary.uuid"
          v-bind:date="summary.date" 
          v-bind:skipped="summary.skipped"
          v-bind:passed="summary.passed"
          v-bind:key="index"
          ></summary-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import SummaryItem from './summary-item/summary-item.vue'

  export default {
    components: {
      'summary-item': SummaryItem
    },
    computed: {
      isClickable() {
        return (summaryGroup) => {
          return this.isModal(summaryGroup) || summaryGroup.length == 1 
        }
      },
      isModal() {
        return (summaryGroup) => {
          let condition = (this.$store.state.app.summarySelected == summaryGroup)
          console.log(condition, this.$store.state.app.summarySelected, summaryGroup)
          return this.$store.state.app.summarySelected == summaryGroup
        }
      },
      summaryGroups(): string {
        let summaries = this.$store.getters['reports/summaryGroups']
        return summaries
      }
    }, 
    methods: {
      toggleModal(summaryGroup): void {
        if (this.isModal(summaryGroup) || summaryGroup.length == 1) {
          this.$store.commit('app/setSummarySelected', null)
        } else {
          this.$store.commit('app/setSummarySelected', summaryGroup)
        }
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
  .summary__group {
    display: flex;
    flex-wrap: wrap;
  }
  .summary__group.summary__modal div.instance {
    margin-left: 20px !important;
    z-index: 1 !important;
    transition: margin .3s, z-index .4s !important;
  }
  .summary__group a:visited, .summary__group a, .summary__group a:hover {
    color: #333;
  }
  .summary__group.summary__modal:before{
    content: '';
    display: flex;
    transition: all .3s;
    position: fixed;
    z-index: 1;
    background-color: rgba(0,0,0,.8);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
</style>
