<template>
  <div class="app-container">

    <el-form inline :model="queryParams" label-width="80px" ref="queryForm" v-show="showSearch">


      <el-form-item label="压浆日期:">
        <el-date-picker v-model="value" type="daterange" range-separator="-" start-placeholder="选择压浆日期"
          end-placeholder="选择压浆日期">
        </el-date-picker>
      </el-form-item>


      <el-form-item label="关键词:">
        <el-input clearable placeholder="梁号" size="small" v-model="queryParams.number" />
      </el-form-item>

      <el-form-item label="状态:">
        <el-select clearable placeholder="请选择状态" size="small" v-model="queryParams.constructionMethod">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button @click="handleQuery" icon="el-icon-search" size="mini" style="
              background: rgb(0, 110, 233);
              color: white;
              border-color: #66b1ff;
            ">查询</el-button>
        <el-button @click="resetQuery" size="mini"
          style="color: #909399; background: #f4f4f5; border-color: #d3d4d6">清空</el-button>
        <el-button type="success" plain icon="el-icon-download" size="mini" :loading="exportLoading" @click="handleExport"
          v-hasPermi="['beam:grouting:export']"></el-button>
      </el-form-item>

    </el-form>
    <div class="data_content">
      <span class="data-v-6617c9d7">压浆总数：0</span>
      <span class="data-v-6617c9d7">预警总次数：0</span>
      <span class="data-v-6617c9d7">预警率：0%</span>
      <span class="data-v-6617c9d7">处理率：0%</span>
    </div>
    <el-table :data="methodSettingsList" v-loading="loading" border height="500"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column align="center" label="项目名称" prop="componentType" />
      <el-table-column align="center" label="单位工程" prop="componentType" />
      <el-table-column align="center" label="分部工程" prop="componentType" />
      <el-table-column align="center" label="梁号" prop="componentType" />
      <el-table-column align="center" label="压浆日期" prop="componentType" />
      <el-table-column align="center" label="压浆温度℃" prop="componentType" />
      <el-table-column align="center" label="设计配合比" prop="constructionMethod" />
      <el-table-column align="center" label="水胶比" prop="constructionMethod" />
      <el-table-column align="center" label="预警原因" prop="constructionMethod" />
      <el-table-column align="center" class-name="small-padding fixed-width" label="操作">
        <template slot-scope="scope">
          <!-- <el-button @click="handleUpdate(scope.row)" icon="el-icon-edit-outline" size="mini"
            style="color: rgb(0, 168, 75)" type="text" v-hasPermi="['beam:methodList:edit']"></el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />
  </div>
</template>

<script>
export default {
  name: 'AdminBeamIndex',

  data () {
    return {
      // 导出遮罩层
      exportLoading: false,
      value: [],
      loading: false,
      methodSettingsList: [],
      // 显示搜索条件
      showSearch: true,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        componentType: null,
        constructionMethod: null
      },
      total: 1,
      // 多选框选中数据
      handleSelectionChange (selection) {
        // this.ids = selection.map(item => item.bridgePlanningId)
        // this.single = selection.length !== 1
        // this.multiple = !selection.length
      },
    };
  },

  mounted () {

  },

  methods: {
    handleUpdate () { },
    handleQuery () { },
    resetQuery () { },
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
    }
  },
};
</script>

<style lang="scss" scoped>
.data_content {
  margin-bottom: 10px;

  .data-v-6617c9d7 {
    margin-right: 10px;
    font-size: 14px;
  }
}
</style>