<template>
    <div class="unit-list p-4">
        <div md="12" class="text-right mb-3" v-if="isAdmin">
            <nuxt-link class="btn btn-success" to="/users/new">
                New User
            </nuxt-link>
        </div>
        <b-table :items="items" :fields="fields" hover responsive="sm" borderless>

            <template v-slot:cell(actions)="data">
                <b-button variant="info" size="sm" @click="editItem(data)">
                    <b-icon icon="pencil-square"></b-icon>
                </b-button>
                <b-button variant="danger" size="sm" @click="deleteItem(data)">
                    <b-icon icon="trash"></b-icon>
                </b-button>
            </template>
        </b-table>
    </div>
</template>
  
<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(["isAdmin"])
    },
    async asyncData({ store, redirect }) {
        const isLoggedIn = store.state.loggedIn
        if (!isLoggedIn) {
            redirect('/login')
        }
    },
    layout: "default",
    async created() {
        this.getUsers()
    },
    data() {
        return {
            items: [],
            fields: [
                { key: 'id', label: 'ID' },
                { key: 'kullanici_ad', label: 'User Name' },
                { key: 'email', label: 'E-mail' },
                { key: 'birim', label: 'Birim ID' },
                { key: 'ilce', label: 'District' },
                { key: 'mahalle', label: 'Neighbourhood' },
                { key: 'ilce', label: 'District' },
                { key: 'actions', label: 'Operations', class: 'text-right' }
            ],
        };
    },
    methods: {
        async deleteItem(item) {
            if (this.isAdmin) {
                try {
                    const response = await this.$http.get('/delete_user/' + item.item.id);
                    if (response.ok) {
                        this.$bvToast.toast('User Deleted!', {
                            title: 'Success',
                            variant: 'success',
                            solid: true
                        })
                        this.getUsers()
                    }
                } catch (error) {
                    console.log(error);
                    this.$bvToast.toast(error, {
                        title: 'Error',
                        variant: 'danger',
                        solid: true
                    })
                }
            } else {
                this.$bvToast.toast('invalid authority', {
                    title: 'Error',
                    variant: 'warning',
                    solid: true
                })
            }
        },
        editItem(item) {
            this.$router.push('/users/detail/' + item.item.id)
        },
        async getUsers() {
            try {
                const response = await this.$http.get('/users');
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.length > 0) {
                        this.items = data.map(item => ({
                            id: item.id,
                            kullanici_ad: item.kullanici_ad,
                            email: item.email,
                            birim: item.birim,
                            ilce: item.ilce,
                            mahalle: item.mahalle
                        }));
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
}
</script>
  