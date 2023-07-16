import { pushRouter } from "./router.js";
import { pushNewPost } from "./btnCustomEvent.js";
import { deleteApi } from "./api.js";

export const addChildDocument = (target) => {
  const { id } = target.dataset;
  pushNewPost(id);
};

export const deleteDocument = async (target, state, username) => {
  const { id } = target.dataset;
  const childDocument = findChildDocument(state, id);

  if (childDocument.length > 0 && confirm("하위 문서도 모두 지우시겠습니까?")) {
    deleteAllChildDocument(childDocument, username);
  }
  await deleteApi(username, id).then((res) => {
    res.parent === null || res.parent === {}
      ? pushRouter("/")
      : pushRouter(`/documents/${res.parent.id}`);
  });
};

export const addNewDocument = () => {
  pushNewPost();
  pushRouter(`/`);
};

// 삭제할 document의 child document를 검색해서 가져오기
const findChildDocument = (state, id) => {
  let childDocument = [];
  const getChildDocuments = (items, id) => {
    items.forEach((item) => {
      if (item.id === parseInt(id)) {
        childDocument = item.documents;
        return item.documents;
      } else if (item.documents.length > 0) {
        getChildDocuments(item.documents, id);
      }
    });
    return;
  };
  getChildDocuments(state, id);

  return childDocument;
};

const deleteAllChildDocument = (documents, username) => {
  documents.forEach(async (childDocument) => {
    if (childDocument.documents.length > 0) {
      deleteAllChildDocument(childDocument.documents);
    }
    await deleteApi(username, childDocument.id);
  });
};
