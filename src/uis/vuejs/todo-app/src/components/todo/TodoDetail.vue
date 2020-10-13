<template>
  <div class="card">
    <div class="card-header">{{ pageTitle }}</div>
    <div class="card-body">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Completed</th>
            <th scope="col">Manage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ todo._id }}</td>
            <td>
              {{ todo.title }}
            </td>
            <td>{{ todo.isCompleted ? "Yes" : "No" }}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer">
      <router-link
        :to="'/todo/' + todo._id + '/edit'"
        tag="button"
        class="btn btn-info mr-3"
        >Edit</router-link
      >
      <router-link to="/todo" tag="button" class="btn btn-secondary"
        >Back</router-link
      >
    </div>
  </div>
</template>

<script>
import todoService from "./todoService";
export default {
  name: "TodoDetail",
  data: () => {
    return {
      pageTitle: "Todo Detail",
      todo: {},
    };
  },
  methods: {
    async loadTodo(id) {
      const { data } = await todoService.get(id);
      this.todo = data.todo;
      console.log(this.todo);
    },
  },
  created() {
    const id = this.$route.params.id;
    this.loadTodo(id);
  },
};
</script>
