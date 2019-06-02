
const state = {
  erroredScenario: null,
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
        console.log('no scenario error')
        return []
      }
      let embeds = []
      scenario.after.forEach(hook => {
        if (hook.embeddings && hook.embeddings.length > 0) {
          embeds = embeds.concat(hook.embeddings)
        }
      })
      console.log('acutal embeds', embeds)
      return embeds
    }
  }
}

const actions = {
}

const mutations = {
  setErroredScenario(state, scenario) {
    state.erroredScenario = scenario
  }
}

export default{
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}