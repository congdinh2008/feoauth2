<template>
  <div>{{ user }}</div>
</template>

<script>
import authService from "../../auth/authService";
export default {
  name: "About",
  data() {
    return { user: {} };
  },
  created() {
    this.user = authService.getCurrentUser();
  },
};
</script>
