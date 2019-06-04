import * as moment from 'moment'

const state = {
  data: []
}

const getters = {
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
  skipped: (state) => {
    return (scenario) => {
      console.log('skipped function', scenario.steps.length)
      return scenario.steps.reduce((memo, step) => {
        return (memo && step.result.status == 'skipped')
      }, true)
    }
  },
  passed: (state) => {
    return (scenario) => {
      console.log('passed function', scenario.steps.length)
      return scenario.steps.reduce((memo, step) => {
        return (memo && step.result.status == 'passed')
      }, true)
    }
  },
  skippedOrPassed: (state) => {
    return (scenario) => {
      console.log('skipped function', scenario.steps.length)
      return scenario.steps.reduce((memo, step) => {
        return (memo && (step.result.status == 'skipped' || step.result.status == 'passed'))
      }, true)
    }
  },
}

const actions = {

}

const mutations = {
  set(state, reports) {
    console.log(reports)
    state.data = reports;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}