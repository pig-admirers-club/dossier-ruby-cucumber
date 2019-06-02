<template>
  <div class="scenario">
    <div class="scenario__info">
      <div v-if="passed" class="scenario__info--passed">
        <i class="zmdi zmdi-check-circle"></i>
      </div>
      <div v-else class="scenario__info--failed">
        <i class="zmdi zmdi-minus-circle"></i>
      </div>
    </div>
    <div class="scenario__name" style="position:relative;">
      <div @click="setErroredScenario" class="scenario__errored" v-if="!passed"></div>
      <h2>{{ scenario.keyword }}: {{ scenario.name }}</h2>
      <step v-for="(step, index) in scenario.steps"
      v-bind:key="index"
      v-bind:step="step"
      ></step>
    </div>
  </div>
</template>

<script lang="ts">
import Step from './step.vue'
export default {
  props: {
    scenario: Object
  },
  components: {
    step: Step,
  },
  computed: {
    isOpen() {
      console.log('OPEN?', this.$store.getters['modal/isOpen']);
      return this.$store.getters['modal/isOpen']
    },
    passed() {
      return this.$store.getters['reports/passed'](this.scenario)
    },
  },
  methods: {
    setErroredScenario() {
      this.$store.commit('app/setErroredScenario', this.scenario)
    },
  }
}
</script>
<style>
  div.scenario {
    margin: 20px 0px;
    display: flex;
    width: 100%;
  }
  div.scenario h2 {
    margin: 0px 0px 10px 0px;
    padding: 0;
    font-size: 19px;
  }
  div.scenario__name {
    width: 100%;
  }
  div.scenario__name h2 span {
    margin-left: 10px;
    color: red;
    cursor: pointer;
  }
  div.scenario__info {
    width: 60px;
    display: flex;
    font-size: 30px;
  }
  div.scenario__info--passed {
    color: rgb(161, 224, 139);
  }
  div.scenario__info--failed {
    color: rgb(255, 163, 184);
  }
  div.scenario__errored {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0%;
    transition: all .3s;
  }

  div.scenario__errored:hover {
    z-index: 3;
    opacity: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    content: 'View Report';
    color: white;
    font-size: 30px;
    font-weight: bold;
    text-shadow:2px 2px 2px rgba(0,0,0,.8);
    background-color: rgba(255, 163, 184, 0.3);
  }
</style>