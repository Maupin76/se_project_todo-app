import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

// DOM Elements
const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];
const todosList = document.querySelector(".todos__list");

// Utility Functions
const generateTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",
    (isCompleted) => {
      todoCounter.updateCompleted(isCompleted);
    },
    (wasCompleted) => {
      if (wasCompleted) {
        todoCounter.updateCompleted(false);
      }
      todoCounter.updateTotal(false);
    }
  );
  return todo.getView();
};

const handleAddTodoSubmit = (formData) => {
  const date = new Date(formData.date);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const newTodo = {
    id: uuidv4(),
    name: formData.name,
    date: date,
    completed: false,
  };

  const todoElement = generateTodo(newTodo);
  section.addItem(todoElement);

  //Update total todo count
  todoCounter.updateTotal(true);

  popupAddTodo.close();
};

const section = new Section({
  items: [...initialTodos],
  renderer: (item) => {
    const todoElement = generateTodo(item);
    todosList.append(todoElement);
  },
  containerSelector: ".todos__list",
});

const popupAddTodo = new PopupWithForm("#add-todo-popup", handleAddTodoSubmit);
popupAddTodo.setEventListeners();

section.renderItems();

// Event Listeners
addTodoButton.addEventListener("click", () => popupAddTodo.open());

// Form Validation
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

const todoCounter = new TodoCounter(initialTodos, ".counter__text");
