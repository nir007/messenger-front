<template>
  <div class="app-container">
    <el-row>
      <el-col :md="7">
        <el-card>
          <div slot="header" class="clearfix">
            <el-button style="float: right;" @click="logout" type="danger">Log out</el-button>
          </div>
          <div class="user-profile">
            <div style="display: table; margin:30px auto;" class="default-avatar">{{ name.substr(0, 1) }}</div>
            <div style="text-align: center">
              <p><b>{{name}} {{second}}</b></p>
              <p class="text-gray">email: {{email}}</p>
              <p class="text-gray">phone: {{phone}}</p>
              <p class="text-gray">registered: {{createdAt}}</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :md="1"><div style="color: #fff">.</div></el-col>
      <el-col :md="16">
        <el-card>
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="Applications" name="applications">
              <applications v-bind:tableData="tableData"></applications>
            </el-tab-pane>
            <el-tab-pane label="Config" name="second">Config</el-tab-pane>
            <el-tab-pane label="Role" name="third">Role</el-tab-pane>
            <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatDate } from '../../utils/index'
import applications from '../application/components/applicationsTable'
export default {
  name: 'Profile',
  components: {applications},
  data() {
    return {
      activeName: 'applications',
      tableData: [],
      user: {
        name: '',
        second: '',
        email: ''
      },
      activeTab: 'activity'
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'second',
      'email',
      'phone',
      'id',
      'isConfirmed',
      'createdAt'
    ])
  },
  created() {
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
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

