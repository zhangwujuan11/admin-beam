<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="工序id" prop="processId">
        <el-input v-model="queryParams.processId" placeholder="请输入工序id" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="工序名称" prop="processName">
        <el-input v-model="queryParams.processName" placeholder="请输入工序名称" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="开始时间" prop="beginTime">
        <el-date-picker clearable size="small" v-model="queryParams.beginTime" type="date" value-format="yyyy-MM-dd"
          placeholder="选择开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker clearable size="small" v-model="queryParams.endTime" type="date" value-format="yyyy-MM-dd"
          placeholder="选择结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="工法id" prop="methodId">
        <el-input v-model="queryParams.methodId" placeholder="请输入工法id" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="queryParams.sort" placeholder="请输入排序" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="梁片ID" prop="beamId">
        <el-input v-model="queryParams.beamId" placeholder="请输入梁片ID" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="梁片代码" prop="beamCode">
        <el-input v-model="queryParams.beamCode" placeholder="请输入梁片代码" clearable size="small"
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
          v-hasPermi="['beam:ledgerProcess:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['beam:ledgerProcess:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['beam:ledgerProcess:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" :loading="exportLoading" @click="handleExport"
          v-hasPermi="['beam:ledgerProcess:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="ledgerProcessList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="ledgerProcessId" />
      <el-table-column label="工序id" align="center" prop="processId" />
      <el-table-column label="工序名称" align="center" prop="processName" />
      <el-table-column label="开始时间" align="center" prop="beginTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.beginTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center" prop="endTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工法id" align="center" prop="methodId" />
      <el-table-column label="排序" align="center" prop="sort" />
      <el-table-column label="梁片ID" align="center" prop="beamId" />
      <el-table-column label="梁片代码" align="center" prop="beamCode" />
      <el-table-column label="租户号" align="center" prop="tenantId" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['beam:ledgerProcess:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['beam:ledgerProcess:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改工序执行台账对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="工序id" prop="processId">
          <el-input v-model="form.processId" placeholder="请输入工序id" />
        </el-form-item>
        <el-form-item label="工序名称" prop="processName">
          <el-input v-model="form.processName" placeholder="请输入工序名称" />
        </el-form-item>
        <el-form-item label="开始时间" prop="beginTime">
          <el-date-picker clearable size="small" v-model="form.beginTime" type="date" value-format="yyyy-MM-dd"
            placeholder="选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker clearable size="small" v-model="form.endTime" type="date" value-format="yyyy-MM-dd"
            placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="工法id" prop="methodId">
          <el-input v-model="form.methodId" placeholder="请输入工法id" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" placeholder="请输入排序" />
        </el-form-item>
        <el-form-item label="梁片ID" prop="beamId">
          <el-input v-model="form.beamId" placeholder="请输入梁片ID" />
        </el-form-item>
        <el-form-item label="梁片代码" prop="beamCode">
          <el-input v-model="form.beamCode" placeholder="请输入梁片代码" />
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
import { listLedgerProcess, getLedgerProcess, delLedgerProcess, addLedgerProcess, updateLedgerProcess, exportLedgerProcess } from "@/api/beam/ledgerProcess";

export default {
  name: "LedgerProcess",
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
      // 工序执行台账表格数据
      ledgerProcessList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        processId: null,
        processName: null,
        beginTime: null,
        endTime: null,
        methodId: null,
        sort: null,
        beamId: null,
        beamCode: null,
        tenantId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        processId: [
          { required: true, message: "工序id不能为空", trigger: "blur" }
        ],
        processName: [
          { required: true, message: "工序名称不能为空", trigger: "blur" }
        ],
        beginTime: [
          { required: true, message: "开始时间不能为空", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "结束时间不能为空", trigger: "blur" }
        ],
        methodId: [
          { required: true, message: "工法id不能为空", trigger: "blur" }
        ],
        sort: [
          { required: true, message: "排序不能为空", trigger: "blur" }
        ],
        beamId: [
          { required: true, message: "梁片ID不能为空", trigger: "blur" }
        ],
        beamCode: [
          { required: true, message: "梁片代码不能为空", trigger: "blur" }
        ],
        tenantId: [
          { required: true, message: "租户号不能为空", trigger: "blur" }
        ],
        updateBy: [
          { required: true, message: "更新者不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "更新时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created () {
    this.getList();
  },
  methods: {
    /** 查询工序执行台账列表 */
    getList () {
      this.loading = true;
      listLedgerProcess(this.queryParams).then(response => {
        this.ledgerProcessList = response.rows;
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
        ledgerProcessId: null,
        processId: null,
        processName: null,
        beginTime: null,
        endTime: null,
        methodId: null,
        sort: null,
        beamId: null,
        beamCode: null,
        tenantId: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
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
      this.ids = selection.map(item => item.ledgerProcessId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd () {
      this.reset();
      this.open = true;
      this.title = "添加工序执行台账";
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset();
      const ledgerProcessId = row.ledgerProcessId || this.ids
      getLedgerProcess(ledgerProcessId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改工序执行台账";
      });
    },
    /** 提交按钮 */
    submitForm () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.ledgerProcessId != null) {
            updateLedgerProcess(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLedgerProcess(this.form).then(response => {
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
      const ledgerProcessIds = row.ledgerProcessId || this.ids;
      this.$modal.confirm('是否确认删除工序执行台账编号为"' + ledgerProcessIds + '"的数据项？').then(function () {
        return delLedgerProcess(ledgerProcessIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport () {
      const queryParams = this.queryParams;
      this.$modal.confirm('是否确认导出所有工序执行台账数据项？').then(() => {
        this.exportLoading = true;
        return exportLedgerProcess(queryParams);
      }).then(response => {
        this.$download.name(response.msg);
        this.exportLoading = false;
      }).catch(() => { });
    }
  }
};
</script>
