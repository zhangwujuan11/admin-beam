<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="区域代码" prop="regionCode">
        <el-input
          v-model="queryParams.regionCode"
          placeholder="请输入区域代码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="区域名称" prop="regionName">
        <el-input
          v-model="queryParams.regionName"
          placeholder="请输入区域名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="台座ID" prop="seatId">
        <el-input
          v-model="queryParams.seatId"
          placeholder="请输入台座ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="台座代码" prop="seatCode">
        <el-input
          v-model="queryParams.seatCode"
          placeholder="请输入台座代码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="台座名称" prop="seatName">
        <el-input
          v-model="queryParams.seatName"
          placeholder="请输入台座名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="梁片ID" prop="beamId">
        <el-input
          v-model="queryParams.beamId"
          placeholder="请输入梁片ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="梁片代码" prop="beamCode">
        <el-input
          v-model="queryParams.beamCode"
          placeholder="请输入梁片代码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="梁片名称" prop="beamName">
        <el-input
          v-model="queryParams.beamName"
          placeholder="请输入梁片名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="梁片关联状态;1-占用;2-空闲" prop="relateStatus">
        <el-select v-model="queryParams.relateStatus" placeholder="请选择梁片关联状态;1-占用;2-空闲" clearable size="small">
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
          v-hasPermi="['beam:seatBeam:add']"
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
          v-hasPermi="['beam:seatBeam:edit']"
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
          v-hasPermi="['beam:seatBeam:remove']"
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
          v-hasPermi="['beam:seatBeam:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="seatBeamList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="关联ID" align="center" prop="id" />
      <el-table-column label="区域代码" align="center" prop="regionCode" />
      <el-table-column label="区域名称" align="center" prop="regionName" />
      <el-table-column label="台座ID" align="center" prop="seatId" />
      <el-table-column label="台座代码" align="center" prop="seatCode" />
      <el-table-column label="台座名称" align="center" prop="seatName" />
      <el-table-column label="梁片ID" align="center" prop="beamId" />
      <el-table-column label="梁片代码" align="center" prop="beamCode" />
      <el-table-column label="梁片名称" align="center" prop="beamName" />
      <el-table-column label="梁片关联状态;1-占用;2-空闲" align="center" prop="relateStatus" />
      <el-table-column label="租户号" align="center" prop="tenantId" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['beam:seatBeam:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['beam:seatBeam:remove']"
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

    <!-- 添加或修改台座-梁片关联;对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="区域代码" prop="regionCode">
          <el-input v-model="form.regionCode" placeholder="请输入区域代码" />
        </el-form-item>
        <el-form-item label="区域名称" prop="regionName">
          <el-input v-model="form.regionName" placeholder="请输入区域名称" />
        </el-form-item>
        <el-form-item label="台座ID" prop="seatId">
          <el-input v-model="form.seatId" placeholder="请输入台座ID" />
        </el-form-item>
        <el-form-item label="台座代码" prop="seatCode">
          <el-input v-model="form.seatCode" placeholder="请输入台座代码" />
        </el-form-item>
        <el-form-item label="台座名称" prop="seatName">
          <el-input v-model="form.seatName" placeholder="请输入台座名称" />
        </el-form-item>
        <el-form-item label="梁片ID" prop="beamId">
          <el-input v-model="form.beamId" placeholder="请输入梁片ID" />
        </el-form-item>
        <el-form-item label="梁片代码" prop="beamCode">
          <el-input v-model="form.beamCode" placeholder="请输入梁片代码" />
        </el-form-item>
        <el-form-item label="梁片名称" prop="beamName">
          <el-input v-model="form.beamName" placeholder="请输入梁片名称" />
        </el-form-item>
        <el-form-item label="梁片关联状态;1-占用;2-空闲">
          <el-radio-group v-model="form.relateStatus">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
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
import { listSeatBeam, getSeatBeam, delSeatBeam, addSeatBeam, updateSeatBeam, exportSeatBeam } from "@/api/beam/seatBeam";

export default {
  name: "SeatBeam",
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
      // 台座-梁片关联;表格数据
      seatBeamList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        regionCode: null,
        regionName: null,
        seatId: null,
        seatCode: null,
        seatName: null,
        beamId: null,
        beamCode: null,
        beamName: null,
        relateStatus: null,
        tenantId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        regionCode: [
          { required: true, message: "区域代码不能为空", trigger: "blur" }
        ],
        regionName: [
          { required: true, message: "区域名称不能为空", trigger: "blur" }
        ],
        seatId: [
          { required: true, message: "台座ID不能为空", trigger: "blur" }
        ],
        seatCode: [
          { required: true, message: "台座代码不能为空", trigger: "blur" }
        ],
        seatName: [
          { required: true, message: "台座名称不能为空", trigger: "blur" }
        ],
        beamId: [
          { required: true, message: "梁片ID不能为空", trigger: "blur" }
        ],
        beamCode: [
          { required: true, message: "梁片代码不能为空", trigger: "blur" }
        ],
        beamName: [
          { required: true, message: "梁片名称不能为空", trigger: "blur" }
        ],
        relateStatus: [
          { required: true, message: "梁片关联状态;1-占用;2-空闲不能为空", trigger: "blur" }
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
    /** 查询台座-梁片关联;列表 */
    getList() {
      this.loading = true;
      listSeatBeam(this.queryParams).then(response => {
        this.seatBeamList = response.rows;
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
        id: null,
        regionCode: null,
        regionName: null,
        seatId: null,
        seatCode: null,
        seatName: null,
        beamId: null,
        beamCode: null,
        beamName: null,
        relateStatus: 0,
        tenantId: null,
        createTime: null,
        updateTime: null,
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加台座-梁片关联;";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getSeatBeam(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改台座-梁片关联;";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateSeatBeam(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSeatBeam(this.form).then(response => {
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
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除台座-梁片关联;编号为"' + ids + '"的数据项？').then(function() {
        return delSeatBeam(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$modal.confirm('是否确认导出所有台座-梁片关联;数据项？').then(() => {
        this.exportLoading = true;
        return exportSeatBeam(queryParams);
      }).then(response => {
        this.$download.name(response.msg);
        this.exportLoading = false;
      }).catch(() => {});
    }
  }
};
</script>
