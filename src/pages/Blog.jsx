import { Link, useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams);

  const { data, error, loading } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (loading) {
    return <p>Loding data ....</p>;
  }

  if (error) return <p>error....</p>;

  const handleChange = ({ target: { value } }) => {
    if (value) {
      setSearchParams({ filter: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <>
      <h1>Blog</h1>
      <input
        type="text"
        name="filter"
        onChange={handleChange}
        className="form-control my-3"
        value={searchParams.get("filter") || ""}
      ></input>
      <ul className="list-group">
        {data
          .filter((fitem) => {
            let filters = searchParams.get("filter");
            if (!filters) return true;
            let name = fitem.title.toLowerCase();
            return name.startsWith(filters.toLocaleLowerCase());
          })
          .map((item) => (
            <Link
              to={`/blog/${item.id}`}
              key={item.id}
              className="list-group-item"
            >
              {item.title}
            </Link>
          ))}
      </ul>
    </>
  );
};

export default Blog;
