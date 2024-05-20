import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'

const app = new Hono()

const Hello = ()=> {
  return (
    <html>
      <body>
        <h1>Response JsxElement</h1>
      </body>
    </html>
  )
}
app.get('/', (c) => {
  return c.text('Response String')
})
app.get('/json', (c) => {
  return c.json({type: 'debug', message: 'Response Json'})
})
app.get('/posts/:id', (c) => {
  const page = c.req.query('page')
  const id = c.req.param('id')
  c.header('X-message', 'Hi!' )
  return c.text(`You want see ${page} of ${id}`)
})
app.post('/posts', async(c) => {
  const body = await c.req.parseBody()
  console.log(body)
  return c.text(`You sent ${JSON.stringify(body)}`)
})
app.get('set-cookie', (c) => {
  const randomNum = Math.floor(Math.random() * 100)
  const date = new Date()
  date.setMinutes(date.getMinutes() + 5)
  c.header('Set-Cookie', `name=takoyakimaru${randomNum}; expires=${date.toUTCString()}` )
  return c.text('Set-Cookie')
})
app.get('confirm-cookie', (c) => {
  const cookie = c.req.header('cookie') 
  console.log("cookie:", cookie) 
  return c.json({message: 'confirm-cookie', cookie: JSON.stringify(cookie) })
}) 
app.get('/react', (c) => {
  return c.html(<Hello/>)
})
app.get('/raw-response', (c)=> {
  return new Response('Response RowResponse')
})
app.use('/admin/*', basicAuth({
  username: 'admin',
  password: 'password'  
}))
app.get('/admin', (c) => {
  return c.text('You logged in')
})


export default app
