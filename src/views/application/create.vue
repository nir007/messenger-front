<template>
  <div class="app-container">
    <h2 class="title">Create new application</h2>
    <el-row>
      <el-col :lg="18" :md="24" :sm="24" :xs="24" :xl="12">
        <el-card shadow="never">
          <el-form ref="form" :model="form" label-width="160px">
            <el-form-item label="Name*">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Description*">
              <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="Domains*">
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
            <el-form-item label="Active after creating">
              <el-switch 
                active-color="#13ce66"
                inactive-color="#ff4949"
                v-model="form.isActive">
              </el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">Create</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        inputVisible: false,
        inputValue: '',
        form: {
          name: '',
          description: '',
          secret: 'dsfsfsdf',
          isActive: true,
          domains: [],
          managers: []
        }
      }
    },
    methods: {
      onSubmit() {
        this.$store.dispatch('application/create', this.form).then((response) => {
          this.$notify.success({
            title: 'Success',
            message: 'Saved',
            offset: 100
          });
          const self = this
          setTimeout(function() {
            self.$router.push({name: 'applicationView', params: {id: response.id}})
          }, 2000)
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
      }
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