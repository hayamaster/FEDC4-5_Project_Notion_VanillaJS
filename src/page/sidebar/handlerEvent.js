import { pushRouter } from "../../utils/router.js";
import {
  addChildDocument,
  deleteDocument,
  addNewDocument,
} from "../../utils/btnEvent.js";

export const onClickDocument = (target) => {
  const $li = target.closest("li");
  if ($li) {
    const { id } = $li.dataset;
    pushRouter(`/documents/${id}`);
  }
};

export const onClickHeader = (target) => {
  const $header = target.closest(".header");
  if ($header) {
    pushRouter("/");
  }
};

export const onClickBtn = async (target, state, username) => {
  if (target.tagName === "BUTTON") {
    switch (target.className) {
      case "addChild":
        addChildDocument(target);
        break;
      case "delete":
        deleteDocument(target, state, username);
        break;
      case "addDocumentBtn":
        addNewDocument();
        break;
      default:
    }
  }
};
