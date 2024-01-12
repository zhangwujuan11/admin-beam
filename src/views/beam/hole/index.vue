<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="孔道代码" prop="boreholeCode">
        <el-input v-model="queryParams.boreholeCode" placeholder="请输入孔道代码" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="工程部位" prop="boreholeLocation">
        <el-input v-model="queryParams.boreholeLocation" placeholder="请输入工程部位" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <!-- 
      <el-form-item label="梁号" prop="beamCode">
        <el-input v-model="queryParams.beamCode" placeholder="请输入梁号" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item> -->
      <el-form-item label="梁型" prop="beamModel">
        <el-input v-model="queryParams.beamModel" placeholder="请输入梁型" clearable size="small"
          @keyup.enter.native="handleQuery" />
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
          v-hasPermi="['beam:hole:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['beam:hole:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['beam:hole:remove']">删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
          v-hasPermi="['beam:hole:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="holeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="孔道ID" align="center" prop="boreholeId" />
      <el-table-column label="孔道代码" align="center" prop="boreholeCode" />
      <el-table-column label="工程部位" align="center" prop="boreholeLocation" />
      <!-- <el-table-column label="梁片ID" align="center" prop="beamId" /> -->
      <!-- <el-table-column label="梁号" align="center" prop="beamCode" /> -->
      <el-table-column label="梁型" align="center" prop="beamModel" />
      <!-- <el-table-column label="建设单位名称" align="center" prop="constructionUnit" /> -->
      <!-- <el-table-column label="租户号" align="center" prop="tenantId" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['beam:hole:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['beam:hole:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改梁片孔道对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="孔道代码" prop="boreholeCode">
          <el-input v-model="form.boreholeCode" placeholder="请输入孔道代码" />
        </el-form-item>
        <el-form-item label="工程部位" prop="boreholeLocation">
          <el-input v-model="form.boreholeLocation" placeholder="请输入工程部位" />
        </el-form-item>
        <el-form-item label="梁型" prop="beamModel">
          <el-input v-model="form.beamModel" placeholder="请输入梁型" />
        </el-form-item>
        <!-- <el-form-item label="租户号" prop="tenantId">
          <el-input v-model="form.tenantId" placeholder="请输入租户号" />
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
import { listHole, getHole, delHole, addHole, updateHole, exportHole } from "@/api/beam/hole";

export default {
  name: "Hole",
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
      // 梁片孔道;表格数据
      holeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        boreholeCode: null,
        boreholeLocation: null,
        beamId: null,
        beamCode: null,
        beamModel: null,
        constructionUnit: null,
        tenantId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        boreholeCode: [
          { required: true, message: "孔道代码不能为空", trigger: "blur" }
        ],
        boreholeLocation: [
          { required: true, message: "工程部位不能为空", trigger: "blur" }
        ],
        beamId: [
          { required: true, message: "梁片ID不能为空", trigger: "blur" }
        ],
        beamCode: [
          { required: true, message: "梁号不能为空", trigger: "blur" }
        ],
        beamModel: [
          { required: true, message: "梁型不能为空", trigger: "blur" }
        ],
        constructionUnit: [
          { required: true, message: "建设单位名称不能为空", trigger: "blur" }
        ],
        tenantId: [
          { required: true, message: "租户号不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "更新时间不能为空", trigger: "blur" }
        ],
        updateBy: [
          { required: true, message: "更新者-登录名不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created () {
    this.getList();
  },
  methods: {
    /** 查询梁片孔道;列表 */
    getList () {
      this.loading = true;
      listHole(this.queryParams).then(response => {
        console.log(response);
        const { items, total } = response.data
        this.holeList = items;
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
        boreholeId: null,
        boreholeCode: null,
        boreholeLocation: null,
        beamId: null,
        beamCode: null,
        beamModel: null,
        constructionUnit: null,
        tenantId: null,
        createTime: null,
        updateTime: null,
        createBy: null,
        updateBy: null,
        delFlag: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery () {
      this.queryParams.pageNum = 1;
      console.log(this.queryParams);
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery () {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange (selection) {
      this.ids = selection.map(item => item.boreholeId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd () {
      this.reset();
      this.open = true;
      this.title = "添加梁片孔道";
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset();
      const boreholeId = row.boreholeId || this.ids
      getHole(boreholeId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改梁片孔道";
      });
    },
    /** 提交按钮 */
    submitForm () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.boreholeId != null) {
            updateHole(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addHole(this.form).then(response => {
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
      const boreholeIds = row.boreholeId || this.ids;
      this.$modal.confirm('是否确认删除梁片孔道;编号为"' + boreholeIds + '"的数据项？').then(function () {
        return delHole(boreholeIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport () {
      const queryParams = this.queryParams;
      this.$modal.confirm('是否确认导出所有梁片孔道;数据项？').then(() => {
        this.exportLoading = true;
        return exportHole(queryParams);
      }).then(response => {
        this.$download.name(response.msg);
        this.exportLoading = false;
      }).catch(() => { });
    }
  }
};
</script>
