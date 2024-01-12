<template>
  <div class="app-container">
    <el-form inline :model="queryParams" label-width="68px" ref="queryForm" v-show="showSearch">
      <el-row>
        <el-col :span="3">
          <el-form-item>
            <el-input clearable placeholder="请输入任务编号" size="small" v-model="queryParams.taskNo" />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="3">
          <el-form-item>
            <el-select clearable placeholder="请选择桥梁名称" size="small" v-model="queryParams.bridgeName">
              <el-option v-for="(item, index) in Bridges" :key="index" :label="item.bridgeName" :value="item.bridgeName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col :span="3">
          <el-form-item>
            <el-select clearable placeholder="请选择左右幅" size="small" v-model="queryParams.leftRightAmplitude">
              <el-option v-for="(item, index) in amplitude1" :key="index" :label="item.dictLabel" :value="item.dictValue">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item>
            <el-input placeholder="请输入位置编码" size="small" v-model="queryParams.location"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="3">
          <el-form-item>
            <el-select clearable placeholder="请选择变更情况" size="small" v-model="queryParams.orderStatus">
              <el-option v-for="(item, index) in orderStatusList" :key="index" :label="item.dictLabel"
                :value="item.dictValue">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
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
    <div class="table-content">
      <el-table :data="methodSettingsList" v-loading="loading" :height="total > 0 ? '90%' : '100%'">
        <el-table-column align="center" label="任务编号" prop="taskNo" />
        <el-table-column align="center" label="桥梁名称" prop="bridgeName" />
        <el-table-column align="center" label="左右幅" prop="leftRightAmplitude" :formatter="formatter" />
        <el-table-column align="center" label="位置编码" prop="location" />
        <el-table-column align="center" label="梁片尺寸" prop="beamSize" />
        <el-table-column align="center" label="施工单位" prop="constructionCompany" />
        <el-table-column align="center" label="监理单位" prop="supervisionUnit" />
        <el-table-column align="center" label="设计单位" prop="designUnit" />
        <el-table-column align="center" label="状态" prop="orderStatus" :formatter="formatter" />
        <el-table-column align="center" class-name="small-padding fixed-width" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row)" icon="el-icon-edit-outline" size="mini"
              style="color: rgb(0, 168, 75)" type="text" v-hasPermi="['beam:methodList:edit']"></el-button>
            <el-button style="margin-left: 10px" type="warning" size="small"
              @click="progressEntry(scope.row)">进度录入</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
        @pagination="getList" />
    </div>

    <el-dialog :title="title" :visible.sync="open" width="85%" append-to-body :close-on-click-modal="false"
      :before-close="handleClose">
      <div class="sb-strip">工单基本信息</div>
      <el-form ref="form" :model="form" label-width="80px" inline>
        <el-row>
          <el-col :span="6">
            <div>
              <el-form-item label="桥梁名称:">{{ form.bridgeName }} </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-form-item label="位置编码:"> {{ form.location }} </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-form-item label="左右幅:"> {{ bbb(form.leftRightAmplitude) }} </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-form-item label="梁片尺寸:"> {{ form.beamSize }} </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div>
              <el-form-item label="施工单位:">
                {{ form.constructionCompany }}
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-form-item label="设计单位:">
                {{ form.designUnit }}
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-form-item label="监理单位:">
                {{ form.supervisionUnit }}
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-form-item label="变更情况:"> {{ aaa(form.orderStatus) }} </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div class="sb-strip">工法详情</div>
      <div class="working-name">{{ form.beamSize }}</div>

      <el-steps :active="active" finish-status="success" align-center>
        <el-step v-for="(item, index) in stpe" :key="index" :title="item.processName"></el-step>
      </el-steps>

      <el-table :data="detailsList" v-loading="detailsLoading">
        <el-table-column align="center" label="施工工序" prop="processName" />
        <!-- <el-table-column align="center" label="工序编码" prop="componentType" /> -->
        <el-table-column align="center" label="施工班组" prop="deptName" />
        <el-table-column align="center" label="开始时间" prop="beginTime" />
        <el-table-column align="center" label="结束时间" prop="endTime" />
        <el-table-column align="center" label="区域编号" prop="regionId" />
        <!-- <el-table-column align="center" label="台座区域" prop="componentType" /> -->
        <el-table-column align="center" label="台座编号" prop="seatId" />
        <el-table-column align="center" label="模版编号" prop="templateId" />
        <!-- <el-table-column align="center" label="附件">
          <template slot-scope="scope">
            <el-button @click="edit1(scope.row)" icon="el-icon-paperclip" size="mini" style="color: rgb(0, 168, 75)"
              type="text" v-hasPermi="['beam:methodList:edit']"></el-button>
          </template>
        </el-table-column> -->
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button v-show="show" @click="edit(scope.row)" icon="el-icon-edit-outline" size="mini"
              style="color: rgb(0, 168, 75)" type="text" v-hasPermi="['beam:methodList:edit']"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog title="编辑工序" :visible.sync="open1" width="30vw" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :rules="rules" :model="form1" label-width="80px">
        <el-form-item label="施工班组" prop="deptId">
          <el-select ref="refs" v-model="form1.deptId" placeholder="请选择施工班组" style="width: 20vw;">
            <el-option :key="index" :label="item.deptName" :value="item.deptId"
              v-for="(item, index) in ConstructionCrew"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域编号" prop="regionId">
          <el-select v-model="form1.regionId" placeholder="请输入台座区域" style="width: 20vw;">
            <el-option :key="index" :label="item.regionCode" :value="item.regionId"
              v-for="(item, index) in listRegion1" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="台座区域" prop="seatType">
          <el-select v-model="form.seatType" placeholder="请选择台座类型" clearable>
            <el-option :key="index" :label="item.dictLabel" :value="item.dictLabel"
              v-for="(item, index) in PedestalType"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="台座编号" prop="seatId">
          <!-- <el-input v-model="form1.seatId" placeholder="请输入台座编号" style="width: 20vw;" /> -->
          <el-select v-model="form1.seatId" placeholder="请选择台座编号" style="width: 20vw;">
            <el-option :key="index" :label="item.seatCode" :value="item.seatId"
              v-for="(item, index) in listSeatSettings1" />
          </el-select>
        </el-form-item>
        <el-form-item label="模版编号" prop="templateId">
          <el-select v-model="form1.templateId" placeholder="请输入台座层数" style="width: 20vw;">
            <el-option :key="index" :label="item.templateNumber" :value="item.templateId"
              v-for="(item, index) in listTemplate1" />
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="beginTime">
          <el-date-picker clearable v-model="form1.beginTime" type="date" value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 20vw; " placeholder="选择压浆开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker clearable v-model="form1.endTime" type="date" style="width: 20vw; "
            value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择压浆结束时间">
          </el-date-picker>
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
import {
  beamOrders, ordersDetails, listTasks, updateBeamTasks, getmethodList, freelist, listTemplate, listRegion, listSeatSettings, beamBridges, getSeatSettings,
  getConstructionCrew
} from "@/api/beam/ticketQuery";
export default {

  data () {
    return {
      stpe: [],
      show: false,
      title: "工单详情",
      open: false,
      open1: false,
      total: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      form: {},
      form1: {},
      active: 0,
      // 显示搜索条件
      showSearch: true,
      loading: false,
      detailsLoading: false,
      methodSettingsList: [],
      detailsList: [],
      ConstructionCrew: [],
      orderStatusList: [],
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
        startDate: [
          { required: true, message: "每层个数不能为空", trigger: "blur" }
        ],
        endDate: [
          { required: true, message: "每层个数不能为空", trigger: "blur" }
        ],
      },
      roles: [
        {
          id: 1,
          value: '未派发'
        },
        {
          id: 2,
          value: '进行中'
        },
        {
          id: 3,
          value: '已派发'
        },
      ],
      roles1: [
        {
          id: '01',
          value: '左幅'
        },
        {
          id: '02',
          value: '右幅'
        },
      ],
      listSeatSettings1: [],
      listSeatSettings2: [],
      listTemplate1: [],
      listRegion1: [],
      orderId: '',
      AreaNumber: [],
      q: '',
      Bridges: [],
      amplitude1: []
    };
  },
  created () {

    this.getBridges()
    // 查询模版
    listTemplate(this.queryParams).then(res => {
      this.listTemplate1 = res.data.items
      // console.log(this.listTemplate1, '模版');
    })
    listRegion(this.queryParams).then(res => {
      // console.log(res, '区域');
      this.listRegion1 = res.data.items
    })
    // 查询台座列表
    listSeatSettings().then(res => {
      // console.log(res, '543564');
      this.listSeatSettings2 = res.data.items
    })
    // // 查询空闲台座
    // freelist().then(res => {
    //   // console.log(res, '空闲台座');
    //   this.listSeatSettings1 = res.data
    // })
    // this.getDicts('ConstructionCrew').then(res => {
    //   // console.log(res);
    //   this.ConstructionCrew = res.data
    //   // console.log(this.ConstructionCrew);
    // })
    this.getDicts('AreaNumber').then(res => {
      // console.log(res);
      this.AreaNumber = res.data
      // console.log(this.ConstructionCrew);
    })
    this.getDicts('orderStatus').then(res => {
      // console.log(res);
      const { data } = res
      this.orderStatusList = data
    })
    this.getDicts('amplitude').then(res => {
      console.log(res, "左右");
      const { data } = res
      this.amplitude1 = data
    })
    this.getConstructionCrew()
    this.getList();
  },
  methods: {
    getList () {
      this.loading = true;
      console.log(this.queryParams, '8888');
      beamOrders(this.queryParams).then(response => {
        // console.log(response);
        this.methodSettingsList = response.data.items
        // this.methodSettingsList.forEach(i => {
        //   this.amplitude1.forEach(v => {
        //     if (i.leftRightAmplitude == v.dictValue) {
        //       i.leftRightAmplitude = v.dictLabel
        //       console.log(i.leftRightAmplitude);
        //     }
        //   })
        // })

        this.total = response.data.total;
      }).finally(() => {
        this.loading = false;
      })
      // console.log(this.queryParams);
    },
    getBridges () {
      beamBridges(this.queryParams).then(response => {
        console.log(response, '9999999');
        this.Bridges = response.data.items
      })
    },
    // 查询班组
    async getConstructionCrew () {
      const res = await getConstructionCrew()
      console.log(res, '888');
      this.ConstructionCrew = res.data
    },
    getList1 (row) {
      // console.log(row, "row1");
      listTasks({ taskNo: row }).then(res => {
        // console.log(res, '331');
        // console.log(res.data[0].seatId, '33');
        this.detailsList = res.data

        res.data.forEach(i => {
          if (i.taskStatus == '3') {
            this.active += 1
          }
        })
        console.log(this.active);
        // 查询详细台座
        // getSeatSettings(res.data[0].seatId).then(res => {
        //   console.log(res, '台座');
        // })
        // console.log(this.detailsList, '99');
        this.detailsList.forEach(i => {
          // console.log(this.listRegion1, '88');
          // this.ConstructionCrew.forEach(v => {
          //   if (i.deptId == v.dictValue) {
          //     i.deptName = v.dictLabel
          //   }
          // })
          this.listRegion1.forEach(v => {
            if (i.regionId == v.regionId) {
              i.regionId = v.regionCode
            }
          })
          this.listTemplate1.forEach(v => {
            if (i.templateId == v.templateId) {
              i.templateId = v.templateNumber
            }
          })
          this.listSeatSettings2.forEach(v => {
            if (i.seatId == v.seatId) {
              i.seatId = v.seatCode
            }
          })
        })
      })
    },
    // getList2 () {
    //   this.getList()
    //   this.getList1()
    // },
    // 查询
    handleQuery () {
      console.log(this.queryParams);
      this.getList();
    },
    // 清空
    resetQuery () {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
      }
      this.getList();
    },
    // 查看
    handleUpdate (row) {
      this.title = "工单详情";
      this.open = true;
      this.show = false
      ordersDetails(row.orderId).then(response => {
        this.form = response.data
      }).finally(() => {
        this.loading = false;
      })
      getmethodList(row.methodSettingsId).then(res => {
        this.stpe = res.data.processList
      })


      this.getList1(row.taskNo)

    },
    // 进度改变
    progressEntry (row) {
      // console.log(row, 'row');
      this.q = row.taskNo
      // console.log(row);
      this.orderId = row.orderId
      this.title = "进度录入";
      this.open = true;
      this.show = true
      ordersDetails(row.orderId).then(response => {
        // console.log(response, '3333');
        this.form = response.data
        // console.log(this.form);

      }).finally(() => {
        this.loading = false;
      })
      getmethodList(row.methodSettingsId).then(res => {
        // console.log(res, '99');
        this.stpe = res.data.processList
      })


      // 查询模版
      // listTemplate(this.queryParams).then(res => {
      //   this.listTemplate1 = res.data.items
      // })
      // listRegion(this.queryParams).then(res => {
      //   console.log(res, '区域');
      //   this.listRegion1 = res.data.items
      // })
      // listSeatSettings(this.queryParams).then(res => {
      //   this.listSeatSettings2 = res.data.items
      // })

      this.getList1(row.taskNo)
    },
    // 编辑工序
    async edit (row) {
      // console.log(row.beamId);
      const res = await freelist(row.beamId)
      this.listSeatSettings1 = res.data
      // console.log(res, '3333333333');
      this.open1 = true
      this.form1 = row
      this.form1.orderId = this.orderId
    },

    cancel () {
      this.open1 = false
      this.active = 0
    },
    submitForm () {
      this.form1.type = "2"
      this.listRegion1.forEach(v => {
        if (this.form1.regionId == v.regionCode) {
          this.form1.regionId = v.regionId
        }
      })
      // this.ConstructionCrew.forEach(v => {
      //   if (this.form1.deptId == v.dictLabel) {
      //     this.form1.deptId = v.dictValue
      //   }
      // })
      console.log(this.listSeatSettings2);
      this.listSeatSettings2.forEach(v => {
        if (this.form1.seatId == v.seatCode) {
          this.form1.seatId = v.seatId
        }
      })
      this.listTemplate1.forEach(v => {
        if (this.form1.templateId == v.templateNumber) {
          this.form1.templateId = v.templateId
        }
      })
      // console.log(this.form1);
      updateBeamTasks(this.form1).then(res => {
        this.$modal.msgSuccess("修改成功");
        this.getList1(this.q)
      })
      this.open1 = false
    },
    formatter (row, column, cellValue) {
      if (column.property === 'orderStatus') {
        return this.selectDictLabels(this.orderStatusList, cellValue)
      }
      if (column.property === 'leftRightAmplitude') {
        return this.selectDictLabels(this.amplitude1, cellValue)
      }

    },
    aaa (type) {
      // console.log(type);
      let str = ""
      this.roles.forEach(el => {
        if (el.id == type) {
          str = el.value
        }
      })
      return str
    },
    bbb (type) {
      // console.log(type);
      let str = ""
      this.roles1.forEach(el => {
        if (el.id == type) {
          str = el.value
        }
      })
      return str
    },
    handleClose () {
      this.open = false
      this.active = 0
    }
  },
};
</script>

<style scoped>
.table-content {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px;
}

.working-name {
  margin: 26px 0;
  font-size: 14px;
  color: #666;
  font-weight: 700;
}

::v-deep .el-step__title {
  font-size: 12px;
}
</style>