import { useLoaderData } from "@remix-run/react";
import { fetchGraphQLData } from "./graphql";
import WordPressDataDisplay from "../components/WordPressDataDisplay";

const POSTS_QUERY = `
  query GetPosts {
    posts {
      nodes {
        id
        title
        content
      }
    }
  }
`;

export const loader = async () => {
  const data = await fetchGraphQLData(POSTS_QUERY);
  return data;
};

function Index() {
  const { posts } = useLoaderData();
  return <WordPressDataDisplay posts={posts.nodes} />;
}

export default Index;
