import { useParams, Link } from 'react-router-dom';
import { useContext } from "react";
import DataContext from "../Context/DataContext";
import api from '../api/posts'
import { useNavigate } from 'react-router-dom'
function PostPage() {
  const { posts, setPosts } = useContext(DataContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts.find((post) => post.id.toString() === id);

  // DELETE Operation
  async function handleDelete(id) {
    try {
      await api.delete(`/posts/${id}`);
      const PostList = posts.filter((post) => post.id !== id);
      setPosts(PostList);
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }
  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              {" "}
              <button className="editButton"> Edit Post </button>{" "}
            </Link>
            <button
              className="deleteButton"
              onClick={() => handleDelete(post.id)}
            >
              {" "}
              Delete Post{" "}
            </button>
          </>
        )}
        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p> Well, that's disappointing </p>
            <p>
              <Link to="/"> Visit Our HomePage</Link>{" "}
            </p>
          </>
        )}
      </article>
    </main>
  );
}

export default PostPage;
