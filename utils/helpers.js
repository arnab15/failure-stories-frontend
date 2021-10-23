/* eslint-disable import/prefer-default-export */
import { decode } from "html-entities";

export const getFirstHeader = (blocks) => {
  const allHeaders = blocks.filter((block) => block.type === "header");
  if (allHeaders.length === 0) {
    const allParagraphs = blocks.filter((block) => block.type === "paragraph");
    return allParagraphs.length === 0 ? null : decode(allHeaders[0].data.text);
  }
  return decode(allHeaders[0].data.text);
};

export const getFirstImage = (blocks) => {
  const allImages = blocks.filter(
    (block) => block.type === "image" || block.type === "InlineImage"
  );
  if (allImages.length > 0) {
    if (allImages[0].type === "image") return allImages[0].data.file.url;
    if (allImages[0].type === "InlineImage") return allImages[0].data.url;
  }
  return null;
};

export const getFirstDescription = (blocks) => {
  const allParagraphs = blocks.filter((block) => block.type === "paragraph");
  console.log("allparagraph", allParagraphs);
  if (allParagraphs.length === 0) {
    return null;
  }
  return decode(allParagraphs[0].data.text);
};
