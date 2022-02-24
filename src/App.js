
import Home from "./Components/Home";
import NewPost from "./Components/NewPost";
import PostPage from "./Components/PostPage";
import AboutPage from "./Components/AboutPage";
import MissingPage from "./Components/MissingPage";
import Layout from './Components/Layout'
import EditPost from "./Components/EditPost";

import {Routes, Route, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import api from './api/posts'

function App() {
  const [posts, setPosts] = useState([]); //each post and their setter
  const [search, setSearch] = useState(""); //serach post state and their setter
  const [searchResults, setSearchResults] = useState([]); // searchResult state and the setter
  const [postTitle, setPostTitle] = useState(""); // each post title and their setter when creating new post
  const [postBody, setPostBody] = useState(""); // each post body and it setter when creating new post
  const navigate = useNavigate(); // useNavigate replace useHistory in recent react-router-dom

  const [editTitle, setEditTitle] = useState(""); // state for editing a post title and it setter
  const [editBody, setEditBody] = useState(""); // state for editing a post body and it set

  //useEffect to fetch data from api at load time(get method)

  /////////////////////////////////////////////////////
  //CRUD Operation /////
  /////////////////////////////////////////////////////

  //GET operation
  useEffect(() => {
    async function fetchPost() {
      try {
        const getData = await api.get("/posts"); // axios automatically catches error
        setPosts(getData.data);
      } catch (err) {
        if (err.response) {
          //error not in 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          // this catches all sort of error here
          console.log(`Error: ${err.message}`);
        }
      }
    }
    // calling the function to fetch data
    fetchPost();
  }, []);

  //using useEffect to filter post, search post
  useEffect(() => {
    const filteredResult = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResult.reverse());
  }, [posts, search]);

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
  //UPDATE/PATCH operation
  async function handleEdit(id) {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatePost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatePost) // using put because we are updating the entire post, we can use patch if we are updating just a specific field
      setPosts(posts.map( post => post.id === id ? {...response.data} : post));
      setEditTitle('');
      setEditBody('')
      navigate('/')
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  

  }
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
    <Routes>
      <Route
        path="/"
        element={<Layout search={search} setSearch={setSearch} />}
      >
        <Route path="/" element={<Home posts={searchResults} />} />
        <Route
          path="post"
          element={
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />
          }
        />
        <Route
          path="/edit/:id"
          element={
            <EditPost
              posts={posts}
              handleEdit={handleEdit}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
            />
          }
        />
        <Route
          path="post/:id"
          element={<PostPage posts={posts} handleDelete={handleDelete} />}
        />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<MissingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
