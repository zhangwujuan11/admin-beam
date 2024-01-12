<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="区域编号" prop="regionCode">
        <el-input v-model="queryParams.regionCode" placeholder="请输入区域编号" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="台座类型" prop="seatType">
        <el-select v-model="queryParams.seatType" placeholder="请选择台座类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="台座区域" prop="seatArea">
        <el-input v-model="queryParams.seatArea" placeholder="请输入台座区域" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="台座编号" prop="seatCode">
        <el-input v-model="queryParams.seatCode" placeholder="请输入台座编号" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="台座名称" prop="seatName">
        <el-input v-model="queryParams.seatName" placeholder="请输入台座名称" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="台座层数" prop="seatFloor">
        <el-input v-model="queryParams.seatFloor" placeholder="请输入台座层数" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="每层个数" prop="seatsPerFloor">
        <el-input v-model="queryParams.seatsPerFloor" placeholder="请输入每层个数" clearable size="small"
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
          v-hasPermi="['beam:seatSettings:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['beam:seatSettings:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['beam:seatSettings:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" :loading="exportLoading" @click="handleExport"
          v-hasPermi="['beam:seatSettings:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :data="methodSettingsList" @selection-change="handleSelectionChange" v-loading="loading">
      <el-table-column align="center" type="selection" width="55" />
      <el-table-column label="区域编号" align="center" prop="regionCode" />
      <el-table-column label="台座类型" align="center" prop="seatType" />
      <el-table-column label="台座区域" align="center" prop="seatArea" />
      <el-table-column label="台座编号" align="center" prop="seatCode" />
      <el-table-column label="台座层数" align="center" prop="seatFloor" />
      <el-table-column label="每层个数" align="center" prop="seatsPerFloor" />
      <el-table-column align="center" class-name="small-padding fixed-width" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleUpdate(scope.row)" icon="el-icon-edit-outline" size="mini"
            style="color: rgb(0, 168, 75)" type="text" v-hasPermi="['beam:methodList:edit']"></el-button>
          <el-button @click="handleDelete(scope.row)" icon="el-icon-delete" size="mini" style="color: rgb(221, 81, 76)"
            type="text" v-hasPermi="['beam:methodList:remove']"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改台座设置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="340px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="区域编号" prop="regionCode">
          <el-input v-model="form.regionCode" placeholder="请输入区域编号" />
        </el-form-item>
        <el-form-item label="台座区域" prop="seatArea">
          <el-select v-model="form.seatArea" placeholder="请输入台座区域">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="台座类型" prop="seatType">
          <el-select v-model="form.seatType" placeholder="请选择台座类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="台座编号" prop="seatCode">
          <el-input v-model="form.seatCode" placeholder="请输入台座编号" />
        </el-form-item>
        <el-form-item label="台座层数" prop="seatFloor">
          <el-select v-model="form.seatFloor" placeholder="请输入台座层数">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="每层个数" prop="seatsPerFloor">
          <el-input v-model="form.seatsPerFloor" placeholder="请输入每层个数" />
        </el-form-item>
        <el-form-item label="排序编号" prop="tenantId">
          <el-input v-model="form.tenantId" placeholder="请输入排序编号" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>

      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "SeatSettings",
  data () {
    return {
      // 遮罩层
      loading: false,
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
      total: 1,
      // 台座设置表格数据
      methodSettingsList: [
        { regionCode: 11, seatType: 12, seatArea: 3, seatCode: 4, seatFloor: 5, seatsPerFloor: 6 },
        { regionCode: 11, seatType: 12, seatArea: 3, seatCode: 4, seatFloor: 5, seatsPerFloor: 6 },
        { regionCode: 11, seatType: 12, seatArea: 3, seatCode: 4, seatFloor: 5, seatsPerFloor: 6 }

      ],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        regionCode: null,
        seatType: null,
        seatArea: null,
        seatCode: null,
        seatName: null,
        seatFloor: null,
        seatsPerFloor: null,
        tenantId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        regionCode: [
          { required: true, message: "区域编号不能为空", trigger: "blur" }
        ],
        seatType: [
          { required: true, message: "台座类型不能为空", trigger: "change" }
        ],
        seatArea: [
          { required: true, message: "台座区域不能为空", trigger: "blur" }
        ],
        seatCode: [
          { required: true, message: "台座编号不能为空", trigger: "blur" }
        ],
        seatName: [
          { required: true, message: "台座名称不能为空", trigger: "blur" }
        ],
        seatFloor: [
          { required: true, message: "台座层数不能为空", trigger: "blur" }
        ],
        seatsPerFloor: [
          { required: true, message: "每层个数不能为空", trigger: "blur" }
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
    /** 查询台座设置列表 */
    getList () {

    },
    // 取消按钮
    cancel () {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset () {
      this.form = {
        seatId: null,
        regionCode: null,
        seatType: null,
        seatArea: null,
        seatCode: null,
        seatName: null,
        seatFloor: null,
        seatsPerFloor: null,
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
      this.ids = selection.map(item => item.seatId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd () {
      this.reset();
      this.open = true;
      this.title = "新增台座";
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset();
      this.title = "编辑台座";
      this.open = true;
      const seatId = row.seatId || this.ids
      // getSeatSettings(seatId).then(response => {
      //   this.form = response.data;
      // });
    },
    /** 提交按钮 */
    submitForm () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.seatId != null) {
            updateSeatSettings(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSeatSettings(this.form).then(response => {
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
      const seatIds = row.seatId || this.ids;
      this.$modal.confirm('是否确认删除台座设置编号为"' + seatIds + '"的数据项？').then(function () {
        return delSeatSettings(seatIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport () {
      const queryParams = this.queryParams;
      this.$modal.confirm('是否确认导出所有台座设置数据项？').then(() => {
        this.exportLoading = true;
        return exportSeatSettings(queryParams);
      }).then(response => {
        this.$download.name(response.msg);
        this.exportLoading = false;
      }).catch(() => { });
    }
  }
};
</script>
