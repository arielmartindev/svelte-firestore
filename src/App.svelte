<script>
  import {
    addDoc,
    collection,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc,
  } from "firebase/firestore";
  import { onDestroy } from "svelte";
  import { db } from "./firebase";
  import Toastify from "toastify-js";

  let task = {
    title: "",
    description: "",
  };

  // VARIABLES
  let tasks = [];
  let editStatus = false;
  let currentId = "";

  // Submit Form
  const handleSubmit = async () => {
    try {
      if (!editStatus) {
        addTask();
      } else {
        updateTask();
      }
    } catch (error) {
      console.log(error);
    }

    //RESET FORM
    task = {
      title: "",
      description: "",
    };
    editStatus = false;
    currentId = "";
  };

  // ADD
  const addTask = async () => {
    try {
      await addDoc(collection(db, "tasks"), { ...task, createdAt: new Date() });
      console.log("Task saved");
      Toastify({
        text: "New Task Created",
      }).showToast();
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE
  const updateTask = async () => {
    try {
      await updateDoc(doc(db, "tasks", currentId), task);
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE
  const deleteTask = async (id) => {
    try {
      // TODO: confirm alert pending
      await deleteDoc(doc(db, "tasks", id));
      Toastify({
        style: {
          background: "#f44336",
        },
        text: "Task Deleted",
      }).showToast();
      console.log("task deleted");
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT
  const editTask = (currentTask) => {
    task.title = currentTask.title;
    task.description = currentTask.description;
    currentId = currentTask.id;
    editStatus = true;
  };

  // DESUBSCRIBE
  const unsub = onSnapshot(
    collection(db, "tasks"),
    (querySnapshot) => {
      tasks = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      console.log(tasks);
    },
    (err) => {
      console.log(err);
    }
  );

  onDestroy(unsub);
</script>

<main class="container p-4">
  <div class="row">
    <div class="col-md-6">
      <form on:submit|preventDefault={handleSubmit} class="card card-body p-5">
        <label for="title" class="h4">Title</label>
        <input
          bind:value={task.title}
          type="text"
          placeholder="Write a text"
          class="form-control"
        />

        <label for="description" class="h4">Description</label>
        <textarea
          class="form-control"
          bind:value={task.description}
          id="description"
          rows="3"
          placeholder="Write a description"
        />
        <button class="btn btn-primary mt-3">Save</button>
      </form>
    </div>

    <div class="col-md-6">
      {#each tasks as task}
        <div class="card card-body mt-2">
          <div class="d-flex justify-content-between">
            <h5>{task.title}</h5>
            <i
              class="material-icons"
              style="cursor: pointer"
              on:click={editTask(task)}>edit</i
            >
          </div>

          <p>{task.description}</p>
          <div>
            <button
              class="btn btn-danger"
              style="vertical-align: middle"
              on:click={deleteTask(task.id)}
            >
              <i class="material-icons" style="vertical-align: middle">
                delete_forever
              </i>
              Delete
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>
</main>

<style>
</style>
