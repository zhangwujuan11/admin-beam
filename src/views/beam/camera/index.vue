<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="110px">
      <el-form-item label="监控名称" prop="ayName">
        <el-input v-model="queryParams.ayName" placeholder="请输入监控名称" clearable size="small" style="width: 9vw;"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="设备号" prop="aySerNo">
        <el-input v-model="queryParams.aySerNo" placeholder="请输入设备号" clearable size="small" style="width: 9vw;"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="监控位置" prop="ayType">
        <el-select v-model="queryParams.ayType" placeholder="请选择监控位置" clearable size="small" style="width: 9vw;">
          <el-option v-for="i in ayTypeList" :key="i.dictValue" :label="i.dictLabel" :value="i.dictValue" />
        </el-select>
      </el-form-item>
      <el-form-item label="摄像头编号" prop="cno">
        <el-input v-model="queryParams.cno" placeholder="请输入摄像头编号" clearable size="small" style="width: 9vw;"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="摄像头厂商类型" prop="factoryType">
        <el-select v-model="queryParams.factoryType" placeholder="请选择摄像头厂商类型" clearable size="small" style="width: 9vw;">
          <el-option v-for="i in factoryTypeList" :key="i.dictValue" :label="i.dictLabel" :value="i.dictValue" />
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
          v-hasPermi="['beam:camera:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['beam:camera:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['beam:camera:remove']">删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
          v-hasPermi="['beam:camera:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="cameraList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="cameraId" />
      <el-table-column label="监控名称" align="center" prop="ayName" />
      <el-table-column label="设备号" align="center" prop="aySerNo" />
      <el-table-column label="监控位置" align="center" prop="ayType" />
      <el-table-column label="摄像头编号" align="center" prop="cno" />
      <el-table-column label="摄像头厂商类型" align="center" prop="factoryType" :formatter="formatter" />
      <!-- <el-table-column label="租户号" align="center" prop="tenantId" /> -->
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['beam:camera:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['beam:camera:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改监控列对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="监控名称" prop="ayName">
          <el-input v-model="form.ayName" placeholder="请输入监控名称" />
        </el-form-item>
        <el-form-item label="设备号" prop="aySerNo">
          <el-input v-model="form.aySerNo" placeholder="请输入设备号" />
        </el-form-item>
        <el-form-item label="监控位置" prop="ayType">
          <el-select v-model="form.ayType" placeholder="请选择监控位置" class="select-width">
            <el-option v-for="i in ayTypeList" :key="i.dictValue" :label="i.dictLabel" :value="i.dictValue" />
          </el-select>
        </el-form-item>
        <el-form-item label="摄像头编号" prop="cno">
          <el-input v-model="form.cno" placeholder="请输入摄像头编号" />
        </el-form-item>
        <el-form-item label="摄像头厂商类型" prop="factoryType">
          <el-select v-model="form.factoryType" placeholder="请选择摄像头厂商类型" class="select-width">
            <el-option v-for="i in factoryTypeList" :key="i.dictValue" :label="i.dictLabel" :value="i.dictValue" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="租户号" prop="tenantId">
          <el-input v-model="form.tenantId" placeholder="请输入租户号" />
        </el-form-item> -->
        <el-form-item label="备注">
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
import { listCamera, getCamera, delCamera, addCamera, updateCamera, exportCamera } from "@/api/beam/camera";

export default {
  name: "Camera",
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
      // 监控列表格数据
      cameraList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        ayName: null,
        aySerNo: null,
        ayType: null,
        cno: null,
        factoryType: null,
        tenantId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        ayName: [
          { required: true, message: "监控名称不能为空", trigger: "blur" }
        ],
        aySerNo: [
          { required: true, message: "设备号不能为空", trigger: "blur" }
        ],
        ayType: [
          { required: true, message: "监控位置不能为空", trigger: "change" }
        ],
        cno: [
          { required: true, message: "摄像头编号不能为空", trigger: "blur" }
        ],
        factoryType: [
          { required: true, message: "摄像头厂商类型不能为空", trigger: "change" }
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
      ayTypeList: [],
      factoryTypeList: [],
    };
  },
  created () {
    this.getList();
    this.getDicts('camera_location').then(res => {
      console.log(res);
      const { data } = res
      this.ayTypeList = data
    })
    this.getDicts('camera_factory').then(res => {
      const { data } = res
      this.factoryTypeList = data
    })
  },
  methods: {
    /** 查询监控列列表 */
    getList () {
      this.loading = true;
      listCamera(this.queryParams).then(response => {
        const { items, total } = response.data
        this.cameraList = items;
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
        cameraId: null,
        ayName: null,
        aySerNo: null,
        ayType: null,
        cno: null,
        factoryType: null,
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
      this.ids = selection.map(item => item.cameraId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd () {
      this.reset();
      this.open = true;
      this.title = "添加监控列";
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset();
      const cameraId = row.cameraId || this.ids
      getCamera(cameraId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改监控列";
      });
    },
    /** 提交按钮 */
    submitForm () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.cameraId != null) {
            updateCamera(this.form).then(response => {
              // console.log(response.code);

              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();

            });
          } else {
            addCamera(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    formatter (row, column, cellValue) {
      if (column.property === 'factoryType') {
        return this.selectDictLabels(this.factoryTypeList, cellValue)
      }
    },
    /** 删除按钮操作 */
    handleDelete (row) {
      const cameraIds = row.cameraId || this.ids;
      this.$modal.confirm('是否确认删除监控列编号为"' + cameraIds + '"的数据项？').then(function () {
        return delCamera(cameraIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport () {
      const queryParams = this.queryParams;
      this.$modal.confirm('是否确认导出所有监控列数据项？').then(() => {
        this.exportLoading = true;
        return exportCamera(queryParams);
      }).then(response => {
        this.$download.name(response.msg);
        this.exportLoading = false;
      }).catch(() => { });
    }
  }
};
</script>

<style lang="scss" scoped>
.select-width {
  width: 100%;
}
</style>
