import { GraphQLClient, gql } from "graphql-request";
import { createClient } from "contentful";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Skeleton from "../../../components/Skeleton";
import Head from 'next/head';
import Link from "next/link";

// const client = createClient({
//   space: process.env.CONTENTFUL_SPACE_ID,
//   accessToken: process.env.CONTENTFUL_ACCESS_KEY,
// });

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_KEY}`,
  },
});

export const getStaticPaths = async () => {
  // const res = await client.getEntries({
  //   content_type: "recipe",
  //   include: 10,
  // });

  // console.log(res);

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

  const paths = listings.recipeCollection.items.map((item) => {
    return {
      params: { slug: item.slug },
    };
  });

  return {
    paths,
    fallback: true, // if there is no page, skeleton component is showing
  };
};

export async function getStaticProps({ params }) {
  const listeningQuery = gql`
  {
    recipeCollection(where: {slug: "${params.slug}"}) {
      items {
        title
        slug
        featuredImage {
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

  const receives = await graphQLClient.request(listeningQuery);

  // const { items } = await client.getEntries({
  //   content_type: "recipe",
  //  "fields.slug": params.slug,
  // });

  // if (!receives.length) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: { recipe: receives.recipeCollection.items[0] },
    revalidate: 1,
  };
}

export default function RecipeDetails({ recipe }) {
  if (!recipe) return <Skeleton />;

  console.log(recipe);

  const { featuredImage, title, cookingTime, ingredients, method, slug } =
    recipe;

  return (
    <div>
      <div className="banner">
        <Image
          src={featuredImage.url}
          width={featuredImage.width}
          height={featuredImage.height}
        />
        <h2>{title}</h2>
      </div>

      <div className="info">
        <p>Take about {cookingTime} mins to cook.</p>
        <h3>Ingredients:</h3>
        {ingredients.map((ing) => (
          <span key={ing}>{ing}</span>
        ))}
      </div>

      <div className="method">
        <h3>Method:</h3>
        <div>{documentToReactComponents(method)}</div>
      </div>

      {/* <div className="actions2">
        <Link
          href={`/recipes/${slug}/` + recipe.fields.subitems[0].fields.slug}
        >
          <a>{recipe.fields.subitems[0].fields.title}</a>
        </Link>
        <Link
          href={`/recipes/${slug}/` + recipe.fields.subitems[1].fields.slug}
        >
          <a>{recipe.fields.subitems[1].fields.title}</a>
        </Link>
      </div> */}

      <style jsx>{`
        h2,
        h3 {
          text-transform: uppercase;
        }
        .banner h2 {
          margin: 0;
          background: #fff;
          display: inline-block;
          padding: 20px;
          position: relative;
          top: -60px;
          left: -10px;
          transform: rotateZ(-1deg);
          box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
        }
        .info p {
          margin: 0;
        }
        .info span::after {
          content: ", ";
        }
        .info span:last-child::after {
          content: ".";
        }
        .actions2 {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}
