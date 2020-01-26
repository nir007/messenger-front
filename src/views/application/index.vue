<template>
  <div class="app-container">
    <h2 class="title">My applications</h2>
    <el-tooltip class="item" effect="dark" content="Open form to create new application" placement="right">
      <router-link to="create">
        <el-button icon="el-icon-circle-plus-outline" type="primary" :to="'/dashboard'">Create an application</el-button>
      </router-link>
    </el-tooltip>
    <br><br>
    <applications v-bind:tableData="tableData"></applications>
  </div>
</template>

<script>
  import { formatDate } from '../../utils/index'
  import applications from './components/applicationsTable'
  export default {
    components: {applications},
    data() {
      return {
        tableData: [],
      }
    },
    beforeMount() {
      this.$store.dispatch('application/readAll', {}).then((response) => {
        for(let i in response) {
          this.tableData.push({
            id: response[i].id,
            name: response[i].name,
            description: response[i].description,
            secret: response[i].secret,
            salt: response[i].salt,
            domains: response[i].domains,
            isActive: response[i].isActive,
            createdAt: formatDate(response[i].createdAt),
            updatedAt: response[i].updatedAt ? formatDate(response[i].updatedAt) : 'does not updated yet',
            deletedAt: response[i].deletedAt ? response[i].deletedAt : 'does not deleted',
            managers: response[i].managers,
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
</script>
<style>
.el-table .cell {
  padding: 15px!important
}
</style>
