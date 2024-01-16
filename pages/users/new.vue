<template>
    <div class="new-user-form p-4">
        <b-container>
            <b-row>
                <b-col md="8">
                    <h4>New user</h4>
                    <b-card class="default-card">
                        <b-form @submit.prevent="addUser">
                            <b-form-group label="User Name" label-for="name">
                                <b-form-input id="name" v-model="name" required></b-form-input>
                            </b-form-group>

                            <b-form-group label="Email" label-for="email">
                                <b-form-input id="email" v-model="email" type="email" required></b-form-input>
                            </b-form-group>
                            <b-form-group label="Password" label-for="password">
                                <b-form-input id="password" v-model="password" type="password" required></b-form-input>
                            </b-form-group>
                            <b-form-group label="Unit" label-for="unit">
                                <b-form-select id="unit" v-model="selectedUnit" :options="units"></b-form-select>
                            </b-form-group>
                            <b-form-group label="District" label-for="district">
                                <b-form-input id="district" v-model="district" type="text" required></b-form-input>
                            </b-form-group>
                            <b-form-group label="Neighbourhood" label-for="neighbourhood">
                                <b-form-input id="neighbourhood" v-model="neighbourhood" type="text"
                                    required></b-form-input>
                            </b-form-group>
                            <b-form-group label="User Type" label-for="userType">
                                <b-form-select id="userType" v-model="selectedUserType"
                                    :options="userTypeOptions"></b-form-select>
                            </b-form-group>
                            <b-button type="submit" variant="primary">Add User</b-button>
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
            name: '',
            email: '',
            password: "",
            district: "",
            neighbourhood: "",
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
        async addUser() {
            let payload = {
                kullanici_ad: this.name,
                email: this.email,
                sifre: this.password,
                ilce: this.district,
                mahalle: this.neighbourhood,
                birim: this.selectedUnit,
                user_type: this.selectedUserType
            }
            try {
                if (payload) {
                    const response = await this.$http.post('/add_user', payload);
                    if (response.ok && response.status == 201) {
                        this.$bvToast.toast('User Created!', {
                            title: 'Success',
                            variant: 'success',
                            solid: true
                        })
                        setTimeout(() => {
                            this.$router.push('/users/list')
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
  