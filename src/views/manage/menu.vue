<template>
    <div class="menu-page">
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
                菜单列表
            </div>
            <div class="content">
                <el-row :gutter="20">
                    <el-col :span="4" class="flex">
                        <el-button type="success" @click="addOrg">添加菜单</el-button>
                    </el-col>
                </el-row>
                <div class="result-table">
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="name"
                                label="名称"
                                width="200">
                        </el-table-column>
                        <el-table-column
                                prop="link"
                                label="链接"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="isShow"
                                label="可见"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="power"
                                label="权限标识">
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
        <el-dialog title="添加菜单" :visible.sync="addPop" class="tip-dialog" :close-on-click-modal="false">
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
                    <el-form-item label="名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="链接">
                        <el-input v-model="form.link"></el-input><span>点击菜单跳转的页面</span>
                    </el-form-item>
                    <el-form-item label="目标">
                        <el-input v-model="form.target"></el-input><span>链接地址打开的目标窗口，默认：mainFrame</span>
                    </el-form-item>
                    <el-form-item label="图标">
                        <i class="fa" :class="form.class">{{form.class}}</i> <el-button type="primary" @click="chooseIcon" size="small">选择</el-button>
                    </el-form-item>
                    <el-form-item label="排序">
                        <el-input v-model="form.sort"></el-input><span>排列顺序，升序。</span>
                    </el-form-item>
                    <el-form-item label="可见">
                        <el-radio-group v-model="form.isShow">
                            <el-radio label="显示"></el-radio>
                            <el-radio label="隐藏"></el-radio>
                        </el-radio-group>
                        <span>该菜单或操作是否显示到系统菜单中</span>
                    </el-form-item>
                    <el-form-item label="权限标识">
                        <el-input v-model="form.power"></el-input>
                        <span>控制器中定义的权限标识，如：@RequiresPermissions("权限标识")</span>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="form.desc"></el-input>
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
        <!--选择图表弹层-->
        <el-dialog title="选择菜单" :visible.sync="choosePop" class="choose-pop dialog-menu" :close-on-click-modal="false">
            <div class="pop-table">
                <div class="pop-content">
                    <div class="choose-cell" v-for="(item,index) in iconArr.data" :key="'title' + index">
                        <h1 class="title">{{item.title}}</h1>
                        <div class="detail-content">
                            <div class="content-cell" v-for="(i,idx) in item.data" :key="'menu' + idx" @click="chooseMenu(i)">
                                <i class="fa" :class="i.class"></i> {{i.name}}
                            </div>
                        </div>
                    </div>
                </div>
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
    </div>
</template>

<script>
  import IconArr from './../../assets/json/icons.json'
  export default {
    data() {
      return {
        iconArr:IconArr,
        middleChooseBranch:'',
        filterText: '',
        editPop: false,
        addPop: false,
        chooseBranchPop:false,
        currentPage: 1,
        isEdit:false,
        choosePop:false,
        form: {
          class:'',
          branch:'',
          name: '',
          link:'',
          target:'',
          icon:'',
          isShow:'',
          power:'',
          sort:'',
          desc: ''
        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        data: [
          {
          label: '功能菜单',
          children: [
            {
            label: '我的面板',
            children: [{
              label: '个人信息',
              children: [{
                label: '个人信息',
              },{
                label: '修改密码'
              }]
            }]
          },
           {
             label: '综合管理',
             children: [{
               label: '工程信息',
               children: [{
                 label: '工程管理',
                 children: [{
                   label: '修改密码'
                 }]
               }]
             }]
           }
          ]
          }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        tableData: [{
          id:1,
          name: '我的面板',
          link: '35577889999',
          isShow: true,
          power: 'bjdnirhlui'
        }, {
          id:55,
          name: '我的面板',
          link: '35577889999',
          isShow: true,
          power: 'bjdnirhlui'
        }, {
          id:66,
          name: '我的面板',
          link: '35577889999',
          isShow: true,
          power: 'bjdnirhlui'
        }]
      };
    },
    methods: {
      // 搜索
      searchClick() {
        console.log(this.search)
      },
      confirmChooseMenu () {
//        if (this.addPop) {
//          this.form.branch = this.middleChooseBranch;
//        } else {
//          this.search.branch = this.middleChooseBranch;
//        }
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
        console.log(data.label);
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
      // 添加机构按钮
      addOrg() {
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
      isBranchPop() {
        this.chooseBranchPop = true
      },
      // 选择图表
      chooseIcon() {
        this.choosePop = true
      },
      // 选择菜单
      chooseMenu(item) {
        this.form.class = item.class;
        this.choosePop = false;
      },
      confirmChooseBranch () {
        this.form.branch = this.middleChooseBranch;
        this.chooseBranchPop = false
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
    .menu-page {
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
    .el-form-item__content {
        .el-radio-group {
            .el-radio {
                margin:0 10px 0;
            }
        }
    }
    .dialog-menu .el-dialog__body {
        height:60vh;
        padding: 0 20px 30px;
        overflow: hidden;
        .choose-cell {
            clear:both;
            .title {
                font-size: 30px;
                line-height: 60px;
                color:#026ab3;
            }
            .detail-content {
                width:100%;
                .content-cell {
                    float: left;
                    width:25%;
                    cursor: pointer;
                    height:30px;
                    line-height: 30px;
                    text-align: left;
                    color:#333;
                    font-size: 16px;
                    &:hover {
                        color:#026ab3;
                     }
                }
            }
        }
    }
    .pop-table {
        height:100%;
        overflow: auto;
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
        width:1000px;
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
    .menu-page {
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
