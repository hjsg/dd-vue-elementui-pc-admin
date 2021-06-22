<template>
    <div class="menu-wrapper">
        <!--根据菜单状态判断是否显示-->
        <div class="flex-wrap" v-if="sidebar.opened">
            <div class="logo-view">
                <img src="https://cdn.toodudu.com/uploads/2021/04/16/group.png" alt=""/>
            </div>
            <div class="module-text">项目名称</div>
        </div>
        <template v-for="item in routes" v-if="!item.hidden && item.children">
            <router-link v-if="hasOneShowingChildren(item.children) &&!item.children[0].children &&!item.alwaysShow"
                         :to="item.path + '/' + item.children[0].path" :key="item.children[0].name">
                <el-menu-item :index="item.path + '/' + item.children[0].path"
                              :class="{ 'submenu-title-noDropdown': !isNest }">
                    <i v-if="item.children[0].meta && item.children[0].meta.icon" class="iconfont"
                       :class="'icon-'+item.children[0].meta.icon"></i>
                    <span v-if="item.children[0].meta && item.children[0].meta.title" slot="title">{{ item.children[0].meta.title }}</span>
                </el-menu-item>
            </router-link>

            <el-submenu class="el-menu-demo" v-else :index="item.name || item.path" :key="item.name">
                <template slot="title">
                    <i v-if="item.meta && item.meta.icon"  class="iconfont" :class="'icon-'+item.meta.icon"></i>
                    <span v-if="item.meta && item.meta.title" slot="title">{{item.meta.title}}</span>
                </template>
                <template v-for="(child, index) in item.children" v-if="!child.hidden && index < 4">
                    <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children && child.children.length > 0"
                                  :routes="[child]" :key="child.path"></sidebar-item>
                    <router-link v-else :to="item.path + '/' + child.path" :key="child.name"
                                 :target="child.name == 'Add' ? '_blank' : ''">
                        <el-menu-item :index="item.path + '/' + child.path">
                            <i v-if="child.meta && child.meta.icon" class="iconfont" :class="'icon-'+child.meta.icon"></i>
                            <span v-if="child.meta && child.meta.title" slot="title">{{child.meta.title}}</span>
                        </el-menu-item>
                    </router-link>
                </template>
                <template v-for="(child, index) in item.children" v-if="!child.hidden && index >= 4">
                    <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children && child.children.length > 0"
                                  :routes="[child]" :key="child.path"></sidebar-item>
                    <router-link v-else :to="item.path + '/' + child.path" :key="child.name"
                                 :target="child.name == 'Add' ? '_blank' : ''">
                        <el-menu-item :index="item.path + '/' + child.path">
                            <i v-if="child.meta && child.meta.icon" class="iconfont" :class="'icon-'+child.meta.icon"></i>
                            <span v-if="child.meta && child.meta.title" slot="title">{{child.meta.title}}</span>
                        </el-menu-item>
                    </router-link>
                </template>
            </el-submenu>
        </template>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'SidebarItem',
        data() {
            return {}
        },
        computed: {
            ...mapGetters(['sidebar','config']),
        },
        props: {
            routes: {
                type: Array,
            },
            isNest: {
                type: Boolean,
                default: false,
            },
        },
        methods: {
            hasOneShowingChildren(children) {
                const showingChildren = children.filter((item) => {
                    return !item.hidden
                })
                if (showingChildren.length === 1) {
                    return true
                }
                return false
            }
        },
        mounted() {
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    .menu-wrapper {
        .iconfont{
            color: #fff;
            margin-right: 15px;
        }
        .hideSidebar .flex-wrap {
            display: none;
        }

        .logo-view {
            padding-left: 20px;
            width: 60px;
        }

        .logo-view img {
            width: 100%;
        }

        .module-text {
            line-height: 70px;
            font-size: 16px;
            color: #fff;
            padding-left: 22px;
        }

        .menu-wrapper a.active {
            border-left: 2px solid #00aaff;
        }

        .el-submenu:hover .el-submenu__title,
        .el-menu-item.submenu-title-noDropdown:hover,
        .is-opened .el-submenu__title {
            /*border-left: 6px solid #00aaff;*/
            background: rgb(38, 45, 58) !important;
        }
        .el-menu-item:hover{
            background: rgb(38, 45, 58) !important;
        }
        .el-menu-item:hover span,
        .el-submenu__title:hover span {
            color: #ffffff;
        }

        .el-menu-item:hover svg,
        .el-submenu:hover .el-submenu__title svg,
        .el-submenu:hover .el-submenu__title i,
        .is-opened .el-submenu__title svg,
        .is-opened .el-submenu__title i {
            /*color: #00aaff;*/
        }

        /*.is-opened{
                .el-submenu__title{
                  svg{
                    color:#00aaff;
                  }
                  i{
                    color:#00aaff;
                  }
                }

              }*/
        .customize_menu .el-menu-item {
            // color: #aaacae;
            color: #fff;
        }
        .el-menu--inline .el-menu-item{
            padding-left: 58px!important;
        }
        .customize_menu .el-menu-item:hover {
            border-left: 6px solid #00aaff;
        }

        #app .sidebar-container .svg-icon {
            margin-right: 16px;
        }

        .svg-icon {
            width: 1em;
            height: 1em;
            vertical-align: -0.15em;
            fill: currentColor;
            overflow: hidden;
        }
    }

    .hideSidebar {
        .customize_menu .el-menu-item {
            padding-left: 10px !important;
        }
    }
</style>
