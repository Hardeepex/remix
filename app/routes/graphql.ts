import { json } from "@remix-run/node";
import { GraphQLClient } from "graphql-request";

const GRAPHQL_ENDPOINT = "https://juicybabe.com/graphql";
const client = new GraphQLClient(GRAPHQL_ENDPOINT);

export async function fetchGraphQLData(query, variables = {}) {
  try {
    const data = await client.request(query, variables);
    return json(data);
  } catch (error) {
    console.error("Error fetching GraphQL data:", error);
    throw new Response("Error fetching data", { status: 500 });
  }
}

export async function fetchGraphQLMutation(mutation, variables = {}) {
  try {
    const data = await client.request(mutation, variables);
    return json(data);
  } catch (error) {
    console.error("Error performing GraphQL mutation:", error);
    throw new Response("Error performing mutation", { status: 500 });
  }
}
