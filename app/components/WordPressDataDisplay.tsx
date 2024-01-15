import { useLoaderData } from "@remix-run/react";

function WordPressDataDisplay() {
  const data = useLoaderData();

  return (
    <div>
      {/* Assuming the data is an array of posts */}
      {data.posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      ))}
    </div>
  );
}

export default WordPressDataDisplay;
