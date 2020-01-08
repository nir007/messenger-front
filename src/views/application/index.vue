<template>
  <div class="app-container">
    <h2 class="title">My applications</h2>
    <el-tooltip class="item" effect="dark" content="Open form to create new application" placement="right">
      <router-link to="create">
        <el-button icon="el-icon-circle-plus-outline" type="primary" :to="'/dashboard'">Create an application</el-button>
      </router-link>
    </el-tooltip>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%; margin-top:40px"
      border
    >
    <el-table-column
      label="Name"
      prop="name">
    </el-table-column>
    <el-table-column
      label="Description"
      prop="description">
    </el-table-column>
    <el-table-column
      label="Status"
      prop="isActive"
      :filters="[{ text: 'Active', value: true }, { text: 'Stopped', value: false }]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
      align="center"
      width="100"
    >
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.isActive ? 'success' : 'warning'"
          disable-transitions>{{scope.row.isActive ? 'Active' : 'Stopped'}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="Created at"
      prop="createdAt">
    </el-table-column>
    <el-table-column
      label="Updated at"
      prop="updatedAt">
    </el-table-column>
    <el-table-column
      align="center">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="Type to search"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="medium"
          type="success"
          @click="handleOpen(scope.$index, scope.row)">Open</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
  import { formatDate } from '../../utils/index'
  export default {
    data() {
      return {
        tableData: [],
        search: '',
      }
    },
    methods: {
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      handleOpen(index, row) {
        this.$router.push({ name: 'applicationView', params: {id: row.id} })
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
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