const fs = require("fs").promises;
const { error } = require("console");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const result = await fs.readFile(contactsPath, "utf8");
    return console.table(JSON.parse(result));
  } catch (e) {
    return console.error(e);
  }
}

async function getContactById(contactId) {
  try {
    const result = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(result);

    const contact = contacts.find((contact) => contact.id === `${contactId}`);
    if (!contact) {
      return console.log("not found contact with this id");
    }
    console.table(contact);
  } catch (e) {
    return console.error(e);
  }
}

async function removeContact(contactId) {
  try {
    const result = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(result);

    const contact = contacts.find((contact) => contact.id === `${contactId}`);
    if (!contact) {
      return console.log("not found contact with this id");
    }
    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(newContacts), (error) => {
      if (error) {
        return console.log("contact don't deleted! error:", error);
      }
    });
    console.log("contact deleted!");
    console.table(newContacts);
  } catch (e) {
    return console.error(e);
  }
}

async function addContact(name, email, phone) {
  try {
    const result = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(result);

    contacts.push({
      id: contacts.length + 1,
      name: name,
      email: email,
      phone: phone,
    });

    fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {
      if (error) {
        return console.log(error);
      }
    });
    console.log("new contacts added!");
    console.table(contacts);
  } catch (e) {
    return console.error(e);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
