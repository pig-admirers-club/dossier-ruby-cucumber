<template>
  <div class="feature">
    <div class="feature__status">
      <i class="zmdi zmdi-file-text"></i>
    </div>
    <div class="feature__information">
      <div class="feature__information__name">
        <h1>{{ feature.name }}</h1>
        <span v-for="tag in feature.tags"
          v-bind:key="tag.line"
          class="feature__information__name__tag">
          {{ tag.name }}
        </span>
      </div>
      <h3>{{ feature.description }}</h3>
        <scenario v-for="(scenario, index) in feature.elements"
        v-bind:key="index"
        v-bind:scenario="scenario"
        @show-error="setErroredScenario"
        ></scenario>
    </div>
    <modal v-if="showModal" @close="hideModal">
      <damage-report :scenario="erroredScenario"></damage-report>
    </modal> 
  </div>
</template>

<script lang="ts">
import Scenario from './scenario.vue'
import Modal from '../modal.vue'
import DamageReport from './damage-report.vue'
export default {
  components: {
    scenario: Scenario,
    modal: Modal,
    'damage-report': DamageReport
  },
  props: {
    key: String,
    feature: Object
  },
  computed: {
    showModal() {
      return !!this.erroredScenario
    },
    erroredScenario() {
      return this.$store.state.app.erroredScenario
    }
  },
  methods: {
    hideModal() {
      this.$store.commit('app/setErroredScenario', null)
    },
    setErroredScenario(scenario) {
      this.$store.commit('app/setErroredScenario', scenario)
    }
  }
}
</script>

<style>
  div.feature {
    display: flex;
    margin: 20px 0;
  }
  div.feature__status {
    width: 50px;
    font-size: 30px;
    display: flex;
    justify-content: center;
    margin-top: 4px;
  }
  div.feature__information {
    margin-left: 10px;
    width: 100%;
  }

  div.feature__information__name {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  span.feature__information__name__tag {
    color: #ffff;
    margin-top: 5px;
    margin-left: 20px;
    border-radius: 2px;
    font-size: 14px;
    background-color: rgba(0, 0, 0, .3);
    padding: 5px;
  }

  span.feature__information__name__tag:after {
    content: '';
    margin-left: -16px;
    position: absolute;
    background-color: white;
    width: 10px;
    height: 10px;
    border-radius: 20px;
    margin-top: -15px;

  }
  span.feature__information__name__tag:before {
    content: '';
    height: 29px;
    width: 20px;
    position: absolute;
    margin-top: -5;
    margin-left: -25;
    background-color: rgba(0, 0, 0, .3);
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;

  }

  div.feature__information h1 {
    padding: 0px;
    margin: 0px;
    font-size: 22px;
    margin-right: 10px;
    color: rgba(0, 0, 0, .9);
  }

  div.feature__information h3 {
    margin: 0px;
    padding: 0px;
    font-size: 17px;
    color: rgba(0, 0, 0, .6);
    font-weight: normal;
  }

</style>
