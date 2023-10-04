import { openDB } from 'idb';

let txtEditorDB; // Declare a variable to store the database connection.

const initdb = async () => {
  txtEditorDB = await openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
};

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    if (!txtEditorDB) {
      throw new Error('Database is not initialized.');
    }

    const transVar = txtEditorDB.transaction('jate', 'readwrite');
    const storeVar = transVar.objectStore('jate');
    const request = storeVar.put({ value: content });

    const result = await request;
    console.log('Data saved to database with key:', result);
  } catch (error) {
    console.error('Error while putting data into the database:', error);
  }
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    if (!txtEditorDB) {
      throw new Error('Database is not initialized.');
    }

    const transVar = txtEditorDB.transaction('jate', 'readonly');
    const storeVar = transVar.objectStore('jate');
    const request = storeVar.get(1);
    const result = await request;
    if (result) {
      console.log('Data retrieved from the database', result.value);
    } else {
      console.log('Data not found in the database');
    }
    return result?.value;
  } catch (error) {
    console.error('Error while getting data from the database:', error);
    return null; // Return null or handle the error accordingly
  }
};

// Function to start the application and initialize the database
export const startApp = async () => {
  await initdb();

  // Now you can safely use txtEditorDB
  // Your other application logic here
};

// Example of how to use the code
startApp(); // Initialize the database
// Your other application logic here, including using getDb and putDb