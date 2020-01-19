<template>
  <div class="app-container">
    <el-dialog width="600px" title="New user" :visible.sync="pizda">
      <el-form name="user" ref="user" :rules="userCreateRules" :model="user">
        <el-form-item prop="uid" label="UID:" :label-width="formLabelWidth">
          <el-input ref="uid" name="uid" v-model="user.uid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="Name:" :label-width="formLabelWidth">
          <el-input ref="name" name="name" v-model="user.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="second"  label="Surname:" :label-width="formLabelWidth">
          <el-input ref="second" name="second" v-model="user.second" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="email"  label="Email:" :label-width="formLabelWidth">
          <el-input ref="email" name="email" v-model="user.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="phone" ref="phone" name=""label="Phone:" :label-width="formLabelWidth">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="gender" label="Gender:" :label-width="formLabelWidth">
          <el-select ref="gender" name="gender" style="width:100%" v-model="user.gender" placeholder="Please select user gender">
            <el-option label="Male" value="male"></el-option>
            <el-option label="Female" value="female"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="description" label="About user:" :label-width="formLabelWidth">
          <el-input ref="description" name="description" type="textarea" v-model="user.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pizda
        =false">Cancel</el-button>
        <el-button :loading="loadingUserCreate" type="primary" @click="createUser">Create</el-button>
      </span>
    </el-dialog>
    <h2 class="title">Application ID: {{this.form.id}}</h2>
    <br>
    <el-row>
      <el-col :lg="15" :md="12" :sm="12" :xs="24" :xl="15">
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
      <el-col :lg="9" :md="12" :sm="12" :xs="24" :xl="9">
        <el-card shadow="never">
          <el-row>
            <el-col :md="5">
              <el-button @click="pizda=true" type="success">Users <i class="el-icon-plus el-icon-right"></i></el-button>
            </el-col>
            <el-col :md="19">
              <el-input
                placeholder="User name"
                prefix-icon="el-icon-search"
                v-model="searchString">
              </el-input>
            </el-col>
          </el-row>
          <br>
          <el-card shadow="hover" v-for="item in users" :item="item" v-bind:key="item.id">
            <div class="default-avatar">{{ item.name.substr(0, 1) }}</div>
            <div style="margin-left:120px">
              <p><b>{{item.name}} {{item.second}}</b></p>
              <p>Gender: {{item.gender}}</p>
              <p>Created at: {{item.createdAt}}</p>
            </div>
            <div class="cl"></div>
          </el-card>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { formatDate } from '../../utils/index'
  import { validEmail } from '@/utils/validate'
  export default {
    data() {
      const validateName = (rule, value, callback) => {
        if (value.length < 2) {
          callback(new Error('The password can not be less than 2 digits'))
        } else {
          callback()
        }
      }
      const validateEmail = (rule, value, callback) => {
        if (value.length > 0 && !validEmail(value)) {
          callback(new Error('Please enter the correct email'))
        } else {
          callback()
        }
      }
      const validateUID = (rule, value, callback) => {
        if (value.length === 0) {
          callback(new Error('Please enter the unique UID of user'))
        } else {
          callback()
        }
      }
      const validateGender = (rule, value, callback) => {
        if (value !== 'male' && value !== 'female') {
          callback(new Error('Please select user gender'))
        } else {
          callback()
        }
      }
      return {
        searchString: '',
        user: {
          applicationID: '',
          uid: '',
          name: '',
          second: '',
          email: '',
          phone: '',
          gender: '',
          description: ''
        },
        loadingUserCreate: false,
        userCreateRules: {
          uid: [{ required: true, trigger: 'blur', validator: validateUID }],
          name: [{ required: true, trigger: 'blur', validator: validateName }],
          second: [{ required: true, trigger: 'blur', validator: validateName }],
          email: [{ required: false, trigger: 'blur', validator: validateEmail }],
          gender: [{ required: true, trigger: 'blur', validator: validateGender }]
        },
        pizda: false,
        formLabelWidth: '120px',
        page: 1,
        perPage: 15,
        users: [],
        count: 10,
        loading: false,
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
        }).catch((err) => {
          console.log(err)
        })
      },
      handleClose(tag) {
        this.form.domains.splice(this.form.domains.indexOf(tag), 1)
      },
      showInput() {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      handleInputConfirm() {
        let inputValue = this.inputValue
        if (inputValue) {
          this.form.domains.push(inputValue)
        }
        this.inputVisible = false
        this.inputValue = ''
      },
      input() {},
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
      loadUsers () {
        this.$store.dispatch('appuser/readAll', {appID: this.form.id, page: this.page, perpage: this.perPage}).then((response) => {
          console.log(response)
          for (let u in response) {
            response[u].createdAt = formatDate(response[u].createdAt)
            response[u].updatedAt = formatDate(response[u].updatedAt)
            this.users.push(response[u])
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      createUser() {
        this.$refs.user.validate(valid => {
          if (valid) {
            this.loadingUserCreate = true
            this.$store.dispatch('appuser/create', this.user).then((response) => {
              response.createdAt = formatDate(response.createdAt)
              this.users.push(response)
              this.loadingUserCreate = false
              this.pizda = false
              this.$refs['user'].resetFields();
            }).catch(() => {
              this.loadingUserCreate = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
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
        this.user.applicationID = response.id
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

        this.loadUsers() 
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
  .title {margin: 0px}
</style>