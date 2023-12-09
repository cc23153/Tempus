<template>
    <div class="card" draggable="true" @dragstart="drag">
      <div class="header">
        <button class="delete-button" @click="deleteCard">Delete</button>
      </div>
      <h3 contenteditable="true" @dblclick="editTitle">{{ task }}</h3>
      <div class="description" contenteditable="true" @input="updateDescription">
        {{ description }}
      </div>
      <button @click="toggleCompleted">Mark as Completed</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      task: {
        type: String,
        default: 'Task 1',
      },
      description: {
        type: String,
        default: 'Card description',
      },
    },
    data() {
      return {
        editingTitle: false,
      };
    },
    methods: {
      drag(event) {
        // Implement your drag logic here
        console.log('Dragged:', this.task);
      },
      updateDescription(event) {
        // Implement your update description logic here
        console.log('Updated description:', event.target.innerText, 'for card:', this.task);
      },
      deleteCard() {
        // Implement your delete card logic here
        console.log('Deleted card:', this.task);
      },
      toggleCompleted() {
        // Implement your toggle completed logic here
        console.log('Toggled completion for card:', this.task);
      },
      editTitle() {
        // Enable title editing on double click
        this.editingTitle = true;
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    /* Adicione estilos conforme necessário */
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    margin: 10px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
    max-width: 350px;
    word-wrap: break-word;
    color:green;
  }
  
  .header {
    display: flex;
    justify-content: flex-end;
  }
  
  .delete-button {
    word-wrap: break-word;
    background-color: #ff6262;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
  }
  
  h3 {
    margin: 0;
    cursor: pointer;
  }
  
  .description {
    margin-top: 5px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    min-height: 40px;
  }
  </style>
  