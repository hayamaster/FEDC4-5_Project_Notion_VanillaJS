import { pushRouter } from "../../utils/router.js";
import { listMaker } from "./DocumentListMaker.js";
import { deleteApi } from "../../utils/api.js";
import { pushNewPost } from "../../utils/btnCustomEvent.js";

export default function DocumentList({ $target, initialState, username }) {
  const $header = document.createElement("header");
  const $documentList = document.createElement("div");
  const $addDocumentBtn = document.createElement("button");
  $header.innerHTML = `<h3><span style="font-size: 30px;">${username}</span>의 노션 페이지</h3>`;
  $addDocumentBtn.textContent = "+ Add a Page";
  $header.className = "header";
  $addDocumentBtn.className = "addDocumentBtn";

  $target.appendChild($header);
  $target.appendChild($documentList);
  $target.appendChild($addDocumentBtn);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const $ul = document.createElement("ul");
    this.state.map((item) => $ul.appendChild(listMaker(item)));
    $documentList.appendChild($ul);
  };

  this.render();

  $target.addEventListener("click", async (e) => {
    const { target } = e;
    const $li = target.closest("li");
    if ($li) {
      const { id } = $li.dataset;
      $documentList.innerHTML = "";
      pushRouter(`/${id}`);
    }

    if (target.tagName === "H3") {
      $documentList.innerHTML = "";
      pushRouter("/");
    }

    if (target.tagName === "BUTTON") {
      const { id } = target.dataset;
      if (target.className === "add") {
        pushNewPost(id);
      }
      if (target.className === "delete") {
        let findChildDocument = [];
        // 삭제할 document의 child document를 검색해서 가져오기
        const getChildDocuments = (items, id) => {
          items.forEach((item) => {
            if (item.id === parseInt(id)) {
              findChildDocument = item.documents;
              return item.documents;
            } else if (item.documents.length > 0) {
              getChildDocuments(item.documents, id);
            }
          });
          return;
        };
        getChildDocuments(this.state, id);

        if (findChildDocument.length > 0) {
          if (confirm("하위 문서도 모두 지우시겠습니까?")) {
            const deleteAllChildDocument = (documents) => {
              documents.forEach(async (childDocument) => {
                if (childDocument.documents.length > 0) {
                  deleteAllChildDocument(childDocument.documents);
                }
                await deleteApi(username, childDocument.id);
              });
            };
            deleteAllChildDocument(findChildDocument);
            await deleteApi(username, id).then((res) => {
              $documentList.innerHTML = "";
              res.parent === null || res.parent === {}
                ? pushRouter("/")
                : pushRouter(`/${res.parent.id}`);
            });
          }
        } else {
          await deleteApi(username, id).then((res) => {
            $documentList.innerHTML = "";
            res.parent === null || res.parent === {}
              ? pushRouter("/")
              : pushRouter(`/${res.parent.id}`);
          });
        }
      }
      if (target.className === "addDocumentBtn") {
        $documentList.innerHTML = "";
        pushNewPost();
        pushRouter(`/`);
      }
    }
  });
}
