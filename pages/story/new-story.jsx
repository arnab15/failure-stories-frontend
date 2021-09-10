import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import withProtectedRoute from "../../hoc/withProtectedRoute";

const Editor = dynamic(
  // eslint-disable-next-line import/no-extraneous-dependencies
  () => import("../../Components/RichTextEditor/Editor"),
  { ssr: false }
);
function NewStory(props) {
  const [data, setdata] = useState();
  const getData = (val) => {
    setdata(JSON.stringify(val, null, 4));
  };
  const handelEditorStateChange = (state) => {
    console.log(state);
  };
  return (
    <Box h="full">
      <Box rounded="md" h="full" mx="auto" shadow="sm" p="2">
        <Editor getData={getData} />
      </Box>
    </Box>
  );
}

export default dynamic(() => Promise.resolve(withProtectedRoute(NewStory)), {
  ssr: false,
});
