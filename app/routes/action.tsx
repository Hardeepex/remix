import { ActionFunction, json } from "@remix-run/node";
import { fetchGraphQLMutation } from "./graphql";

type ActionFormData = {
  title: string;
  content: string;
};

const CREATE_POST_MUTATION = `
  mutation CreatePost($title: String!, $content: String!) {
    createPost(input: {title: $title, content: $content}) {
      post {
        id
      }
    }
  }
`;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const content = formData.get("content");

  if (typeof title !== "string" || typeof content !== "string") {
    return json({ error: "Invalid form data" }, { status: 400 });
  }

  const actionData: ActionFormData = { title, content };

  try {
    const data = await fetchGraphQLMutation(CREATE_POST_MUTATION, actionData);
    return json(data);
  } catch (error) {
    return json({ error: "Failed to create post" }, { status: 500 });
  }
};
