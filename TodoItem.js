const template = document.createElement("template");
template.innerHTML = `
<style>
    label{
        display: block;
        font-size: 18px;
    }
    .description{
        font-size: 13px;
        color: #777;
    }
</style>
    <label>
        <input type="checkbox">
        <slot></slot>
    </label>
    <span class="description">
            <slot name="description"></slot>
    </span>
`;

class TodoItem extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));
    this.checkbox = shadow.querySelector("input");
  }
  static get observedAttributes() {
    return ["checked"];
  }

  connectedCallback() {
    console.log("connected");
  }

  disconnectedCallback() {
    console.log("disconnected");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue);

    if ((name = "checked")) this.updateChecked(newValue);
  }
  updateChecked(value) {
    this.checkbox.checked = value != null && value != "false";
  }
}
customElements.define("todo-item", TodoItem);
