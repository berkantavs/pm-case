<template>
    <div class="login-container">
        <b-row class="full-width-row">
            <b-col md="8" class="wallpaper-col">
                <b-img src="@/assets/wallpaper.svg" fluid alt="Duvar Kağıdı"></b-img>
            </b-col>
            <b-col md="4" class="login-card-col">
                <b-card title="Giriş Yap" class="login-card default-card">
                    <b-form @submit.prevent="login">
                        <b-form-group label="Kullanıcı Adı">
                            <b-form-input v-model="username" required></b-form-input>
                        </b-form-group>
                        <b-form-group label="Şifre">
                            <b-form-input type="password" v-model="password" required></b-form-input>
                        </b-form-group>
                        <b-button type="submit" variant="primary">Giriş Yap</b-button>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>


    </div>
</template>
<script>
export default {
    async asyncData({ store, redirect }) {
        const isLoggedIn = store.state.loggedIn
        if (!isLoggedIn) {
            redirect('/login')
        } else {
            redirect('/')
        }
    },
    layout: "login",
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {

        async login() {
            let payload = {
                kullanici_ad: this.username,
                sifre: this.password
            }
            try {
                const response = await this.$http.post('/login', payload);
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        this.$bvToast.toast('Login successfuly!', {
                            title: 'Success',
                            variant: 'success',
                            solid: true
                        })
                        this.$cookies.set('user-info', JSON.stringify(data))
                        this.$store.dispatch('login', data);
                        this.$router.push('/')
                    }
                }
            } catch (error) {
                this.$bvToast.toast('Error!', {
                    title: error,
                    variant: 'danger',
                    solid: true
                })
                console.log(error);
            }

        },

    },
};
</script>
  