#Chatbot API Documentation
>Welcome to the Chatbot API documentation. This guide provides instructions for setting up the API on your local system and understanding the codebase structure.

#Getting Started
>Ensure you have Node.js installed on your system.
>Clone the repository to your local machine using git clone <repository_url>.
>Navigate to the project directory using the terminal.
#Installation
>Install project dependencies by running npm install.
>Configure the SQLite database settings in config/config.json.
>Run the API
>Start the API server with node index.js.
>The API will be available at http://localhost:5000.

    
#Codebase Overview
1)config/config.json: Configuration file for the database.\
2)models: Contains Sequelize model definitions for User, Chatbot, Conversation, and EndUser.\
3)routes: Contains route handler files for each entity (users, chatbots, conversations, endusers).\
4)index.js: Main application file that establishes the server and mounts the routers.\

#Users
>POST /users: Create a new user.
>GET /users: List all users.
>GET /users/:id: Retrieve a single user.
>PUT /users/:id: Update a user.
>DELETE /users/:id: Delete a user.


#Chatbots
>POST /users/:userId/chatbots: Create a new chatbot for a user.
>GET /users/:userId/chatbots: List all chatbots for a user.
>GET /chatbots/:chatbotId: Retrieve a single chatbot.
>PUT /chatbots/:chatbotId: Update a chatbot.
>DELETE /chatbots/:chatbotId: Delete a chatbot.


#Conversations
>POST /chatbots/:chatbotId/conversations: Start a new conversation for a chatbot.
>GET /chatbots/:chatbotId/conversations: List all conversations for a chatbot.
>GET /conversations/:conversationId: Retrieve a single conversation.
>PUT /conversations/:conversationId: Update a conversation.
>DELETE /conversations/:conversationId: End/delete a conversation.


#End Users
>POST /endusers: Register a new end user.
>GET /endusers: List all end users.
>GET /endusers/:endUserId: Retrieve details of a single end user.
>PUT /endusers/:endUserId: Update end user details.
>DELETE /endusers/:endUserId: Delete an end user.
 
  
   #Usage
   >Access the API using tools like Postman or curl.
   >For detailed request and response formats, refer to the provided Postman collection.
   >Error Handling
   >400 Bad Request: Invalid request data.
   >404 Not Found: Resource not found.
   >500 Internal Server Error: Server error.


  #Conclusion
  >This guide helps you set up and understand the Chatbot API. Refer to the provided Postman collection for detailed examples of API usage.

#postman link : https://api.postman.com/collections/16433964-cfd24241-eb60-47a6-a09f-2ec5d47f83ba?access_key=PMAT-01H8SK6FEPHFWNJFJSQ3RZ2ZR6
