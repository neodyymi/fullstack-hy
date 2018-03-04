import React from 'react'

const BlogForm = ({ onSubmit, handleChange, titleValue, authorValue, urlValue }) => {
  return (
    <div>
      <h2>Add a blog</h2>

      <form onSubmit={onSubmit}>
        <input
          placeholder="Blog name"
          id="blogName"
          name="newBlogTitle"
          value={titleValue}
          onChange={handleChange}
        /><br/>
        <input
          placeholder="Blog author"
          id="blogAuthor"
          name="newBlogAuthor"
          value={authorValue}
          onChange={handleChange}
        /><br/>
        <input
          placeholder="Blog url"
          id="blogUrl"
          name="newBlogUrl"
          value={urlValue}
          onChange={handleChange}
        /><br/>
        <button>tallenna</button>
      </form>
    </div>
  )
}

export default BlogForm