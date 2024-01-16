<template>
    <div class="wrapper">
        <b-row class="full-width-row">
            <b-col lg="2" md="2"
                :class="isMobile ? isShowMenuItems == true ? 'menu-col opened' : 'menu-col closed' : 'menu-col'">
                <b-nav vertical class="menu">
                    <b-navbar-brand><b><nuxt-link class="text-dark" to="/">
                                Dashboard
                            </nuxt-link></b>

                        <b-button v-if="isMobile" @click="showMenuItems" variant="transparent"
                            :class="isShowMenuItems == true ? 'w-10 float-right' : 'w-10 float-right'">
                            <b-icon icon="list"></b-icon>
                        </b-button>
                    </b-navbar-brand>

                    <br>
                    <template v-if="!isMobile || isShowMenuItems">
                        <b-nav-item href="#">
                            <nuxt-link class="text-dark" to="/unit/list">
                                <b-icon font-scale="1" class="text-muted mt-2" icon="grid"></b-icon>
                                Unit management
                            </nuxt-link>
                        </b-nav-item>
                        <b-nav-item href="#">
                            <nuxt-link class="text-dark" to="/users/list">
                                <b-icon font-scale="1" class="text-muted mt-2" icon="file-person"></b-icon>
                                User management</nuxt-link>
                        </b-nav-item>
                        <b-nav-item href="#">
                            <nuxt-link class="text-dark" to="/employees/list">
                                <b-icon font-scale="1" class="text-muted mt-2" icon="people-fill"></b-icon>
                                Employee management
                            </nuxt-link>
                        </b-nav-item></template>
                </b-nav>
            </b-col>
            <b-col lg="10" md="10" class="content-col">
                <Header></Header>
                <Nuxt />
            </b-col>
        </b-row>
    </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {


    components: {
        Header,

    },

    data() {
        return {
            isMobile: false,
            isShowMenuItems: false,
        }
    },
    methods: {
        showMenuItems() {
            this.isShowMenuItems = !this.isShowMenuItems
        },
    },
    mounted() {
        if (process.client) {
            this.isMobile = this.$checkDevice();
        }
    }
}
</script>
