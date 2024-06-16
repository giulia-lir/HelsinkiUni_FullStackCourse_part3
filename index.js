require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postToString'))
app.use(express.static('dist'))

morgan.token('postToString', (req) => { return (req.method === 'POST') ? JSON.stringify(req.body) : "" })

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => response.json(persons))
})

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    const currentDate = new Date();
    const info = `<p>Phonebook has info for ${persons.length} people</p><p>${currentDate}</p>`
    response.send(info);
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404)
      response.send("Person does not exist in phonebook.")
      response.end()
    }
  })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end() //Response OK even if resource does not exist
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.content == undefined) {
    return response.status(400).json({ 
      error: 'content is missing' 
    })
  }

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  }

  if (!body.number) {
    return response.status(400).json({ 
      error: 'number is missing' 
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(() => {
      response.json(person)
    })
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})