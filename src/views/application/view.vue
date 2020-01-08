<template>
  <div class="app-container">
    <h2 class="title">Application ID: {{this.form.id}}</h2>
    <el-row>
      <el-col :lg="18" :md="24" :sm="24" :xs="24" :xl="12">
        <el-card shadow="never">
          <el-form ref="form" :model="form" label-width="160px">
            <el-form-item label="Name*:">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Description*:">
              <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="Secret*:">
              <b>{{ form.secret }}</b> 
              <el-popover
                placement="top"
                width="270"
                v-model="visibleRefresh">
                <p><b>Are you sure to refresh <i>secret</i>?</b></p>
                <p>Don't forget to change <i>secret</i> in your app after refreshing!</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="refreshSecret">Yes, refresh</el-button>
                  <el-button type="primary" size="mini" @click="visibleRefresh = false">No, cancel</el-button>
                </div>
                <el-button slot="reference" size="mini">Refresh</el-button>
              </el-popover>
            </el-form-item>
            <el-form-item label="Domains*:">
              <el-tag
                :key="tag"
                v-for="tag in form.domains"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="mini"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </el-form-item>
            <el-form-item label="Created at:">
              <b>{{ form.createdAt }}</b>
            </el-form-item>
            <el-form-item label="Updated at:">
              <b>{{ form.updatedAt }}</b>
            </el-form-item>
            <el-form-item label="Is active:">
              <el-switch 
                active-color="#13ce66"
                inactive-color="#ff4949"
                v-model="form.isActive">
              </el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">Save changes</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :lg="6" :md="24" :sm="24" :xs="24" :xl="12" style="padding-left:10px">
        <el-card shadow="never">
          <div class="infinite-list-wrapper" style="overflow:auto">
            <ul
              class="list"
              v-infinite-scroll="load"
              infinite-scroll-disabled="disabled">
              <li v-for="i in count" class="list-item">{{ i }}</li>
            </ul>
            <p v-if="loading">Loading...</p>
            <p v-if="noMore">No more</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { formatDate } from '../../utils/index'
  export default {
    data() {
      return {
        count: 10,
        loading: false,
        users: [{name: 'Ivan'}],
        visibleRefresh: false,
        inputVisible: false,
        inputValue: '',
        form: {
          name: '',
          description: '',
          secret: '',
          isActive: true,
          domains: [],
          managers: [],
          createdAt: '',
          updatedAt: ''
        }
      }
    },
    methods: {
      onSubmit() {
        let data = this.form
        data.secret = ''
        this.$store.dispatch('application/update', data).then((response) => {
          console.log(response)
          this.form.secret = response.secret
          this.form.updatedAt = response.updatedAt ? formatDate(response.updatedAt) : 'does not updated yet'
          this.$notify.success({
            title: 'Success',
            message: 'Saved',
            offset: 100
          });
        }).catch((err) => {
          console.log(err)
        })
      },
      handleClose(tag) {
        this.form.domains.splice(this.form.domains.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.form.domains.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      refreshSecret() {
        this.visibleRefresh = false
        let data = this.form
        data.secret = '...refreshing'
        this.$store.dispatch('application/update', data).then((response) => {
          console.log(response)
          this.form.secret = response.secret
        }).catch((err) => {
          console.log(err)
        })
      },
      load () {
        this.loading = true
        setTimeout(() => {
          this.count += 2
          this.loading = false
        }, 2000)
      }
    },
    computed: {
      noMore () {
        return this.count >= 20
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
    beforeMount() {
      this.$store.dispatch('application/readOne', {id: this.$route.params.id}).then((response) => {
        this.form.id = response.id
        this.form.name = response.name
        this.form.description = response.description
        this.form.secret = response.secret
        this.form.salt = response.salt
        this.form.domains = response.domains
        this.form.isActive = response.isActive
        this.form.createdAt = formatDate(response.createdAt)
        this.form.updatedAt = response.updatedAt ? formatDate(response.updatedAt) : 'does not updated yet'
        this.form.deletedAt = response.deletedAt ? formatDate(response.deletedAt) : 'does not deleted'
        this.form.managers = response.managers
      }).catch((err) => {
        console.log(err)
      })
    }
  }
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>