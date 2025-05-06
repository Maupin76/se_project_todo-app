class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
  }

  // Public method: open popup
  open() {
    this._popup.classList.add("popup_visible");
    document.addEventListener("keydown", this._handleEscapeClose);
  }

  // Public method: close popup
  close() {
    this._popup.classList.remove("popup_visible");
    document.removeEventListener("keydown", this._handleEscapeClose);
  }

  // Private method: ESC key closes popup
  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  // Public method: adds event listeners to close button and overlay
  setEventListeners() {
    const closeBtn = this._popup.querySelector(".popup__close");
    closeBtn.addEventListener("click", () => this.close());

    // Close on background overlay click
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}

export default Popup;
