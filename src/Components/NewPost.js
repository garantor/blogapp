import { useContext, useState } from "react";
import DataContext from "../Context/DataContext";
import { useNavigate } from 'react-router-dom'
import api from '../api/posts'
import { format } from "date-fns";

function NewPost() {
  const [postTitle, setPostTitle] = useState(""); // each post title and their setter when creating new post
  const [postBody, setPostBody] = useState(""); // each post body and it setter when creating new post
  const { posts, setPosts } = useContext(DataContext);
  const navigate = useNavigate()


  async function handleSubmit(e) {
    e.preventDefault();
    // getting the id for the present post
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody }; //postBody and postTitle have been set when users are typing in their value to the useState Hook
    // this uses axios to post data to api, we did not create a whole function because onSubmit itself always re-render app
    // POST operation
    try {
      const response = await api.post("/posts", newPost);
      const allPost = [...posts, response.data];
      setPosts(allPost);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <main className="NewPost">
      <h2>NewPost</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />

        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit"> Submit </button>
      </form>
    </main>
  );
}

export default NewPost;
