<template>
  <div class="app-container">
    <el-card>
      <el-form :inline="true" :model="queryParams" label-width="68px" ref="queryForm" v-show="showSearch">
        <el-form-item prop="componentType">
          <!-- <el-select clearable placeholder="请选择构件类型" size="small" v-model="queryParams.componentType">
            <el-option :key="index" :label="item.dictLabel" :value="item.dictLabel"
              v-for="(item, index) in ComponentType"></el-option>
          </el-select> -->
          <el-input clearable v-model="queryParams.componentType" placeholder="请输入构件类型"></el-input>
        </el-form-item>
        <el-form-item prop="constructionMethod">
          <el-select clearable placeholder="请选择工法名称" size="small" v-model="queryParams.constructionMethod">
            <el-option :key="index" :label="item.dictLabel" :value="item.dictLabel"
              v-for="(item, index) in constructionMethod"></el-option>
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
        </el-form-item>
      </el-form>

      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="addList"
            v-hasPermi="['beam:planning:add']">新增</el-button>
        </el-col>

        <el-col :span="1.5">
          <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
            v-hasPermi="['beam:planning:remove']">删除</el-button>
        </el-col>

        <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>
      <el-table :data="methodSettingsList" @selection-change="handleSelectionChange" v-loading="loading">
        <el-table-column align="center" type="selection" width="55" />
        <el-table-column align="center" label="构件类型" prop="componentType" />
        <el-table-column align="center" label="工法名称" prop="constructionMethod" />
        <el-table-column align="center" class-name="small-padding fixed-width" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row)" icon="el-icon-edit-outline" size="mini"
              style="color: rgb(0, 168, 75)" type="text" v-hasPermi="['beam:methodList:edit']"></el-button>
            <el-button @click="handleGet(scope.row)" icon="el-icon-document" size="mini" style="color: rgb(21, 103, 225)"
              type="text" v-hasPermi="['beam:methodList:query']"></el-button>
            <el-button @click="handleDelete(scope.row)" icon="el-icon-delete" size="mini" style="color: rgb(221, 81, 76)"
              type="text" v-hasPermi="['beam:methodList:remove']"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 修改工法对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="60vw" :close-on-click-modal="false"
      :before-close="handleClose1">
      <div>
        <el-form :model="form2" :rules="rules" inline label-width="100px" ref="form2">
          <el-form-item label="构件类型:" prop="componentType" style="margin-right: 200px">
            <el-input placeholder="请选择构件类型" v-model="form2.componentType" clearable></el-input>
            <!-- <el-select clearable placeholder="请选择构件类型" size="small" v-model="form2.componentType">
              <el-option :key="index" :label="item.dictLabel" :value="item.dictLabel"
                v-for="(item, index) in ComponentType"></el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="工法名称:" prop="constructionMethod">
            <!-- <el-input placeholder="请输入工法名称" v-model="form2.constructionMethod" clearable /> -->
            <el-select clearable placeholder="请选择工法名称" size="small" v-model="form2.constructionMethod">
              <el-option :key="index" :label="item.dictLabel" :value="item.dictLabel"
                v-for="(item, index) in constructionMethod"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="body">
          <div :key="index" v-for="(item, index) in  form2.processList ">
            <div style="
                border-bottom: 1px solid grey;
                padding-bottom: 30px;
                margin-bottom: 20px;
              ">
              <span class="one">{{ item.sort }}</span>
              <el-input placeholder="请输入工序名称" style="width: 200px; margin-right: 50px" v-model="item.processName" />
              <el-select clearable placeholder="请选择工序样式" style="margin-right: 20px" v-model="item.style" collapse-tags>
                <el-option :key="index" :label="item.dictLabel" :value="item.dictValue"
                  v-for="(item, index) in processStyle"></el-option>
              </el-select>
              <span class="two" style="margin-right: 50px">

                <el-input placeholder="请输入工序编码" style="width: 200px" v-model.number="item.processCode" />
              </span>
              <el-select clearable placeholder="请选择施工班组" size="small" style="margin-right: 20px" v-model="item.teamId"
                multiple collapse-tags>
                <el-option :key="index" :label="item.deptName" :value="item.deptId"
                  v-for="(item, index) in ConstructionCrew"></el-option>
              </el-select>
              <el-button @click="add(index)" icon="el-icon-circle-plus-outline" style="font-size: 20px"
                type="text"></el-button>
              <el-button @click="del(index)" icon="el-icon-remove-outline" style="font-size: 20px" type="text"
                v-if="form2.processList.length > 1"></el-button>
            </div>
          </div>
        </div>
        <div class=" dialog-footer" slot="footer" style="margin-left: 800px;">
          <el-button @click="submitForm" type="primary">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 新增工法对话框 -->
    <el-dialog :title="title" :visible.sync="open2" :before-close="handleClose" width="60vw" :close-on-click-modal="false"
      class="add">
      <div>
        <el-form :model="form3" :rules="rules" inline label-width="100px" ref="form3">
          <el-form-item label="构件类型:" prop="componentType" style="margin-right: 200px">
            <el-input placeholder="请选择构件类型" v-model="form3.componentType" clearable></el-input>
            <!-- <el-select clearable placeholder="请选择构件类型" size="small" v-model="form3.componentType">
              <el-option :key="index" :label="item.dictLabel" :value="item.dictLabel"
                v-for="(item, index) in ComponentType"></el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="工法名称:" prop="constructionMethod">
            <!-- <el-input placeholder="请输入工法名称" v-model="form3.constructionMethod" clearable /> -->
            <el-select clearable placeholder="请选择工法名称" size="small" v-model="form3.constructionMethod">
              <el-option :key="index" :label="item.dictLabel" :value="item.dictLabel"
                v-for="(item, index) in constructionMethod"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="body">
          <div :key="index" v-for="(item, index) in  form3.processList ">
            <div style="
                border-bottom: 1px solid grey;
                padding-bottom: 30px;
                margin-bottom: 20px;
              ">
              <span class="one">{{ item.sort }}</span>
              <el-input placeholder="请输入工序名称" style="width: 200px; margin-right: 50px" v-model="item.processName" />
              <el-select clearable placeholder="请选择工序样式" style="margin-right: 20px" v-model="item.style" collapse-tags>
                <el-option :key="index" :label="item.dictLabel" :value="item.dictValue"
                  v-for="(item, index ) in processStyle"></el-option>
              </el-select>
              <span class="two" style="margin-right: 50px">

                <el-input placeholder="请输入工序编码" style="width: 200px" v-model="item.processCode" />
              </span>
              <el-select clearable placeholder="请选择施工班组" size="small" style="margin-right: 20px" v-model="item.teamId"
                multiple collapse-tags>
                <el-option :key="index" :label="item.deptName" :value="item.deptId"
                  v-for="(item, index ) in ConstructionCrew"></el-option>
              </el-select>
              <el-button @click="add1(index)" icon="el-icon-circle-plus-outline" style="font-size: 20px"
                type="text"></el-button>
              <el-button @click="del1(index)" icon="el-icon-remove-outline" style="font-size: 20px" type="text"
                v-if="form3.processList.length > 1"></el-button>
            </div>
          </div>
        </div>

        <div class=" dialog-footer" slot="footer">
          <el-button @click="submitForm1" type="primary">确 定</el-button>
          <el-button @click="cancel1">取 消</el-button>
        </div>
      </div>
    </el-dialog>


    <!-- 查询工法对话框 -->
    <el-dialog title="工法信息详情" :visible.sync="open1" width="80vw" :close-on-click-modal="false"
      :before-close="handleClose3">
      <div>
        <el-form :model="form1" inline label-width="100px" ref="form2">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="构件类型:">
                {{ form1.componentType }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工法名称：">
                {{ form1.constructionMethod }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="body">
          <div style="border-bottom: 1px solid gainsboro;padding-bottom: 10px; margin-bottom: 10px;" :key="index"
            v-for="(item, index) in  form1.processList ">
            <el-form :model="item" inline>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="工序名称:">
                    {{ item.processName }}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="工序样式:">
                    {{ item.style }}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="工序编码：">
                    {{ item.processCode }}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="施工班组:">
                    {{ aaa(item.teamId) }}
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>

            <span style="color: #66b1ff;">附件:</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listmethodList, addmethodList, editmethodList, delmethodList, getmethodList, getConstructionCrew } from "@/api/beam/methodList";
export default {
  name: 'AdminBeamIndex',

  data () {
    return {
      // 施工工法
      ConstructionCrew: [],
      // 工序样式
      processStyle: [],
      // 施工工法
      constructionMethod: [],
      // 构件类型
      ComponentType: [],
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      total: 0,
      // 输入框是否禁用
      InputShow: false,
      // 遮罩层
      loading: false,
      // 删除显示
      show: false,
      // 是否显示弹出层
      open: false,
      open1: false,
      open2: false,
      // 弹出层标题
      title: '',
      // 下拉框选项
      options: [
        {
          value: '20m',
          label: '20m'
        },
        {
          value: '30m',
          label: '30m'
        },
        {
          value: '40m',
          label: '40m'
        }
      ],
      // 显示搜索条件
      showSearch: true,
      // 工法表格数据
      methodSettingsList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        componentType: null,
        constructionMethod: null
      },
      // 表单参数
      form: {},
      form1: {},
      // 测试数据
      form2: {
        processList: [
          {
            sort: 1
          },

        ]
      },
      form3: {
        processList: [
          {
            sort: 1
          },

        ]
      },
      // 表单校验
      rules: {
        componentType: [
          { required: true, message: '构件类型不能为空', trigger: 'blur' }
        ],
        constructionMethod: [
          { required: true, message: '工法名称不能为空', trigger: 'blur' }
        ]
      },
      // 多选框
      multipleSelection: [],
      roles: [
        {
          id: 1,
          value: '钢筋一班'
        },
        {
          id: 2,
          value: '钢筋二班'
        },
        {
          id: 3,
          value: '模版一班'
        },
        {
          id: 4,
          value: '模版二班'
        },
        {
          id: 5,
          value: '混泥土一班'
        },
        {
          id: 6,
          value: '混泥土二班'
        },
        {
          id: 7,
          value: '张拉压浆班'
        },
        {
          id: 8,
          value: '架梁班'
        },
      ]
    }
  },
  watch: {
    // 新增
    form3: {
      deep: true,
      handler: function (e) {
        // console.log(e);
        e.processList.forEach(i => {
          i.teamIds = i.teamId.join(",")
        })
      }
    },
    // 修改
    form2: {
      deep: true,
      handler: function (e) {
        // console.log(e);
        e.processList.forEach(i => {
          i.teamIds = i.teamId.join(",")
        })
        // e.methodSettingsId = +e.methodSettingsId
        // console.log(e);
      }
    }
  },
  created () {
    this.getList();
    // this.getDicts('ConstructionCrew').then(res => {
    //   // console.log(res);
    //   this.ConstructionCrew = res.data
    // })
    this.getConstructionCrew()
    this.getDicts('constructionMethod').then(res => {
      // console.log(res);
      this.constructionMethod = res.data
    })
    this.getDicts('ComponentType').then(res => {
      // console.log(res);
      this.ComponentType = res.data
    })
    this.getDicts('process_style').then(res => {
      console.log(res);
      this.processStyle = res.data
    })
  },
  methods: {
    // 获取工法列表
    getList () {
      this.loading = true;
      listmethodList(this.queryParams).then(response => {
        // console.log(response);
        this.methodSettingsList = response.data.items;
        // console.log(this.methodSettingsList);
        this.total = response.data.total;
        this.loading = false;
      });
    },
    // 查询班组
    async getConstructionCrew () {
      const res = await getConstructionCrew()
      // console.log(res);
      this.ConstructionCrew = res.data
    },
    // 表单重置
    reset () {
      this.form2 = {
        componentType: null,
        constructionMethod: null,
        methodSettingsId: null,
        processList: null,

      };
      this.resetForm("form2");
    },
    /** 搜索按钮操作 */
    handleQuery () {
      this.queryParams.pageNum = 1
      listmethodList(this.queryParams).then(response => {
        // console.log(response);
        this.methodSettingsList = response.data.items;
        // console.log(this.methodSettingsList);
        this.total = response.data.total;
        this.loading = false;
      });
    },
    /** 重置按钮操作 */
    resetQuery () {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 新增表单按钮
    addList () {
      this.reset()
      // this.form2 = {}
      this.open2 = true
      this.title = '新增工法'
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      // console.log(row);
      this.title = "编辑工法"
      this.open = true
      // 数据回显
      const methodSettingsId = row.methodSettingsId || this.ids
      getmethodList(methodSettingsId).then(response => {
        console.log(response, "数据");
        if (response.data.processList != null) {
          response.data.processList.forEach(i => {
            if (i.teamIds != "") {
              i.teamId = i.teamIds.split(',')
            }
          })
          this.form2 = response.data
          // console.log(this.form2, 'aa');
        } else {
          this.form2 = {
            processList:
              [
                { sort: 1 }
              ]
          }
          this.form2.componentType = response.data.componentType
          this.form2.constructionMethod = response.data.constructionMethod
          this.form2.methodSettingsId = response.data.methodSettingsId
          // console.log(this.form2, "22");
        }
      });
    },
    /** 查询按钮操作 */
    handleGet (row) {
      console.log(row);
      this.open1 = true
      const methodSettingsId = row.methodSettingsId
      getmethodList(methodSettingsId).then(response => {
        console.log(response);
        if (response.data.processList != null) {
          response.data.processList.forEach(i => {

            i.teamId = i.teamIds.split(',')

          })
          this.form1 = response.data;
          // console.log(this.form1);
        } else {
          this.form1 = {
            processList:
              [
                { sort: 1 }
              ]
          }
          this.form1.componentType = response.data.componentType
          this.form1.constructionMethod = response.data.constructionMethod
          this.form1.methodSettingsId = response.data.methodSettingsId
          // console.log(this.form1);
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete (row) {
      const methodSettingsId = row.methodSettingsId || this.ids;
      this.$modal.confirm('是否确认删除工法编号为"' + methodSettingsId + '"的数据项？').then(function () {
        return delmethodList(methodSettingsId);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    //新增操作
    add (e) {
      let sort = e + 2
      this.form2.processList.forEach(item => {
        if (item.sort >= sort) {
          item.sort = item.sort + 1
        }
      })
      this.form2.processList.splice(e + 1, 0, { processName: '', processCode: '', teamIds: '', sort })
      // console.log(this.form2.processList);
    },

    add1 (e) {
      let sort = e + 2
      this.form3.processList.forEach(item => {
        if (item.sort >= sort) {
          item.sort = item.sort + 1
        }
      })
      this.form3.processList.splice(e + 1, 0, { processName: '', processCode: '', teamIds: '', sort })
      // console.log(this.form3.processList);
    },
    //删除操作
    del (e) {
      let num = e
      if (this.form2.processList.length > 1) {
        let arr = this.form2.processList.filter((ele, index) => {
          return index !== e
        })
        this.form2.processList = arr
        this.form2.processList.forEach(item => {
          if (item.sort > num + 1) {
            item.sort = item.sort - 1
          }
        })
        // console.log(this.form2.processList);
      }
    },
    del1 (e) {
      let num = e
      if (this.form3.processList.length > 1) {
        let arr = this.form3.processList.filter((ele, index) => {
          return index !== e
        })
        this.form3.processList = arr
        this.form3.processList.forEach(item => {
          if (item.sort > num + 1) {
            item.sort = item.sort - 1
          }
        })
        // console.log(this.form3.processList);
      }
    },
    // 多选框选中数据
    handleSelectionChange (selection) {
      this.ids = selection.map(item => item.methodSettingsId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },

    // 取消按钮
    cancel () {
      this.open = false
      this.form2 = {
        processList:
          [
            { sort: 1 }
          ]
      }
    },
    // 取消按钮
    cancel1 () {
      this.open2 = false
      this.form3 = {
        processList:
          [
            { sort: 1 }
          ]
      }

    },
    /** 提交按钮 */
    submitForm () {
      this.$refs['form2'].validate(valid => {
        if (valid) {
          if (this.form2.methodSettingsId != null) {
            editmethodList(this.form2).then(response => {
              console.log(this.form2);
              console.log(response);
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    submitForm1 () {
      console.log(this.form3.processList);
      this.$refs['form3'].validate(valid => {
        if (valid) {
          addmethodList(this.form3).then(response => {
            if (response.code == 200) {
              this.$modal.msgSuccess('新增成功')
              this.open2 = false
              this.getList()
            } else {
              return false
            }
          })
          this.form3 = {
            processList:
              [
                { sort: 1 }
              ]
          }
        }
      })
    },
    handleClose () {
      this.open2 = false
      this.form3 = {
        processList:
          [
            { sort: 1 }
          ]
      }
    },
    handleClose1 () {
      this.open = false
      this.form2 = {
        processList:
          [
            { sort: 1 }
          ]
      }
    },
    handleClose3 () {
      this.open1 = false
    },

    aaa (type) {
      let str = ""
      type.forEach((ele, i) => {
        this.roles.forEach(el => {
          if (ele.indexOf(el.id.toString()) != -1) {
            if (i < type.length - 1) {
              str += el.value + ","
            }
            else {
              str += el.value
            }
          }
        })
      })
      return str
    }
  }
}
</script>

<style lang="scss" scoped>
.one {
  display: inline-block;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  border-radius: 50%;
  background: #5bc648;
  color: #fff;
  margin-right: 10px;
  // margin-top: 5px;
}

::v-deep .el-dialog__header {
  border-bottom: 1px solid gray;
}

.dialog-footer {
  margin-left: 800px;
}

.body {
  // margin-top: 100px;
  height: 60vh;
  overflow-y: auto
}
</style>
