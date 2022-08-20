import { GraphQLClient, gql } from "graphql-request";
import { createClient } from "contentful";
import RecipeCard from "../components/RecipeCard";
import RichTextCompile from "../components/RichTextCompile";
import RichTextHelper from "../components/RichTextHelper";

export async function getStaticProps() {
  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_KEY}`,
    },
  });

  const listeningQuery = gql`
    {
      recipeCollection {
        items {
          title
          slug
          thumbnail {
            title
            description
            contentType
            fileName
            size
            url
            width
            height
          }
          ingredients
          cookingTime
        }
      }
    }
  `;

  const listings = await graphQLClient.request(listeningQuery);


  // const client = createClient({
  //   space: process.env.CONTENTFUL_SPACE_ID,
  //   accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  // });

  // const res = await client.getEntries({ content_type: "recipe" });
  // const resdynamic = await client.getEntries({
  //   content_type: "dynamicPage",
  // });

  return {
    props: {
      listings,
    },
    revalidate: 1,
  };
}

export default function Recipes({ listings }) {
  console.log(listings.recipeCollection.items);
  return (
    <div className="recipe-list">
      {listings.recipeCollection.items.map((recipe) => (
        <RecipeCard key={recipe.slug} recipe={recipe} />
      ))}

      {/* {resdynamics.map((resdynamic) => (
        <RichTextHelper resdynamic={resdynamic} />
      ))} */}

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
