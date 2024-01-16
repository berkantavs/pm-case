<template>
    <div class="new-user-form p-4">
        <b-container>
            <b-row>
                <b-col md="8">
                    <h4>New unit</h4>
                    <b-card class="default-card">
                        <b-form @submit.prevent="addUser">
                            <b-form-group label="Name" label-for="name">
                                <b-form-input id="name" v-model="unit.birim_ad" required></b-form-input>
                            </b-form-group>

                            <b-form-group label="Email" label-for="email">
                                <b-form-input id="email" v-model="unit.email" type="email" required></b-form-input>
                            </b-form-group>

                            <b-button type="submit" variant="primary">Add Unit</b-button>
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
    data() {
        return {
            unit: {
                birim_ad: '',
                email: ''
            },
        };
    },
    methods: {
        async addUser() {
            let payload = {
                birim_ad: this.unit.birim_ad,
                ust_birim: null,
                user_type: null
            }
            try {
                if (payload) {
                    const response = await this.$http.post('/add_unit', payload);
                    if (response.ok && response.status == 201) {
                        this.$bvToast.toast('Unit Created!', {
                            title: 'Success',
                            variant: 'success',
                            solid: true
                        })
                        setTimeout(() => {
                            this.$router.push('/unit/list')
                        }, 1000);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
};
</script>
  