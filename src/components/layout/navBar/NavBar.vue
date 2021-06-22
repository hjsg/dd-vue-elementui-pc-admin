<template>
    <el-menu class="navbar" mode="horizontal">
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
        <div class="set-out">
            <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                    <span class="MR-20">管理员</span>
                    <i class="el-icon-arrow-down"></i>
                </div>
                <el-dropdown-menu class="user-dropdown" slot="dropdown" style="padding: 0 0 3px;">
                    <el-dropdown-item divided @click.native="$router.go(0)"><i class="el-icon-refresh"></i>刷新
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="$router.back()" divided><i class="el-icon-arrow-left"></i>返回
                    </el-dropdown-item>
                    <el-dropdown-item divided @click.native="logout"><i class="el-icon-switch-button"></i>退出
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </el-menu>
</template>

<script>
    import {mapGetters, mapState} from 'vuex'
    import Hamburger from '@/components/layout/hamburger/Hamburger'

    export default {
        components: {
            Hamburger,
        },
        computed: {
            ...mapGetters(['sidebar', 'user']),
        },
        data() {
            return {
                status: '0',
                roleName:'',
                nickname:'',
                platform:''
            }
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('toggleSideBar')
            },
            logout() {
            }
        },
        mounted() {
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .MR-20 {
        margin-right: 20px;
    }

    /deep/ .el-dropdown-menu__item--divided {
        margin-top: 0;

        &:first-child {
            border-top: none;
        }
    }

    /deep/ .el-dropdown-menu__item--divided:before {
        height: auto;
    }

    /deep/ .el-dropdown-menu {
        padding: 5px 0;
    }

    .navbar {
        height: 50px;
        border-radius: 0px !important;

        .hamburger-container {
            line-height: 58px;
            height: 50px;
            float: left;
            padding: 0 10px;
        }

        .screenfull {
            position: absolute;
            right: 90px;
            top: 16px;
            color: red;
        }

        .set-out {
            float: right;
            margin-top: 13.5px;

            .toHome {
                display: inline-block;
                position: relative;
                margin-right: 20px;
                font-size: 20px;
                color: #4f5f6f;
                cursor: pointer;
            }

            .message {
                display: inline-block;
                position: relative;
                margin-right: 20px;
                font-size: 20px;
                color: #4f5f6f;
                padding-right: 20px;
                border-right: 2px solid #d0d8e0;
                cursor: pointer;

                .message-num {
                    width: 18px;
                    height: 18px;
                    line-height: 18px;
                    text-align: center;
                    border-radius: 50%;
                    background-color: #fc4c7a;
                    color: #fff;
                    top: -10px;
                    right: 10px;
                    position: absolute;
                    font-size: 10px;
                }
            }

            .avatar-container {
                margin-right: 35px;

                .avatar-wrapper {
                    cursor: pointer;
                    position: relative;
                    font-size: 14px;
                    color: #4f5f6f;

                    .user-avatar {
                        width: 40px;
                        height: 40px;
                        border-radius: 10px;
                    }

                    .el-icon-caret-bottom {
                        position: absolute;
                        right: -20px;
                        top: 2px;
                        font-size: 14px;
                    }
                }
            }
        }
    }
</style>

