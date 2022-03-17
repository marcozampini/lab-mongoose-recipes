const mongoose = require('mongoose')

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model')
// Import of the data from './data.json'
const data = require('./data')

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app'

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`)
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(async () => {
    await Recipe.create({
      title: 'Biscotti',
      level: 'Amateur Chef',
      ingredients: ['flour', 'butter', 'one egg', 'sugar'],
      cuisine: 'Italian',
      dishType: 'breakfast',
      image:
        'https://ironhack-vs09150.slack.com/files/U0334U4LS23/F034G7W54SK/whatsapp_image_2022-02-27_at_22.13.20.jpeg',
      duration: 60,
      creator: 'Marco Zampini',
    })
    const recipesFromFile = await Recipe.insertMany(data)
    recipesFromFile.forEach((rec) => {
      console.log(rec.title)
    })
    const rigatoni = await Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 }
    )
    if (rigatoni) {
      console.log('Rigatoni updated!')
    }
  })
  .catch((error) => {
    console.error('Error connecting to the database', error)
  })
