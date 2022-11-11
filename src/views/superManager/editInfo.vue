<!-- 编辑修改 -->
<template>
  <div>   
    <!-- 编辑界面 -->
    <el-dialog v-if="visible" :title="title" width="60%" :visible.sync="visible"
      :before-close="closeDialog"
      :destroy-on-close="true">
      <el-form label-width="120px" :model="editForm" ref="editForm" :rules="editFormRules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="電郵" prop="email">
              <el-input size="small" v-model="editForm.email" auto-complete="off" placeholder="請輸入電子郵箱"></el-input>
            </el-form-item>   
            <el-form-item label="姓名" prop="name">
              <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="請輸入姓名"></el-input>
            </el-form-item>
            <el-form-item label="密碼" prop="password">
              <el-input size="small" v-model="editForm.password" auto-complete="off" placeholder="請輸入密碼"></el-input>
            </el-form-item>
            <el-form-item label="級別" prop="level">
              <el-input size="small" v-model="editForm.level" auto-complete="off" placeholder="請輸入級別"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="google_id" prop="google_id">
              <el-input size="small" v-model="editForm.google_id" auto-complete="off" placeholder="請輸入google_id"></el-input>
            </el-form-item>
            <el-form-item label="是否超級管理員" prop="super_admin">
              <el-select v-model="editForm.super_admin" clearable placeholder="请选择是否超級管理員" style="width:100%">
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="備注" prop="comment">
              <el-input size="small" v-model="editForm.comment" auto-complete="off" placeholder="請輸入備注"></el-input>
            </el-form-item>
            <el-form-item label="照片" prop="photo">
              <div class="block"><el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar></div>
            </el-form-item> 
          </el-col>
          <el-col>
            <el-form-item prop="comment">
              <el-button type="primary"  @click="submitForm('editForm')" :loading="submitloading">提交</el-button>
              <!-- <el-button type="primary"  @click="reset('editForm')">重置</el-button> -->
            </el-form-item>
          </el-col>
        </el-row>       
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {insertManagers,updateManagers} from '@/api/superManager'

export default {
  name: 'edit',
  props:['visible','editForm','title'],
  data() {
    return {
      squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      editFormRules:{
        email:[
          { required: true, message: '請輸入電子郵箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        name:[{required: true, message: '請輸入姓名', trigger: 'blur'}],
        password:[{required: true, message: '請輸入密碼', trigger: 'blur'}],
        photo: [{required: false, message: '請上傳照片', trigger: 'blur'}],
        google_id:[{required: false, message: '請輸入google_id', trigger: 'blur'}],
        
        level:[{required: false, message: '請輸入級別', trigger: 'blur'}],
        super_admin:[{required: false, message: '請選擇是否超級管理員', trigger:  ['blur', 'change']}],
        comment:[{required: false, message: '請輸入備注', trigger: 'blur'}],
      },
      submitloading:false,  //提交loading
    }
  },
  // 注册组件
  components: {
    // Pagination
  },

  watch: {
    
    visible: {
      async handler(newVal) {
          console.log(newVal,'ffgfg');
          if (newVal) {
              // this.getDetailData();
          }
      }
    }
  },
  created (){
    // console.log(this.editFormVisible);
  },
  methods: {
    // 编辑、增加页面保存方法
    submitForm(editData,) {
      this.$refs[editData].validate(async (valid) => {
        if (valid) {
          this.submitloading = true;
          if(this.title == '新建賬號'){
            this.insertManagers();    
          }
          if(this.title == '修改資料'){
            this.updateManagers();
          }
        } else {
          this.submitloading = false;
          return false
        }
      })
    },
    // 重置表单
    reset(formName){
      this.$refs[formName].resetFields();
    },
    // 新增账号
    async insertManagers(){
      const res = await insertManagers(this.editForm);
      if(res.code == 200){
        this.$message({
          type: 'success',
          message: res.msg
        })
        this.submitloading = false;
        this.closeDialog();
        this.$emit('refresh');
      }else{
        this.submitloading = false;
        this.$message({
          type: 'warning',
          message: res.msg
        })
      }
    },
    // 修改账号
    async updateManagers(){
      const res = await updateManagers(this.editForm);
      if(res.code == 200){
        this.$message({
          type: 'success',
          message: res.msg
        })
        this.submitloading = false;
        this.closeDialog();
        this.$emit('refresh');
      }else{
        this.submitloading = false;
        this.$message({
          type: 'warning',
          message: res.msg
        })
      }
    },
    // 关闭弹出框
    closeDialog() {
      this.$emit('update:visible', false);
    }
  }
}
</script>

<style scoped lang="scss">
</style>

 
 

 