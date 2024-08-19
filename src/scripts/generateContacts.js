import { PATH_DB } from '../constants/contacts.js';
import fs from 'fs/promises'; // Using fs promises for async/await
import { createFakeContact } from '../utils/createFakeContact.js'; 
import path from 'path';

const generateContacts = async (number) => {
  try {
    const dbFilePath = path.resolve(PATH_DB); // Resolving the path to db.json

    // Step 1: Read the existing contacts from db.json
    let data;
    try {
      data = await fs.readFile(dbFilePath, 'utf8');
    } catch (error) {
      if (error.code === 'ENOENT') {
        // If the file doesn't exist, initialize with an empty array
        data = '[]';
      } else {
        throw error;
      }
    }

    // Step 2: Parse the existing contacts
    const contacts = JSON.parse(data);

    // Step 3: Generate the specified number of new contacts
    for (let i = 0; i < number; i++) {
      contacts.push(createFakeContact());
    }

    // Step 4: Write the updated contacts back to db.json
    await fs.writeFile(dbFilePath, JSON.stringify(contacts, null, 2), 'utf8');
    
    console.log(`${number} new contacts added successfully.`);
  } catch (error) {
    console.error('Error generating contacts:', error);
  }
};
generateContacts(5);
