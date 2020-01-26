const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  id: state => state.user.id,
  name: state => state.user.name,
  second: state => state.user.second,
  email: state => state.user.email,
  isConfirmed: state => state.user.isConfirmed,
  phone: state => state.user.phone,
  createdAt: state => state.user.createdAt,
}

export default getters
