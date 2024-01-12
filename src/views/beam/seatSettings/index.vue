<template>
  <div class="app-container">
    <el-form :inline="true" :model="queryParams" label-width="68px" ref="queryForm" v-show="showSearch">
      <el-form-item prop="regionCode">
        <el-select clearable placeholder="请选择区域编号" size="small" v-model="queryParams.regionCode">
          <el-option :key="index" :label="item.regionCode" :value="item.regionCode"
            v-for="(item, index) in AreaNumber"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="seatType">
        <el-select clearable placeholder="请选择台座类型" size="small" v-model="queryParams.seatType">
          <el-option :key="index" :label="item.dictLabel" :value="item.dictLabel"
            v-for="(item, index) in PedestalType"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="seatArea">
        <el-select clearable placeholder="请选择台座区域" size="small" v-model="queryParams.seatArea">
          <el-option :key="index" :label="item.dictLabel" :value="item.dictLabel"
            v-for="(item, index) in PedestalArea"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="seatCode">
        <el-input placeholder="请输入台座编号" size="small" v-model="queryParams.seatCode" clearable />
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
      <!-- <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-refresh-left" size="mini" @click="handleReset"
          v-hasPermi="['beam:planning:Reset']">台座初始化</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['beam:planning:remove']">删除</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :data="seatSettingsList" @selection-change="handleSelectionChange" v-loading="loading">
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
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="区域编号" prop="regionCode">
          <!-- <el-input v-model="form.regionCode" placeholder="请输入区域编号" clearable /> -->
          <el-select clearable placeholder="请选择区域编号" size="small" v-model="form.regionCode">
            <el-option :key="index" :label="item.regionCode" :value="item.regionCode"
              v-for="(item, index) in AreaNumber"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="台座区域" prop="seatArea">
          <el-select v-model="form.seatArea" placeholder="请输入台座区域" clearable>
            <el-option :key="index" :label="item.dictLabel" :value="item.dictLabel"
              v-for="(item, index) in PedestalArea"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="台座类型" prop="seatType">
          <el-select v-model="form.seatType" placeholder="请选择台座类型" clearable>
            <el-option :key="index" :label="item.dictLabel" :value="item.dictLabel"
              v-for="(item, index) in PedestalType"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="台座编号" prop="seatCode">
          <el-input v-model="form.seatCode" placeholder="请输入台座编号" clearable />
        </el-form-item>
        <el-form-item label="台座层数" prop="seatFloor">
          <el-select v-model="form.seatFloor" placeholder="请输入台座层数" clearable>
            <el-option :key="index" :label="item.dictLabel" :value="item.dictLabel"
              v-for="(item, index) in pedestalFloors"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="每层个数" prop="seatsPerFloor">
          <el-input v-model="form.seatsPerFloor" placeholder="请输入每层个数" clearable />
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
import { listSeatSettings, getSeatSettings, delSeatSettings, addSeatSettings, updateSeatSettings, exportSeatSettings, resetSeatSettings, listRegion } from "@/api/beam/seatSettings";

export default {
  name: "SeatSettings",
  data () {
    return {
      // 台座区域
      PedestalArea: [],
      // 台座类型
      PedestalType: [],
      // 区域编号
      AreaNumber: [],
      // 台座层数
      pedestalFloors: [],
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
      // 台座设置表格数据
      seatSettingsList: [],
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
          { required: true, message: "台座区域不能为空", trigger: "change" }
        ],
        seatCode: [
          { required: true, message: "台座编号不能为空", trigger: "blur" }
        ],
        seatFloor: [
          { required: true, message: "台座层数不能为空", trigger: "change" }
        ],
        seatsPerFloor: [
          { required: true, message: "每层个数不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created () {
    this.getList();
    this.getlistRegion()
    this.getDicts('seatSettings').then(res => {
      // console.log(res);
      this.PedestalArea = res.data
      // console.log(this.PedestalArea);
    })
    this.getDicts('seatSettings_type').then(res => {
      // console.log(res);
      this.PedestalType = res.data
      // console.log(this.PedestalType);
    })
    // this.getDicts('AreaNumber').then(res => {
    //   console.log(res);
    //   this.AreaNumber = res.data
    //   console.log(this.PedestalType);
    // })
    this.getDicts('pedestalFloors').then(res => {
      // console.log(res);
      this.pedestalFloors = res.data
      // console.log(this.PedestalType);
    })
  },
  methods: {
    /** 查询台座设置列表 */
    getList () {
      this.loading = true;
      listSeatSettings(this.queryParams).then(response => {
        // console.log(response);
        this.seatSettingsList = response.data.items;
        // console.log(this.seatSettingsList);
        this.total = response.data.total;
        this.loading = false;
      });
    },
    async getlistRegion () {
      const res = await listRegion()
      // console.log(res, '区域');
      this.AreaNumber = res.data.items
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
    // 新增表单按钮
    addList () {
      this.reset()
      // this.form2 = {}
      this.open2 = true
      this.title = '新增工法'
    },
    /** 新增按钮操作 */
    handleAdd () {
      this.reset();
      this.open = true;
      this.title = "添加台座设置";
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset();
      console.log(row);
      const seatId = row.seatId || this.ids
      getSeatSettings(seatId).then(response => {
        console.log(response);
        this.form = response.data;
        this.open = true;
        this.title = "修改台座设置";
      });
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
              console.log(this.form);
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
    // 初始化台座
    handleReset () {
      resetSeatSettings().then(response => {
        console.log(response);
        this.getList()
      });
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
