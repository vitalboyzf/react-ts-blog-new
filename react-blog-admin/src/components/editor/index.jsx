import { memo, useEffect } from "react";
import E from "wangeditor";
import { baseUrl } from "../../api/baseUrl";
import propTypes from "prop-types";
let editor = null;

function Editor(props) {
  useEffect(() => {
    editor = new E("#editor");
    props.getEditor && props.getEditor(editor);
    editor.config.uploadImgShowBase64 = true;

    editor.config.colors = [
      "#000000",
      "#eeece0",
      "#1c487f",
      "#4d80bf",
      "#c24f4a",
      "#8baa4a",
      "#7b5ba1",
      "#46acc8",
      "#f9963b",
      "#f90",
      "#008c8c",
      "#888"
    ];
    editor.config.height = 380;
    editor.config.uploadImgServer = baseUrl + "/upload";
    editor.config.uploadFileName = "img";
    editor.config.uploadImgHooks = {
      customInsert(insertImg, result, editor) {
        insertImg(result.url);
      }
    };
    editor.config.onchange = (newHtml) => {
      props.onChangeContent(newHtml);
    };
    /** 一定要创建 */
    editor.create();
    editor.txt.html(props.contentState);

    return () => {
      editor.destroy();
    };
  }, [props]);

  return (
    <div id="editor" />
  );
}
Editor.propTypes = {
  onChangeContent: propTypes.func,
  getEditor: propTypes.func,
  contentState: propTypes.string
};
export default memo(Editor);