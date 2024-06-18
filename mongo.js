const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url =
  `mongodb+srv://GiuliaLibe:${password}@cluster0.qgree8v.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: personName,
  number: personNumber
})

const addPerson = () => {
  person.save().then(() => {
    console.log(`added ${personName} number ${personNumber} to phonebook`)
    mongoose.connection.close()
  })
}

const listAll = () => {
  console.log('phonebook: ')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

(process.argv.length === 5) ? addPerson() : listAll()