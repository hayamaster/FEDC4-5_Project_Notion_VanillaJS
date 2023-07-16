import Editor from "./editor/Editor.js";
import { setItem, removeItem } from "../utils/storage.js";
import { getApi, postApi, putApi } from "../utils/api.js";
import { makeNewPost } from "../utils/btnCustomEvent.js";

export default function PostEditPage({ $target, initialState, username }) {
  this.state = initialState;

  let postLocalSaveKey = `temp-document-${this.state.id}`;

  let timer = null;

  const editor = new Editor({
    $target,
    initialState: this.state.post,
    onEditing: (post) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setItem(postLocalSaveKey, {
          ...post,
          saveDate: new Date(),
        });
        const { id, title, content } = post;
        await putApi(username, id, title, content);
        removeItem(postLocalSaveKey);
      }, 200);
    },
  });

  this.setState = (nextState) => {
    const { id } = nextState;
    if (nextState.id === "root") {
      rootState();
    } else if (this.state.id !== id) {
      documentChangeState(id);
    } else {
      this.state = {
        ...this.state,
        ...nextState,
      };
    }
  };

  const rootState = () => {
    this.state = { id: "root" };
    editor.setState({
      title: `${username}의 노션 클로닝 페이지`,
      content: `${username}의 노션에 오신 것을 환영합니다!\n\n당연히 노션 작성법은 알고 계시겠죠??\n\nmarkdown 규정에 맞춰 작성해주세요!`,
    });
  };

  const documentChangeState = async (id) => {
    postLocalSaveKey = `temp-post-${id}`;
    const post = await getApi(username, id);
    this.state = {
      id: id,
      post,
    };
    editor.setState(this.state.post);
  };

  const newPost = async (id) => {
    const createdPost = await postApi(username, id);
    history.replaceState(null, null, `/documents/${createdPost.id}`); // url을 new에서 생성된 id로 바꾸기
    removeItem(postLocalSaveKey); // local storage에서 temp-document-new 지우기
    this.setState({
      id: createdPost.id,
    });
  };
  makeNewPost((id) => newPost(id));
}
