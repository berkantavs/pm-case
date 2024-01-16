<template>
    <div class="edit-employee pt-4">

        <h4 class="mb-4">Employee Details</h4>
        <b-row>
            <b-col md="4">
                <b-card class="default-card mb-3">
                    <b-card-body class="text-center">
                        <b-avatar size="100px" variant="info" class="mb-2">
                        </b-avatar>
                        <h3 class="m-0 text-bold">{{ employee.personel_ad }}</h3>
                        <div class="mv-lg mt-2">
                            <p>{{ employee.pozisyon }}</p>
                        </div>
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
                                    <b-form-group label="Personel Ad" label-for="inputContact1">
                                        <b-form-input id="inputContact1" v-model="employee.personel_ad"></b-form-input>
                                    </b-form-group>
                                    <b-form-group label="Pozisyon" label-for="inputContact2">
                                        <b-form-input id="inputContact2" v-model="employee.pozisyon"
                                            type="email"></b-form-input>
                                    </b-form-group>
                                    <b-form-group label="Unit" label-for="unit">
                                        <b-form-select id="unit" v-model="selectedUnit" :options="units"></b-form-select>
                                    </b-form-group>
                                    <b-form-group label="User Type" label-for="userType">
                                        <b-form-select id="userType" v-model="selectedUserType"
                                            :options="userTypeOptions"></b-form-select>
                                    </b-form-group>
                                    <b-button @click="updateEmployee" variant="info" v-if="isAdmin">Update</b-button>
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
        this.getEmployeeDetail(this.$route.params.id)
        this.getUnits()
    },
    data() {
        return {
            units: [],
            selectedUnit: null,
            selectedUserType: null,
            userTypeOptions: [
                { value: "admin", text: 'Admin' },
                { value: "employee", text: 'Employee' },
                { value: "user", text: 'User' },
            ],
            employee: {
                personel_ad: null,
                pozisyon: null,
                birim: null,
                avatar: 'https://bootdey.com/img/Content/avatar/avatar1.png',
            },
        };
    },
    methods: {
        async getEmployeeDetail(id) {
            try {
                const response = await this.$http.get('/employees/' + id);
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        this.employee.personel_ad = data.personel_ad;
                        this.employee.pozisyon = data.pozisyon;
                        this.employee.birim = data.birim;
                        this.selectedUnit = data.birim;
                        this.selectedUserType = data.user_type
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateEmployee() {
            try {
                let payload = {
                    personel_ad: this.employee.personel_ad,
                    pozisyon: this.employee.pozisyon,
                    birim_id: this.employee.birim,
                    user_type: this.selectedUserType
                }
                if (payload) {
                    const response = await this.$http.put('/update_employee/' + this.$route.params.id + '/', payload);
                    if (response.ok) {
                        this.$bvToast.toast('Employee Updated!', {
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
  
<style scoped></style>