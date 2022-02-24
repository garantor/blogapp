import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
function EditPost({
    posts, handleEdit, editBody, setEditBody, setEditTitle, editTitle
}) {
    const { id } = useParams() //This return a key/value pair from the current url when using Route, in this case we are just getting the id from the url
    const post = posts.find(post => (post.id).toString() === id)
    useEffect(() => {
        if (post) {
          //pre setting the fields for editing
          setEditTitle(post.title);
          setEditBody(post.body)
        }

    }, [post, setEditTitle, setEditBody])

  return (
    <main className="NewPost">
        {editTitle && 
            <>
                <h2>Edit Post</h2>
                <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="postTitle">Title:</label>
                    <input id="postTitle" type='text' required value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />

                    <label htmlFor="postBody">Post:</label>
                    <textarea id="postBody" required value={editBody} onChange={(e) => setEditBody(e.target.value)} />
                    <button type="submit"  onClick={() => handleEdit(post.id)}> Submit </button>

                </form>
            </>
        }
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