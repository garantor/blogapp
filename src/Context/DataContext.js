import { createContext, useState, useEffect } from "react";


import useAxiosFetch from "../hooks/useAxiosFetch";

//using context allows you to pass props/parameter to the child of any component without explicitly defining the props in the function

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]); //each post and their setter
  const [search, setSearch] = useState(""); //serach post state and their setter
  const [searchResults, setSearchResults] = useState([]); // searchResult state and the setter
 

  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  //useEffect to fetch data from api at load time(get method)

  useEffect(() => {
    setPosts(data);
  }, [data]);

  //using useEffect to filter post, search post
  useEffect(() => {
    const filteredResult = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResult.reverse());
  }, [posts, search]);

 

  return (
    <DataContext.Provider
      value={{
        //this is where all props that will be available to different components will be added
        setSearch,
        search,
        searchResults,
        fetchError,
        isLoading,
        posts,
        setPosts
        
        
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
