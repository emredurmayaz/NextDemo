import { createClient } from "contentful";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Skeleton from "../../../components/Skeleton";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";


function IdPostsPage({ component, key }) {
  
    const [item, setItem] = useState({});
  
    useEffect(() => {
      async () => {
        async function getItems(component) {
          const client = createClient({
            space: process.env.CONTENTFUL_SPACE_ID,
            accessToken: process.env.CONTENTFUL_ACCESS_KEY,
          });
          debugger;
  
          const res = await client.getEntry(component);
  
          if (res.sys.contentType.sys.id === "imageWithText") {
            setItem({ res });
          } else {
            setItem({});
          }
        }
        getItems(component);
      };
    },[]);

}
function IdPostsPage2() {
    const router = useRouter()

    console.log(router);
}

export default IdPostsPage;
