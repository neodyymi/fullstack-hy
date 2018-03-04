import React from 'react'
class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.user = props.user
    this.blog = props.blog
    this.delFunc = props.delFunc
    this.state = {
      visible: false
    }
  }

  toggleInfo = () => {
    this.setState({ visible: !this.state.visible })
    console.log(this.state.visible)
  }
  render() {
    const blog = this.blog
    return(  
      <div className="blog" onClick={this.toggleInfo}>
        {blog.title} {blog.author}
        <div className={this.state.visible ? '':'hidden'}>
          <a href={blog.url}>{blog.url}</a><br/>
          {blog.likes} likes <button>like</button><br/>
          added by {blog.user.name}<br/>
          {blog.user === undefined || blog.user.username === this.user.username ?
            <button onClick={this.delFunc(blog)}>Delete</button>:''}
        </div>
      </div>  
    )
  }
}



export default Blog