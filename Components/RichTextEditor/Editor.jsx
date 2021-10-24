/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useRef } from "react";
import EditorJs from "react-editor-js";
import { useRouter } from "next/dist/client/router";

import { EDITOR_JS_TOOLS } from "./tools";
import storiesService from "../../services/storiesService";
// eslint-disable-next-line react/prop-types

function Editor({ getData, isNew = true, initialData }) {
  const instanceRef = useRef(null);
  const router = useRouter();

  const handelEditorDataChange = async () => {
    const savedData = await instanceRef.current.save();
    getData(savedData);
  };
  console.log("initial dta", initialData);
  return (
    <>
      <EditorJs
        tools={EDITOR_JS_TOOLS}
        // eslint-disable-next-line no-return-assign
        instanceRef={(instance) => (instanceRef.current = instance)}
        onChange={handelEditorDataChange}
        data={initialData}
        minHeight={75}
      />
    </>
  );
}

export default Editor;
