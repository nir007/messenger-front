import { readAll, readOne, create, update, remove } from '@/api/appuser'

const actions = {
  // get app users
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

  // get app user
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

  // create an user
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

   // update an user
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

   // remove an user
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
