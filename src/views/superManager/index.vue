/**
 * 超级会员账号管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>後臺賬號資料管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--查询条件表单组-->
    <div class="search-box">
      <el-form :inline="true" :model="form" ref="selectForm" class="el-form-inline" size="mini" label-position="left" >
        <el-row>
          <el-form-item>
            <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增賬號</el-button>
            <el-button type="primary" icon="el-icon-delete" @click="batchDelete">批量刪除</el-button>  
          </el-form-item>
        </el-row>
        <el-row>
          <!--電郵-->
          <el-form-item label="" prop="email">
            <el-input style="width:100%" v-model="form.email" clearable placeholder="請輸入電郵" />
          </el-form-item>
          <el-form-item label="" prop="name">
            <el-input v-model="form.name" clearable placeholder="請輸入姓名" />
          </el-form-item>
          <el-form-item label="" prop="google_id">
            <el-input v-model="form.google_id" clearable placeholder="請輸入google_id" />
          </el-form-item>
          <el-form-item label="" prop="level">
            <el-input v-model="form.level" clearable placeholder="請輸入級別" />
          </el-form-item>
        <!--按钮组-->
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search">查詢</el-button>
            <el-button icon="el-icon-refresh" @click="reset('selectForm')">重置</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <!--列表-->
    <el-table border class="personTable" size="small" highlight-current-row 
        v-loading="loading" element-loading-text="拼命加载中" style="width: 100%;"
        :data="tableList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column label="編號" align="center" type="index" />
      <el-table-column label="電郵" sortable align="center" prop="email" show-overflow-tooltip />
      <el-table-column label="姓名" sortable align="center" prop="name"/>
      <el-table-column label="照片" sortable align="center" prop="photo" />    
      <el-table-column label="級別" sortable align="center" prop="level" />
      <el-table-column label="google_id" sortable align="center" prop="google_id" width="120"/>
      <el-table-column label="密碼" sortable align="center" prop="password" />
      <el-table-column label="超級管理員" sortable align="center" prop="super_admin" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.super_admin==true">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column label="創建時間" sortable align="center" prop="create_time" width="120"/>
      <el-table-column label="上次更新時間" sortable align="center" prop="timestamp" width="120"/>
      <el-table-column label="備註" sortable align="center" prop="comment" show-overflow-tooltip/> 
      <el-table-column align="center" sortable label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">編輯</el-button>
          <el-button type="text" @click="handleDeleteS(scope.row)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 分页 -->
    <div class="pagination-wrapper">
      <el-pagination
        background
        :total="page.totalSize"
        :current-page.sync="page.pageNum"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="pageChange"
        @size-change="pageSizeChange"
      />
      <!-- 编辑组件 -->
      <EditFormInfo
        :title="title"
        :visible.sync="editFormVisible"
        :editForm="editForm" 
        @refresh="findManagersList"
      />
    </div>
    
  </div>
</template>

<script>
import {findManagers,deleteManagers} from '@/api/superManager'
import EditFormInfo from './editInfo.vue'

export default {
  name: 'superManager',
  // 注册组件
  components: {
    EditFormInfo
  },
  data() {
    return {
      squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      form:{},  // 查询表单
      page: { // 分页参数
        totalSize: 0,
        pageNum: 1,
        pageSize: 10
      },
      tableList:[], //表格数据
      loading: false, //是显示加载
      addFormVisible:false,
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: '',
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
      editForm: {
        email: "",
        name: "",
        photo: "",
        google_id: "",
        create_time: "",
        timestamp: "",
        comment: "",
        password: "",
        level: "1",
        super_admin: false
      },
      submitloading:false,  //提交loading
      idList:[],
    }
  },
  created() {
    this.findManagersList();  // 请求table列表数据
  },

  methods: {
    // 查询列表list
    async findManagersList(){
      this.loading = true;
      this.form.pageNum = this.page.pageNum;
      this.form.pageSize = this.page.pageSize;
      const res = await findManagers(this.form);
      if(res.code == 200){
        this.loading = false;
        this.tableList = res.result.dataList;
        this.page.totalSize = res.result.totalSize; // 总数
      }else{
        this.loading = false;
        this.$message({
          type: 'error',
          message: res.msg
        })
      }
      console.log(this.tableList);
    },
    // 切换每页条数
    pageSizeChange(size){
      this.page.pageSize = size;
      this.findManagersList();
    },
    // 翻页
    pageChange(pageIndex) {
        this.page.pageNum = pageIndex;
        this.findManagersList();
    },
    // 重置表单
    reset(formName){
      this.$refs[formName].resetFields();
    },
    

    // 搜索事件
    search() {
      this.findManagersList();
    },
    // 表单初始化
    formInit(){
      this.editForm = {
        email: "",
        name: "",
        photo: "",
        google_id: "",
        create_time: "",
        timestamp: "",
        comment: "",
        password: "",
        level: "1",
        super_admin: false
      }
    },
    // 新建dialog
    handleAdd (index, row) {
      this.formInit();
      this.editFormVisible = true;
      this.title = "新建賬號";
      // this.editForm = row
    },
    // 点击编辑按钮
    handleEdit(row){
      this.editForm = row;
      this.editFormVisible = true;
      this.title = "修改資料";
    },
    // 批量选择
    handleSelectionChange(val){
      this.idList = [];
      val.forEach(item => {
        this.idList.push(item._id);
      })

    },
    // 批量删除
    batchDelete(){
      this.deleteFun();
    },
    async deleteFun(){
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const res = await deleteManagers({idList:this.idList});
          console.log(res,'ssd');
          if(res.code == 200){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.findManagersList();
          }else{
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        }).catch((err) => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 删除
    handleDeleteS(row) {
      this.idList.push(row._id);
      this.deleteFun();
    },
    // 关闭编辑、增加弹出框
    closeDialog(formName) {
      this.editFormVisible = false
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped lang="scss">
.search-box{
  padding-top: 20px;
  overflow: hidden;
  width: 100%;
}
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
/deep/ .el-dialog__body {
  max-height: 400px;
  overflow-y: auto;
}
/deep/ .el-dialog__header {
    // padding: $space-md;
    border-bottom: 1px solid #dadada;
  }
</style>

 
 

 