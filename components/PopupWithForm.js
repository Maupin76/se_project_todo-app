import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector); // Call the base class constructor
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
  }

  // Private method to gather all form input values into an object
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  // Override: add submit handler + call parent method
  setEventListeners() {
    super.setEventListeners(); // Add escape key and overlay click behavior

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues); // Call external handler with form data
    });
  }

  // Optional: reset form on close
  close() {
    super.close();
    this._form.reset();
  }
}

export default PopupWithForm;
