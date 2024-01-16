<template>
    <div class="new-user-form p-4">
        <b-container>
            <b-row>
                <b-col md="8">
                    <h4>New employee</h4>
                    <b-card class="default-card">
                        <b-form @submit.prevent="addUser">
                            <b-form-group label="Employee Name" label-for="name">
                                <b-form-input id="name" v-model="employee_name" required></b-form-input>
                            </b-form-group>

                            <b-form-group label="Position" label-for="position">
                                <b-form-input id="position" v-model="employee_position" required></b-form-input>
                            </b-form-group>
                            <b-form-group label="Unit" label-for="unit">
                                <b-form-select id="unit" v-model="selectedUnit" :options="units"></b-form-select>
                            </b-form-group>
                            <b-button type="submit" variant="primary">Add Employee</b-button>
                        </b-form>
                    </b-card>
                </b-col>
                <b-col md="4"></b-col>
            </b-row>
        </b-container>
    </div>
</template>
  

  
<script>
export default {
    async asyncData({ store, redirect }) {
        const isLoggedIn = store.state.loggedIn
        if (!isLoggedIn) {
            redirect('/login')
        }
    },
    layout: "default",
    async created() {
        this.getUnits()
    },
    data() {
        return {
            employee_name: "",
            employee_position: "",
            units: [],
            selectedUnit: null,


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
        async addUser() {
            let payload = {
                personel_ad: this.employee_name,
                pozisyon: this.employee_position,
                birim: this.selectedUnit,
                user_type: "employee"
            }
            try {
                if (payload) {
                    const response = await this.$http.post('/add_employee', payload);
                    if (response.ok && response.status == 201) {
                        this.$bvToast.toast('Employee Created!', {
                            title: 'Success',
                            variant: 'success',
                            solid: true
                        })
                        setTimeout(() => {
                            this.$router.push('/employees/list')
                        }, 1000);
                    }
                }
            } catch (error) {
                console.log(error);
                this.$bvToast.toast(error, {
                    title: 'Error',
                    variant: 'danger',
                    solid: true
                })

            }
        },
    },
};
</script>
  