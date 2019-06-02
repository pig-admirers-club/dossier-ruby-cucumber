<template>
  <div class="details">
    <div class="details__timestamp">{{ date }}</div>
    <div class="details__features">
      <details-feature v-for="feature in report.features"
      v-bind:key="feature.uuid"
      v-bind:feature="feature">
      </details-feature>
    </div>
  </div>
</template>

<script lang="ts">
import * as moment from 'moment'
import DetailsFeature from './details/feature.vue'
export default {
  components: {
    'details-feature': DetailsFeature
  },
  computed: {
    date() {
      let date = moment(this.report.date);
      return date.format('MM/DD/YYYY @ hh:mm A')
    },
    report() { 
      console.log(this.$store.getters['reports/find'](this.$route.params.id))
      return this.$store.getters['reports/find'](this.$route.params.id)
    },
    hello() {
      return "TEST HELLO"
    }
  }
}
</script>

<style>
  div.details {
    width: 100%;
    min-height: 100%;
  }
  div.details__timestamp {
    width: calc(100% - 20px);
    font-size: 13px;
    padding: 10px;
    border-bottom: 1px solid #bebebe;
  }
  div.details__features {
    padding: 10px 20px 20px 20px;
  }
</style>