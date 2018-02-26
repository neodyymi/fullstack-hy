const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (list) => {
  return list.reduce((likes, blog) => {
    return likes + blog.likes
  }, 0)
}

const favouriteBlog = (list) => {
  return list.reduce((favourite, blog) => {
    return(favourite.likes > blog.likes ? favourite : blog)
  }, { likes: -1 })
}

const mostBlogs = (list) => {
  const most = Object.values(groupByAuthor(list)).reduce((most, blog) => {
    return(most.blogs.length > blog.blogs.length ? most : blog)
  })
  return({ author: most.author, blogs: most.blogs.length })
}

const mostLikes = (list) => {
  const most = Object.values(groupByAuthor(list)).reduce((most, blog) => {
    return(totalLikes(most.blogs) > totalLikes(blog.blogs) ? most : blog)
  })
  return({ author:most.author, likes:totalLikes(most.blogs) })
}

const groupByAuthor = (list) => {
  return list.reduce((grouped, blog) => {
    if(!grouped.hasOwnProperty(blog.author)) {
      grouped[blog.author] = {}
      grouped[blog.author]['author'] = blog.author
      grouped[blog.author]['blogs'] = []
    }
    grouped[blog.author]['blogs'] = grouped[blog.author]['blogs'].concat(blog)
    return grouped
  }, {})
}

module.exports = {
  dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
}
