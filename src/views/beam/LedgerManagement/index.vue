<template>
  <div class="app-container">
    <el-form :inline="true" :model="queryParams" ref="queryForm" v-show="showSearch">
      <el-form-item>
        <el-select clearable placeholder="请选择桥梁名称" size="small" v-model="queryParams.componentType" style="width: 150px;">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select clearable placeholder="请选择左右幅" size="small" v-model="queryParams.constructionMethod"
          style="width: 150px;">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryParams.name" size="small" placeholder="请选择位置编码" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryParams.name" size="small" placeholder="请选择梁片尺寸" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select clearable placeholder="请选择工序" size="small" v-model="queryParams.constructionMethod"
          style="width: 150px;">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="queryParams.constructionMethod" type="date" placeholder="选择日期" size="small"
          style="width: 150px;">
        </el-date-picker>
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
        <el-button type="primary" plain icon="el-icon-setting" size="mini" :disabled="multiple" @click="set"
          v-hasPermi="['beam:planning:remove']">设置</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" :loading="exportLoading" @click="handleExport"
          v-hasPermi="['beam:planning:export']">导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-upload2" size="mini" :loading="exportLoading" @click="handleImport"
          v-hasPermi="['beam:planning:Import']">导入</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :data="tableData" :span-method="spanMethod" border style="width: 100%; " max-height="500">
      <el-table-column prop="bridgePlanningId" label="任务编号" align="center"> </el-table-column>
      <el-table-column prop="bridgeName" label="桥梁名称" align="center"> </el-table-column>
      <el-table-column prop="leftRightSpan" label="左右幅" align="center"> </el-table-column>
      <el-table-column prop="locationCode" label="位置编码" align="center"></el-table-column>
      <el-table-column prop="locationType" label="梁片尺寸" align="center"> </el-table-column>
      <el-table-column prop="componentType" label="工序名称" align="center"> </el-table-column>
      <el-table-column prop="startDate" label="开始时间" align="center"> </el-table-column>
      <el-table-column prop="endDate" label="结束时间" align="center"> </el-table-column>
      <el-table-column prop="location" label="位置类型" align="center"> </el-table-column>
      <el-table-column prop="aaa" label="理论张拉时间" align="center"> </el-table-column>
      <el-table-column prop="aa" label="理论压浆时间" align="center"> </el-table-column>
      <el-table-column prop="a" label="强度7天" align="center"> </el-table-column>
      <el-table-column prop="bbb" label="强度28天" align="center"> </el-table-column>
      <el-table-column prop="bb" label="理论方量（m²）" align="center"> </el-table-column>
      <el-table-column prop="b" label="实际方量（m²）" align="center"> </el-table-column>
      <el-table-column prop="ccc" label="差值（m²）" align="center"> </el-table-column>
      <el-table-column prop="cc" label="质保资料" align="center"> </el-table-column>
      <el-table-column prop="c" label="7天强度报告" align="center"> </el-table-column>
      <el-table-column prop="dd" label="28天强度报告" align="center"> </el-table-column>
      <el-table-column prop="d" label="评定资料" align="center"> </el-table-column>
      <el-table-column prop="ddd" align="center" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleUpdate(scope.row)" icon="el-icon-edit-outline" size="mini"
            style="color: rgb(0, 168, 75)" type="text" v-hasPermi="['beam:methodList:edit']"></el-button>
        </template>
      </el-table-column>


    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />


    <!-- 编辑台账 -->
    <el-dialog title="编辑台账" :visible.sync="open" width="500px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" label-width="130px">
        <el-form-item label="理论方量:" prop="bridgeName">
          <el-input v-model="form.bridgeName" placeholder="请输入桥梁名称" style="width: 200px;" disabled />
        </el-form-item>
        <el-form-item label="实际方量:" prop="locationCode">
          <el-input v-model="form.locationCode" placeholder="请输入实际方量" style="width: 200px;" />
        </el-form-item>
        <el-form-item label="差值:" prop="locationType">
          <el-input v-model="form.locationType" placeholder="请选择位置类型" style="width: 200px;" disabled />
        </el-form-item>
        <el-form-item label="质保资料:" prop="locationType">
          <el-radio v-model="form.radio" label="1">无</el-radio>
          <el-radio v-model="form.radio" label="2">有</el-radio>
        </el-form-item>
        <el-form-item label="7天强度报告:" prop="locationType">
          <el-radio v-model="form.radio" label="1">无</el-radio>
          <el-radio v-model="form.radio" label="2">有</el-radio>
        </el-form-item>
        <el-form-item label="28天强度报告:" prop="locationType">
          <el-radio v-model="form.radio" label="1">无</el-radio>
          <el-radio v-model="form.radio" label="2">有</el-radio>
        </el-form-item>
        <el-form-item label="28天压浆报告:" prop="locationType">
          <el-radio v-model="form.radio" label="1">无</el-radio>
          <el-radio v-model="form.radio" label="2">有</el-radio>
        </el-form-item>
        <el-form-item label="评定资料:" prop="locationType">
          <el-radio v-model="form.radio" label="1">无</el-radio>
          <el-radio v-model="form.radio" label="2">有</el-radio>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>


    <!-- 设置 -->
    <el-dialog title="设置" :visible.sync="show" width="400px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" inline>
        <el-form-item>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          理论张拉时间=
          <div class="common-change">{{ value }}</div>
          +
          <el-input style="width: 60px;margin-right: 10px;" size="mini" v-model="time1"></el-input>天
        </el-form-item>
        <el-form-item>
          理论压浆时间=
          <div class="common-change">理论张拉时间</div>
          +
          <el-input style="width: 60px;margin-right: 10px;" size="mini" v-model="time2"></el-input>天
        </el-form-item>
        <el-form-item>
          强度7天=
          <div class="common-change">{{ value }}</div>
          +
          <el-input style="width: 60px;margin-right: 10px;" size="mini" v-model="time3"></el-input>天
        </el-form-item>
        <el-form-item>
          强度28天=
          <div class="common-change">{{ value }}</div>
          +
          <el-input style="width: 60px;margin-right: 10px;" size="mini" v-model="time4"></el-input>天
        </el-form-item>
      </el-form>
      <div class="box">备注：公式计算中以混凝土浇筑举例。</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>


    <!-- 用户导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" :close-on-click-modal="false">
      <el-upload ref="upload" :limit="1" accept=".xlsx, .xls" :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport" :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress" :on-success="handleFileSuccess" :auto-upload="false" drag>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          <el-checkbox v-model="upload.updateSupport" />是否更新已经存在的用户数据
          <el-link type="info" style="font-size:12px" @click="importTemplate">下载模板</el-link>
        </div>
        <div class="el-upload__tip" style="color:red" slot="tip">提示：仅允许导入“xls”或“xlsx”格式文件！</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
export default {
  name: 'AdminBeamIndex',

  data () {
    return {
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
        url: process.env.VUE_APP_BASE_API + "/LedgerManagement/LedgerManagement/importData"
      },
      // 导出遮罩层
      exportLoading: false,
      time1: 14,
      time2: 1,
      time3: 7,
      time4: 28,
      options: [{
        value: '钢筋绑扎及模板安装',
        label: '钢筋绑扎及模板安装'
      }, {
        value: '混凝土浇筑',
        label: '混凝土浇筑'
      }, {
        value: '张拉',
        label: '张拉'
      }, {
        value: '压浆',
        label: '压浆'
      }],
      value: '',
      open: false,
      show: false,
      // 台账数据
      tableData: [
        {
          bridgePlanningId: 1,
          bridgeName: '道桥',
          leftRightSpan: '整幅',
          locationCode: '10K-1',
          locationType: '20m',
          componentType: '钢筋绑扎及模板安装',
          startDate: '2020-09-30',
          endDate: '2020-09-30',
          location: 10,
          aaa: 11,
          aa: 11,
          a: 11,
          bbb: 11,
          bb: 11,
          b: 11,
          ccc: 11,
          cc: 11,
          c: 11,
          dd: 11,
          d: 11,
          ddd: ''
        },
        {
          bridgePlanningId: 1,
          bridgeName: '道桥',
          leftRightSpan: '整幅',
          locationCode: '10K-1',
          locationType: '20m',
          componentType: '混凝土浇筑',
          startDate: '2020-09-30',
          endDate: '2020-09-30',
          location: 10,
          aaa: 11,
          aa: 11,
          a: 11,
          bbb: 11,
          bb: 11,
          b: 11,
          ccc: 11,
          cc: 11,
          c: 11,
          dd: 11,
          d: 11,
          ddd: ''
        },
        {
          bridgePlanningId: 1,
          bridgeName: '道桥',
          leftRightSpan: '整幅',
          locationCode: '10K-1',
          locationType: '20m',
          componentType: '张拉',
          startDate: '2020-10-07',
          endDate: '2020-10-07',
          location: 10,
          aaa: 11,
          aa: 11,
          a: 11,
          bbb: 11,
          bb: 11,
          b: 11,
          ccc: 11,
          cc: 11,
          c: 11,
          dd: 11,
          d: 11,
          ddd: ''
        },
        {
          bridgePlanningId: 2,
          bridgeName: '道桥',
          leftRightSpan: '整幅',
          locationCode: '10K-1',
          locationType: '20m',
          componentType: '张拉',
          startDate: '2020-10-07',
          endDate: '2020-10-07',
          location: 90,
          aaa: 11,
          aa: 11,
          a: 11,
          bbb: 11,
          bb: 11,
          b: 11,
          ccc: 11,
          cc: 11,
          c: 11,
          dd: 11,
          d: 11,
          ddd: ''
        },
        {
          bridgePlanningId: 2,
          bridgeName: '道桥',
          leftRightSpan: '整幅',
          locationCode: '10K-1',
          locationType: '20m',
          componentType: '张拉',
          startDate: '2020-10-07',
          endDate: '2020-10-07',
          location: 90,
          aaa: 11,
          aa: 11,
          a: 11,
          bbb: 11,
          bb: 11,
          b: 11,
          ccc: 11,
          cc: 11,
          c: 11,
          dd: 11,
          d: 11,
          ddd: ''
        }
      ],
      form: {},
      // form1: {},
      //要比较属性 动态
      strArr: ["bridgePlanningId", 'bridgeName', "leftRightSpan", "locationCode", "locationType", "componentType1", "startDate1", "endDate1",
        "location", "aaa", "aa", "a", "bbb", "bb", "b", "ccc", "cc", "c", "dd", "d", "ddd"],
      total: 1,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        componentType: null,
        constructionMethod: null
      },
      // 遮罩层
      loading: false,
      // 显示搜索条件
      showSearch: true,
    };
  },
  created () {
    this.getList()
    this.strArr.forEach((ele, index) => {
      this.$set(this.form, `mergingRows${index}`, [])
      this.$set(this.form, `mergingPos${index}`, 0)
    });
  },

  mounted () {
    this.dataPretreatment()
  },
  methods: {
    getList () { },
    // 多选框选中数据
    handleSelectionChange (selection) {
      // this.ids = selection.map(item => item.bridgePlanningId)
      // this.single = selection.length !== 1
      // this.multiple = !selection.length
    },
    handleUpdate (row) {
      // console.log(row);
      this.open = true
    },

    dataPretreatment () {
      //表格数据列合并预处理,生成一个与行数相同的数组记录每一行设置的合并数
      // 如果是第一条记录（索引为0），向数组中加入1，并设置索引位置；
      // 如果不是第一条记录，则判断它与前一条记录是否相等，如果相等，
      // 则向mergingRows中添入元素0，并将前一位元素+1，表示合并行数+1，
      // 以此往复，得到所有行的合并数，0即表示该行不显示。

      for (let i = 0; i < this.tableData.length; i++) {
        // tableData 表格数据源
        if (i === 0) {
          this.strArr.forEach((e, ind) => {
            this.form[`mergingRows${ind}`].push(1)
            this.form[`mergingPos${ind}`] = 0
          })
        } else {
          this.strArr.forEach((ele, ind) => {
            if (this.tableData[i][ele] === this.tableData[i - 1][ele] && this.tableData[i].bridgePlanningId === this.tableData[i - 1].bridgePlanningId) {
              this.form[`mergingRows${ind}`][this.form[`mergingPos${ind}`]] += 1
              this.form[`mergingRows${ind}`].push(0)
            }
            else {
              this.form[`mergingRows${ind}`].push(1)
              this.form[`mergingPos${ind}`] = i
            }
          })
        }
      }
    },
    spanMethod ({ row, column, rowIndex, columnIndex }) {
      // console.log(row, column, rowIndex, columnIndex);
      if (column.property == this.strArr[columnIndex]) {
        const _row = this.form[`mergingRows${columnIndex}`][rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        }

      }
    },
    // 设置
    set () {
      this.show = true
    },
    submitForm () {
      this.show = false
    },
    cancel () {
      this.show = false
    },
    /** 搜索按钮操作 */
    handleQuery () {
      // this.queryParams.pageNum = 1
    },
    /** 重置按钮操作 */
    resetQuery () {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 导出按钮操作 */
    handleExport () {
      const queryParams = this.queryParams;
      this.$modal.confirm('是否确认导出所有计划编制数据项？').then(() => {
        this.exportLoading = true;
        return exportPlanning(queryParams);
      }).then(response => {
        this.$download.name(response.msg);
        this.exportLoading = false;
      }).catch(() => { });
    },
    /** 导入按钮操作 */
    handleImport () {
      this.upload.title = "用户导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate () {
      this.download('honor/honor/importTemplate', {
      }, `user_template_${new Date().getTime()}.xlsx`)
    },
    // 文件上传中处理
    handleFileUploadProgress (event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess (response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    // 提交上传文件
    submitFileForm () {
      this.$refs.upload.submit();
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  margin-bottom: 0;
  border-bottom: 1px solid gainsboro;
}

.common-change {
  display: inline-block;
  min-width: 84px;
  height: 28px;
  padding: 0 5px;
  line-height: 25px;
  text-align: center;
  border: 1px solid #d4d4d4;
  border-radius: 3px;
}

.box {
  background: #ffe2e2;
  color: #ff7171;
  padding: 5px 0 5px 28px;
  border-radius: 4px;
  font-size: 12px;
}
</style>