<template>
    <div class="unit-list p-4">
        <div md="12" class="text-right mb-3" v-if="isAdmin">
            <nuxt-link class="btn btn-success" to="/employees/new">
                New Employee
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
    async created() {
        this.getEmployees()
    },
    mounted() {
        if (process.client) {
            this.isMobile = this.$checkDevice();
        }
    },
    layout: "default",

    data() {
        return {
            isMobile: false,
            items: [],
            fields: [
                { key: 'id', label: 'ID' },
                { key: 'personel_ad', label: 'Personal Ad Soyad' },
                { key: 'pozisyon', label: 'Pozisyon' },
                { key: 'birim', label: 'Birim ID' },
                { key: 'actions', label: 'Operations', class: 'text-right' }
            ],
        };
    },
    methods: {
        async deleteItem(item) {
            if (this.isAdmin) {
                try {
                    const response = await this.$http.get('/delete_employee/' + item.item.id);
                    if (response.ok) {
                        this.$bvToast.toast('Employee Deleted!', {
                            title: 'Success',
                            variant: 'success',
                            solid: true
                        })
                        this.getEmployees()
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
            this.$router.push('/employees/detail/' + item.item.id)
        },
        async getEmployees() {
            try {
                const response = await this.$http.get('/employees');
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.length > 0) {
                        this.items = data.map(item => ({
                            id: item.id,
                            personel_ad: item.personel_ad,
                            pozisyon: item.pozisyon,
                            birim: item.birim,
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
  