<template>
    <!--全局化最大屏幕-->
    <el-col
            type="flex"
            justify="center"
            style="min-width: 1200px;"

    >
        <el-row class="header"
                type="flex"
                justify="space-between"
                style="margin-bottom: 20px"

        >
            <el-col :span="8"
                    type="flex"
                    justify="center"
                    align="middle"
                    style="font-weight: bold;"
            >
                宁波工程学院教师服务助手
            </el-col>
            <el-col class="userinfo" type="flex">
                <el-dropdown trigger="hover">
                        <span class="el-dropdown-link userinfo-inner">
                            玻璃球工作室出品
                            <!--{{$store.state.myself.chineseName}}-->
                            <img src="../assets/logo.png" alt=""/>
                        </span>
                    <el-dropdown-menu slot="dropdown">
                        <a href="http://boliq.cn" target="_blank">
                            <el-dropdown-item>
                                关于玻璃球工作室
                            </el-dropdown-item>
                        </a>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
        <el-row type="flex" justify="start">
            <el-col type="flex"
                    style="max-width:260px;padding-left:30px;height:100%"
            >
                <el-menu :router="true"
                         class="el-menu-vertical-demo"
                         :default-active="activeNav"
                >
                    <el-menu-item index="teacher_calendar">
                        <template slot="title">
                            <i class="el-icon-date"></i>
                            <span>教学日历</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="school_calendar">
                        <template slot="title">
                            <i class="el-icon-date"></i>
                            <span>校历</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="setting">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>个人设置</span>
                        </template>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col type="flex" style="max-width: 960px">
                <transition name="fade"
                            mode="out-in">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </el-col>
        </el-row>
    </el-col>
</template>
<script lang="ts">

    import Vue from 'vue';
    import Component from "vue-class-component"


    @Component
    export default class MyHome extends Vue {
        private activeNav: string = "record";
        private name: string = "home";

        //methods
        private logout(): void {
            this.$store.commit("loginStatus");
            this.$router.push("/login");
        }

        // created
        created(): void {
            this.activeNav = this.$route.path.substr(1)
        }
    }
</script>
<style lang="scss">
    @import '../assets/scss/vars.scss';

    body {
        background: aliceblue;
        margin: 0;
    }

    .header {
        height: 60px;
        line-height: 60px;
        background: $color-primary;
        color: #fff;

        .userinfo {
            text-align: right;
            padding-right: 35px;
            float: right;

            .userinfo-inner {
                cursor: pointer;
                color: #fff;

                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 20px;
                    margin: 10px 0 10px 10px;
                    float: right;
                }
            }
        }

        .logo {
            //width:230px;
            height: 60px;
            font-size: 22px;
            padding-left: 20px;
            padding-right: 20px;
            border-color: rgba(238, 241, 146, 0.3);
            border-right-width: 1px;
            border-right-style: solid;

            img {
                width: 40px;
                float: left;
                margin: 10px 10px 10px 18px;
            }

            .txt {
                color: #fff;
            }
        }

        .logo-width {
            width: 230px;
        }

        .logo-collapse-width {
            width: 60px
        }

        .tools {
            padding: 0 23px;
            width: 14px;
            height: 60px;
            line-height: 60px;
            cursor: pointer;
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all .2s ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }
</style>
