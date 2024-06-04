
import React, { useState, useEffect } from 'react';
import * as Realm from 'realm-web';
import  {createUser, deleteUserByName}  from './services/realmService';


const APP_ID = 'exelonwebapp-ixfnzgz';
const API_KEY = '2T3SpSAunEzrSWM3sSUJXCG7abmmDC67DHAA3URnspcXfSChdD5Nc1MSiBqAbNLc';
const app = new Realm.App({ id: APP_ID });

function App() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [newUser, setNewUser] = useState(null);


  useEffect(() => {
    const loginWithApiKey = async () => {
      const credentials = Realm.Credentials.apiKey(API_KEY);
      try {
        const user = await app.logIn(credentials);
        // Check if user object has a getSchema method
        if (typeof user.getSchema === 'function') {
          console.log("User object has a getSchema method");
        } else {
          console.log("User object does not have a getSchema method");
        }

        setUser(user);
      } catch (error) {
        console.error("Failed to log in", error);
      }
    };
  
    loginWithApiKey();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const mongodb = user.mongoClient('mongodb-atlas');
        const collection = mongodb.db('user-account').collection('students');
        const result = await collection.find({});
        setData(result);
      };

      fetchData();
    }
  }, [user]);


  useEffect(() => {
    if (newUser && user) {
      const insertData = async () => {
        try {
          await createUser(newUser,user);
          console.log('New user inserted:', newUser);
        } catch (error) {
          console.error('Error inserting new user:', error);
        }
      };

      insertData();
    }
  }, [newUser, user]);

  
  const handleCreateUser = () => {
    setNewUser({
      _id: new Realm.BSON.ObjectId(), 
      name: 'demoapi',
      userId: '11111111111111111111'
    });
  };


  const handleDeleteUser = () => {
    deleteUserByName('mmmmm', user)
      .then(() => {
        console.log('User deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };



  return (
    <div className="App">
      <header className="App-header">
        <h1>Realm Web with React</h1>
        {user ? <p>User ID: {user.id}</p> : <p>Logging in...</p>}
        {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading data...</p>}
        <button onClick={handleCreateUser}>Create User</button>
        <button onClick={handleDeleteUser}>Delete User</button>
      </header>
    </div>
  );
}

export default App;


// import { useRealmApp } from "@realm/react";
// const app = useRealmApp();
// const schema = await app.currentUser.mongoClient.getSchema();

 // const mongodb = user.mongoClient('mongodb-atlas');
        // await mongodb.db('user-account').createCollection({
        //   name: 'YourCollectionName',
        //   fields: {
        //     name: 'string',
        //     userId: 'string',
        //     _id: 'objectId',
        //     email: 'string',
        //   },
        // });
 

  // useEffect(() => {
  //   if (user) {
  //     setNewUser({
  //       _id: new Realm.BSON.ObjectId(),
  //       name: 'abcdefgh',
  //       userId: '12345'
  //     });
  //   }
  // }, [user]);

    // useEffect(() => {
  //   if (newUser && user) {
  //     // Insert data into the MongoDB Atlas database
  //     console.log("entered this...")
  //     const insertData = async () => {
  //       try {
  //         const mongodb = user.mongoClient('mongodb-atlas');
  //         const collection = mongodb.db('user-account').collection('Users');
  //         await collection.insertOne(newUser);
  //         console.log('New user inserted:', newUser);
  //       } catch (error) {
  //         console.error('Error inserting new user:', error);
  //       }
  //     };

  //     insertData();
  //   }
  // }, [newUser, user]);