<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">{{ pageTitle }}</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link to="/" class="nav-link" router
            >Home <span class="sr-only">(current)</span></router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/todo">Todo</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
        <li v-if="!isAuthenticated" class="nav-item">
          <a class="nav-link" @click="login" href="javascript:void(0)">Login</a>
        </li>
        <li v-if="isAuthenticated" class="nav-item">
          <a class="nav-link" @click="logout" href="javascript:void(0)"
            >Logout</a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  data() {
    return { pageTitle: "Todo App" };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.authService.isAuthenticated();
    },
  },
  methods: {
    login() {
      this.$store.state.authService.login("");
    },
    logout() {
      this.$store.state.authService.logout();
    },
  },
};
</script>
