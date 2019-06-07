<template>
  <router-link :disabled="clickable" :to="'/' + uuid" :event="clickable ? 'click' : ''">
    <div class="instance" :style="{'z-index': -Math.abs(index), 'margin-left': index == 0 ? '20px' : '-180px', 'transition': 'z-index 0s, margin .3s'}">
      <div :style="{ height: isPassed }" class="percent-success"></div>
      <div :style="{ height: isSkipped, 'margin-bottom': isPassed }" class="percent-skipped"></div>
      <div class="percent-passed">{{ isPassed }}</div>
      <div class="date">
        <span class="month">{{ month }}</span>
        <span class="day">{{ day }}</span>
        <span class="year">{{ year }}</span>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
  export default {
    props: {
      index: Number,
      clickable: Boolean,
      skipped: Number,
      passed: Number,
      date: Object,
      uuid: String
    },
    computed: {
      isModal() {
        return this.$store.state.app.summarySelected
      },
      isPassed() {
        return this.passed.toString() + '%'
      },
      isSkipped() {
        return this.skipped.toString() + '%'
      },
      year() {
        return this.date.format('YYYY')
      },
      month() {
        return this.date.format('MMM')
      },
      day() {
        return this.date.format('DD')
      }
    }  
  }
</script>

<style>
  div.instance {
    width: 200px;
    height: 200px;
    margin: 20px;
    border-radius: 2px;
    position:  relative;
    border: 2px solid rgba(0, 0, 0, .3);
    cursor: pointer;
    color: #333 !important;
    background-image: linear-gradient(to bottom,rgb(255, 175, 168),rgb(255, 163, 155));
  }
  div.instance:hover:before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 9;
    background-color: rgba(255,255,255,0.7);
  }
  div.instance:hover div.percent-passed {
    animation: bounce 700ms infinite alternate; 
    background-color: rgba(255,255,255,0,3);  
  }
  @keyframes bounce {
    from {
      height: 40px;
      width: 40px;
    }
    to { 
      height: 50px;
      width: 50px;
    }
  }
  div.percent-passed {
    position: absolute;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 12px;
    font-weight: bold;
    top: 0px;
    right: 0px;
    width: 40px;
    height: 40px;
    padding: .5em;
    border-bottom-left-radius:  80px;
    background-color: rgb(88, 88, 184);
    color: rgba(255, 255, 255, 0.8);
    z-index: 10;
    box-shadow: 1px 2px 2px rgba(0, 0, 0, .3)
  }
  div.instance div.date {
    z-index: 4;
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction:column;
    justify-content: center;
    align-items: center;
  }
  div.date span.month {
    z-index: 3;
    font-size: 30px;
    color: rgba(0, 0, 0, .3);
  }
  div.date span.day {
    z-index: 3;
    font-size: 80px;
    font-weight: bold;
    text-shadow: 2px 2px 2px rgba(0,0,0,.3);
  }
  div.date span.year {
    z-index: 3;
    font-size: 25px;
  }
  div.instance div.percent-success {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1;
    background-color: rgb(201, 234, 182);
  }
  div.instance div.percent-skipped {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1;
    background-color: rgb(255, 253, 150);
  }
</style>