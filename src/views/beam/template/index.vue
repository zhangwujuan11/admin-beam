<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="模板编号" prop="templateNumber">
        <el-input v-model="queryParams.templateNumber" placeholder="请输入模板编号" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <!-- <el-form-item label="模板类型" prop="templateType">
        <el-select v-model="queryParams.templateType" placeholder="请选择模板类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="区域编号" prop="regionCode">
        <el-input
          v-model="queryParams.regionCode"
          placeholder="请输入区域编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所在区域" prop="locationArea">
        <el-input
          v-model="queryParams.locationArea"
          placeholder="请输入所在区域"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所在台座" prop="seatNumber">
        <el-input
          v-model="queryParams.seatNumber"
          placeholder="请输入所在台座"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="周转次数" prop="turnoverCount">
        <el-input
          v-model="queryParams.turnoverCount"
          placeholder="请输入周转次数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="模板状态" prop="templateStatus">
        <el-select v-model="queryParams.templateStatus" placeholder="请选择模板状态" clearable size="small">
          <el-option v-for="i in templateTypeList" :key="i.dictValue" :label="i.dictLabel" :value="i.dictValue" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="租户号" prop="tenantId">
        <el-input
          v-model="queryParams.tenantId"
          placeholder="请输入租户号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['beam:template:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['beam:template:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['beam:template:remove']">删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
          v-hasPermi="['beam:template:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="templateList" @selection-change="handleSelectionChange"
      :close-on-click-modal="false">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="主键ID" align="center" prop="templateId" /> -->
      <el-table-column label="模板编号" align="center" prop="templateNumber" />
      <!-- <el-table-column label="模板类型" align="center" prop="templateType" /> -->
      <el-table-column label="区域编号" align="center" prop="regionCode" />
      <el-table-column label="所在区域" align="center" prop="locationArea" />
      <el-table-column label="所在台座" align="center" prop="seatNumber" />
      <el-table-column label="周转次数" align="center" prop="turnoverCount" />
      <el-table-column label="模板状态" align="center" prop="templateStatus" :formatter="formatter" />
      <!-- <el-table-column label="租户号" align="center" prop="tenantId" /> -->
      <!-- <el-table-column label="备注" align="center" prop="remark" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['beam:template:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['beam:template:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改机料模板对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="模板编号" prop="templateNumber">
          <el-input v-model="form.templateNumber" placeholder="请输入模板编号" />
        </el-form-item>
        <!-- <el-form-item label="模板类型" prop="templateType">
          <el-input v-model="form.templateType" placeholder="请输入模板类型" />
        </el-form-item> -->
        <!-- <el-form-item label="区域编号" prop="regionCode">
          <el-input v-model="form.regionCode" placeholder="请输入区域编号" />
        </el-form-item>
        <el-form-item label="所在区域" prop="locationArea">
          <el-input v-model="form.locationArea" placeholder="请输入所在区域" />
        </el-form-item>
        <el-form-item label="所在台座" prop="seatNumber">
          <el-input v-model="form.seatNumber" placeholder="请输入所在台座" />
        </el-form-item>
        <el-form-item label="周转次数" prop="turnoverCount">
          <el-input v-model="form.turnoverCount" placeholder="请输入周转次数" />
        </el-form-item>
        <el-form-item label="模板状态">
          <el-radio-group v-model="form.templateStatus">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="租户号" prop="tenantId">
          <el-input v-model="form.tenantId" placeholder="请输入租户号" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listTemplate, getTemplate, delTemplate, addTemplate, updateTemplate, exportTemplate } from "@/api/beam/template";

export default {
  name: "Template",
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
      // 机料模板表格数据
      templateList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        templateNumber: null,
        templateType: null,
        regionCode: null,
        locationArea: null,
        seatNumber: null,
        turnoverCount: null,
        templateStatus: null,
        tenantId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        templateNumber: [
          { required: true, message: "模板编号不能为空", trigger: "blur" }
        ],
        templateType: [
          { required: true, message: "模板类型不能为空", trigger: "change" }
        ],
        regionCode: [
          { required: true, message: "区域编号不能为空", trigger: "blur" }
        ],
        locationArea: [
          { required: true, message: "所在区域不能为空", trigger: "blur" }
        ],
        seatNumber: [
          { required: true, message: "所在台座不能为空", trigger: "blur" }
        ],
        turnoverCount: [
          { required: true, message: "周转次数不能为空", trigger: "blur" }
        ],
        templateStatus: [
          { required: true, message: "模板状态不能为空", trigger: "blur" }
        ],
        tenantId: [
          { required: true, message: "租户号不能为空", trigger: "blur" }
        ],
        updateBy: [
          { required: true, message: "更新者不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "更新时间不能为空", trigger: "blur" }
        ],
        remark: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ],
      },
      templateTypeList: []
    };
  },
  created () {
    this.getList();
    this.getDicts('template_status').then(res => {
      const { data } = res
      this.templateTypeList = data
    })

  },
  methods: {
    /** 查询机料模板列表 */
    getList () {
      this.loading = true;
      listTemplate(this.queryParams).then(response => {
        const { items, total } = response.data
        this.templateList = items;
        this.total = total;
      }).finally(() => {
        this.loading = false;
      })
    },
    // 取消按钮
    cancel () {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset () {
      this.form = {
        templateId: null,
        templateNumber: null,
        templateType: null,
        regionCode: null,
        locationArea: null,
        seatNumber: null,
        turnoverCount: null,
        templateStatus: "0",
        tenantId: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        delFlag: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery () {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery () {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange (selection) {
      this.ids = selection.map(item => item.templateId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd () {
      this.reset();
      this.open = true;
      this.title = "新增模板";
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset();
      const templateId = row.templateId || this.ids
      getTemplate(templateId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改模板";
      });
    },
    /** 提交按钮 */
    submitForm () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.templateId != null) {
            updateTemplate(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTemplate(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete (row) {
      const templateIds = row.templateId || this.ids;
      this.$modal.confirm('是否确认删除机料模板编号为"' + templateIds + '"的数据项？').then(function () {
        return delTemplate(templateIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport () {
      const queryParams = this.queryParams;
      this.$modal.confirm('是否确认导出所有机料模板数据项？').then(() => {
        this.exportLoading = true;
        return exportTemplate(queryParams);
      }).then(response => {
        this.$download.name(response.msg);
        this.exportLoading = false;
      }).catch(() => { });
    },
    formatter (row, column, cellValue) {
      if (column.property === 'templateStatus') {
        return this.selectDictLabels(this.templateTypeList, row.templateStatus)
      }
    }
  }
};
</script>
