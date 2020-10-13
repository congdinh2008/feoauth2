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
          <tr v-for="todo in todoList" :key="todo._id">
            <td>{{ todo._id }}</td>
            <td>
              <router-link :to="'/todo/' + todo._id">{{
                todo.title
              }}</router-link>
            </td>
            <td>{{ todo.isCompleted ? "Yes" : "No" }}</td>
            <td>
              <router-link
                tag="button"
                class="btn btn-info mr-3"
                :to="'/todo/' + todo._id + '/edit'"
                >Edit</router-link
              >
              <button @click="deleteTodo(todo._id)" class="btn btn-danger">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer">
      <router-link to="/todo/0/edit" tag="button" class="btn btn-success"
        >Create Todo</router-link
      >
    </div>
  </div>
</template>

<script>
import todoService from "./todoService";
export default {
  name: "TodoList",
  data: () => {
    return {
      pageTitle: "Todo List",
      todoList: [],
    };
  },
  methods: {
    async loadTodoList() {
      const { data } = await todoService.get();
      this.todoList = data.todoList;
    },
    deleteTodo(id) {
      todoService.delete(id).then((res) => {
        this.loadTodoList();
        console.log(res);
      });
    },
  },
  created() {
    this.loadTodoList();
  },
};
</script>
