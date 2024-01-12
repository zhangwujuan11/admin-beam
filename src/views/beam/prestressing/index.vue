<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="90px">
      <el-form-item label="孔道编号" prop="boreholeId">
        <!-- <el-input v-model="queryParams.boreholeId" placeholder="请输入孔道编号" clearable size="small"
          @keyup.enter.native="handleQuery" /> -->
        <el-select v-model="queryParams.boreholeId" placeholder="请选择孔道编号">
          <el-option v-for="(item, index) in options1" :key="index" :label="item.boreholeCode" :value="item.boreholeId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="梁片代码" prop="beamCode">
        <!-- <el-input v-model="queryParams.beamCode" placeholder="请输入梁片代码" clearable size="small"
          @keyup.enter.native="handleQuery" /> -->
        <el-select v-model="queryParams.beamCode" placeholder="请选择梁片代码">
          <el-option v-for="(item, index) in options" :key="index" :label="item.beamCode" :value="item.beamCode">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="梁型" prop="beamModel">
        <el-input v-model="queryParams.beamModel" placeholder="请输入梁型" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="总伸长量" prop="totalExtension">
        <el-input v-model="queryParams.totalExtension" placeholder="请输入总伸长量" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="理论伸长量" prop="theoreticalExtension">
        <el-input v-model="queryParams.theoreticalExtension" placeholder="请输入理论伸长量" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="伸长量误差" prop="extensionError">
        <el-input v-model="queryParams.extensionError" placeholder="请输入伸长量误差" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="设计张拉力" prop="designTension">
        <el-input v-model="queryParams.designTension" placeholder="请输入设计张拉力" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="张拉长度" prop="tensionLength">
        <el-input v-model="queryParams.tensionLength" placeholder="请输入张拉长度" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="张拉日期" prop="tensionDate">
        <el-date-picker clearable size="small" v-model="queryParams.tensionDate" type="date" value-format="yyyy-MM-dd"
          placeholder="选择张拉日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="张拉类型" prop="tensionType">
        <el-select v-model="queryParams.tensionType" placeholder="请选择张拉类型" class="select-width">
          <el-option v-for="i in tensionTypeList" :key="i.dictValue" :label="i.dictLabel" :value="i.dictValue" />
        </el-select>
      </el-form-item> -->
      <el-form-item label="结果" prop="tensionResult">
        <el-select v-model="queryParams.tensionResult" placeholder="请选择结果" class="select-width">
          <el-option v-for="i in tensionResultList" :key="i.dictValue" :label="i.dictLabel" :value="i.dictValue" />
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
          v-hasPermi="['beam:prestressing:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['beam:prestressing:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['beam:prestressing:remove']">删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
          v-hasPermi="['beam:prestressing:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="prestressingList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="prestressingId" />
      <el-table-column label="孔道编号" align="center" prop="boreholeId" />
      <el-table-column label="梁片ID" align="center" prop="beamId" />
      <el-table-column label="梁片代码" align="center" prop="beamCode" />
      <el-table-column label="梁型" align="center" prop="beamModel" />
      <el-table-column label="总伸长量" align="center" prop="totalExtension" />
      <el-table-column label="理论伸长量" align="center" prop="theoreticalExtension" />
      <el-table-column label="伸长量误差" align="center" prop="extensionError" />
      <el-table-column label="设计张拉力" align="center" prop="designTension" />
      <el-table-column label="张拉长度" align="center" prop="tensionLength" />
      <el-table-column label="张拉日期" align="center" prop="tensionDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.tensionDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="张拉类型" align="center" prop="tensionType" :formatter="formatter" />
      <el-table-column label="结果" align="center" prop="tensionResult" :formatter="formatter" />
      <!-- <el-table-column label="租户号" align="center" prop="tenantId" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="110px">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['beam:prestressing:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['beam:prestressing:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改张拉实验实时数据对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <el-form-item label="孔道编号" prop="boreholeId">
          <!-- <el-input v-model="form.boreholeId" placeholder="请输入孔道编号" /> -->
          <el-select v-model="form.boreholeId" placeholder="请选择" style="width: 350px;">
            <el-option v-for="(item, index) in options1" :key="index" :label="item.boreholeCode" :value="item.boreholeId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="梁片ID" prop="beamId">
          <!-- <el-input v-model="form.beamId" placeholder="请输入梁片ID" /> -->
          <el-select v-model="form.beamId" placeholder="请选择" style="width: 350px;">
            <el-option v-for="(item, index) in options" :key="index" :label="item.beamId" :value="item.beamId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="梁片代码" prop="beamCode">
          <!-- <el-input v-model="form.beamCode" placeholder="请输入梁片代码" /> -->
          <el-select v-model="form.beamCode" placeholder="请选择" style="width: 350px;">
            <el-option v-for="(item, index) in options" :key="index" :label="item.beamCode" :value="item.beamCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="梁型">
          <el-input v-model="form.beamModel" placeholder="请输入梁型" />
        </el-form-item>
        <el-form-item label="总伸长量">
          <el-input v-model="form.totalExtension" placeholder="请输入总伸长量" />
        </el-form-item>
        <el-form-item label="理论伸长量">
          <el-input v-model="form.theoreticalExtension" placeholder="请输入理论伸长量" />
        </el-form-item>
        <el-form-item label="伸长量误差">
          <el-input v-model="form.extensionError" placeholder="请输入伸长量误差" />
        </el-form-item>
        <el-form-item label="设计张拉力">
          <el-input v-model="form.designTension" placeholder="请输入设计张拉力" />
        </el-form-item>
        <el-form-item label="张拉长度">
          <el-input v-model="form.tensionLength" placeholder="请输入张拉长度" />
        </el-form-item>
        <el-form-item label="张拉日期">
          <el-date-picker clearable size="small" v-model="form.tensionDate" type="date" class="select-width"
            value-format="yyyy-MM-dd" placeholder="选择张拉日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="张拉类型">
          <el-select v-model="form.tensionType" placeholder="请选择张拉类型" class="select-width">
            <el-option v-for="i in tensionTypeList" :key="i.dictValue" :label="i.dictLabel" :value="i.dictValue" />
          </el-select>
        </el-form-item>
        <el-form-item label="结果" prop="tensionResult">
          <el-select v-model="form.tensionResult" placeholder="请选择结果" class="select-width">
            <el-option v-for="i in tensionResultList" :key="i.dictValue" :label="i.dictLabel" :value="i.dictValue" />
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
import { listPrestressing, getPrestressing, delPrestressing, addPrestressing, updatePrestressing, exportPrestressing, getBeams, getHoles } from "@/api/beam/prestressing";

export default {
  name: "Prestressing",
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
      // 张拉实验实时数据表格数据
      prestressingList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        boreholeId: null,
        beamId: null,
        beamCode: null,
        beamModel: null,
        totalExtension: null,
        theoreticalExtension: null,
        extensionError: null,
        designTension: null,
        tensionLength: null,
        tensionDate: null,
        tensionType: null,
        tensionResult: null,
        tenantId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        boreholeId: [
          { required: true, message: "孔道编号不能为空", trigger: "blur" }
        ],

        beamId: [
          { required: true, message: "梁片ID不能为空", trigger: "blur" }
        ],
        beamCode: [
          { required: true, message: "梁片代码不能为空", trigger: "blur" }
        ],
        beamModel: [
          { required: true, message: "梁型不能为空", trigger: "blur" }
        ],
        totalExtension: [
          { required: true, message: "总伸长量不能为空", trigger: "blur" }
        ],
        theoreticalExtension: [
          { required: true, message: "理论伸长量不能为空", trigger: "blur" }
        ],
        extensionError: [
          { required: true, message: "伸长量误差不能为空", trigger: "blur" }
        ],
        designTension: [
          { required: true, message: "设计张拉力不能为空", trigger: "blur" }
        ],
        tensionLength: [
          { required: true, message: "张拉长度不能为空", trigger: "blur" }
        ],
        tensionDate: [
          { required: true, message: "张拉日期不能为空", trigger: "blur" }
        ],
        tensionType: [
          { required: true, message: "张拉类型不能为空", trigger: "change" }
        ],
        tensionResult: [
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
      tensionTypeList: [],
      tensionResultList: [],
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
      this.tensionResultList = data
    })
    this.getDicts('tension_type').then(res => {
      const { data } = res
      data.map(i => {
        i.dictValue = Number(i.dictValue)
        return i
      })
      this.tensionTypeList = data
    })
  },
  methods: {
    /** 查询张拉实验实时数据列表 */
    getList () {
      this.loading = true;
      listPrestressing(this.queryParams).then(response => {
        // console.log(response);
        const { items, total } = response.data
        this.prestressingList = items;
        this.total = total;
        this.loading = false;
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
        prestressingId: null,
        boreholeId: null,
        boreholeNumber: null,
        beamId: null,
        beamCode: null,
        beamModel: null,
        totalExtension: null,
        theoreticalExtension: null,
        extensionError: null,
        designTension: null,
        tensionLength: null,
        tensionDate: null,
        tensionType: null,
        tensionResult: null,
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
      this.ids = selection.map(item => item.prestressingId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd () {
      this.reset();
      this.open = true;
      this.title = "添加张拉实验实时数据";
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset();
      const prestressingId = row.prestressingId || this.ids
      getPrestressing(prestressingId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改张拉实验实时数据";
      });
    },
    /** 提交按钮 */
    submitForm () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const form = {
            ...this.form,
            designTension: Number(this.form.designTension),
            extensionError: Number(this.form.extensionError),
            tensionLength: Number(this.form.tensionLength),
            theoreticalExtension: Number(this.form.theoreticalExtension),
            totalExtension: Number(this.form.totalExtension),
          }
          if (this.form.prestressingId != null) {
            updatePrestressing(form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPrestressing(form).then(response => {
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
      const prestressingIds = row.prestressingId || this.ids;
      this.$modal.confirm('是否确认删除张拉实验实时数据编号为"' + prestressingIds + '"的数据项？').then(function () {
        return delPrestressing(prestressingIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport () {
      const queryParams = this.queryParams;
      this.$modal.confirm('是否确认导出所有张拉实验实时数据数据项？').then(() => {
        this.exportLoading = true;
        return exportPrestressing(queryParams);
      }).then(response => {
        this.$download.name(response.msg);
        this.exportLoading = false;
      }).catch(() => { });
    },
    formatter (row, column, cellValue) {
      if (column.property === 'tensionType') {
        return this.selectDictLabels(this.tensionTypeList, cellValue)
      }
      if (column.property === 'tensionResult') {
        return this.selectDictLabels(this.tensionResultList, cellValue)
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
