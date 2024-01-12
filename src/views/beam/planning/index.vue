<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item prop="bridgeName">
        <el-select v-model="queryParams.bridgeName" placeholder="请选择桥梁名称" clearable size="small" style="width: 150px;">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item prop="leftRightSpan">
        <el-select v-model="queryParams.leftRightSpan" placeholder="请选择左右幅" clearable size="small" style="width: 150px;">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item prop="locationCode">
        <el-input v-model="queryParams.locationCode" placeholder="请输入位置编码" clearable size="small"
          @keyup.enter.native="handleQuery" style="width: 150px;" />
      </el-form-item>
      <el-form-item prop="locationType">
        <el-select v-model="queryParams.locationType" placeholder="请选择位置类型" clearable size="small" style="width: 150px;">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item prop="locationType">
        <el-select v-model="queryParams.componentType" placeholder="请选择构件类型" clearable size="small" style="width: 150px;">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery" icon="el-icon-search" size="mini" style="
              background: rgb(0, 110, 233);
              color: white;
              border-color: #66b1ff;
            ">查询</el-button>
        <el-button @click="resetQuery" size="mini"
          style="color: #909399; background: #f4f4f5; border-color: #d3d4d6">清空</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['beam:planning:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['beam:planning:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['beam:planning:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" :loading="exportLoading" @click="handleExport"
          v-hasPermi="['beam:planning:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="planningList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键ID" align="center" prop="bridgePlanningId" />
      <el-table-column label="桥梁名称" align="center" prop="bridgeName" />
      <el-table-column label="左右幅" align="center" prop="leftRightSpan" />
      <el-table-column label="位置编码" align="center" prop="locationCode" />
      <el-table-column label="位置类型" align="center" prop="locationType" />
      <el-table-column label="构件类型" align="center" prop="componentType" />
      <el-table-column label="施工工法" align="center" prop="constructionMethod" />
      <el-table-column label="梁片尺寸" align="center" prop="beamDimension" />
      <el-table-column label="开始日期" align="center" prop="startDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束日期" align="center" prop="endDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="理论方量" align="center" prop="theoreticalVolume" />
      <el-table-column label="二维码" align="center" prop="qrCode" />
      <el-table-column label="状态" align="center" prop="status" />
      <el-table-column label="租户号" align="center" prop="tenantId" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['beam:planning:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['beam:planning:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改计划编制对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="桥梁名称" prop="bridgeName">
          <el-input v-model="form.bridgeName" placeholder="请输入桥梁名称" />
        </el-form-item>
        <el-form-item label="左右幅" prop="leftRightSpan">
          <el-input v-model="form.leftRightSpan" placeholder="请输入左右幅" />
        </el-form-item>
        <el-form-item label="位置编码" prop="locationCode">
          <el-input v-model="form.locationCode" placeholder="请输入位置编码" />
        </el-form-item>
        <el-form-item label="位置类型" prop="locationType">
          <el-select v-model="form.locationType" placeholder="请选择位置类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="构件类型" prop="componentType">
          <el-select v-model="form.componentType" placeholder="请选择构件类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="施工工法" prop="constructionMethod">
          <el-input v-model="form.constructionMethod" placeholder="请输入施工工法" />
        </el-form-item>
        <el-form-item label="梁片尺寸" prop="beamDimension">
          <el-input v-model="form.beamDimension" placeholder="请输入梁片尺寸" />
        </el-form-item>
        <el-form-item label="开始日期" prop="startDate">
          <el-date-picker clearable size="small" v-model="form.startDate" type="date" value-format="yyyy-MM-dd"
            placeholder="选择开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" prop="endDate">
          <el-date-picker clearable size="small" v-model="form.endDate" type="date" value-format="yyyy-MM-dd"
            placeholder="选择结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="理论方量" prop="theoreticalVolume">
          <el-input v-model="form.theoreticalVolume" placeholder="请输入理论方量" />
        </el-form-item>
        <el-form-item label="二维码" prop="qrCode">
          <el-input v-model="form.qrCode" placeholder="请输入二维码" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
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
import { listPlanning, getPlanning, delPlanning, addPlanning, updatePlanning, exportPlanning } from "@/api/beam/planning";

export default {
  name: "Planning",
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
      // 计划编制表格数据
      planningList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        bridgeName: null,
        leftRightSpan: null,
        locationCode: null,
        locationType: null,
        componentType: null,
        constructionMethod: null,
        beamDimension: null,
        startDate: null,
        endDate: null,
        theoreticalVolume: null,
        qrCode: null,
        status: null,
        tenantId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        bridgeName: [
          { required: true, message: "桥梁名称不能为空", trigger: "blur" }
        ],
        leftRightSpan: [
          { required: true, message: "左右幅不能为空", trigger: "blur" }
        ],
        locationCode: [
          { required: true, message: "位置编码不能为空", trigger: "blur" }
        ],
        locationType: [
          { required: true, message: "位置类型不能为空", trigger: "change" }
        ],
        componentType: [
          { required: true, message: "构件类型不能为空", trigger: "change" }
        ],
        constructionMethod: [
          { required: true, message: "施工工法不能为空", trigger: "blur" }
        ],
        beamDimension: [
          { required: true, message: "梁片尺寸不能为空", trigger: "blur" }
        ],
        startDate: [
          { required: true, message: "开始日期不能为空", trigger: "blur" }
        ],
        endDate: [
          { required: true, message: "结束日期不能为空", trigger: "blur" }
        ],
        theoreticalVolume: [
          { required: true, message: "理论方量不能为空", trigger: "blur" }
        ],
        qrCode: [
          { required: true, message: "二维码不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "状态不能为空", trigger: "blur" }
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
      }
    };
  },
  created () {
    this.getList();
  },
  methods: {
    /** 查询计划编制列表 */
    getList () {
      this.loading = true;
      listPlanning(this.queryParams).then(response => {
        this.planningList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel () {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset () {
      this.form = {
        bridgePlanningId: null,
        bridgeName: null,
        leftRightSpan: null,
        locationCode: null,
        locationType: null,
        componentType: null,
        constructionMethod: null,
        beamDimension: null,
        startDate: null,
        endDate: null,
        theoreticalVolume: null,
        qrCode: null,
        status: 0,
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
      this.ids = selection.map(item => item.bridgePlanningId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd () {
      this.reset();
      this.open = true;
      this.title = "添加计划编制";
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset();
      const bridgePlanningId = row.bridgePlanningId || this.ids
      getPlanning(bridgePlanningId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改计划编制";
      });
    },
    /** 提交按钮 */
    submitForm () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.bridgePlanningId != null) {
            updatePlanning(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPlanning(this.form).then(response => {
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
      const bridgePlanningIds = row.bridgePlanningId || this.ids;
      this.$modal.confirm('是否确认删除计划编制编号为"' + bridgePlanningIds + '"的数据项？').then(function () {
        return delPlanning(bridgePlanningIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport () {
      const queryParams = this.queryParams;
      this.$modal.confirm('是否确认导出所有计划编制数据项？').then(() => {
        this.exportLoading = true;
        return exportPlanning(queryParams);
      }).then(response => {
        this.$download.name(response.msg);
        this.exportLoading = false;
      }).catch(() => { });
    }
  }
};
</script>
