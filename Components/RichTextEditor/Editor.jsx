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
    if (isNew) {
      console.log("editor data changed");
      try {
        const savedData = await instanceRef.current.save();

        const { data } = await storiesService.createStory({
          story: savedData,
        });
        console.log("daata", data);
        if (data._id) {
          router.push(`/story/${data._id}/edit`);
        }
        getData(data);
        console.log(data);
        return;
      } catch (error) {
        console.log("Error occured");
      }
    } else {
      console.log("old data");
      try {
        const savedData = await instanceRef.current.save();
        getData(savedData);
        return;
      } catch (error) {
        console.log("Error old data saving");
      }
    }
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
