import React, { useState } from "react";
import RichTextEditor from "../components/RichTextEditor";

const Email = () => {
  const [emailContent, setEmailContent] = useState("");
const [showContent, setShowContent] = useState(false);
  const onEditorChange = (e) => {
    setEmailContent(e);
  };

  const onSubmit = () => {
    setShowContent(true);
  };

  return (
    <>
      <RichTextEditor height={350} onEditorChange={onEditorChange} />
      <button onClick={onSubmit}>Submit</button>
      <div>
         {showContent && emailContent}
      </div>
    </>
  );
};

export default Email;

