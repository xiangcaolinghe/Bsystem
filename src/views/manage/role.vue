<template>
    <div class="role-page">
        <div class="right cell">
            <div class="title">
                角色管理
            </div>
            <div class="content">
                <div class="result-table">
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="name"
                                label="角色名称"
                                width="200">
                        </el-table-column>
                        <el-table-column
                                prop="org"
                                label="归属机构">
                        </el-table-column>
                        <el-table-column
                                prop="range"
                                label="数据范围"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="100">
                            <template slot-scope="scope">
                                <el-button @click="handleAllot(scope.row)" type="text" size="small">分配</el-button>
                                <el-button @click="handleEdit(scope.row)" type="text" size="small">修改</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pagination-box">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size="100"
                            layout="prev, pager, next, jumper"
                            :total="1000">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!--修改弹框-->
        <el-dialog title="修改" :visible.sync="editPop" class="tip-dialog" :close-on-click-modal="false">
            <div class="pop-content">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="上级菜单">
                        <div class="el-select" readonly="readonly">
                            <div class="el-input el-input--suffix">
                                <input
                                        v-model="form.branch"
                                        type="text"
                                        readonly="readonly"
                                        autocomplete="off"
                                        placeholder="请选择"
                                        class="el-input__inner"
                                        @click="isBranchPop">
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="角色名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>

                    <el-form-item label="是否系统数据">
                        <el-switch
                            v-model="form.isData"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="是否可用">
                        <el-switch
                                v-model="form.isUse"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="数据范围">
                        <el-select
                                v-model="form.range"
                                filterable
                                default-first-option
                                placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="角色授权">
                        <el-tree
                                :data="roleArr"
                                show-checkbox
                                node-key="id"
                                ref="tree"
                                :default-expand-all="true"
                                :props="defaultPropsRole"
                                @check-change="handleCheckChange">
                        </el-tree>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <!--编辑-->
                    <el-form-item>
                        <el-button type="primary" @click="onSubmitEdit">保存</el-button>
                        <el-button>返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <!--选择部门弹层-->
        <el-dialog title="选择部门" :visible.sync="chooseBranchPop" class="choose-branch-pop" :close-on-click-modal="false">
            <div class="pop-content">
                <el-input
                        placeholder="输入关键字进行过滤"
                        v-model="filterText">
                </el-input>
                <el-tree
                        @node-click="chooseNodeClick"
                        class="filter-tree"
                        :data="data"
                        :props="defaultProps"
                        default-expand-all
                        :filter-node-method="filterNode"
                        ref="filterTree"
                        :default-expand-all="true"
                        :expand-on-click-node="false">
                </el-tree>
            </div>
            <div class="pop-btn">
                <el-button type="success" @click="confirmChooseBranch">确定</el-button>
                <el-button type="info" @click="choosePop = false">取消</el-button>
            </div>
        </el-dialog>
        <!--分配角色弹层-->
        <el-dialog title="分配角色" :visible.sync="assignRolePop" class="tip-dialog assign-dialog" :close-on-click-modal="false">
            <div class="pop-content">
                <div class="search-nav">
                    <el-row :gutter="20" style="margin-bottom:20px;">
                        <el-col :span="8" class="flex">
                            <span class="name">角色名称： <span class="bold">P字码管理员</span></span>
                        </el-col>
                        <el-col :span="8" class="flex">
                            <span class="name">归属机构： <span class="bold">啦啦啦啦啦啦啦</span></span>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8" class="flex">
                            <span class="name">数据范围： <span class="bold">所有数据</span></span>
                        </el-col>
                        <el-col :span="8" class="flex">
                            <el-button type="primary" @click="assignClick">分配角色</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div class="result-table">
                    <el-table
                            :data="roleData"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="org"
                                label="归属机构">
                        </el-table-column>
                        <el-table-column
                                prop="branch"
                                label="归属部门">
                        </el-table-column>
                        <el-table-column
                                prop="loginName"
                                label="登录名"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="姓名"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="tel"
                                label="电话"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="phone"
                                label="手机"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="100">
                            <template slot-scope="scope">
                                <el-button @click="handleRoleDel(scope.row)" type="text" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </el-dialog>
        <!--分配角色弹层-->
        <el-dialog title="分配角色" :visible.sync="assignRoleDetailPop" class="tip-dialog assign-detail-dialog" :close-on-click-modal="false">
            <div class="pop-content">
                <div class="role-cell">
                    <div class="role-cell-title">所在部门：</div>
                    <div class="role-cell-content">
                        <el-tree
                                :data="assignDetailData"
                                :props="defaultProps"
                                @node-click="handleNodeClick"
                                :expand-on-click-node="false"
                                :default-expand-all="true">
                        </el-tree>
                    </div>
                </div>
                <div class="role-cell">
                    <div class="role-cell-title">待选人员：</div>
                    <div class="role-cell-content">
                        <div class="user"
                             v-for="list in userData"
                             :key="list.name"
                             @click="chooseRoleClick(list)"><i class="fa fa-user"></i> {{list.name}}</div>
                    </div>
                </div>
                <div class="role-cell">
                    <div class="role-cell-title">已选人员：</div>
                    <div class="role-cell-content">
                        <div class="user"
                             v-for="(list,index) in chooseUserData"
                             :key="list.name"
                             @click="delRoleClick(index)"><i class="fa fa-user"></i> {{list.name}}</div>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="confirmAssign" type="success">确定分配</el-button>
                <el-button type="primary" @click="clearAssign">清除已选</el-button>
                <el-button type="info" @click="closeAssign">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        userData:[],
        middleUserData:[{
          id:1,
          name:'王明威'
        },{
          id:2,
          name:'刘藩'
        },{
          id:3,
          name:'孟龙'
        },{
          id:4,
          name:'张俊杰'
        },{
          id:5,
          name:'李芷珊'
        },{
          id:6,
          name:'李金龙'
        },{
          id:7,
          name:'杜萌萌'
        },{
          id:8,
          name:'杨超'
        },{
          id:9,
          name:'熊林'
        },{
          id:10,
          name:'王然'
        },{
          id:11,
          name:'王铭鑫'
        },{
          id:12,
          name:'胡琼'
        },{
          id:13,
          name:'郭向阳'
        },{
          id:14,
          name:'郭平平'
        }],
        chooseUserData:[],
        assignDetailData: [{
          label: '中国民用航空局空中交通管理局',
          children: [{
            label: '空域管理中心',
            children: [{
              label: '空域管理室'
            },
            {
              label: '程序设计室'
            }]
          }]
        }],
        middleChooseBranch:'',
        assignRoleDetailPop:false,
        editPop:false,
        assignRolePop:false,
        filterText: '',
        chooseBranchPop:false,
        currentPage: 1,
        roleArr: [{
          id: 1,
          label: '功能菜单',
          children: [{
            id: 2,
            label: '我的面板',
            children:[{
              id: 21,
              label: '个人任务',
              children: [{
                id: 211,
                label: '新建',
              },{
                id: 212,
                label: '完工',
              },{
                id: 213,
                label: '送达',
              },{
                id: 214,
                label: '批回',
              },{
                id: 215,
                label: '下发',
              },{
                id: 216,
                label: '生效',
              }]
            },{
              id: 22,
              label: '个人信息',
              children: [{
                id: 221,
                label: '个人信息',
              },{
                id: 222,
                label: '修改密码',
              }]
            }]
          },{
            id: 3,
            label: '综合管理',
            children: [{
              id: 31,
              label: '工程信息',
              children: [{
                id: 311,
                label: '工程管理',
                children: [{
                  id: 3111,
                  label: '查看',
                },{
                  id: 3112,
                  label: '修改',
                }]
              },{
                id: 312,
                label: '状态图列表',
              },{
                id: 313,
                label: '图表显示',
              }]
            }]
          },{
            id: 4,
            label: '系统设置',
            children: [{
              id: 41,
              label: '机构用户',
              children: [{
                id: 411,
                label: '用户管理',
                children: [{
                  id: 4111,
                  label: '查看',
                },{
                  id: 4112,
                  label: '修改',
                }]
              },{
                id: 412,
                label: '机构管理',
                children: [{
                  id: 4121,
                  label: '查看',
                },{
                  id: 4122,
                  label: '修改',
                }]
              }]
            },{
              id: 42,
              label: '系统设置',
              children: [{
                id: 421,
                label: '菜单管理'
              },{
                id: 422,
                label: '角色管理',
              },{
                id: 423,
                label: '字典管理',
              }]
            },{
              id: 43,
              label: '日志查询',
            }]
          }]
        }],
        defaultPropsRole: {
          children: 'children',
          label: 'label'
        },
        form:{
          branch:'',
          name:'',
          desc:'',
          isUse:'',
          isData:'',
          range:''
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        options: [{
          value: '1',
          label: '所有数据'
        }, {
          value: '2',
          label: '所在机构及以下数据'
        }, {
          value: '3',
          label: '所在机构数据'
        }, {
          value: '4',
          label: '所在部门及以下数据'
        }, {
          value: '5',
          label: '所在部门数据'
        }, {
          value: '6',
          label: '仅本人数据'
        }, {
          value: '7',
          label: '按明细设置'
        }],
        data: [{
          label: '中国民用航空局空中交通管理局',
          children: [{
            label: '空域管理中心',
            children: [{
              label: '空域管理室'
            },
              {
                label: '程序设计室'
              }]
          }]
        }],
        tableData: [{
          id:1,
          name: '查询日志',
          range: '操作用户',
          org: '中国民航空局'
        }, {
          id:55,
          name: '查询日志',
          range: '操作用户',
          org: '中国民航空局'
        }, {
          id:66,
          name: '查询日志',
          range: '操作用户',
          org: '中国民航空局'
        }],
        roleData: [{
          id:1,
          branch:'空域管理室',
          loginName:'登录名',
          tel:'010-234556',
          phone:'134565357980',
          name: '查询日志',
          org: '中国民航空局'
        }, {
          id:55,
          branch:'空域管理室',
          loginName:'登录名',
          tel:'010-234556',
          phone:'134565357980',
          name: '查询日志',
          org: '中国民航空局'
        }, {
          id:66,
          branch:'空域管理室',
          loginName:'登录名',
          tel:'010-234556',
          phone:'134565357980',
          name: '查询日志',
          org: '中国民航空局'
        }]
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data.label);
        // 加数据  是需要请求数据
        this.userData = this.middleUserData;
      },
      // 移除按钮
      handleRoleDel(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.roleData = this.roleData.filter(ele => {
            return ele.id !== row.id
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 分配按钮点击
      assignClick() {
        this.assignRoleDetailPop = true;
      },
      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
        console.log(this.$refs.tree.getCheckedNodes())
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handleSizeChange(val) {
        console.log(val);
      },
      handleCurrentChange(val) {
        console.log(val);
      },
      // 分配
      handleAllot(row) {
        this.assignRolePop = true
      },
      // 修改
      handleEdit(row) {
        this.editPop = true;
        for( let i in this.form){
          this.form[i] = ''
        }
        for( let i in row){
          this.form[i] = row[i]
        }
      },
      // 选择机构部门
      isBranchPop() {
        this.chooseBranchPop = true
      },
      // 保存个人修改表单
      onSubmitEdit() {
        console.log(this.form)
        this.editPop = false;
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
      },
      // 选择部门
      chooseNodeClick(data) {
        this.middleChooseBranch = data.label
      },
      confirmChooseBranch () {
        this.form.branch = this.middleChooseBranch;
        this.chooseBranchPop = false
      },
      // 选择部门
      chooseNodeClick(data) {
        this.middleChooseBranch = data.label
      },
      // 点击待选人员
      chooseRoleClick(item) {
        let isHas = false
        this.chooseUserData.forEach(ele => {
          if (ele.id == item.id) {
            isHas = true
          }
        })
        if (!isHas) { this.chooseUserData.push({id:item.id,name:item.name}) }
      },
      delRoleClick(idx) {
        this.chooseUserData.splice(idx,1)
      },
      confirmAssign() {
        console.log(this.chooseUserData);
        this.assignRoleDetailPop = false;
      },
      clearAssign() {
        // 如果本来就已经分配人员  可以再创建一个数组来操作
        this.chooseUserData = [];
      },
      closeAssign() {
        this.assignRoleDetailPop = false;
      }
    },
    watch: {
      filterText(val) {
        this.$refs.filterTree.filter(val);
      }
    },
  };
</script>
<style lang="less">
    .role-page {
        .content {
            .result-table {
                .has-gutter {
                    tr {
                        th {
                            background: #026ab3;
                            color:#fff;
                            font-weight: 700;
                            text-align: center;
                        }
                    }
                }
            }
        }
        .el-dialog__wrapper.tip-dialog {
            .el-dialog {
                margin: 15vh auto !important;
                width:1000px;
            }
        }
        .el-dialog__wrapper.tip-dialog {
            &.assign-dialog {
                .el-dialog {
                    margin: 0 auto !important;
                    height:100%;
                    width:100%;
                    .el-dialog__body {
                        padding: 0 20px;
                        color: #606266;
                        font-size: 14px;
                    }
                    .pop-content {
                        .search-nav {
                            padding:30px 15px;
                            box-sizing: border-box;
                            background: #efefef;
                            .name {
                                font-weight: normal;
                                font-size: 15px;
                                .bold {
                                    font-weight: bold;
                                }
                            }
                        }
                        .result-table {
                            margin-top: 30px;
                        }
                    }
                }
             }
            &.assign-detail-dialog {
                .el-dialog {
                    margin: 10vh auto !important;
                    width:1000px;
                    position: relative;
                    height:700px;
                    .pop-content {
                        overflow-y: auto;
                        height:100%;
                        width:100%;
                        .role-cell {
                            float: left;
                            height: auto;
                            margin: 0 1%;
                            -webkit-box-sizing: border-box;
                            box-sizing: border-box;
                            border-right: 1px solid #ccc;
                            width:31%;
                            &:last-child {
                                 border-right: none;
                             }
                        }
                        .role-cell-content {
                            margin-top: 20px;
                            .user {
                                height:30px;
                                cursor: pointer;
                                line-height: 30px;
                            }
                        }
                    }
                    .el-dialog__body {
                        height:500px;
                        overflow: hidden;

                    }
                    .el-dialog__footer {
                        position: absolute;
                        bottom:0;
                        left:0;
                        width: 100%;
                    }
                }
             }
        }
        .el-dialog__wrapper.choose-branch-pop {
            .el-dialog {
                margin: 15vh auto !important;
                width:400px;
                .pop-content {
                    height:600px;
                }
            }
        }
        .el-dialog__wrapper.choose-pop {
            .el-dialog {
                margin: 15vh auto !important;
                width:400px;
                .pop-content {
                    height:600px;
                }
            }
        }
        .el-radio {
            margin:0 30px 20px 0;
        }
        .el-radio+.el-radio {
            margin:0 30px 20px 0;
        }
    }
</style>

<style lang="less" scoped>
    .role-page {
        min-height: 800px;
        background: #fff;
        width:100%;
    .cell {
        min-height:800px;
        height:auto;
        width:98%;
        margin:0 1%;
        border-radius: 3px;
        overflow: hidden;
        box-sizing: border-box;
        border:1px solid #ccc;
    .content {
        padding:20px 10px;
        box-sizing: border-box;
    .result-table {
        margin-top: 20px;
    }
    .pagination-box {
        margin-top: 40px;
        text-align: center;
    }
    }
    .title {
        height:40px;
        background: #409EFF;
        text-align: center;
        line-height: 40px;
        color:#fff;
    }
    }
    }
</style>
