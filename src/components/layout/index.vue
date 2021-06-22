<template>
    <div class="app-wrapper" :class="classObj">
        <side-bar class="sidebar-container"></side-bar>
        <div class="main-container">
            <navBar></navBar>
            <tag-view></tag-view>
            <main-page></main-page>
            <div class="footer-container">
                <p class="fs12 text-center MB20">
                    某某公司 版权所有 Copyright@2020-2021
                </p>
                <p class="fs12 text-center">
                    公司地址 联系电话：133-3333-xxxx
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import SideBar from '../layout/Sidebar'
    import NavBar from '../layout/navBar/NavBar'
    import TagView from '../layout/tagView/TagView'
    import MainPage from '../layout/mainPage/MainPage'
    import ResizeMixin from './mixin/ResizeHandler'
    import {mapGetters} from 'vuex'
    export default {
        data() {
            return {
            }
        },
        computed: {
            ...mapGetters(['config']),
            sidebar() {
                return this.$store.state.app.sidebar
            },
            device() {
                return this.$store.state.app.device
            },
            classObj() {
                return {
                    hideSidebar: !this.$store.state.sidebar.opened,
                    withoutAnimation: this.$store.state.sidebar.withoutAnimation,
                }
            },
        },
        components: {
            SideBar,
            NavBar,
            TagView,
            MainPage,
        },
        mixins: [ResizeMixin],
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/css/mixin.scss';

    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;
        min-width: 1366px;
    }

    .footer-container {
        margin-top: 50px;
        padding-bottom: 20px;
    }

</style>
