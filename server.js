const express = require('express')
const app = express()
const port = 8080

app.use(express.static('.'));

app.get('', (req,res) => {
    res.sendFile( __dirname + 'index.html');
})

app.listen(port, () => console.info(`App listening on port ${port}`))