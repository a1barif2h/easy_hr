const express = require('express')
const cors = require('cors')
const employeeRouter = require('./routers/employeeRouter')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const {sequelize} = require('./models')

//ALL EMPLOYEE ROUTE
app.use('/employees', employeeRouter)

app.listen({port:process.env.PORT}, async () => {
    console.log(`Server up at http://localhost:${process.env.PORT}`)
    await sequelize.authenticate()
    console.log('Database connected')
})