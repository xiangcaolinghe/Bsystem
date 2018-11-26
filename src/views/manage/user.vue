<template>
    <div class="user-page">
        <div class="left cell">
            <div class="title">
                组织机构
            </div>
            <div class="content">
                <el-tree
                        :data="data"
                        :props="defaultProps"
                        @node-click="handleNodeClick"
                        :expand-on-click-node="false"
                        :default-expand-all="true"></el-tree>
            </div>
        </div>
        <div class="right cell">
            <div class="title">
                用户列表
            </div>
            <div class="content">
                <div class="search-nav">
                    <el-row :gutter="20" style="margin-bottom:20px;">
                        <el-col :span="8" class="flex">
                            <span class="name">归属机构：</span>
                            <el-select v-model="search.org" clearable placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select></el-col>
                        <el-col :span="8" class="flex">
                            <span class="name">登陆名：</span>
                            <el-input class="input"
                                      placeholder="请输入登录名"
                                      v-model="search.login">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8" class="flex">
                            <span class="name">归属部门：</span>
                            <div class="el-select" readonly="readonly">
                                <div class="el-input el-input--suffix">
                                    <input
                                            v-model="search.branch"
                                            type="text"
                                            readonly="readonly"
                                            autocomplete="off"
                                            placeholder="请选择"
                                            class="el-input__inner"
                                            @click="chooseBranch">
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="8" class="flex">
                            <span class="name">姓名：</span>
                            <el-input class="input"
                                      placeholder="请输入姓名"
                                      v-model="search.name">
                            </el-input>
                        </el-col>
                        <el-col :span="3" class="flex">
                            <el-button type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
                        </el-col>
                        <el-col :span="4" class="flex">
                            <el-button type="success" @click="addUser">添加</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div class="result-table">
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="org"
                                label="归属机构"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                prop="branch"
                                label="归属部门"
                                width="120">
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
                                prop="role"
                                label="角色">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="100">
                            <template slot-scope="scope">
                                <el-button @click="handleEdit(scope.row)" type="text" size="small">修改</el-button>
                                <el-button @click="handleDel(scope.row)" type="text" size="small">删除</el-button>
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
        <!--添加及编辑弹框-->
        <el-dialog title="添加用户" :visible.sync="addPop" class="tip-dialog" :close-on-click-modal="false">
            <div class="pop-content">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="归属机构">
                        <el-select v-model="form.org" placeholder="请选择归属机构">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="归属部门">
                        <div class="el-select" readonly="readonly">
                            <div class="el-input el-input--suffix">
                                <input
                                        v-model="form.branch"
                                        type="text"
                                        readonly="readonly"
                                        autocomplete="off"
                                        placeholder="请选择"
                                        class="el-input__inner"
                                        @click="chooseBranchPop">
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="工号">
                        <el-input v-model="form.num"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="登陆名">
                        <el-input v-model="form.loginName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input v-model="form.confirmPas"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="form.mail"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="form.tel"></el-input>
                    </el-form-item>
                    <el-form-item label="手机">
                        <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="是否允许登陆">
                        <el-switch v-model="form.isLogin"></el-switch>
                    </el-form-item>
                    <el-form-item label="用户角色">
                        <el-radio-group v-model="form.role">
                            <el-radio label="P字码管理员"></el-radio>
                            <el-radio label="临时航线管理员"></el-radio>
                            <el-radio label="五字码管理员"></el-radio>
                            <el-radio label="导航台管理员"></el-radio>
                            <el-radio label="扇区管理员"></el-radio>
                            <el-radio label="普通用户机场管理员"></el-radio>
                            <el-radio label="班机航线管理员"></el-radio>
                            <el-radio label="系统管理员"></el-radio>
                            <el-radio label="航路管理员"></el-radio>
                            <el-radio label="部门领导飞行程序管理员"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间" v-show="isEdit">
                        <div>2016年10月18日 星期二 17:38:51</div>
                    </el-form-item>
                    <el-form-item label="最后登陆" v-show="isEdit">
                        <div>IP: 0:0:0:0:0:0:0:1    时间：2016年11月14日 星期一 15:46:58</div>
                    </el-form-item>
                    <!--添加-->
                    <el-form-item v-show="!isEdit">
                        <el-button type="primary" @click="onSubmitAdd">保存</el-button>
                        <el-button>返回</el-button>
                    </el-form-item>
                    <!--编辑-->
                    <el-form-item v-show="isEdit">
                        <el-button type="primary" @click="onSubmitEdit">保存</el-button>
                        <el-button>返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <!--选择部门弹层-->
        <el-dialog title="选择部门" :visible.sync="choosePop" class="choose-pop" :close-on-click-modal="false">
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
    </div>
</template>

<script>
  export default {
    data() {
      return {
        middleChooseBranch:'',
        filterText: '',
        editPop: false,
        addPop: false,
        currentPage: 1,
        isEdit:false,
        choosePop:false,
        form: {
          branch:'',
          num: '',
          org: '',
          name:'',
          loginName:'',
          password:'',
          confirmPas:'',
          mail:'',
          tel:'',
          phone:'',
          isLogin:'',
          role: '',
          desc: ''
        },
        search:{
          org:'',
          name:'',
          login:'',
          branch:''
        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
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
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        tableData: [{
          id:1,
          org: '中国民航空局',
          branch: '程序设计室',
          loginName: 'nihaonji',
          name: '王小虎',
          tel: '35577889999',
          phone: '34678888',
          role: '[班机航线管理员, 普通用户]'
        }, {
          id:55,
          org: '中国民航空局',
          branch: '程序设计室',
          loginName: 'nihaonji',
          name: '王小虎',
          tel: '35577889999',
          phone: '34678888',
          role: '[班机航线管理员, 普通用户]'
        }, {
          id:66,
          org: '中国民航空局',
          branch: '程序设计室',
          loginName: 'nihaonji',
          name: '王小虎',
          tel: '35577889999',
          phone: '34678888',
          role: '[班机航线管理员, 普通用户]'
        }]
      };
    },
    methods: {
      // 搜索
      searchClick() {
        console.log(this.search)
      },
      confirmChooseBranch () {
        if (this.addPop) {
          this.form.branch = this.middleChooseBranch;
        } else {
          this.search.branch = this.middleChooseBranch;
        }
        this.choosePop = false
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      // 选择部门
      chooseNodeClick(data) {
        this.middleChooseBranch = data.label
      },
      handleNodeClick(data) {
        this.search.branch = data.label;
      },
      handleEdit(row) {
        for( let i in this.form){
          this.form[i] = ''
        }
        this.addPop = true;
        this.isEdit = true;
        for( let i in row){
          this.form[i] = row[i]
        }
      },
      handleDel(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData = this.tableData.filter(ele => {
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
      handleSizeChange(val) {
        console.log(val);
      },
      handleCurrentChange(val) {
        console.log(val);
      },
      // 保存添加确定按钮
      addSave () {
        this.addPop = false;
        this.isEdit = false;
      },
      // 添加用户按钮
      addUser() {
        for( let i in this.form){
          this.form[i] = ''
        }
        this.addPop = true;
      },
      // 保存添加表单
      onSubmitAdd() {
        console.log(this.form)
        this.addPop = false;
        this.$message({
          type: 'success',
          message: '添加成功!'
        });
      },
      // 保存个人修改表单
      onSubmitEdit() {
        console.log(this.form)
        this.addPop = false;
        this.isEdit = false;
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
      },
      // 选择部分按钮
      chooseBranch() {
        this.choosePop = true
      },
      chooseBranchPop() {
        this.choosePop = true
      },
    },
    watch: {
      filterText(val) {
        this.$refs.filterTree.filter(val);
      }
    },
  };
</script>
<style lang="less">
    .user-page {
       .content {
           .search-nav {
                .flex {
                    display: flex;
                }
                .name {
                    display: block;
                    line-height: 40px;
                    font-weight: 600;
                    width:120px;
                    font-size: 17px;
                }
           }
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
                width:50%;
                max-width: 1200px;
                min-width: 500px;
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
    .user-page {
        min-height: 800px;
        background: #fff;
        width:100%;
        .cell {
            float:left;
            min-height:800px;
            height:auto;
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
            &.left {
                width:24%;
                margin: 0 1%;
             }
            &.right {
                 width:73%;
                 margin: 0 1% 0 0;
             }
        }
    }
</style>
