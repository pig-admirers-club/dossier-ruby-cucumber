<template>
  <div :class="{'step': true}" :style="{'border-left': '10px solid ' + status}">
    <span class="step__name">{{ fullName }}</span>
    <span class="step__status">{{ step.result.status }}</span>
  </div>
</template>

<script lang="ts">
  export default {
    props: {
      step: Object
    }, 
    computed: {
      status() {
        switch(this.step.result.status) {
          case 'passed':
            return 'rgb(201, 234, 182)'
            break;
          case 'skipped':
            return 'rgb(239, 235, 117)'
            break;
          default: 
            return 'rgb(255, 119, 146)'
        }
      },
      fullName() {
        return `${this.step.keyword} ${this.step.name}`
      },
      failed() {
        return this.step.result.status == 'failed'
      }
    }, 
  }
</script>

<style>
  div.step {
    height: 30px;
    width: calc(100% - 20px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgba(0, 0, 0, .9);
    font-size: 14px;
    background-color: #fafafa;
    padding: 0px 0px 0px 10px;
    border: 1px solid rgba(0,0,0,0.1);
  }
  div.step span.step__name {
    font-size: larger;
  }
  span.step__status {
    margin-right: 10px;
  }
</style>