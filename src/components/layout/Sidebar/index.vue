<template>
    <scroll-bar>
        <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                :collapse="isCollapse"
                background-color="#303848"
                text-color="#fff"
                active-text-color="rgb(255, 208, 75)">
            <sidebar-item :routes="routes"></sidebar-item>
        </el-menu>
    </scroll-bar>
</template>

<script>
    import {mapState} from 'vuex'
    import SidebarItem from './SidebarItem'
    import ScrollBar from '../scrollBar/ScrollBar'

    export default {
        data() {
            return {}
        },
        computed: {
            ...mapState(['sidebar']),
            routes() {
                return this.$router.options.routes
            },
            isCollapse() {
                return !this.sidebar.opened
            },
        },
        components: {
            SidebarItem, ScrollBar
        }
    }
</script>

<style scoped>
</style>
