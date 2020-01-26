<template>
  <el-table
    :data="tableData"
    style="width: 100%;"
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
</template>

<script>
  export default {
    name: 'applicationsTable',
    props: ['tableData'],
    data() {
      return {
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
    }
  }
</script>
