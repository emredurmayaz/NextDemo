import { createClient } from "contentful";
import RecipeCard from "../components/RecipeCard";
import RichTextCompile from "../components/RichTextCompile";
import RichTextHelper from "../components/RichTextHelper";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: "recipe" });
  const resdynamic = await client.getEntries({
    content_type: "dynamicPage",
  });

  return {
    props: {
      recipes: res.items,
      resdynamics: resdynamic.items,
    },
    revalidate: 1,
  };
}

export default function Recipes({ recipes, resdynamics }) {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.sys.id} recipe={recipe} />
      ))}

      {resdynamics.map((resdynamic) => (
        <RichTextHelper resdynamic={resdynamic} />
      ))}

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Button
      </button>

      <style jsx>{`
        .recipe-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }
      `}</style>
    </div>
  );
}
