<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="构件类型" prop="componentType">
        <el-select v-model="queryParams.componentType" placeholder="请选择构件类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="工法名称" prop="constructionMethod">
        <el-input v-model="queryParams.constructionMethod" placeholder="请输入工法名称" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="租户号" prop="tenantId">
        <el-input v-model="queryParams.tenantId" placeholder="请输入租户号" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['beam:methodSettings:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['beam:methodSettings:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['beam:methodSettings:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" :loading="exportLoading" @click="handleExport"
          v-hasPermi="['beam:methodSettings:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="methodSettingsList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键ID" align="center" prop="methodSettingsId" />
      <el-table-column label="构件类型" align="center" prop="componentType" />
      <el-table-column label="工法名称" align="center" prop="constructionMethod" />
      <el-table-column label="租户号" align="center" prop="tenantId" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['beam:methodSettings:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['beam:methodSettings:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改工法对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="构件类型" prop="componentType">
          <el-select v-model="form.componentType" placeholder="请选择构件类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="工法名称" prop="constructionMethod">
          <el-input v-model="form.constructionMethod" placeholder="请输入工法名称" />
        </el-form-item>
        <el-form-item label="租户号" prop="tenantId">
          <el-input v-model="form.tenantId" placeholder="请输入租户号" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listMethodSettings,
  getMethodSettings,
  delMethodSettings,
  addMethodSettings,
  updateMethodSettings,
  exportMethodSettings
} from '@/api/beam/methodSettings'

export default {
  name: 'MethodSettings',
  data () {
    return {
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 工法表格数据
      methodSettingsList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        componentType: null,
        constructionMethod: null,
        tenantId: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        componentType: [
          { required: true, message: '构件类型不能为空', trigger: 'change' }
        ],
        constructionMethod: [
          { required: true, message: '工法名称不能为空', trigger: 'blur' }
        ],
        tenantId: [
          { required: true, message: '租户号不能为空', trigger: 'blur' }
        ],
        updateBy: [
          { required: true, message: '更新者不能为空', trigger: 'blur' }
        ],
        updateTime: [
          { required: true, message: '更新时间不能为空', trigger: 'blur' }
        ],
        remark: [{ required: true, message: '备注不能为空', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    /** 查询工法列表 */
    getList () {
      this.loading = true
      listMethodSettings(this.queryParams).then(response => {
        this.methodSettingsList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel () {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset () {
      this.form = {
        methodSettingsId: null,
        componentType: null,
        constructionMethod: null,
        tenantId: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        delFlag: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery () {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery () {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange (selection) {
      this.ids = selection.map(item => item.methodSettingsId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd () {
      this.reset()
      this.open = true
      this.title = '添加工法'
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset()
      const methodSettingsId = row.methodSettingsId || this.ids
      getMethodSettings(methodSettingsId).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改工法'
      })
    },
    /** 提交按钮 */
    submitForm () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.methodSettingsId != null) {
            updateMethodSettings(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addMethodSettings(this.form).then(response => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete (row) {
      const methodSettingsIds = row.methodSettingsId || this.ids
      this.$modal
        .confirm('是否确认删除工法编号为"' + methodSettingsIds + '"的数据项？')
        .then(function () {
          return delMethodSettings(methodSettingsIds)
        })
        .then(() => {
          this.getList()
          this.$modal.msgSuccess('删除成功')
        })
        .catch(() => { })
    },
    /** 导出按钮操作 */
    handleExport () {
      const queryParams = this.queryParams
      this.$modal
        .confirm('是否确认导出所有工法数据项？')
        .then(() => {
          this.exportLoading = true
          return exportMethodSettings(queryParams)
        })
        .then(response => {
          this.$download.name(response.msg)
          this.exportLoading = false
        })
        .catch(() => { })
    }
  }
}
</script>
