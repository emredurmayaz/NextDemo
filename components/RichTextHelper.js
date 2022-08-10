import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import React from "react";
import RichTextCompile from "./RichTextCompile";

const RichTextHelper = ({ resdynamic }) => {



  let options = {
    renderMark: {
      [MARKS.BOLD]: (text) => (
        <span className="bold-text">
          {text}{" "}
          <style jsx>{`
            .bold-text {
              font-weight: bold;
            }
          `}</style>
        </span>
      ),
      [MARKS.ITALIC]: (text) => (
        <span className="italic-text">
          {text}{" "}
          <style jsx>{`
            .italic-text {
              font-weight: italic;
            }
          `}</style>
        </span>
      ),
    },

    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const item_id = node.data.target.sys.id;
        // const itemList = resdynamic.fields.richTextBody.content;
        // const item = itemList.find((x) => x.nodeType === item_id);
        
        if (item_id)
          return <RichTextCompile key={item_id} component={item_id} />;
      },
    },
  };
  return documentToReactComponents(resdynamic.fields.richTextBody, options);
};

export default RichTextHelper;
