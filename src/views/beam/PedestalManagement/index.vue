<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="绑扎台座" name="first">
          <el-row :gutter="4" class="mb8">
            <el-col :span="2.4">
              <el-select placeholder="请选择区域编号" clearable style="width: 150px;" size="mini">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </el-col>
            <el-col :span="2.4">
              <el-select placeholder="请选择桥梁名称" clearable style="width: 150px;" size="mini">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </el-col>
            <el-col :span="2.4">
              <el-select placeholder="请选择左右幅" clearable style="width: 150px;" size="mini">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </el-col>
            <el-col :span="2.4">
              <el-input placeholder="请输入位置编码" clearable style="width: 150px;" size="mini" />
            </el-col>
            <el-col :span="2.4">
              <el-input placeholder="请输入台座编号" clearable style="width: 150px;" size="mini" />
            </el-col>
            <el-col :span="2.4">
              <el-select placeholder="请选择台座区域" clearable style="width: 150px;" size="mini">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </el-col>
            <el-col :span="2.4">
              <el-select placeholder="请选择位置类型" clearable style="width: 150px;" size="mini">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </el-col>
            <el-col :span="2.4">
              <el-select placeholder="请选择台座状态" clearable style="width: 150px;" size="mini">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </el-col>
            <el-col :span="2.4">
              <el-button @click="handleQuery" icon="el-icon-search" size="mini" style="
              background: rgb(0, 110, 233);
              color: white;
              ">查询</el-button>
            </el-col>
            <el-col :span="2.4">
              <el-button @click="handleQuery" icon="el-icon-search" size="mini" style="
            width: 110px;
              background: rgb(105, 59, 216);
              color: white;
            ">导出二维码</el-button>
              <!-- <vue-qr :logoSrc="iconUrl" :text="contCode" :size="200"></vue-qr> -->
            </el-col>
          </el-row>
          <el-table v-loading="loading" :data="seatSettingsList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="区域编号" align="center" prop="seatId" />
            <el-table-column label="台座区域" align="center" prop="regionCode" />
            <el-table-column label="台座编号" align="center" prop="seatType" />
            <el-table-column label="桥梁名称" align="center" prop="seatArea" />
            <el-table-column label="左右幅" align="center" prop="seatCode" />
            <el-table-column label="位置编码" align="center" prop="seatName" />
            <el-table-column label="位置类型" align="center" prop="seatFloor" />
            <el-table-column label="梁片尺寸" align="center" prop="seatsPerFloor" />
            <el-table-column label="二维码" align="center" prop="QRCode" />
            <el-table-column label="台座状态" align="center" prop="PedestalStatus" />
          </el-table>

        </el-tab-pane>
        <el-tab-pane label="预制台座" name="second">
          <el-row :gutter="4" class="mb8">
            <el-col :span="2.4">
              <el-select placeholder="请选择区域编号" clearable style="width: 150px;" size="mini">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </el-col>
            <el-col :span="2.4">
              <el-select placeholder="请选择桥梁名称" clearable style="width: 150px;" size="mini">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </el-col>
            <el-col :span="2.4">
              <el-select placeholder="请选择左右幅" clearable style="width: 150px;" size="mini">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </el-col>
            <el-col :span="2.4">
              <el-input placeholder="请输入位置编码" clearable style="width: 150px;" size="mini" />
            </el-col>
            <el-col :span="2.4">
              <el-input placeholder="请输入台座编号" clearable style="width: 150px;" size="mini" />
            </el-col>
            <el-col :span="2.4">
              <el-select placeholder="请选择台座区域" clearable style="width: 150px;" size="mini">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </el-col>
            <el-col :span="2.4">
              <el-select placeholder="请选择位置类型" clearable style="width: 150px;" size="mini">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </el-col>
            <el-col :span="2.4">
              <el-select placeholder="请选择台座状态" clearable style="width: 150px;" size="mini">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </el-col>
            <el-col :span="2.4">
              <el-button @click="handleQuery" icon="el-icon-search" size="mini" style="
              background: rgb(0, 110, 233);
              color: white;
              ">查询</el-button>
            </el-col>
            <el-col :span="2.4">
              <el-button @click="handleQuery" icon="el-icon-search" size="mini" style="
            width: 110px;
              background: rgb(105, 59, 216);
              color: white;
            ">导出二维码</el-button>
            </el-col>
          </el-row>
          <el-table v-loading="loading" :data="seatSettingsList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="区域编号" align="center" prop="seatId" />
            <el-table-column label="台座区域" align="center" prop="regionCode" />
            <el-table-column label="台座编号" align="center" prop="seatType" />
            <el-table-column label="桥梁名称" align="center" prop="seatArea" />
            <el-table-column label="左右幅" align="center" prop="seatCode" />
            <el-table-column label="位置编码" align="center" prop="seatName" />
            <el-table-column label="位置类型" align="center" prop="seatFloor" />
            <el-table-column label="梁片尺寸" align="center" prop="seatsPerFloor" />
            <el-table-column label="二维码" align="center" prop="QRCode" />
            <el-table-column label="台座状态" align="center" prop="PedestalStatus" />
          </el-table>

        </el-tab-pane>
        <el-tab-pane label="存梁台座" name="third">
          <el-row :gutter="4" class="mb8">
            <el-col :span="2.4">
              <el-select placeholder="请选择区域编号" clearable style="width: 150px;" size="mini">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </el-col>
            <el-col :span="2.4">
              <el-select placeholder="请选择桥梁名称" clearable style="width: 150px;" size="mini">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </el-col>
            <el-col :span="2.4">
              <el-select placeholder="请选择左右幅" clearable style="width: 150px;" size="mini">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </el-col>
            <el-col :span="2.4">
              <el-input placeholder="请输入位置编码" clearable style="width: 150px;" size="mini" />
            </el-col>
            <el-col :span="2.4">
              <el-input placeholder="请输入台座编号" clearable style="width: 150px;" size="mini" />
            </el-col>
            <el-col :span="2.4">
              <el-select placeholder="请选择台座区域" clearable style="width: 150px;" size="mini">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </el-col>
            <el-col :span="2.4">
              <el-select placeholder="请选择位置类型" clearable style="width: 150px;" size="mini">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </el-col>
            <el-col :span="2.4">
              <el-select placeholder="请选择台座状态" clearable style="width: 150px;" size="mini">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </el-col>
            <el-col :span="2.4">
              <el-button @click="handleQuery" icon="el-icon-search" size="mini" style="
              background: rgb(0, 110, 233);
              color: white;
              ">查询</el-button>
            </el-col>
            <el-col :span="2.4">
              <el-button @click="handleQuery" icon="el-icon-search" size="mini" style="
            width: 110px;
              background: rgb(105, 59, 216);
              color: white;
            ">导出二维码</el-button>
            </el-col>
          </el-row>
          <el-table v-loading="loading" :data="seatSettingsList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="区域编号" align="center" prop="seatId" />
            <el-table-column label="台座区域" align="center" prop="regionCode" />
            <el-table-column label="台座编号" align="center" prop="seatType" />
            <el-table-column label="存梁序号" align="center" prop="seatArea" />
            <el-table-column label="层数" align="center" prop="seatArea" />
            <el-table-column label="桥梁名称" align="center" prop="seatArea" />
            <el-table-column label="左右幅" align="center" prop="seatCode" />
            <el-table-column label="位置编码" align="center" prop="seatName" />
            <el-table-column label="位置类型" align="center" prop="seatFloor" />
            <el-table-column label="梁片尺寸" align="center" prop="seatsPerFloor" />
            <el-table-column label="完成时间" align="center" prop="seatsPerFloor" />
            <el-table-column label="二维码" align="center" prop="QRCode" />
            <el-table-column label="台座状态" align="center" prop="PedestalStatus" />
          </el-table>

        </el-tab-pane>
      </el-tabs>
      <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
        @pagination="getList" />
    </el-card>
  </div>
</template>

<script>
// import vueQr from 'vue-qr'

export default {
  name: 'AdminBeamIndex',
  // components: { vueQr },
  data () {
    return {
      activeName: 'first',
      //配置logo路径
      // iconUrl: require(),
      // 总条数
      total: 1,
      // 遮罩层
      loading: false,
      // 表格数据
      seatSettingsList: [
        { seatId: 1, regionCode: 2, seatType: 3, seatArea: 4, seatCode: 5, seatName: 6, seatFloor: 7, seatsPerFloor: 8, QRCode: 9, PedestalStatus: 10 }
      ],
      // 多选框
      multipleSelection: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        componentType: null,
        constructionMethod: null,
        tenantId: null
      },

    };
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    },
    handleQuery () { },
    // 多选框选中数据
    handleSelectionChange (selection) {
      this.multipleSelection = selection
    },
    getList () { }
  }
};
</script>

<style lang="scss" scoped></style>