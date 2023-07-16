export const DocumentListRenderer = (item, depth = 1) => {
  const $div = document.createElement("div");
  $div.className = "dropdown";
  $div.innerHTML = listRendererTemplate(item, depth);

  // 현재 document가 자식 document를 가지고 있으면
  const childItems = item.documents;
  if (childItems.length > 0) {
    const $ul = document.createElement("ul");
    childItems.forEach((child) =>
      $ul.appendChild(DocumentListRenderer(child, depth + 1))
    );
    $div.appendChild($ul);
  }

  return $div;
};

const listRendererTemplate = (item, depth) => {
  const { id, title } = item;
  return `
    <li data-id="${id}" style="padding-left: ${depth}px;">
        <button class="toggleBtn">></button>
        <span class="documentTitle">${title}</span>
        <button data-id="${id}" class="addChild">+</button>
        <button data-id="${id}" class="delete">-</button>
    </li>
  `;
};
