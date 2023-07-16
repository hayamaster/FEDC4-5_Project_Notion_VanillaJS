import { DocumentListRenderer } from "./DocumentListRenderer.js";
import { onClickBtn, onClickDocument, onClickHeader } from "./handlerEvent.js";

export default function DocumentList({ $target, initialState, username }) {
  const $header = document.createElement("header");
  const $documentList = document.createElement("div");
  const $addDocumentBtn = document.createElement("button");
  const $ul = document.createElement("ul");
  $header.innerHTML = `<h3><span style="font-size: 30px;">${username}</span>의 노션 페이지</h3>`;
  $header.className = "header";
  $addDocumentBtn.textContent = "+ Add a Page";
  $addDocumentBtn.className = "addDocumentBtn";

  $target.appendChild($header);
  $target.appendChild($documentList);
  $target.appendChild($addDocumentBtn);

  this.state = initialState;

  this.setState = (nextState) => {
    if (JSON.stringify(this.state) !== JSON.stringify(nextState)) {
      this.state = nextState;
      this.render();
    }
  };

  this.render = () => {
    $ul.innerHTML = "";
    this.state.map((item) => $ul.appendChild(DocumentListRenderer(item)));
    $documentList.appendChild($ul);
  };

  this.render();

  $target.addEventListener("click", (e) => {
    const { target } = e;

    // 이동할 document 클릭 시
    onClickDocument(target);
    // header 클릭 시, root로 이동
    onClickHeader(target);
    // 각 button에 해당하는 이벤트
    onClickBtn(target, this.state, username);
  });
}
