<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="任务编号" prop="taskId">
        <el-input
          v-model="queryParams.taskId"
          placeholder="请输入任务编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="桥梁名称" prop="bridgeName">
        <el-input
          v-model="queryParams.bridgeName"
          placeholder="请输入桥梁名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="左右幅" prop="leftRightSpan">
        <el-input
          v-model="queryParams.leftRightSpan"
          placeholder="请输入左右幅"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="位置编码" prop="locationCode">
        <el-input
          v-model="queryParams.locationCode"
          placeholder="请输入位置编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="梁片尺寸" prop="beamDimension">
        <el-input
          v-model="queryParams.beamDimension"
          placeholder="请输入梁片尺寸"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="位置类型" prop="locationType">
        <el-select v-model="queryParams.locationType" placeholder="请选择位置类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="理论张拉时间" prop="theoreticalTensionTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.theoreticalTensionTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择理论张拉时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="理论压浆时间" prop="theoreticalGroutingTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.theoreticalGroutingTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择理论压浆时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="强度7天" prop="strength7Days">
        <el-input
          v-model="queryParams.strength7Days"
          placeholder="请输入强度7天"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="强度28天" prop="strength28Days">
        <el-input
          v-model="queryParams.strength28Days"
          placeholder="请输入强度28天"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="理论方量" prop="theoreticalVolume">
        <el-input
          v-model="queryParams.theoreticalVolume"
          placeholder="请输入理论方量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="差值" prop="difference">
        <el-input
          v-model="queryParams.difference"
          placeholder="请输入差值"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="保质资料" prop="qualityData">
        <el-input
          v-model="queryParams.qualityData"
          placeholder="请输入保质资料"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="7天强度报告" prop="strengthReport7Days">
        <el-input
          v-model="queryParams.strengthReport7Days"
          placeholder="请输入7天强度报告"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="28天强度报告" prop="strengthReport28Days">
        <el-input
          v-model="queryParams.strengthReport28Days"
          placeholder="请输入28天强度报告"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="28天压浆报告" prop="groutingReport28Days">
        <el-input
          v-model="queryParams.groutingReport28Days"
          placeholder="请输入28天压浆报告"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="评定资料" prop="evaluationData">
        <el-input
          v-model="queryParams.evaluationData"
          placeholder="请输入评定资料"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="租户号" prop="tenantId">
        <el-input
          v-model="queryParams.tenantId"
          placeholder="请输入租户号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['beam:production:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['beam:production:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['beam:production:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
          v-hasPermi="['beam:production:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="productionList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="台账id" align="center" prop="ledgerId" />
      <el-table-column label="任务编号" align="center" prop="taskId" />
      <el-table-column label="桥梁名称" align="center" prop="bridgeName" />
      <el-table-column label="左右幅" align="center" prop="leftRightSpan" />
      <el-table-column label="位置编码" align="center" prop="locationCode" />
      <el-table-column label="梁片尺寸" align="center" prop="beamDimension" />
      <el-table-column label="位置类型" align="center" prop="locationType" />
      <el-table-column label="理论张拉时间" align="center" prop="theoreticalTensionTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.theoreticalTensionTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="理论压浆时间" align="center" prop="theoreticalGroutingTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.theoreticalGroutingTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="强度7天" align="center" prop="strength7Days" />
      <el-table-column label="强度28天" align="center" prop="strength28Days" />
      <el-table-column label="理论方量" align="center" prop="theoreticalVolume" />
      <el-table-column label="差值" align="center" prop="difference" />
      <el-table-column label="保质资料" align="center" prop="qualityData" />
      <el-table-column label="7天强度报告" align="center" prop="strengthReport7Days" />
      <el-table-column label="28天强度报告" align="center" prop="strengthReport28Days" />
      <el-table-column label="28天压浆报告" align="center" prop="groutingReport28Days" />
      <el-table-column label="评定资料" align="center" prop="evaluationData" />
      <el-table-column label="租户号" align="center" prop="tenantId" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['beam:production:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['beam:production:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改试验台账对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="任务编号" prop="taskId">
          <el-input v-model="form.taskId" placeholder="请输入任务编号" />
        </el-form-item>
        <el-form-item label="桥梁名称" prop="bridgeName">
          <el-input v-model="form.bridgeName" placeholder="请输入桥梁名称" />
        </el-form-item>
        <el-form-item label="左右幅" prop="leftRightSpan">
          <el-input v-model="form.leftRightSpan" placeholder="请输入左右幅" />
        </el-form-item>
        <el-form-item label="位置编码" prop="locationCode">
          <el-input v-model="form.locationCode" placeholder="请输入位置编码" />
        </el-form-item>
        <el-form-item label="梁片尺寸" prop="beamDimension">
          <el-input v-model="form.beamDimension" placeholder="请输入梁片尺寸" />
        </el-form-item>
        <el-form-item label="位置类型" prop="locationType">
          <el-select v-model="form.locationType" placeholder="请选择位置类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="理论张拉时间" prop="theoreticalTensionTime">
          <el-date-picker clearable size="small"
            v-model="form.theoreticalTensionTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择理论张拉时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="理论压浆时间" prop="theoreticalGroutingTime">
          <el-date-picker clearable size="small"
            v-model="form.theoreticalGroutingTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择理论压浆时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="强度7天" prop="strength7Days">
          <el-input v-model="form.strength7Days" placeholder="请输入强度7天" />
        </el-form-item>
        <el-form-item label="强度28天" prop="strength28Days">
          <el-input v-model="form.strength28Days" placeholder="请输入强度28天" />
        </el-form-item>
        <el-form-item label="理论方量" prop="theoreticalVolume">
          <el-input v-model="form.theoreticalVolume" placeholder="请输入理论方量" />
        </el-form-item>
        <el-form-item label="差值" prop="difference">
          <el-input v-model="form.difference" placeholder="请输入差值" />
        </el-form-item>
        <el-form-item label="保质资料" prop="qualityData">
          <el-input v-model="form.qualityData" placeholder="请输入保质资料" />
        </el-form-item>
        <el-form-item label="7天强度报告" prop="strengthReport7Days">
          <el-input v-model="form.strengthReport7Days" placeholder="请输入7天强度报告" />
        </el-form-item>
        <el-form-item label="28天强度报告" prop="strengthReport28Days">
          <el-input v-model="form.strengthReport28Days" placeholder="请输入28天强度报告" />
        </el-form-item>
        <el-form-item label="28天压浆报告" prop="groutingReport28Days">
          <el-input v-model="form.groutingReport28Days" placeholder="请输入28天压浆报告" />
        </el-form-item>
        <el-form-item label="评定资料" prop="evaluationData">
          <el-input v-model="form.evaluationData" placeholder="请输入评定资料" />
        </el-form-item>
        <el-form-item label="租户号" prop="tenantId">
          <el-input v-model="form.tenantId" placeholder="请输入租户号" />
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
import { listProduction, getProduction, delProduction, addProduction, updateProduction, exportProduction } from "@/api/beam/production";

export default {
  name: "Production",
  data() {
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
      // 试验台账表格数据
      productionList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        taskId: null,
        bridgeName: null,
        leftRightSpan: null,
        locationCode: null,
        beamDimension: null,
        locationType: null,
        theoreticalTensionTime: null,
        theoreticalGroutingTime: null,
        strength7Days: null,
        strength28Days: null,
        theoreticalVolume: null,
        difference: null,
        qualityData: null,
        strengthReport7Days: null,
        strengthReport28Days: null,
        groutingReport28Days: null,
        evaluationData: null,
        tenantId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        taskId: [
          { required: true, message: "任务编号不能为空", trigger: "blur" }
        ],
        bridgeName: [
          { required: true, message: "桥梁名称不能为空", trigger: "blur" }
        ],
        leftRightSpan: [
          { required: true, message: "左右幅不能为空", trigger: "blur" }
        ],
        locationCode: [
          { required: true, message: "位置编码不能为空", trigger: "blur" }
        ],
        beamDimension: [
          { required: true, message: "梁片尺寸不能为空", trigger: "blur" }
        ],
        locationType: [
          { required: true, message: "位置类型不能为空", trigger: "change" }
        ],
        theoreticalTensionTime: [
          { required: true, message: "理论张拉时间不能为空", trigger: "blur" }
        ],
        theoreticalGroutingTime: [
          { required: true, message: "理论压浆时间不能为空", trigger: "blur" }
        ],
        strength7Days: [
          { required: true, message: "强度7天不能为空", trigger: "blur" }
        ],
        strength28Days: [
          { required: true, message: "强度28天不能为空", trigger: "blur" }
        ],
        theoreticalVolume: [
          { required: true, message: "理论方量不能为空", trigger: "blur" }
        ],
        difference: [
          { required: true, message: "差值不能为空", trigger: "blur" }
        ],
        qualityData: [
          { required: true, message: "保质资料不能为空", trigger: "blur" }
        ],
        strengthReport7Days: [
          { required: true, message: "7天强度报告不能为空", trigger: "blur" }
        ],
        strengthReport28Days: [
          { required: true, message: "28天强度报告不能为空", trigger: "blur" }
        ],
        groutingReport28Days: [
          { required: true, message: "28天压浆报告不能为空", trigger: "blur" }
        ],
        evaluationData: [
          { required: true, message: "评定资料不能为空", trigger: "blur" }
        ],
        tenantId: [
          { required: true, message: "租户号不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "更新时间不能为空", trigger: "blur" }
        ],
        updateBy: [
          { required: true, message: "更新者-登录名不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询试验台账列表 */
    getList() {
      this.loading = true;
      listProduction(this.queryParams).then(response => {
        this.productionList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        ledgerId: null,
        taskId: null,
        bridgeName: null,
        leftRightSpan: null,
        locationCode: null,
        beamDimension: null,
        locationType: null,
        theoreticalTensionTime: null,
        theoreticalGroutingTime: null,
        strength7Days: null,
        strength28Days: null,
        theoreticalVolume: null,
        difference: null,
        qualityData: null,
        strengthReport7Days: null,
        strengthReport28Days: null,
        groutingReport28Days: null,
        evaluationData: null,
        tenantId: null,
        createTime: null,
        updateTime: null,
        delFlag: null,
        createBy: null,
        updateBy: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.ledgerId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加试验台账";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const ledgerId = row.ledgerId || this.ids
      getProduction(ledgerId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改试验台账";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.ledgerId != null) {
            updateProduction(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addProduction(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ledgerIds = row.ledgerId || this.ids;
      this.$modal.confirm('是否确认删除试验台账编号为"' + ledgerIds + '"的数据项？').then(function() {
        return delProduction(ledgerIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$modal.confirm('是否确认导出所有试验台账数据项？').then(() => {
        this.exportLoading = true;
        return exportProduction(queryParams);
      }).then(response => {
        this.$download.name(response.msg);
        this.exportLoading = false;
      }).catch(() => {});
    }
  }
};
</script>
