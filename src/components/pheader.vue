<template>
    <div class="up_header">
      <div class="up_nav">
        <div class="up_nav_content">
        <span>
          <img src="./../assets/logo.png" alt="">
          <span class="title">综合业务管理系统</span>
        </span>
          <span class="welcome">
            <i class="iconfont icon-yonghu"></i><strong>admin</strong>
            <i class="icon iconfont icon-shenqing"></i><strong @click="settingClick">设置</strong>
            <i class="iconfont icon-tuichu-copy"></i><strong>退出</strong>
        </span>
        </div>
      </div>
      <div class="p-content">
        <div class="p-left">
          <div class="p-left-height">
            <div class="nav_left active">
              <div class="slider">
                <ul>
                  <li>
                    <router-link
                            :to="{name:'platform.user'}"
                            class="left-cell"
                            :class="{active: $route.name == 'platform.user'}">
                      <i class="icon iconfont icon-yonghuguanli"></i>用户管理</router-link>
                  </li>
                  <li><router-link
                          :to="{name:'platform.org'}"
                          :class="{active: $route.name == 'platform.org'}"
                          class="left-cell"><i class="icon iconfont icon-guanli"></i>机构管理</router-link></li>
                  <li><router-link
                          :to="{name:'platform.menu'}"
                          :class="{active: $route.name == 'platform.menu'}"
                          class="left-cell"><i class="icon iconfont icon-liucheng"></i>菜单管理</router-link></li>
                  <li><router-link
                          :to="{name:'platform.role'}"
                          :class="{active: $route.name == 'platform.role'}"
                          class="left-cell"><i class="icon iconfont icon-huiyi"></i>角色管理</router-link></li>
                  <li><router-link
                          :to="{name:'platform.log'}"
                          :class="{active: $route.name == 'platform.log'}"
                          class="left-cell"><i class="icon iconfont icon-youjiantou"></i>日志查询</router-link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="view" :class="{views : $route.meta.hideLeft,manager_statistics:$route.name == 'platform.flowstatistics'}">
          <slot name="right-view"></slot>
        </div>
      </div>
      <!--设置-->
      <el-dialog title="设置" :visible.sync="settingPop" class="tip-dialog setting-pop" :close-on-click-modal="false">
        <div class="pop-content">
          <el-tabs v-model="activeName" type="card" @tab-click="settingUserClick">
            <el-tab-pane label="个人信息修改" name="first">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="工号:">
                  <el-input v-model="form.num"></el-input>
                </el-form-item>
                <el-form-item label="姓名:">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="登陆名:">
                  <el-input v-model="form.loginName"></el-input>
                </el-form-item>
                <el-form-item label="邮箱:">
                  <el-input v-model="form.mail"></el-input>
                </el-form-item>
                <el-form-item label="电话:">
                  <el-input v-model="form.tel"></el-input>
                </el-form-item>
                <el-form-item label="手机:">
                  <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <!--编辑-->
                <el-form-item>
                  <el-button type="primary" @click="onSubmitInfo">保存</el-button>
                  <el-button @click="settingPop = false">返回</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="密码修改" name="second" class="password-cell">
              <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="原密码:">
                  <el-input v-model="form.num"></el-input>
                </el-form-item>
                <el-form-item label="新密码:">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="新密码确认:">
                  <el-input v-model="form.loginName"></el-input>
                </el-form-item>
                <!--编辑-->
                <el-form-item>
                  <el-button type="primary" @click="onSubmitPassword">保存</el-button>
                  <el-button @click="settingPop = false">返回</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
      name: 'PHeader',
      data(){
        return{
          isActive:1,
          isLeftActive:1,
          isLeftNav: 1,
          settingPop:false,
          choosePop:false,
          activeName: 'first',
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
          filterText: '',
        }
      },
      methods:{
        switcher(number){
          this.isLeftActive=number;
        },
        settingClick() {
          this.settingPop = true
        },
        settingUserClick() {

        },
        onSubmitInfo() {
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          let that = this
          setTimeout(function () {
            that.settingPop = false;
          },400)
        },
        // 选择部门pop
        chooseBranchPop() {
          this.choosePop = true
        },
        onSubmitPassword() {
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          let that = this
          setTimeout(function () {
            that.settingPop = false;
          },400)
        }
      }
    }
</script>
<style lang="less">
  .up_header {
    .tip-dialog {
    &.setting-pop {
      .el-dialog {
        overflow: hidden;
        height:600px;
        .password-cell {
          margin-top: 40px;
        }
      }
     }
    }
  }
</style>
<style lang="less" scoped>
  .up_header{
    min-width: 1200px;
    height: 100%;
    margin: 0 auto;
    font-size: 18px;
    font-weight: bold;
  }
  .up_nav{
    background-color: #026ab3;
    width: 100%;
    margin: auto;
    .up_nav_content{
      width: 90%;
      height: 100px;
      overflow: hidden;
      line-height: 100px;
      margin: auto;
      img{
        float: left;
        margin-top: 0.8%;
      }
      .title {
        color:#fff;
        margin-left:8px;
        font-size: 22px;
      }
      .welcome{
        cursor: pointer;
        float: right;
        color: #d5e0ee;
        .iconfont {
          margin-right: 8px;
        }
        strong {
          margin-right: 15px;
          &:last-child {
             margin-right: 0;
           }
        }
      }
    }
  }
  .iconfont {
    font-size: 22px;
  }
  a,a:hover{
    text-decoration:none;
    color: #a3afbc;
  }
  a:hover{
    color: #ffffff;
    font-weight: bolder;
  }
  .p-content {
    width:100%;
    overflow:hidden;
    position: relative;
    zoom:1;
    min-height: 800px;
    .p-left {
      width: 16%;
      float: left;
      min-height: 800px;
      height: 100%;
      background-color: #003b64;
      .p-left-height{
        position: absolute;
        width: 16%;
        top: 0;
        left: 0;
        background-color: #003b64;
        height: 100%;
        .nav_left{
          width: 100%;
          height: auto;
          font-weight: bolder;
          font-size: 18px;
          display: none;
          &.active{
            display: block;
          }
          li{
            list-style: none;
            height: 85px;
            line-height: 85px;
            .left-cell,.left-cell:hover{
              display: block;
              text-decoration:none;
              color: #a3afbc;
            }
            .left-cell:hover{
              color: #003b64 !important;
              background-color: white !important;
            }
            a {
              padding-left:40px;
              box-sizing: border-box;
              .icon {
                margin-right: 15px;
              }
              &.active {
                 color: #003b64 !important;
                 background-color: white !important;
               }
            }
            a:hover{
              color: #003b64 !important;
              background-color: white !important;
            }
          }
        }
      }
    }
    .view {
      float: left;
      width: 84%;
      padding: 0 0 0 0;
      box-sizing: border-box;
      &.views {
        width:100%;
       }
      &.manager_statistics {
        padding: 0 5% 0 0;
      }
    }
  }
</style>
