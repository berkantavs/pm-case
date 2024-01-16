<template>
    <div class="edit-unit pt-4">

        <h4 class="mb-4">Unit Details</h4>
        <b-row>
            <b-col md="4">
                <b-card class="default-card mb-3">
                    <b-card-body class="text-center">
                        <b-avatar size="100px" variant="info" class="mb-2">
                        </b-avatar>
                        <h3 class="m-0 text-bold">{{ unit.birim_ad }}</h3>

                    </b-card-body>
                </b-card>
            </b-col>

            <b-col md="8">
                <b-card class="default-card">
                    <b-card-body>
                        <b-row>
                            <b-col lg="2"></b-col>
                            <b-col lg="8">
                                <b-form>
                                    <b-form-group label="Name" label-for="inputContact1">
                                        <b-form-input id="inputContact1" v-model="unit.birim_ad"></b-form-input>
                                    </b-form-group>
                                    <b-form-group label="Email" label-for="inputContact2">
                                        <b-form-input id="inputContact2" v-model="unit.email" type="email"></b-form-input>
                                    </b-form-group>
                                    <b-form-group label="Main Unit" label-for="unit">
                                        <b-form-select id="unit" v-model="unit.main_unit_id"
                                            :options="units"></b-form-select>
                                    </b-form-group>
                                    <b-button @click="updateUnit" v-if="isAdmin" variant="info">Update</b-button>
                                </b-form>
                            </b-col>
                        </b-row>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>
  
<script>
import { mapGetters } from 'vuex';
export default {
    async asyncData({ store, redirect }) {
        const isLoggedIn = store.state.loggedIn
        if (!isLoggedIn) {
            redirect('/login')
        }
    },
    computed: {
        ...mapGetters(["isAdmin"])
    },
    layout: "default",
    async created() {
        this.getUnitDetail(this.$route.params.id)
        this.getUnits()

    },
    data() {
        return {
            units: [],
            unit: {
                birim_ad: null,
                main_unit_id: null,
                email: 'mail@example.com',
                avatar: 'https://bootdey.com/img/Content/avatar/avatar1.png',
                bio: "Hello, I'm a just a dummy contact in your contact list and this is my presentation text. Have fun!",
            },
        };
    },
    methods: {
        async getUnits() {
            try {
                const response = await this.$http.get('/units');
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.length > 0) {
                        console.log(data[0]);
                        this.units = data.map(item => ({
                            value: item.id,
                            text: item.birim_ad,
                        }));
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getUnitDetail(id) {
            try {
                const response = await this.$http.get('/units/' + id);
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        this.unit.birim_ad = data.birim_ad;
                        this.unit.main_unit_id = data.ust_birim;
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateUnit() {
            try {
                let payload = {
                    ust_birim: this.unit.main_unit_id,
                    birim_ad: this.unit.birim_ad
                }
                if (payload) {
                    const response = await this.$http.put('/update_unit/' + this.$route.params.id + '/', payload);
                    if (response.ok) {
                        this.$bvToast.toast('Unit Updated!', {
                            title: 'Success',
                            variant: 'success',
                            solid: true
                        })
                    }
                }
            } catch (error) {
                console.log(error);
                this.$bvToast.toast(error, {
                    title: 'Error',
                    variant: 'danger',
                    solid: true
                });
            }
        },
    },
};
</script>
  
<style scoped>
/* İstediğiniz özel stillemeleri buraya ekleyebilirsiniz */
</style>