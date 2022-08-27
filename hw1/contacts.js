const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");
// console.log(contactsPath);

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

async function listContacts() {
  const dbContacts = await fs.readFile(contactsPath);
  return JSON.parse(dbContacts);
}

async function getContactById(id) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(id) {
  const contacts = await listContacts();
  const idx = await contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  const [deleteContact] = contacts.splice(idx, 1);
  updateContacts(contacts);
  return deleteContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

// const updateById = async (id, name, email, phone) => {
//   const contacts = await listContacts();
//   const idx = contacts.findIndex((item) => item.id === id);
//   if (idx === -1) {
//     return null;
//   }
//   contacts[idx] = { id, name, email, phone  };
//   await updateContacts(contacts);
//   return contacts[idx];
// };
