import React from "react";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Skeleton from "./Skeleton";
import Image from "next/image";
import ImageWithText from "./ImageWithText";
import { useState } from "react";

function RichTextCompile({ component, key }) {
  if (!component) return <Skeleton />;

  const [item, setItem] = useState({});

  async function getItems(component) {
    const client = createClient({
      space: "jt9u2l6h5x9d",
      accessToken: "kzABYi_zhHNEslFKdOkiBK1PVDKukZ0FssiP9TOeX0Q",
    });
    const res = await client.getEntry(component);

  
    if (res.sys.contentType.sys.id === "imageWithText") {
      setItem(res);
    } else {
      setItem({});
    }
  }

  return item && <ImageWithText data={item} />;
}
export default RichTextCompile;
