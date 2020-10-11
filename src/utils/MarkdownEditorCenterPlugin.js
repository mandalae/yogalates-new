import * as React from "react";

const MarkdownEditorCenterPlugin = (props) => {
  const handleClick = () => {
    props.editor.insertText('->' + props.editor.getSelection().text + '<-', true);
  };

  return (
    <span
      className="button button-type-counter"
      title="Center"
      onClick={handleClick}
    >
      <i class="fa fa-align-center" />
    </span>
  );
};

MarkdownEditorCenterPlugin.align = "left";
MarkdownEditorCenterPlugin.pluginName = "center-plugin";

export default MarkdownEditorCenterPlugin;
