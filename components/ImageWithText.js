import React from "react";
import RichTextHelper from "./RichTextHelper";

const ImageWithText = ({ data }) => {
    if (data === null) return null;
    console.log(data);
    return <p>INSIDE IMAGESSSS</p>;

  // let choices = {
  //   renderMark: {
  //     [MARKS.BOLD]: (text) => (
  //       <span className="bold-text">
  //         {text}
  //         <style jsx>{`
  //           .bold-text {
  //             font-weight: bold;
  //           }
  //         `}</style>
  //       </span>
  //     ),
  //     [MARKS.ITALIC]: (text) => (
  //       <span className="italic-text">
  //         {text}
  //         <style jsx>{`
  //           .italic-text {
  //             font-weight: italic;
  //           }
  //         `}</style>
  //       </span>
  //     ),
  //   },
  // };

  // return choices;
};

export default ImageWithText;
