<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="梁片ID" prop="beamId">
        <el-input v-model="queryParams.beamId" placeholder="请输入梁片ID" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="梁片代码" prop="beamCode">
        <el-input v-model="queryParams.beamCode" placeholder="请输入梁片代码" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="梁片位置" prop="beamLocation">
        <el-input v-model="queryParams.beamLocation" placeholder="请输入梁片位置" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="左右幅 01 左， 02 右" prop="leftRightAmplitude">
        <el-input v-model="queryParams.leftRightAmplitude" placeholder="请输入左右幅 01 左， 02 右" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="桥梁ID" prop="bridgeId">
        <el-input v-model="queryParams.bridgeId" placeholder="请输入桥梁ID" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="桥墩号" prop="pierNo">
        <el-input v-model="queryParams.pierNo" placeholder="请输入桥墩号" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="桥墩ID" prop="pierId">
        <el-input v-model="queryParams.pierId" placeholder="请输入桥墩ID" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="桥中间向外数第几片" prop="location">
        <el-input v-model="queryParams.location" placeholder="请输入桥中间向外数第几片" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="租户号" prop="tenantId">
        <el-input v-model="queryParams.tenantId" placeholder="请输入租户号" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="状态：0未生产，10" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态：0未生产，10" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态名称" prop="statusDes">
        <el-input v-model="queryParams.statusDes" placeholder="请输入状态名称" clearable size="small"
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
          v-hasPermi="['beam:bridgeBeam:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['beam:bridgeBeam:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['beam:bridgeBeam:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" :loading="exportLoading" @click="handleExport"
          v-hasPermi="['beam:bridgeBeam:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="bridgeBeamList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="关联ID" align="center" prop="id" />
      <el-table-column label="梁片ID" align="center" prop="beamId" />
      <el-table-column label="梁片代码" align="center" prop="beamCode" />
      <el-table-column label="梁片位置" align="center" prop="beamLocation" />
      <el-table-column label="左右幅 01 左， 02 右" align="center" prop="leftRightAmplitude" />
      <el-table-column label="桥梁ID" align="center" prop="bridgeId" />
      <el-table-column label="桥墩号" align="center" prop="pierNo" />
      <el-table-column label="桥墩ID" align="center" prop="pierId" />
      <el-table-column label="桥中间向外数第几片" align="center" prop="location" />
      <el-table-column label="租户号" align="center" prop="tenantId" />
      <el-table-column label="状态：0未生产，10" align="center" prop="status" />
      <el-table-column label="状态名称" align="center" prop="statusDes" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['beam:bridgeBeam:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['beam:bridgeBeam:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改桥梁-梁片架设关系;对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="梁片ID" prop="beamId">
          <el-input v-model="form.beamId" placeholder="请输入梁片ID" />
        </el-form-item>
        <el-form-item label="梁片代码" prop="beamCode">
          <el-input v-model="form.beamCode" placeholder="请输入梁片代码" />
        </el-form-item>
        <el-form-item label="梁片位置" prop="beamLocation">
          <el-input v-model="form.beamLocation" placeholder="请输入梁片位置" />
        </el-form-item>
        <el-form-item label="左右幅 01 左， 02 右" prop="leftRightAmplitude">
          <el-input v-model="form.leftRightAmplitude" placeholder="请输入左右幅 01 左， 02 右" />
        </el-form-item>
        <el-form-item label="桥梁ID" prop="bridgeId">
          <el-input v-model="form.bridgeId" placeholder="请输入桥梁ID" />
        </el-form-item>
        <el-form-item label="桥墩号" prop="pierNo">
          <el-input v-model="form.pierNo" placeholder="请输入桥墩号" />
        </el-form-item>
        <el-form-item label="桥墩ID" prop="pierId">
          <el-input v-model="form.pierId" placeholder="请输入桥墩ID" />
        </el-form-item>
        <el-form-item label="桥中间向外数第几片" prop="location">
          <el-input v-model="form.location" placeholder="请输入桥中间向外数第几片" />
        </el-form-item>
        <el-form-item label="租户号" prop="tenantId">
          <el-input v-model="form.tenantId" placeholder="请输入租户号" />
        </el-form-item>
        <el-form-item label="状态：0未生产，10">
          <el-radio-group v-model="form.status">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态名称" prop="statusDes">
          <el-input v-model="form.statusDes" placeholder="请输入状态名称" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
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
import { listBridgeBeam, getBridgeBeam, delBridgeBeam, addBridgeBeam, updateBridgeBeam, exportBridgeBeam } from "@/api/beam/bridgeBeam";

export default {
  name: "BridgeBeam",
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
      // 桥梁-梁片架设关系;表格数据
      bridgeBeamList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        beamId: null,
        beamCode: null,
        beamLocation: null,
        leftRightAmplitude: null,
        bridgeId: null,
        pierNo: null,
        pierId: null,
        location: null,
        tenantId: null,
        status: null,
        statusDes: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        beamId: [
          { required: true, message: "梁片ID不能为空", trigger: "blur" }
        ],
        beamCode: [
          { required: true, message: "梁片代码不能为空", trigger: "blur" }
        ],
        beamLocation: [
          { required: true, message: "梁片位置不能为空", trigger: "blur" }
        ],
        leftRightAmplitude: [
          { required: true, message: "左右幅 01 左， 02 右不能为空", trigger: "blur" }
        ],
        bridgeId: [
          { required: true, message: "桥梁ID不能为空", trigger: "blur" }
        ],
        pierNo: [
          { required: true, message: "桥墩号不能为空", trigger: "blur" }
        ],
        pierId: [
          { required: true, message: "桥墩ID不能为空", trigger: "blur" }
        ],
        location: [
          { required: true, message: "桥中间向外数第几片不能为空", trigger: "blur" }
        ],
        tenantId: [
          { required: true, message: "租户号不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "更新时间不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "状态：0未生产，10不能为空", trigger: "blur" }
        ],
        statusDes: [
          { required: true, message: "状态名称不能为空", trigger: "blur" }
        ],
        updateBy: [
          { required: true, message: "更新者-登录名不能为空", trigger: "blur" }
        ],
        remark: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created () {
    this.getList();
  },
  methods: {
    /** 查询桥梁-梁片架设关系;列表 */
    getList () {
      this.loading = true;
      listBridgeBeam(this.queryParams).then(response => {
        this.bridgeBeamList = response.rows;
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
        id: null,
        beamId: null,
        beamCode: null,
        beamLocation: null,
        leftRightAmplitude: null,
        bridgeId: null,
        pierNo: null,
        pierId: null,
        location: null,
        tenantId: null,
        createTime: null,
        updateTime: null,
        status: 0,
        createBy: null,
        statusDes: null,
        updateBy: null,
        delFlag: null,
        remark: null
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd () {
      this.reset();
      this.open = true;
      this.title = "添加桥梁-梁片架设关系;";
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset();
      const id = row.id || this.ids
      getBridgeBeam(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改桥梁-梁片架设关系;";
      });
    },
    /** 提交按钮 */
    submitForm () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateBridgeBeam(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addBridgeBeam(this.form).then(response => {
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
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除桥梁-梁片架设关系;编号为"' + ids + '"的数据项？').then(function () {
        return delBridgeBeam(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport () {
      const queryParams = this.queryParams;
      this.$modal.confirm('是否确认导出所有桥梁-梁片架设关系;数据项？').then(() => {
        this.exportLoading = true;
        return exportBridgeBeam(queryParams);
      }).then(response => {
        this.$download.name(response.msg);
        this.exportLoading = false;
      }).catch(() => { });
    }
  }
};
</script>
