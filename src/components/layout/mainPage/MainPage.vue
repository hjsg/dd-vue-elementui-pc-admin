<template>
    <section class="app-main" :style="styleObject">
        <transition name="fade" mode="out-in">
            <keep-alive include="index_home">
                <router-view></router-view>
            </keep-alive>
        </transition>
    </section>
</template>

<script>
    let allHeight = document.documentElement.clientHeight
    export default {
        name: 'AppMain',
        data () {
            return {
                styleObject: {}
            }
        },
        computed: {
            cachedViews () {
                return this.$store.state.cachedViews
            }
        },
        mounted () {
            this.styleObject = {
                'min-height': allHeight - 206 + 'px'
            }
        }
    }
</script>
