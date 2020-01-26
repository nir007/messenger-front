<template>
  <div>
    <el-card shadow="hover" v-for="(item, index) in users" :item="item" v-bind:key="item.id">
      <div style="float:left">
        <div class="default-avatar">{{ item.name.substr(0, 1) }}</div>
        <p class="text-center text-gray">uid: <b>{{item.uid}}</b></p>
      </div>
      <div style="margin-left:20px; float:left">
        <p>{{item.name}} {{item.second}}</p>
        <p class="text-gray">Gender: {{item.gender}}</p>
        <p class="text-gray">Created at: {{item.createdAt}}</p>
        <p class="text-gray">{{item.id}}</p>
        <p class="text-gray">{{item.applicationID}}</p>
      </div>
      <el-popover
        placement="left"
        width="200"
        v-model="item.visibleDeleteUser">
        <p><b>Delete this user?</b></p>
        <p>Are you sure?</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="deleteUser(item.id, item.applicationID, index)">Yes, delete</el-button>
          <el-button type="primary" size="mini" @click="item.visibleDeleteUser = false">No, cancel</el-button>
        </div>
        <el-button slot="reference" size="mini" type="danger" icon="el-icon-delete" circle style="float:right"></el-button>
      </el-popover>
      <div class="cl"></div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'appUserCard',
    props: ['users'],
    data() {
      return {
        search: '',
        visibleDeleteUser: false
      }
    },
    methods: {
      deleteUser(id, applicationID, index) {
        this.$store.dispatch('appuser/remove', {id: id, appID: applicationID}).then((response) => {
          console.log(response)
          this.users.splice(index, 1);
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>
