import { readAll, readOne, create, update, remove } from '@/api/application'

const actions = {
  // get applications
  readAll({ commit }, params) {
    return new Promise((resolve, reject) => {
      readAll(params).then(response => {
        console.log(response)
        const { result } = response
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get an application
  readOne({ commit }, params) {
    return new Promise((resolve, reject) => {
      readOne(params).then(response => {
        console.log(response)
        const { result } = response
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // create an application
  create({ commit }, params) {
    return new Promise((resolve, reject) => {
      create(params).then(response => {
        console.log(response)
        const { result } = response
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

   // update an application
   update({ commit }, params) {
    return new Promise((resolve, reject) => {
      update(params).then(response => {
        console.log(response)
        const { result } = response
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

   // remove an application
   remove({ commit }, params) {
    return new Promise((resolve, reject) => {
      remove(params).then(response => {
        console.log(response)
        const { result } = response
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  actions
}
