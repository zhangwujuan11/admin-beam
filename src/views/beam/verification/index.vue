<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
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
      <el-form-item label="位置类型" prop="locationType">
        <el-select v-model="queryParams.locationType" placeholder="请选择位置类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
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
      <el-form-item label="施工工法" prop="constructionMethod">
        <el-input
          v-model="queryParams.constructionMethod"
          placeholder="请输入施工工法"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="施工工序" prop="constructionProcess">
        <el-input
          v-model="queryParams.constructionProcess"
          placeholder="请输入施工工序"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="施工班组" prop="constructionTeam">
        <el-input
          v-model="queryParams.constructionTeam"
          placeholder="请输入施工班组"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="区域编号" prop="regionCode">
        <el-input
          v-model="queryParams.regionCode"
          placeholder="请输入区域编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="台座区域" prop="seatArea">
        <el-input
          v-model="queryParams.seatArea"
          placeholder="请输入台座区域"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="台座编号" prop="seatNumber">
        <el-input
          v-model="queryParams.seatNumber"
          placeholder="请输入台座编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="模板编码" prop="templateCode">
        <el-input
          v-model="queryParams.templateCode"
          placeholder="请输入模板编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="报验日期" prop="verificationDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.verificationDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择报验日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="报验状态" prop="verificationStatus">
        <el-select v-model="queryParams.verificationStatus" placeholder="请选择报验状态" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
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
          v-hasPermi="['beam:verification:add']"
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
          v-hasPermi="['beam:verification:edit']"
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
          v-hasPermi="['beam:verification:remove']"
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
          v-hasPermi="['beam:verification:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="verificationList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="工序报验表" align="center" prop="processVerificationId" />
      <el-table-column label="桥梁名称" align="center" prop="bridgeName" />
      <el-table-column label="左右幅" align="center" prop="leftRightSpan" />
      <el-table-column label="位置编码" align="center" prop="locationCode" />
      <el-table-column label="位置类型" align="center" prop="locationType" />
      <el-table-column label="梁片尺寸" align="center" prop="beamDimension" />
      <el-table-column label="施工工法" align="center" prop="constructionMethod" />
      <el-table-column label="施工工序" align="center" prop="constructionProcess" />
      <el-table-column label="施工班组" align="center" prop="constructionTeam" />
      <el-table-column label="区域编号" align="center" prop="regionCode" />
      <el-table-column label="台座区域" align="center" prop="seatArea" />
      <el-table-column label="台座编号" align="center" prop="seatNumber" />
      <el-table-column label="模板编码" align="center" prop="templateCode" />
      <el-table-column label="报验日期" align="center" prop="verificationDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.verificationDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报验状态" align="center" prop="verificationStatus" />
      <el-table-column label="租户号" align="center" prop="tenantId" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['beam:verification:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['beam:verification:remove']"
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

    <!-- 添加或修改工序报验对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
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
        <el-form-item label="梁片尺寸" prop="beamDimension">
          <el-input v-model="form.beamDimension" placeholder="请输入梁片尺寸" />
        </el-form-item>
        <el-form-item label="施工工法" prop="constructionMethod">
          <el-input v-model="form.constructionMethod" placeholder="请输入施工工法" />
        </el-form-item>
        <el-form-item label="施工工序" prop="constructionProcess">
          <el-input v-model="form.constructionProcess" placeholder="请输入施工工序" />
        </el-form-item>
        <el-form-item label="施工班组" prop="constructionTeam">
          <el-input v-model="form.constructionTeam" placeholder="请输入施工班组" />
        </el-form-item>
        <el-form-item label="区域编号" prop="regionCode">
          <el-input v-model="form.regionCode" placeholder="请输入区域编号" />
        </el-form-item>
        <el-form-item label="台座区域" prop="seatArea">
          <el-input v-model="form.seatArea" placeholder="请输入台座区域" />
        </el-form-item>
        <el-form-item label="台座编号" prop="seatNumber">
          <el-input v-model="form.seatNumber" placeholder="请输入台座编号" />
        </el-form-item>
        <el-form-item label="模板编码" prop="templateCode">
          <el-input v-model="form.templateCode" placeholder="请输入模板编码" />
        </el-form-item>
        <el-form-item label="报验日期" prop="verificationDate">
          <el-date-picker clearable size="small"
            v-model="form.verificationDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择报验日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报验状态">
          <el-radio-group v-model="form.verificationStatus">
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
import { listVerification, getVerification, delVerification, addVerification, updateVerification, exportVerification } from "@/api/beam/verification";

export default {
  name: "Verification",
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
      // 工序报验表格数据
      verificationList: [],
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
        beamDimension: null,
        constructionMethod: null,
        constructionProcess: null,
        constructionTeam: null,
        regionCode: null,
        seatArea: null,
        seatNumber: null,
        templateCode: null,
        verificationDate: null,
        verificationStatus: null,
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
        beamDimension: [
          { required: true, message: "梁片尺寸不能为空", trigger: "blur" }
        ],
        constructionMethod: [
          { required: true, message: "施工工法不能为空", trigger: "blur" }
        ],
        constructionProcess: [
          { required: true, message: "施工工序不能为空", trigger: "blur" }
        ],
        constructionTeam: [
          { required: true, message: "施工班组不能为空", trigger: "blur" }
        ],
        regionCode: [
          { required: true, message: "区域编号不能为空", trigger: "blur" }
        ],
        seatArea: [
          { required: true, message: "台座区域不能为空", trigger: "blur" }
        ],
        seatNumber: [
          { required: true, message: "台座编号不能为空", trigger: "blur" }
        ],
        templateCode: [
          { required: true, message: "模板编码不能为空", trigger: "blur" }
        ],
        verificationDate: [
          { required: true, message: "报验日期不能为空", trigger: "blur" }
        ],
        verificationStatus: [
          { required: true, message: "报验状态不能为空", trigger: "blur" }
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
  created() {
    this.getList();
  },
  methods: {
    /** 查询工序报验列表 */
    getList() {
      this.loading = true;
      listVerification(this.queryParams).then(response => {
        this.verificationList = response.rows;
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
        processVerificationId: null,
        bridgeName: null,
        leftRightSpan: null,
        locationCode: null,
        locationType: null,
        beamDimension: null,
        constructionMethod: null,
        constructionProcess: null,
        constructionTeam: null,
        regionCode: null,
        seatArea: null,
        seatNumber: null,
        templateCode: null,
        verificationDate: null,
        verificationStatus: "0",
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
      this.ids = selection.map(item => item.processVerificationId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加工序报验";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const processVerificationId = row.processVerificationId || this.ids
      getVerification(processVerificationId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改工序报验";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.processVerificationId != null) {
            updateVerification(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addVerification(this.form).then(response => {
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
      const processVerificationIds = row.processVerificationId || this.ids;
      this.$modal.confirm('是否确认删除工序报验编号为"' + processVerificationIds + '"的数据项？').then(function() {
        return delVerification(processVerificationIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$modal.confirm('是否确认导出所有工序报验数据项？').then(() => {
        this.exportLoading = true;
        return exportVerification(queryParams);
      }).then(response => {
        this.$download.name(response.msg);
        this.exportLoading = false;
      }).catch(() => {});
    }
  }
};
</script>
