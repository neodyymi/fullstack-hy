import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlogTitle: '',
      newBlogAuthor: '',
      newBlogUrl: '',
      username: '',
      password: '',
      user: null,
      error: null,
      notification: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.newBlogTitle,
      author: this.state.newBlogAuthor,
      url: this.state.newBlogUrl
    }
    
    const newBlog = await blogService.create(blogObject)
    
    this.setState({
      blogs: this.state.blogs.concat(newBlog),
      newBlogAuthor: '',
      newBlogTitle: '',
      newBlogUrl: '',
      notification: `A new blog '${newBlog.title}' by ${newBlog.author} added`
    })
    setTimeout(() => {
      this.setState({ notification: null })
    }, 5000)
  }

  handleBlogChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  logout = () => {
    this.setState({ user: null })
    window.localStorage.removeItem('loggedBlogappUser')
  }

  render() {
    
    const loginForm = () => (
        <LoginForm
          visible={this.state.visible}
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleLoginFieldChange}
          handleSubmit={this.login}
        />
    )

    const blogForm = () => (
      <Togglable buttonLabel="New blog" ref={component => this.blogForm = component}>
        <BlogForm
          onSubmit={this.addBlog}
          titleValue={this.state.newBlogTitle}
          authorValue={this.state.newBlogAuthor}
          urlValue={this.state.newBlogUrl}
          handleChange={this.handleBlogChange}
        />
      </Togglable>
    )
    if (this.state.user === null) {
      return (
        <div>
          <Notification message={this.state.notification} error={this.state.error} />
          <h2>Log in</h2>
          {loginForm()}
        </div>
      );
    }
    return (
      <div>
        <Notification message={this.state.notification} error={this.state.error} />
        <div>
            <p>{this.state.user.name} logged in <button name="logout" onClick={this.logout}>Logout</button></p>
            {blogForm()}
        </div>

        <h2>blogs</h2>
        {this.state.blogs.map(blog => 
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
    );
  }
}

export default App;
