import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

const BlogDetails = () => {
  const { id } = useParams();

  const { data, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  if (loading) {
    return <p>Loding data ....</p>;
  }

  if (error) return <p>error....</p>;

  return (
    <>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
      <Link to="/blog">Volver</Link>
    </>
  );
};

export default BlogDetails;
