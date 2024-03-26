import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
type editorChangeStateFunc = (editorState: EditorState) => void;
interface props{
  mailEditorState: EditorState,
  onSetEditorState: editorChangeStateFunc;
}

function MailEditor(props: props) {
  return (
    <Editor
        editorState={props.mailEditorState}
        toolbarClassName="py-2 bg-light"
        wrapperClassName="card"
        editorClassName="card-body pt-0"
        editorStyle={{ minHeight: "22rem" }}
        onEditorStateChange={props.onSetEditorState}
    />
  )
}

export default MailEditor