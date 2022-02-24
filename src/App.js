
import Home from "./Components/Home";
import NewPost from "./Components/NewPost";
import PostPage from "./Components/PostPage";
import AboutPage from "./Components/AboutPage";
import MissingPage from "./Components/MissingPage";
import Layout from './Components/Layout'
import EditPost from "./Components/EditPost";

import {Routes, Route} from 'react-router-dom'



function App() {


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="post" element={<NewPost />} />
        <Route path="/edit/:id" element={<EditPost />}/>
        <Route path="post/:id" element={<PostPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<MissingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
