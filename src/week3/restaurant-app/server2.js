const { app, port, handlebars } = require('./server/setup')
const get = require('./server/get')
const post = require('./server/post')

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})