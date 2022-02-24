import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

import { useContext } from "react";
import DataContext from "../Context/DataContext";
import { format } from "date-fns";
import api from "../api/posts";

function EditPost() {
  const [editTitle, setEditTitle] = useState(""); // state for editing a post title and it setter
  const [editBody, setEditBody] = useState(""); // state for editing a post body and it set
  const { posts, setPosts } = useContext(DataContext);
  const { id } = useParams(); //This return a key/value pair from the current url when using Route, in this case we are just getting the id from the url
  const post = posts.find((post) => post.id.toString() === id);
  const navigate = useNavigate(); // useNavigate replace useHistory in recent react-router-dom

  useEffect(() => {
    if (post) {
      //pre setting the fields for editing
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  //UPDATE/PATCH operation
  async function handleEdit(id) {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatePost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatePost); // using put because we are updating the entire post, we can use patch if we are updating just a specific field
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title:</label>
            <input
              id="postTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <label htmlFor="postBody">Post:</label>
            <textarea
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="submit" onClick={() => handleEdit(post.id)}>
              {" "}
              Submit{" "}
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post Not Found</h2>
          <p> Well, that's disappointing </p>
          <p>
            <Link to="/"> Visit Our HomePage</Link>{" "}
          </p>
        </>
      )}
    </main>
  );
}

export default EditPost