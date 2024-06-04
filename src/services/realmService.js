async function createUser(userData,user) {
    console.log("??????",user);
  try {
    // await checkAndCreateUserSchema();
    // Proceed with creating the user
    // const user = app.currentUser;
    const mongodb = user.mongoClient('mongodb-atlas');
    const usersCollection = mongodb.db('user-account').collection('Users');
    await usersCollection.insertOne(userData);
    console.log('User created successfully:', userData);
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}


async function deleteUserByName(name, user) {
    try {
      const mongodb = user.mongoClient('mongodb-atlas');
      const usersCollection = mongodb.db('user-account').collection('Users');
      const deletionResult = await usersCollection.deleteMany({ name });
      
      if (deletionResult.deletedCount === 1) {
        console.log(`User '${name}' deleted successfully.`);
      } else {
        console.log(`User '${name}' not found.`);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error; 
    }
  }

export { createUser, deleteUserByName };





// import app from '../config/realmConfig';
// import userSchema from '../schemas/userSchema';

// async function checkAndCreateUserSchema(user) {
//   try {

//     // const user = app.currentUser;
//     // console.log("userisnull",user);
//     const existingSchemas = await user.getSchemas();
//     const schemaExists = existingSchemas.find(schema => schema.name === 'User');

//     if (!schemaExists) {
//       await user.createSchema('User', userSchema);
//       console.log('User schema created successfully.');
//     }
//   } catch (error) {
//     console.error('Error checking or creating user schema:', error);
//     throw error; // Throw the error to be caught by the calling function
//   }
// }
