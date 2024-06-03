import * as yup from 'yup';
import * as Realm from 'realm-web';

const userSchema = yup.object().shape({
  _id: yup.mixed().test('is-object-id', 'Invalid ObjectId', value => value instanceof Realm.BSON.ObjectId),
  name: yup.string().required(),
  userId: yup.string().required(),
});

export default userSchema;



// import * as yup from 'yup';

// const userSchema = yup.object().shape({
//   name: yup.string(),
//   email: yup.string(),
//   age: yup.number(),
// });

// export default userSchema;



// Example object with a valid ObjectId
// const validUser = {
//     _id: new Realm.BSON.ObjectId(),
//     name: 'John Doe',
//     userId: '12345'
//   };
  
//   // Example object with an invalid ObjectId
//   const invalidUser = {
//     _id: 'someInvalidId',
//     name: 'John Doe',
//     userId: '12345'
//   };
  
//   // Validate the objects
//   userSchema.validate(validUser)
//     .then(() => console.log('Valid user passed validation'))
//     .catch(err => console.error('Valid user failed validation', err));
  
//   userSchema.validate(invalidUser)
//     .then(() => console.log('Invalid user passed validation'))
//     .catch(err => console.error('Invalid user failed validation', err));