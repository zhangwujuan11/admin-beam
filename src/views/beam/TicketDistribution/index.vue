<template>
  <div class="app-container">
    <el-form inline :model="queryParams" label-width="68px" ref="queryForm" v-show="showSearch">
      <el-row>
        <el-col :span="3">
          <el-form-item prop="taskNo">
            <el-input clearable placeholder="请输入任务编号" size="small" v-model="queryParams.taskNo" />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="3">
          <el-form-item prop="bridgeName">
            <el-input clearable v-model="queryParams.bridgeName" placeholder="请输入桥梁名称"></el-input>
            <el-select v-model="queryParams.bridgeName" placeholder="请选择桥梁名称">
              <el-option v-for="(item, index) in options" :key="index" :label="item.bridgeName"
                :value="item.bridgeName" />
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col :span="3">
          <el-form-item prop="leftRightAmplitude">
            <el-select v-model="queryParams.leftRightAmplitude" placeholder="请选择左右幅" clearable>
              <el-option v-for="(item, index) in lifeRight" :key="index" :label="item.dictLabel"
                :value="item.dictValue" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="location">
            <el-input clearable placeholder="请输入位置编码" v-model="queryParams.location" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="locationType">
            <!-- <el-input clearable v-model="queryParams.locationType" placeholder="请输入位置类型"></el-input> -->
            <el-select v-model="queryParams.locationType" placeholder="请选择位置类型" clearable>
              <el-option v-for="(item, index) in methodSettingsList" :key="index" :label="item.locationType"
                :value="item.locationType" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="componentType">
            <el-input clearable v-model="queryParams.componentType" placeholder="请输入构件类型"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item>
            <el-button @click="handleQuery" icon="el-icon-search" size="mini" style="
                background: rgb(0, 110, 233);
                color: white;
                border-color: #66b1ff;
              ">查询</el-button>
            <el-button @click="resetQuery" size="mini"
              style="color: #909399; background: #f4f4f5; border-color: #d3d4d6">清空</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="methodSettingsList" v-loading="loading">
      <el-table-column align="center" label="任务编号" prop="taskNo" />
      <el-table-column align="center" label="桥梁名称" prop="bridgeName" />
      <!-- <el-table-column align="center" label="梁片编码" prop="beamCode" /> -->
      <el-table-column align="center" label="左右幅" prop="leftRightAmplitude" />
      <el-table-column align="center" label="位置编码" prop="location" />
      <el-table-column align="center" label="位置类型" prop="locationType" />
      <el-table-column align="center" label="构件类型" prop="componentType" />
      <el-table-column align="center" label="梁片尺寸" prop="beamSize" />
      <el-table-column align="center" label="施工工法" prop="constructionMethod" />
      <el-table-column align="center" label="开始日期" prop="startDate" />
      <el-table-column align="center" label="结束日期" prop="endDate" />
      <el-table-column align="center" label="状态" prop="orderStatus">
        <template slot-scope="scope">
          {{ scope.row.orderStatus | dataus }}
        </template>
      </el-table-column>
      <el-table-column align="center" class-name="small-padding fixed-width" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleUpdate(scope.row)" icon="el-icon-edit-outline" size="mini"
            style="color: rgb(0, 168, 75)" type="text" v-hasPermi="['beam:methodList:edit']"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <el-dialog :title="title" :visible.sync="open" width="85%" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" label-width="80px" inline
        style="border-bottom: 1px solid #e5e5e5; margin-bottom: 20px">
        <el-row>
          <el-col :span="6">
            <div>
              <el-form-item label="桥梁名称:"> {{ form.bridgeName }} </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-form-item label="梁片编码:"> {{ form.beamCode }} </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-form-item label="位置编码:"> {{ form.location }} </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-form-item label="左右幅:"> {{ form.leftRightAmplitude }} </el-form-item>
            </div>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="6">
            <div>
              <el-form-item label="梁片尺寸:"> {{ form.beamSize }} </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-form-item label="施工工法:"> {{ form.constructionMethod }} </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-form-item label="开始日期:"> {{ form.startDate }} </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-form-item label="结束日期:"> {{ form.endDate }} </el-form-item>
            </div>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="6">
            <div>
              <el-form-item label="施工单位:"> {{ form.constructionCompany }} </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-form-item label="设计单位:"> {{ form.designUnit }} </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-form-item label="监理单位:"> {{ form.supervisionUnit }} </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div class="content-main-box" v-for="(item, index) in   form1.beam " :key="index" style="position: relative;">
        <div class="content-box">
          <div class="send-list">
            <div style="width: 12%">工序名称:{{ item.processName }}</div>
            <div class="common-send">
              <div class="common-select">
                <span> 施工班组:</span>
                <el-select ref="refs" v-model="item.deptId" placeholder="请选择施工班组" size="mini"
                  @change="depidchange($event, index)">
                  <el-option v-for="(item, index) in ConstructionCrew" :key="index" :label="item.deptName"
                    :value="item.deptId"></el-option>
                </el-select>
              </div>
            </div>
            <div class="common-send">
              <div class="common-select">
                <span> 工单状态:</span>
                <el-select v-model="item.inspectStatus" placeholder="请选择" size="mini" :disabled="item.taskStatus != 2">
                  <el-option :key="index" :label="item.dictLabel" :value="item.dictValue"
                    v-for="(item, index) in inspectStatus1" />
                </el-select>
              </div>
            </div>
            <!-- <div class="common-send">
              <div class="common-select">
                <span> 台座区域:</span>
                <el-select v-model="item.seatArea" placeholder="请选择" size="mini">
                  <el-option :key="index" :label="item.seatArea" :value="item.seatArea"
                    v-for="(item, index) in listSeatSettings1" />
                </el-select>
              </div>
            </div> -->
            <div class="common-send">
              <div class="common-select">
                <span> 台座编号:</span>
                <el-select v-model="item.seatId" placeholder="请选择" size="mini">
                  <el-option :key="index" :label="item.seatCode" :value="item.seatId"
                    v-for="(item, index) in listSeatSettings1" />
                </el-select>
              </div>
            </div>
            <div class="common-send">
              <div class="common-select">
                <span> 模板编号:</span>
                <el-select v-model="item.templateId" placeholder="请选择" size="mini">
                  <el-option :key="index" :label="item.templateNumber" :value="item.templateId"
                    v-for="(item, index) in listTemplate1" />
                </el-select>
              </div>
            </div>
            <div class="common-send"></div>
          </div>
        </div>
        <!--  -->
        <div style="display: flex;position: absolute;right: 10px;" v-if="indexneed == index">

          <div v-show="item.taskStatus == 2">
            <el-button icon="el-icon-s-promotion" type="warning" size="mini"
              @click="editIndex1(item, index)">进行中</el-button>
          </div>
          <div v-show="item.taskStatus == 1">
            <el-button icon="el-icon-s-promotion" type="warning" size="mini"
              @click="editIndex(item, index)">接收</el-button>
          </div>
          <!-- <div v-show="item.taskStatus == 3"> -->
          <!-- <el-button icon="el-icon-s-promotion" type="warning" size="mini"
			    @click="editIndex1(item, index)">完成</el-button> -->
          <!-- <span>完成</span> -->
          <!-- </div> -->
          <div v-show="!item.taskStatus">
            <el-button icon="el-icon-s-promotion" type="warning" size="mini" @click="addIndex(item, index)">派发</el-button>
          </div>
        </div>
      </div>


    </el-dialog>
  </div>
</template>

<script>
import {
  beamOrders, ordersDetails, listTasks, addBeamTasks, updateBeamTasks, getmethodList, listRegion, listTemplate, freelist,
  listSeatSettings, listBridge, getConstructionCrew
} from '@/api/beam/TicketDistribution.js'
export default {
  filters: {
    dataus (e) {
      if (e == 1) {
        return '未派发'
      } else if (e == 2) {
        return '已派发'
      } else if (e == 3) {
        return '已完成'
      }
    }
  },
  name: "AdminBeamIndex",
  // dicts: ['ConstructionCrew'],
  data () {
    return {

      // btnIndex: 0,
      // btnIndex1: 0,
      // btnIndex2: 0,
      // btnIndex3: 1,
      // btnIndex4: 2,
      value: "",
      // 遮罩层
      loading: true,
      // 是否显示弹出层
      open: false,
      title: "工单详情",
      total: 1,
      // 显示搜索条件
      showSearch: true,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        componentType: null,
        constructionMethod: null,
      },
      // 工单表格数据
      methodSettingsList: [],
      form: {},
      orderStatusList: [],
      form1: {
        beam: [],
      },
      listRegion1: [],
      listSeatSettings1: [],
      listTemplate1: [],
      formreturn: [],
      indexneed: null,
      lifeRight: [],
      options: [],
      inspectStatus1: [],
      ConstructionCrew: []
    };
  },
  created () {
    this.getDicts('amplitude').then(res => {
      // console.log(res, "lifeRight");
      this.lifeRight = res.data
    })
    this.listRegion()
    this.listSeatSettings()
    this.listTemplate()
    this.listBridge()

    this.getDicts('orderStatus').then(res => {
      const { data } = res
      this.orderStatusList = data
    })
    this.getDicts('process_status').then(res => {
      const { data } = res
      this.inspectStatus1 = data
    })
    this.getConstructionCrew()
    this.getList()


    // this.getDicts('ConstructionCrew').then(res => {
    //   this.ConstructionCrew = res.data
    // })
  },
  methods: {
    async getList () {
      this.loading = false
      const res = await beamOrders(this.queryParams)
      // console.log(res.data.items, 'methodSettingsList');
      this.methodSettingsList = res.data.items
      this.total = res.data.total
      this.methodSettingsList.forEach(i => {
        this.lifeRight.forEach(v => {
          if (i.leftRightAmplitude == v.dictValue) {
            i.leftRightAmplitude = v.dictLabel
          }
          // console.log(i.leftRightAmplitude);
        })
      })
      //  beamOrders(this.queryParams).then(res => {
      //     this.methodSettingsList = res.data.items
      // this.methodSettingsList.forEach(i => {
      //   this.lifeRight.forEach(v => {
      //     if (i.leftRightAmplitude == v.dictValue) {
      //       i.leftRightAmplitude = v.dictLabel
      //     }
      //   })
      // })
      //   console.log(this.methodSettingsList, '7777');
      //   this.total = res.data.total
      // }).finally(() => {
      //   this.loading = false;
      // })
    },
    // 查询桥梁
    listBridge () {
      listBridge().then(response => {
        // console.log(response);
        this.options = response.data.items
      })
    },
    // 查询班组
    async getConstructionCrew () {
      const res = await getConstructionCrew()
      this.ConstructionCrew = res.data
    },

    // 查询区域
    listRegion () {
      listRegion(this.queryParams).then(res => {
        // console.log(res, '区域');
        this.listRegion1 = res.data.items
      })
    },
    // 查询台座列表
    listSeatSettings () {
      listSeatSettings(this.queryParams).then(res => {
        // console.log(res, "台座");
        // this.listSeatSettings1 = res.data.items
      })
    },
    // 查询模版
    listTemplate () {
      listTemplate(this.queryParams).then(res => {
        console.log(res, '模版');
        this.listTemplate1 = res.data.items
      })
    },
    // 查询空闲台座
    // freelist () {
    //   freelist().then(res => {
    //     console.log(res, '空闲台座');
    //     this.listSeatSettings1 = res.data
    //   })
    // },
    // 查询
    handleQuery () {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery () {
      this.handleQuery();
    },
    // 表单重置
    reset () {
      this.form = {};
      this.resetForm("form");
    },

    /** 修改按钮操作 */
    handleUpdate (row) {
      getmethodList(row.methodSettingsId).then(datea => {
        // console.log(this.form1.beam);
        this.form1.beam = datea.data.processList
        this.reset();
        const orderId = row.orderId
        console.log(orderId);

        ordersDetails(orderId).then(response => {
          // console.log(response, '3333');
          this.form = response.data;
          console.log(this.form, '888');
          // this.freelist(this.form.beamId)
          freelist(this.form.beamId).then(res => {
            console.log(res, '空闲台座');
            this.listSeatSettings1 = res.data
          })
          this.lifeRight.forEach(i => {
            if (this.form.leftRightAmplitude == i.dictValue) {
              this.form.leftRightAmplitude = i.dictLabel
            }
          })

          this.title = "工单详情";
        });

        // 查询梁片任务列表
        listTasks({ taskNo: row.taskNo }).then(res => {
          console.log(res, '梁片任务');
          if (res.data != null) {
            res.data.forEach(i => {
              this.inspectStatus1.forEach(v => {
                if (i.inspectStatus == v.dictValue) {
                  i.inspectStatus = v.dictLabel
                }
              })
            })
          }
          console.log(res.data, "456789")
          if (res.data && res.data.length != 1 && res.data[res.data.length - 1].taskStatus == 3) {

            this.indexneed = res.data.length
            this.getArrDifSameValue(this.form1.beam, res.data)
          } else if (res.data && res.data.length != 1 && res.data[res.data.length - 1].taskStatus != 3) {
            this.indexneed = res.data.length - 1
            this.getArrDifSameValue(this.form1.beam, res.data)
          } else if (res.data && res.data.length == 1 && res.data[0].taskStatus != 3) {
            this.indexneed = 0
            this.getArrDifSameValue(this.form1.beam, res.data)
          } else if (res.data && res.data.length == 1 && res.data[0].taskStatus == 3) {
            this.indexneed = res.data.length
            this.getArrDifSameValue(this.form1.beam, res.data)
          } else {
            this.indexneed = 0
          }
          // console.log(this.indexneed, '999');

          this.open = true;
          for (let i = 0; i < this.form1.beam.length; i++) {
            this.$set(this.form1.beam[i], "orderId", row.orderId)
            this.$set(this.form1.beam[i], "taskNo", row.taskNo)
          }
        })
      });

    },
    // 新增
    depidchange (e, i) {
      console.log(e);
      this.ConstructionCrew.map(item => {
        console.log(item);
        if (item.deptId == e) {
          this.form1.beam[i].deptName = item.deptName
        }
      })
    },
    addIndex (row, e) {
      console.log(this.form1.beam, '999');
      // this.btnIndex2 += 1
      addBeamTasks(this.form1.beam[e]).then(res => {
        this.$modal.msgSuccess("派发成功");
        this.form1.beam[e].taskStatus = 1
        this.$forceUpdate()
      })
    },
    // 获取两个相等的值
    getArrDifSameValue (arr1, arr2) {
      let that = this
      for (var i = 0; i < arr2.length; i++) {
        for (var j = 0; j < arr1.length; j++) {
          if (arr2[i].sort == arr1[j].sort) {
            that.form1.beam[j] = arr2[i]
            this.$set(that.form1.beam, j, arr2[i])
          }
        }
      }
    },



    // 进行中
    editIndex (row, e) {
      // 查询梁片任务列表
      // 要先执行listTasks,在执行updateBeamTasks
      listTasks({ taskNo: this.form1.beam[e].taskNo }).then(res => {
        console.log(this.form1.beam[e]);
        this.form1.beam[e].taskId = res.data[e].taskId
        updateBeamTasks(this.form1.beam[e]).then(res => {
          if (res.code == 200) {
            this.$modal.msgSuccess("接受成功");
            this.form1.beam[e].taskStatus = 2
            this.$forceUpdate()
          } else {
            this.$modal.msgError(res.message);
            return false
          }
        })
      })

    },
    editIndex1 (row, e) {
      // console.log(row);
      updateBeamTasks(this.form1.beam[e]).then(res => {
        if (res.code == 200) {
          this.$modal.msgSuccess("成功");
          this.handleUpdate(row)
        } else {
          this.$modal.msgError(res.message);
          return false
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.content-main-box {
  display: flex;

  .content-box {
    width: 90%;
    margin-right: 10px;
  }

  .send-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .common-send {
    flex: 1;
  }

  .common-select {
    display: flex;
    align-items: center;
    margin-right: 10px;

    span {
      width: 100px;
    }
  }
}
</style>