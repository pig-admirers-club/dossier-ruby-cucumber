
const state = {
  erroredScenario: null,
  summarySelected: null,
  meta: {},
  busy: false
}

const getters = {
  erroredStep(state) {
    if (state.erroredScenario) {
      return state.erroredScenario.steps.find(step  => {
        return step.result.status == 'failed'
      })
    } else {
      return null
    }
  },
  getEmbeds(state) {
    return (scenario) => {
      if (!scenario) {
        return []
      }
      let embeds = []
      scenario.after.forEach(hook => {
        if (hook.embeddings && hook.embeddings.length > 0) {
          embeds = embeds.concat(hook.embeddings)
        }
      })
      return embeds
    }
  }
}

const actions = {
}

const mutations = {
  setErroredScenario(state, scenario) {
    state.erroredScenario = scenario
  },
  setSummarySelected(state, summaryGroup) {
    state.summarySelected = summaryGroup
  },
  setMeta(state, metadata) {
    state.meta = metadata;
  },
  busy(state, bool) {
    state.busy = bool;
  }
}

export default{
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}