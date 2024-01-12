<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="110px">
      <el-form-item label="龙门吊名称" prop="name">
        <el-input v-model="queryParams.name" placeholder="请输入龙门吊名称" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="当前状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择当前状态" clearable size="small">
          <el-option v-for="i in statusList" :key="i.dictValue" :label="i.dictLabel" :value="i.dictValue" />
        </el-select>
      </el-form-item>
      <el-form-item label="设备型号" prop="deviceModel">
        <el-input v-model="queryParams.deviceModel" placeholder="请输入设备型号" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <!-- <el-form-item label="产权备案编号" prop="ownershipRecordNumber">
        <el-input
          v-model="queryParams.ownershipRecordNumber"
          placeholder="请输入产权备案编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="使用登记编号" prop="usageRegistrationNumber">
        <el-input
          v-model="queryParams.usageRegistrationNumber"
          placeholder="请输入使用登记编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="检测情况时间" prop="testDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.testDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择检测情况时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="使用登记时间" prop="usageRegistrationDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.usageRegistrationDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择使用登记时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="最大起重" prop="maxCapacity">
        <el-input
          v-model="queryParams.maxCapacity"
          placeholder="请输入最大起重"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="最大力矩" prop="maxMoment">
        <el-input
          v-model="queryParams.maxMoment"
          placeholder="请输入最大力矩"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="司机姓名" prop="driverName">
        <el-input v-model="queryParams.driverName" placeholder="请输入司机姓名" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item> -->
      <!-- <el-form-item label="司机联系方式" prop="driverContact">
        <el-input
          v-model="queryParams.driverContact"
          placeholder="请输入司机联系方式"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="大车行程" prop="trolleyMovement">
        <el-input
          v-model="queryParams.trolleyMovement"
          placeholder="请输入大车行程"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="大车速度" prop="trolleySpeed">
        <el-input v-model="queryParams.trolleySpeed" placeholder="请输入大车速度" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item> -->
      <!-- <el-form-item label="小车行程" prop="hoistMovement">
        <el-input
          v-model="queryParams.hoistMovement"
          placeholder="请输入小车行程"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="小车速度" prop="hoistSpeed">
        <el-input
          v-model="queryParams.hoistSpeed"
          placeholder="请输入小车速度"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="主钩电流" prop="mainHookCurrent">
        <el-input
          v-model="queryParams.mainHookCurrent"
          placeholder="请输入主钩电流"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="主钩电压" prop="mainHookVoltage">
        <el-input
          v-model="queryParams.mainHookVoltage"
          placeholder="请输入主钩电压"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="主钩载重" prop="mainHookLoad">
        <el-input
          v-model="queryParams.mainHookLoad"
          placeholder="请输入主钩载重"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="主钩高度" prop="mainHookHeight">
        <el-input v-model="queryParams.mainHookHeight" placeholder="请输入主钩高度" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="小钩载重" prop="auxiliaryHookLoad">
        <el-input v-model="queryParams.auxiliaryHookLoad" placeholder="请输入小钩载重" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item> -->
      <!-- <el-form-item label="小钩高度" prop="auxiliaryHookHeight">
        <el-input
          v-model="queryParams.auxiliaryHookHeight"
          placeholder="请输入小钩高度"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="环境风速" prop="environmentalWindSpeed">
        <el-input
          v-model="queryParams.environmentalWindSpeed"
          placeholder="请输入环境风速"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
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
          v-hasPermi="['beam:crane:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['beam:crane:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['beam:crane:remove']">删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
          v-hasPermi="['beam:crane:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="craneList" @selection-change="handleSelectionChange" height="70vh">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="craneId" />
      <el-table-column label="龙门吊名称" align="center" prop="name" />
      <el-table-column label="当前状态" align="center" prop="status" :formatter="formatter" />
      <el-table-column label="设备型号" align="center" prop="deviceModel" />
      <el-table-column label="产权备案编号" align="center" prop="ownershipRecordNumber" />
      <el-table-column label="使用登记编号" align="center" prop="usageRegistrationNumber" />
      <el-table-column label="检测情况时间" align="center" prop="testDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.testDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="使用登记时间" align="center" prop="usageRegistrationDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.usageRegistrationDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最大起重" align="center" prop="maxCapacity" />
      <el-table-column label="最大力矩" align="center" prop="maxMoment" />
      <el-table-column label="司机姓名" align="center" prop="driverName" />
      <el-table-column label="司机联系方式" align="center" prop="driverContact" />
      <el-table-column label="大车行程" align="center" prop="trolleyMovement" />
      <el-table-column label="大车速度" align="center" prop="trolleySpeed" />
      <el-table-column label="小车行程" align="center" prop="hoistMovement" />
      <el-table-column label="小车速度" align="center" prop="hoistSpeed" />
      <el-table-column label="主钩电流" align="center" prop="mainHookCurrent" />
      <el-table-column label="主钩电压" align="center" prop="mainHookVoltage" />
      <el-table-column label="主钩载重" align="center" prop="mainHookLoad" />
      <el-table-column label="主钩高度" align="center" prop="mainHookHeight" />
      <el-table-column label="小钩载重" align="center" prop="auxiliaryHookLoad" />
      <el-table-column label="小钩高度" align="center" prop="auxiliaryHookHeight" />
      <el-table-column label="环境风速" align="center" prop="environmentalWindSpeed" />
      <!-- <el-table-column label="租户号" align="center" prop="tenantId" /> -->
      <!-- <el-table-column label="备注" align="center" prop="remark" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="110px" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['beam:crane:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['beam:crane:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改龙门吊对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="750px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="110px" inline>
        <el-form-item label="龙门吊名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入龙门吊名称" />
        </el-form-item>
        <el-form-item label="当前状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio v-for="i in statusList" :key="i.dictValue" :label="i.dictValue">{{ i.dictLabel }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="设备型号" prop="deviceModel">
          <el-input v-model="form.deviceModel" placeholder="请输入设备型号" />
        </el-form-item>
        <el-form-item label="产权备案编号" prop="ownershipRecordNumber">
          <el-input v-model="form.ownershipRecordNumber" placeholder="请输入产权备案编号" />
        </el-form-item>
        <el-form-item label="使用登记编号" prop="usageRegistrationNumber">
          <el-input v-model="form.usageRegistrationNumber" placeholder="请输入使用登记编号" />
        </el-form-item>
        <el-form-item label="检测情况时间" prop="testDate">
          <el-date-picker clearable size="small" v-model="form.testDate" type="date" style="width: 100%;"
            placeholder="选择检测情况时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="使用登记时间" prop="usageRegistrationDate">
          <el-date-picker clearable size="small" v-model="form.usageRegistrationDate" type="date" style="width: 100%;"
            placeholder="选择使用登记时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最大起重" prop="maxCapacity">
          <el-input type="number" v-model="form.maxCapacity" placeholder="请输入最大起重" />
        </el-form-item>
        <el-form-item label="最大力矩" prop="maxMoment">
          <el-input type="number" v-model="form.maxMoment" placeholder="请输入最大力矩" />
        </el-form-item>
        <el-form-item label="司机姓名" prop="driverName">
          <el-input v-model="form.driverName" placeholder="请输入司机姓名" />
        </el-form-item>
        <el-form-item label="司机联系方式" prop="driverContact">
          <el-input v-model="form.driverContact" placeholder="请输入司机联系方式" />
        </el-form-item>
        <el-form-item label="大车行程" prop="trolleyMovement">
          <el-input type="number" v-model="form.trolleyMovement" placeholder="请输入大车行程" />
        </el-form-item>
        <el-form-item label="大车速度" prop="trolleySpeed">
          <el-input type="number" v-model="form.trolleySpeed" placeholder="请输入大车速度" />
        </el-form-item>
        <el-form-item label="小车行程" prop="hoistMovement">
          <el-input type="number" v-model="form.hoistMovement" placeholder="请输入小车行程" />
        </el-form-item>
        <el-form-item label="小车速度" prop="hoistSpeed">
          <el-input type="number" v-model="form.hoistSpeed" placeholder="请输入小车速度" />
        </el-form-item>
        <el-form-item label="主钩电流" prop="mainHookCurrent">
          <el-input type="number" v-model="form.mainHookCurrent" placeholder="请输入主钩电流" />
        </el-form-item>
        <el-form-item label="主钩电压" prop="mainHookVoltage">
          <el-input type="number" v-model="form.mainHookVoltage" placeholder="请输入主钩电压" />
        </el-form-item>
        <el-form-item label="主钩载重" prop="mainHookLoad">
          <el-input type="number" v-model="form.mainHookLoad" placeholder="请输入主钩载重" />
        </el-form-item>
        <el-form-item label="主钩高度" prop="mainHookHeight">
          <el-input type="number" v-model="form.mainHookHeight" placeholder="请输入主钩高度" />
        </el-form-item>
        <el-form-item label="小钩载重" prop="auxiliaryHookLoad">
          <el-input type="number" v-model="form.auxiliaryHookLoad" placeholder="请输入小钩载重" />
        </el-form-item>
        <el-form-item label="小钩高度" prop="auxiliaryHookHeight">
          <el-input type="number" v-model="form.auxiliaryHookHeight" placeholder="请输入小钩高度" />
        </el-form-item>
        <el-form-item label="环境风速" prop="environmentalWindSpeed">
          <el-input type="number" v-model="form.environmentalWindSpeed" placeholder="请输入环境风速" />
        </el-form-item>
        <!-- <el-form-item label="租户号" prop="tenantId">
          <el-input v-model="form.tenantId" placeholder="请输入租户号" />
        </el-form-item> -->
        <!-- <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
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
import { listCrane, getCrane, delCrane, addCrane, updateCrane, exportCrane } from "@/api/beam/crane";

export default {
  name: "Crane",
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
      // 龙门吊表格数据
      craneList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        status: null,
        deviceModel: null,
        ownershipRecordNumber: null,
        usageRegistrationNumber: null,
        testDate: null,
        usageRegistrationDate: null,
        maxCapacity: null,
        maxMoment: null,
        driverName: null,
        driverContact: null,
        trolleyMovement: null,
        trolleySpeed: null,
        hoistMovement: null,
        hoistSpeed: null,
        mainHookCurrent: null,
        mainHookVoltage: null,
        mainHookLoad: null,
        mainHookHeight: null,
        auxiliaryHookLoad: null,
        auxiliaryHookHeight: null,
        environmentalWindSpeed: null,
        tenantId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: "龙门吊名称不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "当前状态不能为空", trigger: "blur" }
        ],
        deviceModel: [
          { required: true, message: "设备型号不能为空", trigger: "blur" }
        ],

        // ownershipRecordNumber: [
        //   { message: "产权备案编号不能为空", trigger: "blur" }
        // ],
        // usageRegistrationNumber: [
        //   { message: "使用登记编号不能为空", trigger: "blur" }
        // ],
        // testDate: [
        //   { message: "检测情况时间不能为空", trigger: "blur" }
        // ],
        // usageRegistrationDate: [
        //   { message: "使用登记时间不能为空", trigger: "blur" }
        // ],
        // maxCapacity: [
        //   { message: "最大起重不能为空", trigger: "blur" }
        // ],
        // maxMoment: [
        //   { message: "最大力矩不能为空", trigger: "blur" }
        // ],
        // driverName: [
        //   { message: "司机姓名不能为空", trigger: "blur" }
        // ],
        // driverContact: [
        //   { message: "司机联系方式不能为空", trigger: "blur" }
        // ],
        // trolleyMovement: [
        //   { message: "大车行程不能为空", trigger: "blur" }
        // ],
        // trolleySpeed: [
        //   { message: "大车速度不能为空", trigger: "blur" }
        // ],
        // hoistMovement: [
        //   { message: "小车行程不能为空", trigger: "blur" }
        // ],
        // hoistSpeed: [
        //   { message: "小车速度不能为空", trigger: "blur" }
        // ],
        // mainHookCurrent: [
        //   { message: "主钩电流不能为空", trigger: "blur" }
        // ],
        // mainHookVoltage: [
        //   { message: "主钩电压不能为空", trigger: "blur" }
        // ],
        // mainHookLoad: [
        //   { message: "主钩载重不能为空", trigger: "blur" }
        // ],
        // mainHookHeight: [
        //   { message: "主钩高度不能为空", trigger: "blur" }
        // ],
        // auxiliaryHookLoad: [
        //   { message: "小钩载重不能为空", trigger: "blur" }
        // ],
        // auxiliaryHookHeight: [
        //   { message: "小钩高度不能为空", trigger: "blur" }
        // ],
        // environmentalWindSpeed: [
        //   { message: "环境风速不能为空", trigger: "blur" }
        // ],
        // tenantId: [
        //   { message: "租户号不能为空", trigger: "blur" }
        // ],
        // updateBy: [
        //   { message: "更新者不能为空", trigger: "blur" }
        // ],
        // updateTime: [
        //   { message: "更新时间不能为空", trigger: "blur" }
        // ],
        // remark: [
        //   { message: "备注不能为空", trigger: "blur" }
        // ],
      },
      statusList: []
    };
  },
  created () {
    this.getList();
    this.getDicts('crane_status').then(res => {
      const { data } = res
      data.map(i => {
        i.dictValue = Number(i.dictValue)
        return i
      })
      this.statusList = data
    })
  },
  methods: {
    /** 查询龙门吊列表 */
    getList () {
      this.loading = true;
      listCrane(this.queryParams).then(response => {
        const { items, total } = response.data
        this.craneList = items;
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
        craneId: null,
        name: null,
        status: null,
        deviceModel: null,
        ownershipRecordNumber: null,
        usageRegistrationNumber: null,
        testDate: null,
        usageRegistrationDate: null,
        maxCapacity: null,
        maxMoment: null,
        driverName: null,
        driverContact: null,
        trolleyMovement: null,
        trolleySpeed: null,
        hoistMovement: null,
        hoistSpeed: null,
        mainHookCurrent: null,
        mainHookVoltage: null,
        mainHookLoad: null,
        mainHookHeight: null,
        auxiliaryHookLoad: null,
        auxiliaryHookHeight: null,
        environmentalWindSpeed: null,
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
      this.ids = selection.map(item => item.craneId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd () {
      this.reset();
      this.open = true;
      this.title = "添加龙门吊";
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset();
      const craneId = row.craneId || this.ids
      getCrane(craneId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改龙门吊";
      });
    },
    /** 提交按钮 */
    submitForm () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const form = {
            ...this.form,
            maxCapacity: Number(this.form.maxCapacity),
            maxMoment: Number(this.form.maxMoment),
            trolleyMovement: Number(this.form.trolleyMovement),
            trolleySpeed: Number(this.form.trolleySpeed),
            hoistMovement: Number(this.form.hoistMovement),
            mainHookHeight: Number(this.form.mainHookHeight),
            auxiliaryHookLoad: Number(this.form.auxiliaryHookLoad),
            auxiliaryHookHeight: Number(this.form.auxiliaryHookHeight),
            environmentalWindSpeed: Number(this.form.environmentalWindSpeed),
            hoistSpeed: Number(this.form.hoistSpeed),
            mainHookLoad: Number(this.form.mainHookLoad),
          }
          console.log(form);
          if (this.form.craneId != null) {
            updateCrane(form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCrane(form).then(response => {
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
      const craneIds = row.craneId || this.ids;
      this.$modal.confirm('是否确认删除龙门吊编号为"' + craneIds + '"的数据项？').then(function () {
        return delCrane(craneIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport () {
      const queryParams = this.queryParams;
      this.$modal.confirm('是否确认导出所有龙门吊数据项？').then(() => {
        this.exportLoading = true;
        return exportCrane(queryParams);
      }).then(response => {
        this.$download.name(response.msg);
        this.exportLoading = false;
      }).catch(() => { });
    },
    formatter (row, column, cellValue) {
      if (column.property === 'status') {
        return this.selectDictLabels(this.statusList, cellValue)
      }
    }
  }
};
</script>
<style lang="scss">
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.date-width {
  width: 100%;
}
</style>
