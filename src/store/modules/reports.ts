import * as moment from 'moment'

const state = {
  data: []
}

const getters = {
  summaries: (state, getters) => {
    let vm = this
    let summaries = state.data.map(report => {
      return {
        uuid: report.uuid,
        date: moment(report.date),
        percentagePassed: getters.caculatePercentagePassed(report)
      }
    })

    let sorted = summaries.sort((a, b) => {
      if (a.date.isAfter(b.date)) {
        return -1
      } else {
        return 1
      }
    })

    return sorted
  },
  caculatePercentagePassed: (state) => {
    return (report) => {
      let total = 0;
      let totalPassed = 0;
      for(let i=0;i<report.features.length;i++) {
        for(let z=0;z<report.features[i].elements.length; z++) {
          total += 1
          let passed = report.features[i].elements[z].steps.reduce((memo, step) => {
            return (memo && (step.result.status == 'passed' || step.result.status == 'skipped'))
          }, true)
          if (passed) {
            totalPassed += 1
          }
        }
      }
      let percent = Math.round(parseFloat(totalPassed.toString()) / parseFloat(total.toString()) * 100)
      console.log("percent passed", totalPassed, total)
      return percent
    }
  },
  find: (state) => {
    return (uuid) => {
      return state.data.find(report => {
        return report.uuid == uuid
      })
    }
  },
  passed: (state) => {
    return (scenario) => {
      return scenario.steps.reduce((memo, step) => {
        return (memo && (step.result.status == 'passed' || step.result.status == 'skipped'))
      }, true)
    }
  }
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