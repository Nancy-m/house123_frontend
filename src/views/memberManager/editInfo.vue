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
            <el-form-item label="付費方式" prop="paid">
              <el-select v-model="editForm.pay_method" clearable placeholder="请选择付費方式" style="width:100%">
                <el-option label="ATM 轉帳付款" value="ATM 轉帳付款"></el-option>
                <el-option label="銀行臨櫃匯款" value="銀行臨櫃匯款"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="過期時間" prop="expire_at">
              <el-date-picker v-model="editForm.expire_at"
                  style="width:100%"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="請選擇過期時間"
                  />
                  <!-- :picker-options="pickerOptions"
                  @change="choseGkStartTime" -->
            </el-form-item>
            <el-form-item label="google_id" prop="google_id">
              <el-input size="small" v-model="editForm.google_id" auto-complete="off" placeholder="請輸入google_id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性別" prop="gender">
              <el-select v-model="editForm.gender" clearable placeholder="请选择性別" style="width:100%">
                <el-option label="male" value="male"></el-option>
                <el-option label="female" value="female"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input size="small" v-model="editForm.address" auto-complete="off" placeholder="請輸入地址"></el-input>
            </el-form-item>
            <el-form-item label="是否付費" prop="paid">
              <el-select v-model="editForm.paid" clearable placeholder="请选择是否付費" style="width:100%">
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
          <el-col :span="24">
            <el-form-item label="付費縣市" prop="paid_cities">
              <el-checkbox-group v-model="editForm.paid_cities"  @change="handleCheckedCitiesChange">
                <el-checkbox :label="item" v-for="item,i in cityList" :key="i">{{item}}</el-checkbox>
              </el-checkbox-group>
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
import {insertUsers,updateUsers} from '@/api/memberManager'

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
      },
      submitloading:false,  //提交loading
      cityList:['臺北市','基隆市','新北市','連江縣','宜蘭縣','新竹市','新竹縣','桃園市','苗栗縣','臺中市','彰化縣','南投縣','嘉義市','嘉義縣','雲林縣','臺南市','高雄市','南海島','澎湖縣','金門縣','屏東縣','臺東縣','花蓮縣'],
      checkList:[],
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
            console.log(this.editForm);
              // this.getDetailData();
          }
      }
    }
  },
  created (){
    // console.log(this.editFormVisible);
  },
  methods: {
    // 选择县市
    handleCheckedCitiesChange(val) {
      this.paid_cities = val;
    },
    // 编辑、增加页面保存方法
    submitForm(editData,) {
      this.$refs[editData].validate(async (valid) => {
        if (valid) {
          this.submitloading = true;
          if(this.title == '新建賬號'){
            this.insertUsers();    
          }
          if(this.title == '修改資料'){
            this.updateUsers();
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
    async insertUsers(){
      const res = await insertUsers(this.editForm);
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
    async updateUsers(){
      const res = await updateUsers(this.editForm);
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

 
 

 