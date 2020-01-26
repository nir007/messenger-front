<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      Hello  {{ name }} {{ second }}
      <p>{{ email }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'name',
      'second',
      'email'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
