class ExpandableList extends HTMLUListElement {
  constructor() {
    super();

    this.style.position = "relative";
    this.toggleButton = document.createElement("button");
    this.toggleButton.style.position = "absolute";
    this.toggleButton.style.border = "none";
    this.toggleButton.style.background = "none";
    this.toggleButton.style.padding = 0;
    this.toggleButton.style.top = 0;
    this.toggleButton.style.left = "5px";
    this.toggleButton.style.cursor = "pointer";
    this.toggleButton.innerText = ">";
    this.toggleButton.addEventListener("click", () => {
      this.dataset.expanded = !this.isExpanded;
    });
    this.appendChild(this.toggleButton);
  }

  get isExpanded() {
    return this.dataset.expanded !== "false" && this.dataset.expanded != null;
  }

  static get observedAttributes() {
    return ["data-expanded"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.updateStyles();
  }

  connectedCallback() {
    this.updateStyles();
  }

  updateStyles() {
    const transform = this.isExpanded ? "rotate(90deg)" : "";
    this.toggleButton.style.transform = transform;
    [...this.children].forEach((child) => {
      if (child != this.toggleButton) {
        child.style.display = this.isExpanded ? "" : "none";
      }
    });
  }
}
customElements.define("expandable-list", ExpandableList, { extends: "ul" });
