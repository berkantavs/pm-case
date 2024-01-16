<template>
    <div class="edit-user pt-4">

        <h4 class="mb-4">User Details</h4>
        <b-row>
            <b-col md="4">
                <b-card class="default-card mb-3">
                    <b-card-body class="text-center">
                        <b-avatar size="100px" variant="info" class="mb-2">
                        </b-avatar>
                        <h3 class="m-0 text-bold">{{ user.kullanici_ad }}</h3>
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
                                        <b-form-input id="inputContact1" v-model="user.kullanici_ad"></b-form-input>
                                    </b-form-group>
                                    <b-form-group label="Email" label-for="inputContact2">
                                        <b-form-input id="inputContact2" v-model="user.email" type="email"></b-form-input>
                                    </b-form-group>
                                    <b-form-group label="District" label-for="inputContact3">
                                        <b-form-input id="inputContact3" v-model="user.district"></b-form-input>
                                    </b-form-group>
                                    <b-form-group label="Neigbourhood" label-for="inputContact4">
                                        <b-form-input id="inputContact4" v-model="user.neighbourhood"></b-form-input>
                                    </b-form-group>
                                    <b-form-group label="Unit" label-for="unit">
                                        <b-form-select id="unit" v-model="selectedUnit" :options="units"></b-form-select>
                                    </b-form-group>
                                    <b-form-group label="User Type" label-for="userType">
                                        <b-form-select id="userType" v-model="selectedUserType"
                                            :options="userTypeOptions"></b-form-select>
                                    </b-form-group>
                                    <b-button @click="updateUser" v-if="isAdmin" variant="info">Update</b-button>
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
        this.getUserDetail(this.$route.params.id)
        this.getUnits()

    },
    data() {
        return {
            user: {
                kullanici_ad: null,
                email: null,
                district: null,
                neighbourhood: null,
                user_type: null,
                bio: "Hello, I'm a just a dummy contact in your contact list and this is my presentation text. Have fun!",
            },
            units: [],
            selectedUnit: null,
            selectedUserType: null,
            userTypeOptions: [
                { value: "admin", text: 'Admin' },
                { value: "employee", text: 'Employee' },
                { value: "user", text: 'User' },
            ],
        };
    },
    methods: {
        async getUserDetail(id) {
            try {
                const response = await this.$http.get('/users/' + id);
                console.log(response.ok);
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        this.user.kullanici_ad = data.kullanici_ad;
                        this.user.email = data.email;
                        this.user.district = data.ilce;
                        this.user.neighbourhood = data.mahalle;
                        this.selectedUserType = data.user_type;
                        this.selectedUnit = data.birim
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateUser() {
            try {
                let payload = {
                    kullanici_ad: this.user.kullanici_ad,
                    email: this.user.email,
                    ilce: this.user.district,
                    mahalle: this.user.neighbourhood,
                    user_type: this.selectedUserType,
                    birim: this.selectedUnit
                }
                if (payload) {
                    const response = await this.$http.put('/update_user/' + this.$route.params.id + '/', payload);
                    if (response.ok) {
                        this.$bvToast.toast('User Updated!', {
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
    },
};
</script>
  
<style scoped>
/* İstediğiniz özel stillemeleri buraya ekleyebilirsiniz */
</style>