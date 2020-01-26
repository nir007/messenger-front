import { login, logout, getInfo, registration } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { formatDate } from '@/utils/index'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    second: '',
    isConfirmed: false,
    createdAt: '',
    phone: '',
    email: '',
    id: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_SECOND: (state, val) => {
    state.second = val
  },
  SET_EMAIL: (state, val) => {
    state.email = val
  },
  SET_PHONE: (state, val) => {
    state.phone = val ? val : 'not set'
  },
  SET_IS_CONFIRMED: (state, val) => {
    state.isConfirmed = val
  },
  SET_CREATED_AT: (state, val) => {
    state.createdAt = formatDate(val)
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ID: (state, name) => {
    state.id = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user registration
  registration({ commit }, userInfo) {
    const { name, second, email, password } = userInfo
    return new Promise((resolve, reject) => {
      registration({
        name: name.trim(), second: second.trim(), email: email.trim(), password: password
      }).then(resposne => {
        const { data } = response
        console.log(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user login
  login({ commit }, userInfo) {
    const { email, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ email: email.trim(), password: password }).then(response => {
        commit('SET_TOKEN', response.token)
        setToken(response.token)
        resolve()
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        console.log(response)
        const { result } = response

        if (!result) {
          reject('Verification failed, please Login again.')
        }

        const { id, name, second, email, isConfirmed, phone, avatar, createdAt } = result

        commit('SET_ID', id)
        commit('SET_NAME', name)
        commit('SET_SECOND', second)
        commit('SET_EMAIL', email)
        commit('SET_PHONE', phone)
        commit('SET_IS_CONFIRMED', isConfirmed)
        commit('SET_AVATAR', avatar)
        commit('SET_CREATED_AT', createdAt)
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

