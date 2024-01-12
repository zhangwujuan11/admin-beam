<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item prop="bridgeName"> -->
      <!-- <el-select v-model="queryParams.bridgeName" placeholder="请选择桥梁名称">
          <el-option v-for="(item, index) in options" :key="index" :label="item.bridgeName" :value="item.bridgeName" />
        </el-select> -->
      <!-- <el-input v-model="queryParams.bridgeName" placeholder="请输入位置编码" clearable style="width: 150px;" /> -->
      <!-- </el-form-item> -->
      <el-form-item prop="leftRightSpan">
        <el-select v-model="queryParams.leftRightSpan" placeholder="请选择左右幅">
          <el-option v-for="(item, index) in amplitude" :key="index" :label="item.dictLabel" :value="item.dictValue" />
        </el-select>
      </el-form-item>
      <el-form-item prop="locationCode">
        <el-input v-model="queryParams.locationCode" placeholder="请输入位置编码" clearable style="width: 150px;" />

      </el-form-item>
      <el-form-item prop="locationType">
        <!-- <el-input v-model="queryParams.locationType" placeholder="请输入位置类型" clearable @keyup.enter.native="handleQuery"
          style="width: 150px;" /> -->
        <el-select v-model="queryParams.locationType" placeholder="请选择位置类型">
          <el-option v-for="(item, index) in planningList" :key="index" :label="item.locationType"
            :value="item.locationType" />
        </el-select>
      </el-form-item>
      <el-form-item prop="locationType">
        <!-- <el-select v-model="queryParams.componentType" placeholder="请选择构件类型">
          <el-option v-for="(item, index) in ComponentType" :key="index" :label="item.dictLabel"
            :value="item.dictValue" />
        </el-select> -->
        <el-input v-model="queryParams.componentType" placeholder="请输入构件类型"></el-input>
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
      <el-col :span="1.5">
        <el-button type="primary" plain size="mini" @click="handleGet" v-hasPermi="['beam:planning:add']">生成工单</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" :loading="exportLoading" @click="handleExport"
          v-hasPermi="['beam:planning:export']">导出</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" :loading="exportLoading"
          @click="handleTemplate" v-hasPermi="['beam:planning:export']">导出模版</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-upload2" size="mini" :loading="exportLoading" @click="handleImport"
          v-hasPermi="['beam:planning:Import']">导入</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="planningList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="任务编号" align="center" prop="taskNo" />
      <el-table-column label="桥梁名称" align="center" prop="bridgeName" />
      <el-table-column label="左右幅" align="center" prop="leftRightSpan" />
      <el-table-column label="位置编码" align="center" prop="locationCode" />
      <el-table-column label="位置类型" align="center" prop="locationType" />
      <el-table-column label="构件类型" align="center" prop="componentType" />
      <el-table-column label="梁片尺寸" align="center" prop="beamSize" />
      <el-table-column label="施工工法" align="center" prop="constructionMethod" />
      <el-table-column label="开始日期" align="center" prop="startDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束日期" align="center" prop="endDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="理论方量" align="center" prop="theoreticalQuantity" />
      <el-table-column label="二维码" align="center" prop="qrCode" />
      <el-table-column label="状态" align="center" prop="generateOrder" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['beam:planning:edit']">修改</el-button>

        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改计划编制对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body :close-on-click-modal="false">
      <el-form inline ref="form" :model="form" :rules="rules" label-width="80px">

        <el-form-item label="桥梁名称" prop="bridgeName">

          <el-select clearable placeholder="请选择桥梁名称" size="small" v-model="form.bridgeName">
            <el-option v-for="(item, index) in options" :key="index" :label="item.bridgeName" :value="item.bridgeName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="梁片" prop="beamId">
          <el-select clearable placeholder="请选择梁片" size="small" v-model="form.beamId">
            <el-option v-for="(item, index) in options1" :key="index" :label="item.beamName" :value="item.beamId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="左右幅" prop="leftRightSpan">
          <el-select v-model="form.leftRightSpan" placeholder="请输入左右幅">
            <el-option v-for="(item, index) in amplitude" :key="index" :label="item.dictLabel" :value="item.dictValue" />
          </el-select>
        </el-form-item>
        <el-form-item label="位置编码">
          <el-input v-model="form.locationCode" placeholder="请输入位置编码" />
        </el-form-item>
        <el-form-item label="位置类型">
          <el-input v-model="form.locationType" placeholder="请选择位置类型" />
        </el-form-item>
        <el-form-item label="构件类型" prop="componentType">
          <!-- <el-select v-model="form.componentType" placeholder="请选择构件类型">
            <el-option v-for="(item, index) in ComponentType" :key="index" :label="item.dictLabel"
              :value="item.dictValue" />
          </el-select> -->
          <el-input v-model="form.componentType" placeholder="请输入构件类型" />
        </el-form-item>
        <el-form-item label="施工工法">
          <el-select v-model="form.constructionMethod" placeholder="请输入施工工法">
            <el-option v-for="(item, index) in constructionMethod" :key="index" :label="item.dictLabel"
              :value="item.dictValue" />
          </el-select>
        </el-form-item>
        <el-form-item label="梁片尺寸" prop="beamSize">
          <el-input v-model="form.beamSize" placeholder="请输入梁片尺寸" />
        </el-form-item>
        <el-form-item label="开始日期">
          <el-date-picker clearable size="small" v-model="form.startDate" type="date" value-format="yyyy-MM-dd"
            placeholder="选择开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker clearable size="small" v-model="form.endDate" type="date" value-format="yyyy-MM-dd"
            placeholder="选择结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="理论方量">
          <el-input v-model.number="form.theoreticalQuantity" placeholder="请输入理论方量" />
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- :on-success="handleFileSuccess" -->
    <!-- :on-progress="handleFileUploadProgress" -->
    <!-- 用户导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload ref="upload" :limit="1" accept=".xlsx, .xls" :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport" :disabled="upload.isUploading"
        :on-change="handleFilechange" :on-progress="handleFileUploadProgress" :auto-upload="false" drag>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;"
            @click="importTemplate">下载模板</el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { listPlanning, getPlanning, addPlanning, updatePlanning, exportPlanning, listBridge, listBeam, importTemplate, importTData } from "@/api/beam/planning";
import { addBeamOrders } from "@/api/beam/TicketDistribution";
import { getToken } from "@/utils/auth";

export default {
  name: "Planning",
  data () {
    return {
      file: '',
      Bridges: [],
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/v1/beam/beams/importData"
      },
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
      total: 1,
      // 计划编制表格数据
      planningList: [],

      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        bridgeName: null,
        leftRightSpan: null,
        locationCode: null,
        locationType: null,
        componentType: null,
        constructionMethod: null,
        beamDimension: null,
        startDate: null,
        endDate: null,
        theoreticalVolume: null,
        qrCode: null,
        status: null,
        tenantId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        bridgeName: [
          { required: true, message: "桥梁名称不能为空", trigger: "blur" }
        ],
        leftRightSpan: [
          { required: true, message: "左右幅不能为空", trigger: "blur" }
        ],
        locationCode: [
          { required: true, message: "位置编码不能为空", trigger: "blur" }
        ],
        locationType: [
          { required: true, message: "位置类型不能为空", trigger: "change" }
        ],
        componentType: [
          { required: true, message: "构件类型不能为空", trigger: "change" }
        ],
        constructionMethod: [
          { required: true, message: "施工工法不能为空", trigger: "blur" }
        ],
        beamSize: [
          { required: true, message: "梁片尺寸不能为空", trigger: "blur" }
        ],
        startDate: [
          { required: true, message: "开始日期不能为空", trigger: "blur" }
        ],
        endDate: [
          { required: true, message: "结束日期不能为空", trigger: "blur" }
        ],
        theoreticalVolume: [
          { required: true, message: "理论方量不能为空", trigger: "blur" }
        ],
        qrCode: [
          { required: true, message: "二维码不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "状态不能为空", trigger: "blur" }
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
        beamId: [
          { required: true, message: "梁片不能为空", trigger: "blur" }
        ],
      },
      options: [],
      amplitude: [],
      ComponentType: {},
      constructionMethod: {},
      form2: {},
      arr: [],
      options1: [],
      generateOrder: []

    };
  },
  created () {
    this.listBridge()
    this.listBeam()
    this.getDicts('amplitude').then(res => {
      this.amplitude = res.data
    })
    this.getDicts('constructionMethod').then(res => {
      this.constructionMethod = res.data
    })
    this.getDicts('generate_order').then(res => {
      this.generateOrder = res.data
    })
    this.getList();
  },
  methods: {
    /** 查询计划编制列表 */
    getList () {
      this.loading = true;
      listPlanning(this.queryParams).then(response => {
        this.planningList = response.data.items;
        this.planningList.forEach(i => {
          this.amplitude.forEach(v => {
            if (i.leftRightSpan == v.dictValue) {
              i.leftRightSpan = v.dictLabel
            }
          })
          this.generateOrder.forEach(v => {
            if (i.generateOrder == v.dictValue) {
              i.generateOrder = v.dictLabel
            }
          })
        })
        this.total = response.data.total;
        this.loading = false;
      });
    },

    // 生成工单
    handleGet () {
      for (let i = 0; i < this.arr.length; i++) {
        addBeamOrders(this.arr[i]).then(response => {
          if (response.code == 200) {
            this.$modal.msgSuccess("生成工单成功")
            this.getList();
          }
          else {
            this.$modal.msgError(response.message)
            return false
          }
        })
        // .catch(err => {
        //   this.$modal.msgError("计划已经存在,不能重复创建!")
        // })
      }
    },
    // 查询桥梁
    listBridge () {
      listBridge().then(response => {
        this.options = response.data.items
      })
    },
    // 查询梁片
    listBeam () {
      listBeam().then(response => {
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
        bridgePlanningId: null,
        bridgeName: null,
        leftRightSpan: null,
        locationCode: null,
        locationType: null,
        componentType: null,
        constructionMethod: null,
        beamDimension: null,
        startDate: null,
        endDate: null,
        theoreticalVolume: null,
        qrCode: null,
        status: 0,
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
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery () {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
      }
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange (selection) {
      // console.log(selection);
      // this.ids = selection.map(item => item.planId)
      // this.ids1 = selection.map(item => item.taskNo)
      // this.ids2 = selection.map(item => item.beamId)
      // this.ids3 = selection.map(item => item.bridgeName)
      // this.ids4 = selection.map(item => item.leftRightSpan)
      // this.ids5 = selection.map(item => item.locationCode)
      // this.ids6 = selection.map(item => item.componentType)
      // this.ids7 = selection.map(item => item.constructionMethod)
      // this.ids8 = selection.map(item => item.beamSize)
      // this.ids9 = selection.map(item => item.startDate)
      // this.ids10 = selection.map(item => item.endDate)
      // this.ids11 = selection.map(item => item.theoreticalQuantity)
      // this.ids12 = selection.map(item => item.qrCode)
      // this.ids13 = selection.map(item => item.tenantId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
      this.arr = selection
    },
    /** 新增按钮操作 */
    handleAdd () {
      this.reset();
      this.open = true;
      this.title = "新增计划编制";
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset();
      const planId = row.planId || this.ids
      getPlanning(planId).then(response => {
        this.form = response.data;
        this.open = true
        this.title = "修改任务";
      });
    },
    /** 提交按钮 */
    submitForm () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.planId != null) {
            updatePlanning(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPlanning(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 导出按钮操作 */
    handleExport () {
      this.$modal.confirm('是否确认导出所有计划编制数据项？').then(() => {
        this.exportLoading = true;
        let a = document.createElement("a")
        exportPlanning(this.arr).then(res => {
          let filename = "xxxx01文件"
          a.href = window.URL.createObjectURL(res)
          a.download = filename
          a.click()
          a.display = 'none'
          a.remove()
        })
        this.exportLoading = false
      })

    },

    /** 导入按钮操作 */
    handleImport () {
      this.upload.title = "用户导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate () {
      let a = document.createElement("a")
      importTemplate().then(res => {
        let filename = "模版文件"
        a.href = window.URL.createObjectURL(res)
        a.download = filename
        a.click()
        a.display = 'none'
        a.remove()
      })
    },
    // 文件上传中处理
    handleFileUploadProgress (event, file, fileList) {
      console.log(file, 'file')
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess (response, file, fileList) {

      console.log(file, "file")
      // this.upload.open = false;
      // this.upload.isUploading = false;
      // this.$refs.upload.clearFiles();
      // this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
      // this.getList();
    },
    // 提交上传文件
    submitFileForm () {
      // this.$refs.upload.submit();
      const formdata = new FormData()

    },

    // // 导出模版
    // handleTemplate () {
    //   let a = document.createElement("a")
    //   importTemplate().then(res => {
    //     let filename = "xxxx01文件"
    //     a.href = window.URL.createObjectURL(res)
    //     a.download = filename
    //     a.click()
    //     a.display = 'none'
    //     a.remove()
    //   })
    // },
    // 导出明细
    // handleTemplate () {
    //   handleTemplate().then(res => {
    //     this.downloadFilestwo(res)
    //   })
    // },
    // downloadFilestwo (data) {
    //   if (typeof window.chrome !== 'undefined') {
    //     // Chrome version
    //     var link = document.createElement('a');
    //     link.href = window.URL.createObjectURL(data);
    //     link.download = "轮胎报警明细.xls";
    //     link.click();
    //   } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
    //     // IE version
    //     var blob = new Blob([data], { type: 'application/force-download' });
    //     window.navigator.msSaveBlob(blob, "轮胎报警明细.xls");
    //   } else {
    //     // Firefox version
    //     var file = new File([data], "轮胎报警明细.xls", { type: 'application/force-download' });
    //     window.open(URL.createObjectURL(file));
    //   }
    // }
  }
};
</script>
