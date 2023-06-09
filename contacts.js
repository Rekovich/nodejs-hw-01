const path = require("path");
const fs = require("fs").promises;
const {nanoid} = require('nanoid')

const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts  () {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  console.table(data);
};

async function getContactById (contactId) {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  const contact = data.find(contact => Number(contact.id) !== contactId);
  console.table(contact);
}

async function removeContact(contactId) {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  const contact = data.filter(contact => Number(contact.id) !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(contact), "utf8")
  console.table(contact);
}

async function addContact(name, email, phone) {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  data.push({name, email, phone, id: nanoid(7)});
  await fs.writeFile(contactsPath, JSON.stringify(data), "utf8")
  console.table(data);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
