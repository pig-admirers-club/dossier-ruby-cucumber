<template>
  <div id="summary">
    <div id="summary__charts">
      <div id="summary__charts__info">
        <h1>Summary for {{ meta.name }}</h1>
        <div> 
          <a :href="meta.url">{{ meta.owner }} / {{ meta.repo_name }}</a>
        </div>
      </div>
      <div id="summary__pagination" v-if="hasCount">
        <ul class="uk-pagination uk-flex-center">
          <li v-if="canPreviousPage" class="uk-pagination-previous">
            <a href="#" @click="fetchPrevious()">
              <i class="fas fa-angle-double-left"></i>
            </a>
          </li>
          <li v-for="page in pages"
            v-bind:key="page"
            :class="pageClass(page)">
            <a href="#" @click="fetchPage(page)">{{ page }}</a>
          </li>
          <li v-if="canNextPage" class="uk-pagination-previous">
            <a href="#" @click="fetchNext()">
              <i class="fas fa-angle-double-right"></i>
            </a>
            </li>
          </ul>
      </div>
    </div>
    <div id="summary__calendar" v-if="hasCount">
      <div v-if="numberOfReports === 0">
        There are no reports yet for this repository.
      </div>
      <div 
        v-else
        @click="toggleModal(summaries)" 
        :class="{ 'summary__group': true, 'summary__modal': isModal(summaries) }"
         v-for="(summaries, date) in summaryGroups"
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
      numberOfReports() {
        return this.$store.state.reports.data.length
      },
      canNextPage() {
        return this.$store.getters['reports/canNextPage'];
      },
      canPreviousPage() {
        return this.$store.getters['reports/canPreviousPage'];
      },
      pages() {
        console.log(this.$store.getters['reports/pageArray'])
        return this.$store.getters['reports/pageArray'];
      },
      meta() {
        return this.$store.state.app.meta
      },
      hasCount() {
        return this.$store.state.reports.pager.count !== null;
      },
      isClickable() {
        return (summaryGroup) => {
          return this.isModal(summaryGroup) || summaryGroup.length == 1 
        }
      },
      isModal() {
        return (summaryGroup) => {
          let condition = (this.$store.state.app.summarySelected == summaryGroup)
          return this.$store.state.app.summarySelected == summaryGroup
        }
      },
      summaryGroups(): string {
        let summaries = this.$store.getters['reports/summaryGroups']
        return summaries
      }
    }, 
    methods: {
      pageClass(page) {
        if (page == this.$store.state.reports.pager.currentPage) {
          return { 
            'uk-active': true,
            'uk-disabled': true
          }
        }
      },
      toggleModal(summaryGroup): void {
        if (this.isModal(summaryGroup) || summaryGroup.length == 1) {
          this.$store.commit('app/setSummarySelected', null)
        } else {
          this.$store.commit('app/setSummarySelected', summaryGroup)
        }
      },
      async fetchPrevious() {
        const page = this.$store.state.reports.pager.currentPage;
        this.fetchPage(page  - 1);
      },
      async fetchPage(page) {
        this.$store.commit('reports/currentPage', page);
        this.$store.commit('app/busy', true);
        await this.$store.dispatch('reports/get')
        this.$store.commit('app/busy', false);
      },
      async fetchNext() {
        const page = this.$store.state.reports.pager.currentPage;
        this.fetchPage(page + 1);
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
  #summary__charts__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 0;
    width: 100%;
    padding-bottom: 20px;
    /*border-bottom: 1px solid #ccc;*/
  }
  #summary__pagination {
    border-top: 1px solid #ccc;
    background: rgb(235, 226, 250);
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #summary__pagination ul {
    align-items: center;
    margin: 0;
  }
  #summary h1 { 
    font-size: 30px;
    margin-bottom: 5px;
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
