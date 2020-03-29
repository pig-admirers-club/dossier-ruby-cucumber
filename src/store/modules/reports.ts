import * as moment from 'moment'

const state = {
  data: [],
  pager: {
    count: null,
    currentPage: 1,
    perPage: 30
  }
}

const getters = {
  canNextPage: (state, getters) => {
    return !(state.pager.currentPage === getters.pages) && (getters.pages !== 0);
  },
  canPreviousPage: (state, getters) => {
    return !(state.pager.currentPage == 1);
  },
  pageArray: (state, getters) => {
    const pages = getters.pages;
    console.log(pages);
    if (!pages) {
      return []
    } else {
      return [...Array(pages).keys()].map((i) => i + 1);
    }
  },
  pages: (state) => {
    return Math.ceil(state.pager.count / state.pager.perPage);
  },
  offset: (state) => {
    return (state.pager.currentPage -1) * state.pager.perPage;
  },
  summaryGroups: (state, getters) => {
    let vm = this
    let summaries = state.data.map(report => {
      let percentages = getters.calculatePercentages(report)
      return {
        uuid: report.uuid,
        date: moment(report.date),
        skipped: percentages.skipped,
        passed: percentages.passed
      }
    })

    let sorted = summaries.sort((a, b) => {
      if (a.date.isAfter(b.date)) {
        return -1
      } else {
        return 1
      }
    })

    let grouped = sorted.reduce((memo, summary) => {
      let date = summary.date.format('MM/DD/YYYY')
      if (!memo[date]) { 
        memo[date] = []
      }
      memo[date].push(summary)
      return memo
    }, {})
    return grouped
  },
  calculatePercentages(state, getters) { 
    return (report) => {
      let total = 0;
      let totalSkipped = 0;
      let totalPassed = 0;
      for(let i=0;i<report.features.length;i++) {
        for(let z=0;z<report.features[i].elements.length; z++) {
          total += 1
          if (getters.skipped(report.features[i].elements[z])) {
            totalSkipped += 1
          } else if (getters.passed(report.features[i].elements[z])) {
            totalPassed += 1
          }
        }
      }
      // percentages
      let percentPassed = Math.round(parseFloat(totalPassed.toString()) / parseFloat(total.toString()) * 100)
      let percentSkipped = Math.round(parseFloat(totalSkipped.toString()) / parseFloat(total.toString()) * 100)
      return {
        skipped: percentSkipped,
        passed: percentPassed
      }
    }
  },
  find: (state) => {
    return (uuid) => {
      return state.data.find(report => {
        return report.uuid == uuid
      })
    }
  },
  failed: (state, getters) => {
    return (scenario) => {
      return getters.checkStatus(scenario, 'failed')
    }
  },
  skipped: (state, getters) => {
    return (scenario) => {
      return getters.checkStatus(scenario, 'skipped')
    }
  },
  passed: (state, getters) => {
    return (scenario) => {
      return getters.checkStatus(scenario, 'passed')
    }
  },

  checkStatus: (state) => {
    return (scenario, status) => {
      return scenario.steps.reduce((memo, step) => {
        return (memo && step.result.status == status)
      }, true)
    }
  },
  skippedOrPassed: (state) => {
    return (scenario) => {
      return scenario.steps.reduce((memo, step) => {
        return (memo && (step.result.status == 'skipped' || step.result.status == 'passed'))
      }, true)
    }
  },
}

const actions = {
  async getCount(context) {
    const meta = context.rootState.app.meta;
    const response = await fetch(`/api/reports/${meta.id}/count`)
    if (response.ok) {
      const body = await response.json();
      context.commit('setCount', JSON.parse(body).count);
    } else {
      console.log('failure', response);
    }
  },
  async get(context) {
    const meta = context.rootState.app.meta;
    const perPage = context.state.pager.perPage;
    const offset = context.getters.offset;
    const queryString = `per_page=${perPage}&offset=${offset}`;
    const response = await fetch(`/api/reports/${meta.id}?${queryString}`)
    if (response.ok) {
      const body = await response.json();
      context.commit('set', JSON.parse(body));
    } else {
      console.log('failure', response)
    }
  }
}

const mutations = {
  set(state, reports) {
    state.data = reports;
  },
  setCount(state, count) {
    state.pager.count = count;
  },
  currentPage(state, page) {
    state.pager.currentPage = page;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}