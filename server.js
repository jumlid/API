const express = require('express')
const fs = require('fs')
const cors = require('cors')
const database = require('./data.json')
const { json } = require('stream/consumers')
const port = 8000
const app = express()
app.use(cors())
app.use(express.json())

app.get("/data", (req, res) => {

    return res.json(database)

})
let older_data = fs.readFileSync('./data.json', 'utf8')
//console.log(older_data.users)
older_data = JSON.parse(older_data)
app.post('/data', (req, res) => {
    let l = older_data.users.length
    console.log(req.body.user_name)

    older_data.users.push([`user name : ${req.body.user_name}`])
    older_data.users[l].push(`number of users: ${l}`)

    older_data.users[l].push(`${req.body.password}`)


    fs.writeFileSync('./data.json', (JSON.stringify(older_data)))


})
app.listen(port, () => {
    console.log(`server started at port ${port} `)
})