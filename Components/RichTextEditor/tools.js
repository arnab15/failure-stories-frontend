import Embed from "@editorjs/embed";
// eslint-disable-next-line import/no-extraneous-dependencies
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import SimpleImage from "@editorjs/simple-image";
import Table from "@editorjs/table";
import Delimiter from "@editorjs/delimiter";
import InlineImage from "editorjs-inline-image";
import axios from "axios";
// eslint-disable-next-line import/prefer-default-export
export const EDITOR_JS_TOOLS = {
  embed: Embed,
  delimiter: Delimiter,
  paragraph: {
    class: Paragraph,
    inlineToolbar: ["link", "bold", "italic"],
    config: {
      placeholder: "Write somthing here",
    },
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  linkTool: {
    class: LinkTool,
    config: {
      endpoint: "http://localhost:5001/api/v1/extract-metadata/", // Your backend endpoint for url data fetching
    },
  },

  image: {
    class: Image,
    config: {
      endpoints: {
        byUrl: "http://localhost:5001/api/v1/images", // Your endpoint that provides uploading by Url
      },
      uploader: {
        async uploadByFile(file) {
          try {
            const fd = new FormData();
            fd.append("image", file);
            const { data } = await axios.post(
              "http://localhost:5001/api/v1/images",
              fd
            );
            return { ...data };
          } catch (error) {
            return {
              success: 0,
            };
          }
        },
      },
    },
  },
  header: {
    class: Header,
    inlineToolbar: ["link", "bold", "italic"],
    config: {
      placeholder: "Enter a Title",
      levels: [1, 2, 3],
      defaultLevel: 3,
    },
  },
  // table: {
  //   class: Table,
  //   inlineToolbar: true,
  // },

  quote: {
    class: Quote,
    inlineToolbar: true,
    config: {
      quotePlaceholder: "Enter a quote",
      captionPlaceholder: "Quote's author",
    },
  },
  marker: Marker,
  // checklist: { class: CheckList, inlineToolbar: true },
  simpleImage: SimpleImage,
  InlineImage: {
    class: InlineImage,
    inlineToolbar: true,
    config: {
      embed: {
        display: true,
      },
      unsplash: {
        appName: "failure",
        clientId: "V-NRuC5TniedXMX48Q_E416hHYeGag3iboxQ-HPvXh8",
      },
    },
  },
};
