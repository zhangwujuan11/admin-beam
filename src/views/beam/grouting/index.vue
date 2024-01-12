<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="110px">
      <!-- <el-form-item label="梁片ID" prop="beamId">
        <el-input
          v-model="queryParams.beamId"
          placeholder="请输入梁片ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="梁片代码" prop="beamCode">
        <!-- <el-input v-model="queryParams.beamCode" placeholder="请输入梁片代码" clearable size="small"
          @keyup.enter.native="handleQuery" /> -->
        <el-select v-model="queryParams.beamCode" placeholder="请选择梁片代码">
          <el-option v-for="(item, index) in options" :key="index" :label="item.beamCode" :value="item.beamCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="梁型" prop="beamModel">
        <el-input v-model="queryParams.beamModel" placeholder="请输入梁型" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <!-- <el-form-item label="孔道ID" prop="boreholeId">
        <el-input
          v-model="queryParams.boreholeId"
          placeholder="请输入孔道ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="孔道编号" prop="boreholeCode">
        <!-- <el-input v-model="queryParams.boreholeCode" placeholder="请输入孔道编号" clearable size="small"
          @keyup.enter.native="handleQuery" /> -->
        <el-select v-model="queryParams.boreholeCode" placeholder="请选择孔道编号">
          <el-option v-for="(item, index) in options1" :key="index" :label="item.boreholeCode" :value="item.boreholeCode">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="水灰比" prop="waterCementRatio">
        <el-input
          v-model="queryParams.waterCementRatio"
          placeholder="请输入水灰比"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="压浆开始时间" prop="groutingStartTime">
        <el-date-picker clearable size="small" v-model="queryParams.groutingStartTime" type="date"
          value-format="yyyy-MM-dd" placeholder="选择压浆开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="压浆结束时间" prop="groutingEndTime">
        <el-date-picker clearable size="small" v-model="queryParams.groutingEndTime" type="date" value-format="yyyy-MM-dd"
          placeholder="选择压浆结束时间">
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="进浆压力" prop="groutingPressure">
        <el-input
          v-model="queryParams.groutingPressure"
          placeholder="请输入进浆压力"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="进浆量" prop="groutingVolume">
        <el-input
          v-model="queryParams.groutingVolume"
          placeholder="请输入进浆量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="持压时间" prop="holdingTime">
        <el-input
          v-model="queryParams.holdingTime"
          placeholder="请输入持压时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="结果" prop="groutingResult">
        <el-select v-model="queryParams.groutingResult" placeholder="请选择结果" class="select-width">
          <el-option v-for="i in groutingResultList" :key="i.dictValue" :label="i.dictLabel" :value="i.dictValue" />
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
          v-hasPermi="['beam:grouting:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['beam:grouting:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['beam:grouting:remove']">删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
          v-hasPermi="['beam:grouting:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="groutingList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="groutingId" />
      <!-- <el-table-column label="梁片ID" align="center" prop="beamId" /> -->
      <el-table-column label="梁片代码" align="center" prop="beamCode" />
      <el-table-column label="梁型" align="center" prop="beamModel" />
      <el-table-column label="孔道ID" align="center" prop="boreholeId" />
      <el-table-column label="孔道编号" align="center" prop="boreholeCode" />
      <el-table-column label="水灰比" align="center" prop="waterCementRatio" />
      <el-table-column label="压浆开始时间" align="center" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.groutingStartTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="压浆结束时间" align="center" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.groutingEndTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="进浆压力" align="center" prop="groutingPressure" />
      <el-table-column label="进浆量" align="center" prop="groutingVolume" />
      <el-table-column label="持压时间" align="center" prop="holdingTime" />
      <el-table-column label="结果" align="center" prop="groutingResult" :formatter="formatter" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="110px">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['beam:grouting:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['beam:grouting:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <el-table v-loading="loading" :data="groutingList" @selection-change="handleSelectionChange"> -->
    <!-- <el-table-column label="租户号" align="center" prop="tenantId" />  -->
    <!-- </el-table>  -->

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改实验实时数据对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <!-- <el-form-item label="梁片ID" prop="beamId">
          <el-select v-model="form.beamId" placeholder="请选择梁片ID" style="width: 350px;">
            <el-option v-for="(item, index) in options" :key="index" :label="item.beamId" :value="item.beamId">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="梁片代码" prop="beamCode">
          <!-- <el-input v-model="form.beamCode" placeholder="请输入梁片代码" /> -->
          <el-select v-model="form.beamCode" placeholder="请选择梁片代码" style="width: 350px;">
            <el-option v-for="(item, index) in options" :key="index" :label="item.beamCode" :value="item.beamCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="梁型">
          <el-input v-model="form.beamModel" placeholder="请输入梁型" />
        </el-form-item>
        <!-- <el-form-item label="孔道ID" prop="boreholeId">
          <el-select v-model="form.boreholeId" placeholder="请选择孔道ID" style="width: 350px;">
            <el-option v-for="(item, index) in options1" :key="index" :label="item.boreholeId" :value="item.boreholeId">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="孔道" prop="boreholeCode">
          <!-- <el-input v-model="form.boreholeCode" placeholder="请输入孔道编号" /> -->
          <el-select v-model="form.boreholeCode" placeholder="请选择孔道编号" style="width: 350px;">
            <el-option v-for="(item, index) in options1" :key="index" :label="item.boreholeCode"
              :value="item.boreholeCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="水灰比">
          <el-input v-model="form.waterCementRatio" placeholder="请输入水灰比" />
        </el-form-item>
        <el-form-item label="压浆开始时间">
          <el-date-picker clearable size="small" v-model="form.groutingStartTime" type="date" value-format="yyyy-MM-dd"
            style="width: 100%;" placeholder="选择压浆开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="压浆结束时间">
          <el-date-picker clearable size="small" v-model="form.groutingEndTime" type="date" style="width: 100%;"
            value-format="yyyy-MM-dd" placeholder="选择压浆结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="进浆压力">
          <el-input v-model="form.groutingPressure" placeholder="请输入进浆压力" />
        </el-form-item>
        <el-form-item label="进浆量">
          <el-input v-model="form.groutingVolume" placeholder="请输入进浆量" />
        </el-form-item>
        <el-form-item label="持压时间">
          <el-input v-model="form.holdingTime" placeholder="请输入持压时间" />
        </el-form-item>
        <el-form-item label="结果" prop="groutingResult">
          <el-select v-model="form.groutingResult" placeholder="请选择结果" class="select-width">
            <el-option v-for="i in groutingResultList" :key="i.dictValue" :label="i.dictLabel" :value="i.dictValue" />
          </el-select>
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
import { listGrouting, getGrouting, delGrouting, addGrouting, updateGrouting, exportGrouting, getBeams, getHoles } from "@/api/beam/grouting";

export default {
  name: "Grouting",
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
      // 实验实时数据表格数据
      groutingList: [],
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
        beamModel: null,
        boreholeId: null,
        boreholeCode: null,
        waterCementRatio: null,
        groutingStartTime: null,
        groutingEndTime: null,
        groutingPressure: null,
        groutingVolume: null,
        holdingTime: null,
        groutingResult: null,
        tenantId: null,
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
        beamModel: [
          { required: true, message: "梁型不能为空", trigger: "blur" }
        ],
        boreholeId: [
          { required: true, message: "孔道ID不能为空", trigger: "blur" }
        ],
        boreholeCode: [
          { required: true, message: "孔道编号不能为空", trigger: "blur" }
        ],
        waterCementRatio: [
          { required: true, message: "水灰比不能为空", trigger: "blur" }
        ],
        groutingStartTime: [
          { required: true, message: "压浆开始时间不能为空", trigger: "blur" }
        ],
        groutingEndTime: [
          { required: true, message: "压浆结束时间不能为空", trigger: "blur" }
        ],
        groutingPressure: [
          { required: true, message: "进浆压力不能为空", trigger: "blur" }
        ],
        groutingVolume: [
          { required: true, message: "进浆量不能为空", trigger: "blur" }
        ],
        holdingTime: [
          { required: true, message: "持压时间不能为空", trigger: "blur" }
        ],
        groutingResult: [
          { required: true, message: "结果不能为空", trigger: "blur" }
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
      },
      groutingResultList: [],
      options: {},
      options1: {}
    };
  },
  created () {
    this.getList();
    this.getBeams()
    this.getHoles()
    this.getDicts('test_result').then(res => {
      const { data } = res
      data.map(i => {
        i.dictValue = Number(i.dictValue)
        return i
      })
      this.groutingResultList = data
    })
  },
  methods: {
    /** 查询实验实时数据列表 */
    getList () {
      this.loading = true;
      listGrouting(this.queryParams).then(response => {
        console.log(response);
        const { items, total } = response.data
        this.groutingList = items;
        this.total = total;
      }).finally(() => {
        this.loading = false;
      })
    },
    getBeams () {
      getBeams().then(response => {
        console.log(response);
        this.options = response.data.items
      })
    },
    getHoles () {
      getHoles().then(response => {
        this.options1 = response.data.items
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
        groutingId: null,
        beamId: null,
        beamCode: null,
        beamModel: null,
        boreholeId: null,
        boreholeCode: null,
        waterCementRatio: null,
        groutingStartTime: null,
        groutingEndTime: null,
        groutingPressure: null,
        groutingVolume: null,
        holdingTime: null,
        groutingResult: null,
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
      this.ids = selection.map(item => item.groutingId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd () {
      this.reset();
      this.open = true;
      this.title = "添加实验实时数据";
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset();
      const groutingId = row.groutingId || this.ids
      getGrouting(groutingId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改实验实时数据";
      });
    },
    /** 提交按钮 */
    submitForm () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const form = {
            ...this.form,
            groutingPressure: Number(this.form.groutingPressure),
            groutingVolume: Number(this.form.groutingVolume),
            waterCementRatio: Number(this.form.waterCementRatio),
          }
          if (this.form.groutingId != null) {
            updateGrouting(form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addGrouting(form).then(response => {
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
      const groutingIds = row.groutingId || this.ids;
      this.$modal.confirm('是否确认删除实验实时数据编号为"' + groutingIds + '"的数据项？').then(function () {
        return delGrouting(groutingIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport () {
      const queryParams = this.queryParams;
      this.$modal.confirm('是否确认导出所有实验实时数据数据项？').then(() => {
        this.exportLoading = true;
        return exportGrouting(queryParams);
      }).then(response => {
        this.$download.name(response.msg);
        this.exportLoading = false;
      }).catch(() => { });
    },
    formatter (row, column, cellValue) {
      if (column.property === 'groutingResult') {
        return this.selectDictLabels(this.groutingResultList, row.groutingResult)
      }
    }
  }
};
</script>
<style scoped>
.select-width {
  width: 100%;
}
</style>
