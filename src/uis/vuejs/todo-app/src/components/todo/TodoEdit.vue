<template>
  <div class="card">
    <div class="card-header">{{ pageTitle }}</div>
    <div class="card-body">
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            id="title"
            name="title"
            class="form-control"
            v-model="todo.title"
            :class="{ 'is-invalid': isSubmitted && $v.todo.title.$invalid }"
            @input="$v.todo.title.$touch()"
          />
          {{ $v.title }}
          <span class="invalid-feedback">
            <span v-if="!$v.todo.title.required">Enter a title</span>
            <span v-if="!$v.todo.title.minLength"
              >The title must be longer than 3 characters.</span
            >
          </span>
        </div>
        <div class="form-group form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="is-completed"
            v-model="todo.isCompleted"
          />
          <label class="form-check-label" for="is-completed"
            >Is Completed</label
          >
        </div>
        <button type="submit" class="btn btn-primary mr-3">Save</button>
        <router-link :to="'/todo'" class="btn btn-secondary" tag="button"
          >Back</router-link
        >
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import todoService from "./todoService";
export default {
  name: "TodoEdit",
  data: () => {
    return {
      pageTitle: "",
      id: "",
      todo: { title: "", isCompleted: false },
      postError: false,
      postErrorMessage: "",
      isSubmitted: false,
    };
  },
  validations: {
    todo: {
      title: {
        required,
        minLength: minLength(3),
      },
      isCompleted: {
        required,
      },
    },
  },
  methods: {
    onSubmit() {
      this.isSubmitted = true;
      if (this.$v.todo.$invalid) {
        return;
      }
      if (this.id === "0") {
        const promise = todoService.post("", this.todo);
        promise.then((rs) => {
          const id = rs.data.data._id;
          console.log(id);
          this.$router.push("/todo/" + id);
        });
      } else {
        const promise = todoService.patch(this.id, this.todo);
        promise.then(() => {
          this.$router.push("/todo/");
        });
      }
    },
  },
  created() {
    const id = this.$route.params.id;
    this.id = id;
    if (id) {
      todoService.get(id).then((rs) => {
        this.todo = rs.data.todo;
        this.pageTitle = id ? "Edit Todo: " + this.todo.title : "Create Todo";
        console.log(this.todo);
      });
    }
  },
};
</script>
