<template>
    <div class="unit-list p-4">

        <div md="12" class="text-right mb-3" v-if="isAdmin">
            <nuxt-link class="btn btn-success" to="/unit/new">
                New Unit
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
        this.getUnits()
    },
    mounted() {
        if (process.client) {
            this.isMobile = this.$checkDevice();
        }
    },
    data() {
        return {
            isMobile: false,
            items: [],
            fields: [
                { key: 'id', label: 'ID' },
                { key: 'name', label: 'Unit Name' },
                { key: 'main_unit_id', label: 'Main Unit', class: 'text-center' },
                { key: 'actions', label: 'Operations', class: 'text-right' }
            ],
        };
    },
    methods: {
        async deleteItem(item) {
            if (this.isAdmin) {

                try {
                    const response = await this.$http.get('/delete_unit/' + item.item.id);
                    if (response.ok) {
                        this.$bvToast.toast('Unit Deleted!', {
                            title: 'Success',
                            variant: 'success',
                            solid: true
                        })
                        this.getUnits()
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
            this.$router.push('/unit/detail/' + item.item.id)
        },
        async getUnits() {
            try {
                const response = await this.$http.get('/units');
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.length > 0) {
                        this.items = data.map(item => ({
                            id: item.id,
                            name: item.birim_ad,
                            main_unit_id: item.ust_birim ? item.ust_birim : '-'
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
  