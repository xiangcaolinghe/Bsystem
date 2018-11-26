<template>
    <div class="log-page">
        <div class="right cell">
            <div class="title">
                日志列表
            </div>
            <div class="content">
                <div class="search-nav">
                    <el-row :gutter="20" style="margin-bottom:20px;">
                        <el-col :span="8" class="flex">
                            <span class="name">操作菜单：</span>
                            <el-input class="input"
                                      placeholder="请输入菜单"
                                      v-model="search.menu">
                            </el-input>
                        </el-col>
                        <el-col :span="8" class="flex">
                            <span class="name">用户ID：</span>
                            <el-input class="input"
                                      placeholder="请输入ID"
                                      v-model="search.id">
                            </el-input>
                        </el-col>
                        <el-col :span="8" class="flex">
                            <span class="name">URL：</span>
                            <el-input class="input"
                                      placeholder="请输入URL"
                                      v-model="search.url">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="16" class="flex">
                            <span class="name">日期范围：</span>
                            <el-date-picker
                                    v-model="date"
                                    type="daterange"
                                    align="right"
                                    unlink-panels
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="pickerOptions">
                            </el-date-picker>
                            <span style="margin-left: 30px;line-height: 38px;">
                                <el-radio v-model="search.normal" label="1">只查询异常信息</el-radio>
                            </span>
                        </el-col>
                        <el-col :span="3" class="flex">
                            <el-button type="primary" icon="el-icon-search" @click="searchClick">查询</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div class="result-table">
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="menu"
                                label="操作菜单"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                prop="user"
                                label="操作用户"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="org"
                                label="所在机构">
                        </el-table-column>
                        <el-table-column
                                prop="branch"
                                label="所在部门">
                        </el-table-column>
                        <el-table-column
                                prop="url"
                                label="URL"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="type"
                                label="提交方式"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="ip"
                                label="操作者IP"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="time"
                                label="操作时间"
                                width="120">
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
    </div>
</template>

<script>
  export default {
    data() {
      return {
        pickerOptions: {},
        date:'',
        currentPage: 1,
        search:{
          menu:'',
          id:'',
          url:'',
          date:'',
          normal:''
        },
        tableData: [{
          id:1,
          menu: '查询日志',
          user: '操作用户',
          org: '中国民航空局',
          branch: '程序设计室',
          url: 'www.baidu.com',
          type: 'GET',
          ip: '221.34.566',
          time: '2018-11-23 15:41:13'
        }, {
          id:55,
          menu: '查询日志',
          user: '操作用户',
          org: '中国民航空局',
          branch: '程序设计室',
          url: 'www.baidu.com',
          type: 'GET',
          ip: '221.34.566',
          time: '2018-11-23 15:41:13'
        }, {
          id:66,
          menu: '查询日志',
          user: '操作用户',
          org: '中国民航空局',
          branch: '程序设计室',
          url: 'www.baidu.com',
          type: 'GET',
          ip: '221.34.566',
          time: '2018-11-23 15:41:13'
        }]
      };
    },
    methods: {
      // 搜索
      searchClick() {
        console.log(this.search)
      },
      handleSizeChange(val) {
        console.log(val);
      },
      handleCurrentChange(val) {
        console.log(val);
      },
    },
  };
</script>
<style lang="less">
    .log-page {
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
    .log-page {
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
