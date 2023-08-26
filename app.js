const  express = require('express')
const app = express()
const sequelize = require('./config/database')

const userRoutes = require('./routers/users_router');
const chatbotRoutes = require('./routers/chatbot_route');
const conversation = require('./routers/conversation');
const enduserroute = require('./routers/enduserroute');

const db = require('./models'); // Import the initialized models

// Sync the models with the database
db.sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(error => {
    console.error('Error synchronizing database:', error);
  });
const port = process.env.PORT || 5000;

//Body parsing middleware 
app.use(express.json());

app.use('/users', userRoutes);
app.use('/users', chatbotRoutes); 
app.use('/', chatbotRoutes); 
app.use('/chatbots',conversation);
app.use('/',conversation);
app.use('/endusers' , enduserroute);




app.get('/' , (req,res) =>{
    res.send("Server is working")
})

app.listen(port , ()=>{
    console.log(`server running of port : ${port}`);
})






