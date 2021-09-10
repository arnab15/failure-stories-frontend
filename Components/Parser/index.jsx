/* eslint-disable react/prop-types */
import React from "react";
import DelimiterParser from "./DelimiterParser";
import EmbedParser from "./EmbedParser";
import HeaderParser from "./HeaderParser";
import ImageParser from "./ImageParser";
import LinkParser from "./LinkParser";
import ListParser from "./ListParser";
import ParagraphParser from "./ParagraphParser";
import QuoteParser from "./QuoteParser";

function Parser({ block }) {
  switch (block.type) {
    case "header":
      return <HeaderParser block={block} />;
    case "image":
      return <ImageParser block={block} />;
    case "InlineImage":
      return <ImageParser block={block} />;
    case "paragraph":
      return <ParagraphParser block={block} />;
    case "linkTool":
      return <LinkParser block={block} />;
    case "list":
      return <ListParser block={block} />;
    case "quote":
      return <QuoteParser block={block} />;
    case "embed":
      return <EmbedParser block={block} />;
    case "delimiter":
      return <DelimiterParser block={block} />;
    default:
      break;
  }
  return null;
}

export default Parser;
