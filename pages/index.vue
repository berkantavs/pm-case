<template>
  <div class="mt-3">
    <h5>
      Welcome, <span class="text-success">{{ user?.username }}</span>
    </h5>
    <div class="operations-area mt-3">
      <b-row>
        <b-col lg="4" class="mt-3">
          <nuxt-link to="/unit/list">
            <b-card class="default-card text-center">
              <b-icon font-scale="2.5" class="text-muted mt-2" icon="grid"></b-icon>
              <div class="mt-3">
                <h5 class="card-title">
                  Unit Management
                </h5>
              </div>
            </b-card>
          </nuxt-link>
        </b-col>
        <b-col lg="4" class="mt-3">
          <nuxt-link to="/users/list">
            <b-card class="default-card text-center">
              <b-icon font-scale="2.5" class="text-muted mt-2" icon="file-person"></b-icon>
              <div class="mt-3">
                <h5 class="card-title">
                  User Management
                </h5>
              </div>
            </b-card>
          </nuxt-link>
        </b-col>
        <b-col lg="4" class="mt-3">
          <nuxt-link to="/employees/list">
            <b-card class="default-card text-center">
              <b-icon font-scale="2.5" class="text-muted mt-2" icon="people-fill"></b-icon>
              <div class="mt-3">
                <h5 class="card-title">
                  Employee Management
                </h5>
              </div>
            </b-card>
          </nuxt-link>
        </b-col>
      </b-row>
    </div>
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
    ...mapGetters(['user', "isAdmin", "isEmployee", "isUser"])
  },
}
</script>
