/* eslint-disable no-self-assign */
import { testData } from "../Components/Parser/test";

const readingTime = require("reading-time");

// const stats = readingTime(text);
/* eslint-disable import/prefer-default-export */
export const readTime = (blocks) => {
  let totalText = "";
  testData.blocks.forEach((block) => {
    switch (block.type) {
      case "header":
        totalText += block.data.text;
        break;
      case "paragraph":
        totalText += block.data.text;
        break;
      case "linkTool":
        totalText += block.data.meta.title + block.data.meta.description;
        break;
      case "list":
        totalText += block.data.items.toString();
        break;
      case "quote":
        totalText += block.data.text + block.data.caption;
        break;
      default:
        totalText = totalText;
    }
  });
  //   console.log("total text", totalText);
  return readingTime(totalText);
};
