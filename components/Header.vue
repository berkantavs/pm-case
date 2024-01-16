<template>
    <div class="header p-3">
        <template>
            <b-row>
                <b-col lg="9" sm="12" md="9">
                    <div class="search-bar-area" v-if="!isMobile">
                        <b-input :class="isMobile ? 'search-input' : 'search-input w-25'" placeholder="search"></b-input>
                    </div>
                </b-col>
                <b-col lg="3" sm="12">
                    <b-row class="mt-2" no-gutters>
                        <b-col lg="2" class="text-right" v-if="!isMobile">
                            <b-icon icon="bell-fill" class="text-white" font-scale="1.3"></b-icon>
                        </b-col>
                        <b-col lg="2" class="text-right" v-if="!isMobile">
                            <b-icon icon="bounding-box" class="text-white" font-scale="1.3"></b-icon>
                        </b-col>
                        <b-col lg="8" class="text-center">
                            <b-avatar variant="primary" size="1.8rem" src="https://placekitten.com/300/300"></b-avatar>
                            <b-dropdown :text="user?.username">
                                <b-dropdown-item href="#">
                                    <b-icon icon="person" font-scale="1"></b-icon>
                                    My Profile</b-dropdown-item>
                                <b-dropdown-item @click="logout()">
                                    <b-icon icon="arrow-right-square" font-scale="1"></b-icon>
                                    Logout</b-dropdown-item>
                            </b-dropdown>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row></template>
    </div>
</template>
  
<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        // Vuex getter'ı component içinde kullanma
        ...mapGetters(['user'])
    },
    data() {
        return {
            isMobile: false,
        }
    },

    methods: {
        async logout() {
            console.log('logout');
            await this.$cookies.remove('user-info')
            await this.$store.dispatch('logout', null);
            window.location.reload()
        },
    },
    mounted() {
        if (process.client) {
            this.isMobile = this.$checkDevice();
        }
    }
}
</script>
  