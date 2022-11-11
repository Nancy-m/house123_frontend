/**
 * 開標結果
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>開標結果</el-breadcrumb-item>
    </el-breadcrumb>
    <!--查询条件表单组-->
    <div class="search-box">
      <el-form
        :inline="true"
        :model="form"
        ref="selectForm"
        class="el-form-inline"
        size="mini"
        label-position="left"
        label-width="60"
      >
        <el-row>
          <el-form-item>
            <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增賬號</el-button>
            <el-button type="primary" icon="el-icon-delete" @click="batchDelete">批量刪除</el-button>
          </el-form-item>
        </el-row>
        <el-row>
          <!--電郵-->
          <el-form-item label="電郵" prop="email">
            <el-input
              style="width: 100%"
              v-model="form.email"
              clearable
              placeholder="請輸入電郵"
            />
          </el-form-item>
          <!--手机号-->
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" clearable placeholder="請輸入姓名" />
          </el-form-item>
          <el-form-item label="google_id" prop="google_id">
            <el-input
              v-model="form.google_id"
              clearable
              placeholder="請輸入google_id"
            />
          </el-form-item>
          <el-form-item label="級別" prop="level">
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
      v-loading="loading"
      element-loading-text="拼命加载中"
      style="width: 100%"
      :data="tableList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="編號" sortable align="center" type="index" />
      <el-table-column label="發佈狀態" sortable align="center" prop="email" show-overflow-tooltip/>
      <el-table-column label="pdf鏈接" sortable align="center" prop="name" />
      <el-table-column label="案件明細" sortable align="center" prop="photo" />
      <el-table-column label="案件狀態" sortable align="center" prop="level" />
      <el-table-column label="分析錯誤欄位" sortable align="center" prop="level" />
      <el-table-column label="拍賣次數" sortable align="center" prop="password" />
      <el-table-column label="執行拍賣法院" sortable align="center" prop="password" />
      <el-table-column label="拍賣程序及結果" sortable align="center" prop="password" />
      <el-table-column label="原始公告" sortable align="center" prop="password" />
      <el-table-column label="拍賣日期" sortable align="center" prop="password" />
      <el-table-column label="投標時間" sortable align="center" prop="password" />
      <el-table-column label="查封日期" sortable align="center" prop="password" />
      <el-table-column label="建築日期" sortable align="center" prop="password" />
      <el-table-column label="債務人" sortable align="center" prop="password" />
      <el-table-column label="債權人" sortable align="center" prop="password" />
      <el-table-column label="拍定人" sortable align="center" prop="password" />
      <el-table-column label="權利人" sortable align="center" prop="password" />
      <el-table-column label="案號" sortable align="center" prop="password" />
      <el-table-column label="標別" sortable align="center" prop="password" />
      <el-table-column label="股別" sortable align="center" prop="password" />
      <el-table-column label="拍賣土地明細" sortable align="center" prop="password" />
      <el-table-column label="拍賣建物明細" sortable align="center" prop="password" />
      <el-table-column label="總建坪" sortable align="center" prop="password" />
      <el-table-column label="總地坪" sortable align="center" prop="password" />
      <el-table-column label="房屋地址" sortable align="center" prop="password" />
      <el-table-column label="房屋種類" sortable align="center" prop="password" />
      <el-table-column label="公共設施" sortable align="center" prop="password" />
      <el-table-column label="點交情形" sortable align="center" prop="password" />
      <el-table-column label="使用情形" sortable align="center" prop="password" />
      <el-table-column label="備註" sortable align="center" prop="password" />
      <el-table-column label="總拍定價格(元)" sortable align="center" prop="password" />
      <el-table-column label="總拍賣底價(元)" sortable align="center" prop="password" />
      <el-table-column label="公告內總保證金" sortable align="center" prop="password" />
      <el-table-column label="公告現值" sortable align="center" prop="password" />
      <el-table-column label="空屋" sortable align="center" prop="password" />
      <el-table-column label="物件照片" sortable align="center" prop="password" />
      <el-table-column label="地圖" sortable align="center" prop="password" />
      <el-table-column label="流標紀錄" sortable align="center" prop="password" />
      <el-table-column label="停拍公告網址" sortable align="center" prop="password" />
      <el-table-column label="停拍原因" sortable align="center" prop="password" />
      <el-table-column label="撤回原因" sortable align="center" prop="password" />
      <el-table-column label="物件備註" sortable align="center" prop="password" />
      <el-table-column label="建檔日期" sortable align="center" prop="password" />
      <el-table-column label="更新日期" sortable align="center" prop="password" />
      <el-table-column label="瀏覽人數" sortable align="center" prop="password" />
      <el-table-column label="過去案件" sortable align="center" prop="password" />
      <el-table-column align="center" sortable label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">編輯</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-wrapper">
      <el-pagination
        background
        :total="page.totalSize"
        :current-page.sync="page.pageIndex"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="pageChange"
        @size-change="pageSizeChange"
      />
    </div>
  </div>
</template>

<script>
import { findCases } from "@/api/case.js";
// import EditFormInfo from './editInfo.vue'

export default {
  name: "superManager",
  // 注册组件
  components: {
    // EditFormInfo
  },
  data() {
    return {
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      form: {},
      page: {
        // 分页参数
        totalSize: 0,
        pageIndex: 1,
        pageSize: 10,
      },
      tableList: [], //表格数据
      loading: false, //是显示加载
      addFormVisible: false,
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: "",
      editFormRules: {
        email: [
          { required: true, message: "請輸入電子郵箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        name: [{ required: true, message: "請輸入姓名", trigger: "blur" }],
        password: [{ required: true, message: "請輸入密碼", trigger: "blur" }],
        photo: [{ required: false, message: "請上傳照片", trigger: "blur" }],
        google_id: [
          { required: false, message: "請輸入google_id", trigger: "blur" },
        ],

        level: [{ required: false, message: "請輸入級別", trigger: "blur" }],
        super_admin: [
          {
            required: false,
            message: "請選擇是否超級管理員",
            trigger: ["blur", "change"],
          },
        ],
        comment: [{ required: false, message: "請輸入備注", trigger: "blur" }],
      },
      editForm: {
        email: "98765@163.com",
        name: "小一",
        photo: "",
        google_id: "",
        create_time: "",
        timestamp: "",
        comment: "",
        password: "123456789",
        level: "1",
        super_admin: false,
      },
      submitloading: false, //提交loading
    };
  },
  created() {
    this.findManagersList(); // 请求table列表数据
  },

  methods: {
    // 查询列表list
    async findManagersList() {
      this.loading = true;
      const res = await findCases();
      /* let res = {
        data: {
          code: 200,
          result: 
            [
              {
                email: "123@qq.com",  //string 來自google，如果不使用google登陆，即为注册时内容
                name:"姓名", //string 來自google，如果不使用google登陆，留空
                photo:"照片", //string 來自google，如果不使用google登陆，留空
                google_id: "google_id", // string 來自google 唯一識別
                create_time:"創建時間", // string 只读
                timestamp:"上次更新時間", // string 只讀 格式為：2022-06-14 22:00:03 每次該條數據改動帶來數據庫更新時刷新這個字段
                comment:"備註", // string
                password: "", //string
                level: "級別", // string 默認 1
                super_admin:true // bool, 为true则可以进入后台的账号管理分页
              },
              {
                email: "電郵",  //string 來自google，如果不使用google登陆，即为注册时内容
                name:"姓名", //string 來自google，如果不使用google登陆，留空
                photo:"照片", //string 來自google，如果不使用google登陆，留空
                google_id: "google_id", // string 來自google 唯一識別
                create_time:"創建時間", // string 只读
                timestamp:"上次更新時間", // string 只讀 格式為：2022-06-14 22:00:03 每次該條數據改動帶來數據庫更新時刷新這個字段
                comment:"備註", // string
                password: "", //string
                level: "級別", // string 默認 1
                super_admin:true // bool, 为true则可以进入后台的账号管理分页
              }
            ]
          }
      }; */
      if (res.data.code == 200) {
        this.loading = false;
        this.tableList = res.data.result.dataList;
        this.page.totalSize = res.result.totalSize; // 总数
      } else {
        this.loading = false;
        this.$message({
          type: "error",
          message: res.data.msg,
        });
      }
      console.log(this.tableList);
    },
    // 切换每页条数
    pageSizeChange(size) {
      this.page.pageSize = size;
      this.findManagersList();
    },
    // 翻页
    pageChange(pageIndex) {
      this.page.pageIndex = pageIndex;
      this.findManagersList();
    },
    // 重置表单
    reset(formName) {
      this.$refs[formName].resetFields();
    },
    // 批量删除
    batchDelete() {},

    // 搜索事件
    search() {
      this.getdata(this.formInline);
    },
    // 表单初始化
    formInit() {
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
        super_admin: false,
      };
    },
    // 新建dialog
    handleAdd(index, row) {
      this.formInit();
      this.editFormVisible = true;
      this.title = "新建賬號";
      // this.editForm = row
    },
    // 点击编辑按钮
    handleEdit(row) {
      this.editForm = row;
      this.editFormVisible = true;
      this.title = "修改資料";
    },
    // handleSelectionChange
    handleSelectionChange(val) {
      console.log(val);
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          this.loading = true;
          const res = await deleteManagers();
          if (res.data.code == 200) {
            this.loading = false;
            this.$message({
              type: "success",
              message: res.data.msg,
            });
            this.findManagersList();
          } else {
            this.loading = false;
            this.$message({
              type: "warning",
              message: res.data.msg,
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 关闭编辑、增加弹出框
    closeDialog(formName) {
      this.editFormVisible = false;
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang="scss">
.search-box {
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

 
 

 