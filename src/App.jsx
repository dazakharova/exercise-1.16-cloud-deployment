import { useState } from 'react'
import {
  Routes, Route, Link, useMatch, useNavigate
} from 'react-router-dom'
import  { useField } from './hooks'
import {Table, Form, Button, Alert, Navbar, Nav} from "react-bootstrap";

const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">anecdotes</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/create">create</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/about">about</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  )
}

const Anecdote = ({anecdote}) => {
  return (
      <div>
        <div>{anecdote.content}</div>
        <div>Author {anecdote.author}</div>
        <div>has {anecdote.votes} votes</div>
      </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
      {anecdotes.map(anecdote =>
          <tr key={anecdote.id}>
            <td>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </td>
            <td>{anecdote.author}</td>
          </tr>)}
      </tbody>
    </Table>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.
  </div>
)

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })

    props.setNotification(`anecdote '${content.value}' created!`)
    setTimeout(() => {
      props.setNotification('')
    }, 5000)

    navigate('/')
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>content</Form.Label>
          <Form.Control type={content.type} name={content.value} onChange={content.onChange}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>author</Form.Label>
          <Form.Control type={author.type} name={author.value} onChange={author.onChange}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>info</Form.Label>
          <Form.Control type={info.type} name={info.value} onChange={info.onChange}></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          create
        </Button>
        <Button variant="secondary" type="button" onClick={handleReset}>
          reset
        </Button>
      </Form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
      ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
      : null

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div className="container">
      <h1>Software anecdotes</h1>
      <Menu />

      {notification && <Alert variant="success" >
        {notification}
      </Alert>}

      <Routes>
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/create' element={<CreateNew addNew={addNew} setNotification={setNotification} />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
