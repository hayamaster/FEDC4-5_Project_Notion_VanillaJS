import { pushRouter } from "../../utils/router.js";
import {
  addChildDocument,
  deleteDocument,
  addNewDocument,
  toggleChildDocument,
} from "../../utils/btnEvent.js";

export const onClickDocument = async (target) => {
  const $li = target.closest("li");
  if ($li) {
    const { id } = $li.dataset;
    await pushRouter(`/documents/${id}`);
  }
};

export const onClickHeader = async (target) => {
  const $header = target.closest(".header");
  if ($header) {
    await pushRouter("/");
  }
};

export const onClickBtn = (target, state, username) => {
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
      case "toggleBtn":
        toggleChildDocument(target);
        break;
      default:
    }
  }
};
