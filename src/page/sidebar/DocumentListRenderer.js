export const DocumentListRenderer = (item, depth = 1) => {
  const $div = document.createElement("div");
  $div.className = "dropdown";
  $div.id = `div-${item.id}`;
  $div.setAttribute("data-depth", depth);
  $div.setAttribute("data-id", item.id);
  $div.innerHTML = listRendererTemplate(item, depth);

  // 현재 document가 자식 document를 가지고 있으면
  addChildrenDocuments($div, item, depth);

  return $div;
};

export const addChildrenDocuments = ($target, item, depth) => {
  const childItems = item.documents;
  if (childItems.length > 0) {
    const $ul = document.createElement("ul");
    $ul.id = `ul-${item.id}`;
    $ul.style.display = "none";
    $ul.setAttribute("data-isToggled", false);
    $ul.setAttribute("data-depth", depth);
    childItems.forEach((child) =>
      $ul.appendChild(DocumentListRenderer(child, parseInt(depth) + 1))
    );
    $target.appendChild($ul);
  }
};

export const addChildrenUl = ($target, item, depth) => {
  const childItems = item.documents;
  if (childItems.length === 1) {
    const $ul = document.createElement("ul");
    $ul.id = `ul-${item.id}`;
    $ul.style.display = "none";
    $ul.setAttribute("data-isToggled", false);
    $ul.setAttribute("data-depth", depth);
    $ul.setAttribute("data-id", item.id);
    $target.appendChild($ul);
  }
};

const listRendererTemplate = (item, depth) => {
  const { id, title } = item;
  return `
    <li data-id="${id}" style="padding-left: ${depth}px;">
        <button id="toggleBtn-${id}" data-id="${id}" data-isToggled="false" class="toggleBtn">▶︎</button>
        <span class="documentTitle">${title}</span>
        <button data-id="${id}" class="addChild">+</button>
        <button data-id="${id}" class="delete">-</button>
    </li>
  `;
};
