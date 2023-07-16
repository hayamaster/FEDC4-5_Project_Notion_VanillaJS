import PostEditPage from "./page/PostEditPage.js";
import SidebarPage from "./page/SidebarPage.js";
import { initRouter } from "./utils/router.js";

export default function App({ $target, username }) {
  const $sidebarContainer = document.createElement("div");
  const $postContainer = document.createElement("div");
  $sidebarContainer.className = "sidebarContainer";
  $postContainer.className = "postContainer";

  $target.appendChild($sidebarContainer);
  $target.appendChild($postContainer);

  const sidebarPage = new SidebarPage({ $target: $sidebarContainer, username });

  const postEditPage = new PostEditPage({
    $target: $postContainer,
    initialState: {
      id: "root",
    },
    username,
  });

  this.route = () => {
    const { pathname } = window.location;
    sidebarPage.setState();

    if (pathname === "/") {
      postEditPage.setState({ id: "root" });
    } else {
      const [, , id] = pathname.split("/");
      postEditPage.setState({ id: id });
    }
  };

  this.route();

  initRouter(() => this.route());
}
