import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

// DOM Elements
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

// Utility Functions
const openModal = (modal) => modal.classList.add("popup_visible");
const closeModal = (modal) => modal.classList.remove("popup_visible");

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

const renderTodo = (item) => {
  const todoElement = generateTodo(item);
  todosList.append(todoElement);
};

// Event Listeners
addTodoButton.addEventListener("click", () => openModal(addTodoPopup));

addTodoCloseBtn.addEventListener("click", () => closeModal(addTodoPopup));

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Normalize date for timezone offset
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };

  renderTodo(values);
  closeModal(addTodoPopup);
});

// Initial Rendering
initialTodos.forEach(renderTodo);

// Form Validation
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
