export default function Editor({
  $target,
  initialState = {
    id: "",
    title: "",
    content: "",
    createdAt: "",
    updatedAt: "",
    documents: [],
  },
  onEditing,
}) {
  const $editor = document.createElement("div");
  $editor.className = "editor";
  $target.appendChild($editor);

  let isInitialize = false;
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").value = this.state.content;
    this.render();
  };

  this.render = () => {
    if (!isInitialize) {
      $editor.innerHTML = `
            <input type="text" name="title" class="title" value="${this.state.title}"/>
            <textarea name="content" class="content">${this.state.content}</textarea>
        `;
      isInitialize = true;
    }

    const $sidebarTitle = document.getElementById(`span-${this.state.id}`);
    if ($sidebarTitle === null) return;

    $sidebarTitle.innerText = this.state.title ? this.state.title : "제목 없음";

    if (this.state.title === "") {
      const editorTitle = document.querySelector("input");
      this.state.title = "제목 없음";
      editorTitle.placeholder = "제목 없음";
    }
  };

  this.render();

  $editor.addEventListener("keyup", (e) => {
    const name = e.target.getAttribute("name");

    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: e.target.value,
      };

      this.setState(nextState);
      onEditing(this.state);
    }
  });
}
