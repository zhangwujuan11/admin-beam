<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="梁板代码" prop="beamCode">
        <el-input v-model="queryParams.beamCode" placeholder="请输入梁板代码" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="梁片名称" prop="beamName">
        <el-input v-model="queryParams.beamName" placeholder="请输入梁片名称" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="对应二维码" prop="qrId">
        <el-input v-model="queryParams.qrId" placeholder="请输入对应二维码" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="梁板强度" prop="beamStrength">
        <el-input v-model="queryParams.beamStrength" placeholder="请输入梁板强度" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="设计长度" prop="designLength">
        <el-input v-model="queryParams.designLength" placeholder="请输入设计长度" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="预制长度" prop="prefabricatedLength">
        <el-input v-model="queryParams.prefabricatedLength" placeholder="请输入预制长度" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="梁板高度" prop="slabHeight">
        <el-input v-model="queryParams.slabHeight" placeholder="请输入梁板高度" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="梁板宽度" prop="slabWidth">
        <el-input v-model="queryParams.slabWidth" placeholder="请输入梁板宽度" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="浇筑日期" prop="pouringDate">
        <el-date-picker clearable size="small" v-model="queryParams.pouringDate" type="date" value-format="yyyy-MM-dd"
          placeholder="选择浇筑日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="张拉日期" prop="tensioningDate">
        <el-date-picker clearable size="small" v-model="queryParams.tensioningDate" type="date" value-format="yyyy-MM-dd"
          placeholder="选择张拉日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="建设单位" prop="constructionUnit">
        <el-input v-model="queryParams.constructionUnit" placeholder="请输入建设单位" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="技术负责人" prop="technicalLeader">
        <el-input v-model="queryParams.technicalLeader" placeholder="请输入技术负责人" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="设计单位" prop="designUnit">
        <el-input v-model="queryParams.designUnit" placeholder="请输入设计单位" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="质量负责人" prop="qualityManager">
        <el-input v-model="queryParams.qualityManager" placeholder="请输入质量负责人" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="监理单位" prop="supervisionUnit">
        <el-input v-model="queryParams.supervisionUnit" placeholder="请输入监理单位" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="试验负责人" prop="testingManager">
        <el-input v-model="queryParams.testingManager" placeholder="请输入试验负责人" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="施工单位" prop="constructionCompany">
        <el-input v-model="queryParams.constructionCompany" placeholder="请输入施工单位" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="工程名称" prop="projectName">
        <el-input v-model="queryParams.projectName" placeholder="请输入工程名称" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="工序ID" prop="processId">
        <el-input v-model="queryParams.processId" placeholder="请输入工序ID" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="工序代码" prop="processCode">
        <el-input v-model="queryParams.processCode" placeholder="请输入工序代码" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="工序名称" prop="processName">
        <el-input v-model="queryParams.processName" placeholder="请输入工序名称" clearable size="small"
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
          v-hasPermi="['beam:beam:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['beam:beam:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['beam:beam:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" :loading="exportLoading" @click="handleExport"
          v-hasPermi="['beam:beam:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="beamList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="beamId" />
      <el-table-column label="梁板代码" align="center" prop="beamCode" />
      <el-table-column label="梁片名称" align="center" prop="beamName" />
      <el-table-column label="对应二维码" align="center" prop="qrId" />
      <el-table-column label="梁板强度" align="center" prop="beamStrength" />
      <el-table-column label="设计长度" align="center" prop="designLength" />
      <el-table-column label="预制长度" align="center" prop="prefabricatedLength" />
      <el-table-column label="梁板高度" align="center" prop="slabHeight" />
      <el-table-column label="梁板宽度" align="center" prop="slabWidth" />
      <el-table-column label="浇筑日期" align="center" prop="pouringDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.pouringDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="张拉日期" align="center" prop="tensioningDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.tensioningDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="建设单位" align="center" prop="constructionUnit" />
      <el-table-column label="技术负责人" align="center" prop="technicalLeader" />
      <el-table-column label="设计单位" align="center" prop="designUnit" />
      <el-table-column label="质量负责人" align="center" prop="qualityManager" />
      <el-table-column label="监理单位" align="center" prop="supervisionUnit" />
      <el-table-column label="试验负责人" align="center" prop="testingManager" />
      <el-table-column label="施工单位" align="center" prop="constructionCompany" />
      <el-table-column label="工程名称" align="center" prop="projectName" />
      <el-table-column label="工序ID" align="center" prop="processId" />
      <el-table-column label="工序代码" align="center" prop="processCode" />
      <el-table-column label="工序名称" align="center" prop="processName" />
      <el-table-column label="租户号" align="center" prop="tenantId" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['beam:beam:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['beam:beam:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改梁片对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="梁板代码" prop="beamCode">
          <el-input v-model="form.beamCode" placeholder="请输入梁板代码" />
        </el-form-item>
        <el-form-item label="梁片名称" prop="beamName">
          <el-input v-model="form.beamName" placeholder="请输入梁片名称" />
        </el-form-item>
        <el-form-item label="对应二维码" prop="qrId">
          <el-input v-model="form.qrId" placeholder="请输入对应二维码" />
        </el-form-item>
        <el-form-item label="梁板强度" prop="beamStrength">
          <el-input v-model="form.beamStrength" placeholder="请输入梁板强度" />
        </el-form-item>
        <el-form-item label="设计长度" prop="designLength">
          <el-input v-model="form.designLength" placeholder="请输入设计长度" />
        </el-form-item>
        <el-form-item label="预制长度" prop="prefabricatedLength">
          <el-input v-model="form.prefabricatedLength" placeholder="请输入预制长度" />
        </el-form-item>
        <el-form-item label="梁板高度" prop="slabHeight">
          <el-input v-model="form.slabHeight" placeholder="请输入梁板高度" />
        </el-form-item>
        <el-form-item label="梁板宽度" prop="slabWidth">
          <el-input v-model="form.slabWidth" placeholder="请输入梁板宽度" />
        </el-form-item>
        <el-form-item label="浇筑日期" prop="pouringDate">
          <el-date-picker clearable size="small" v-model="form.pouringDate" type="date" value-format="yyyy-MM-dd"
            placeholder="选择浇筑日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="张拉日期" prop="tensioningDate">
          <el-date-picker clearable size="small" v-model="form.tensioningDate" type="date" value-format="yyyy-MM-dd"
            placeholder="选择张拉日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="建设单位" prop="constructionUnit">
          <el-input v-model="form.constructionUnit" placeholder="请输入建设单位" />
        </el-form-item>
        <el-form-item label="技术负责人" prop="technicalLeader">
          <el-input v-model="form.technicalLeader" placeholder="请输入技术负责人" />
        </el-form-item>
        <el-form-item label="设计单位" prop="designUnit">
          <el-input v-model="form.designUnit" placeholder="请输入设计单位" />
        </el-form-item>
        <el-form-item label="质量负责人" prop="qualityManager">
          <el-input v-model="form.qualityManager" placeholder="请输入质量负责人" />
        </el-form-item>
        <el-form-item label="监理单位" prop="supervisionUnit">
          <el-input v-model="form.supervisionUnit" placeholder="请输入监理单位" />
        </el-form-item>
        <el-form-item label="试验负责人" prop="testingManager">
          <el-input v-model="form.testingManager" placeholder="请输入试验负责人" />
        </el-form-item>
        <el-form-item label="施工单位" prop="constructionCompany">
          <el-input v-model="form.constructionCompany" placeholder="请输入施工单位" />
        </el-form-item>
        <el-form-item label="工程名称" prop="projectName">
          <el-input v-model="form.projectName" placeholder="请输入工程名称" />
        </el-form-item>
        <el-form-item label="工序ID" prop="processId">
          <el-input v-model="form.processId" placeholder="请输入工序ID" />
        </el-form-item>
        <el-form-item label="工序代码" prop="processCode">
          <el-input v-model="form.processCode" placeholder="请输入工序代码" />
        </el-form-item>
        <el-form-item label="工序名称" prop="processName">
          <el-input v-model="form.processName" placeholder="请输入工序名称" />
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
import { listBeam, getBeam, delBeam, addBeam, updateBeam, exportBeam } from "@/api/beam/beam";

export default {
  name: "Beam",
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
      // 梁片表格数据
      beamList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        beamCode: null,
        beamName: null,
        qrId: null,
        beamStrength: null,
        designLength: null,
        prefabricatedLength: null,
        slabHeight: null,
        slabWidth: null,
        pouringDate: null,
        tensioningDate: null,
        constructionUnit: null,
        technicalLeader: null,
        designUnit: null,
        qualityManager: null,
        supervisionUnit: null,
        testingManager: null,
        constructionCompany: null,
        projectName: null,
        processId: null,
        processCode: null,
        processName: null,
        tenantId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        beamCode: [
          { required: true, message: "梁板代码不能为空", trigger: "blur" }
        ],
        beamName: [
          { required: true, message: "梁片名称不能为空", trigger: "blur" }
        ],
        qrId: [
          { required: true, message: "对应二维码不能为空", trigger: "blur" }
        ],
        beamStrength: [
          { required: true, message: "梁板强度不能为空", trigger: "blur" }
        ],
        designLength: [
          { required: true, message: "设计长度不能为空", trigger: "blur" }
        ],
        prefabricatedLength: [
          { required: true, message: "预制长度不能为空", trigger: "blur" }
        ],
        slabHeight: [
          { required: true, message: "梁板高度不能为空", trigger: "blur" }
        ],
        slabWidth: [
          { required: true, message: "梁板宽度不能为空", trigger: "blur" }
        ],
        pouringDate: [
          { required: true, message: "浇筑日期不能为空", trigger: "blur" }
        ],
        tensioningDate: [
          { required: true, message: "张拉日期不能为空", trigger: "blur" }
        ],
        constructionUnit: [
          { required: true, message: "建设单位不能为空", trigger: "blur" }
        ],
        technicalLeader: [
          { required: true, message: "技术负责人不能为空", trigger: "blur" }
        ],
        designUnit: [
          { required: true, message: "设计单位不能为空", trigger: "blur" }
        ],
        qualityManager: [
          { required: true, message: "质量负责人不能为空", trigger: "blur" }
        ],
        supervisionUnit: [
          { required: true, message: "监理单位不能为空", trigger: "blur" }
        ],
        testingManager: [
          { required: true, message: "试验负责人不能为空", trigger: "blur" }
        ],
        constructionCompany: [
          { required: true, message: "施工单位不能为空", trigger: "blur" }
        ],
        projectName: [
          { required: true, message: "工程名称不能为空", trigger: "blur" }
        ],
        processId: [
          { required: true, message: "工序ID不能为空", trigger: "blur" }
        ],
        processCode: [
          { required: true, message: "工序代码不能为空", trigger: "blur" }
        ],
        processName: [
          { required: true, message: "工序名称不能为空", trigger: "blur" }
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
      }
    };
  },
  created () {
    this.getList();
  },
  methods: {
    /** 查询梁片列表 */
    getList () {
      this.loading = true;
      listBeam(this.queryParams).then(response => {
        this.beamList = response.rows;
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
        beamId: null,
        beamCode: null,
        beamName: null,
        qrId: null,
        beamStrength: null,
        designLength: null,
        prefabricatedLength: null,
        slabHeight: null,
        slabWidth: null,
        pouringDate: null,
        tensioningDate: null,
        constructionUnit: null,
        technicalLeader: null,
        designUnit: null,
        qualityManager: null,
        supervisionUnit: null,
        testingManager: null,
        constructionCompany: null,
        projectName: null,
        processId: null,
        processCode: null,
        processName: null,
        tenantId: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
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
      this.ids = selection.map(item => item.beamId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd () {
      this.reset();
      this.open = true;
      this.title = "添加梁片";
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset();
      const beamId = row.beamId || this.ids
      getBeam(beamId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改梁片";
      });
    },
    /** 提交按钮 */
    submitForm () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.beamId != null) {
            updateBeam(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addBeam(this.form).then(response => {
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
      const beamIds = row.beamId || this.ids;
      this.$modal.confirm('是否确认删除梁片编号为"' + beamIds + '"的数据项？').then(function () {
        return delBeam(beamIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport () {
      const queryParams = this.queryParams;
      this.$modal.confirm('是否确认导出所有梁片数据项？').then(() => {
        this.exportLoading = true;
        return exportBeam(queryParams);
      }).then(response => {
        this.$download.name(response.msg);
        this.exportLoading = false;
      }).catch(() => { });
    }
  }
};
</script>
