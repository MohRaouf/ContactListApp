var id = 0; // initialize the id to assign a unique id for every contact
var table = document.getElementById("contactTable");
var addButton = document.getElementById("addButton");
var editButton = document.getElementById("editButton");
var editMode =-1; // mark the action after clicking edit button on a contact
addButton.addEventListener("click", saveContact);
editButton.addEventListener("click", ModifyContact);

class ContactList {
    constructor(listName) {
        this.listName = listName;
        this.contacts = [];
    }
    addContact(cont) {
        Object.defineProperty(cont,"id",{writable:false,configurable:false}); //Lock the ID as Required
        this.contacts.push(cont);
        constructRecord(cont);
    }
    removeContact(id) {
        var index =this.contacts.findIndex(el => el.id == id);
        if (index !== -1) {
            this.contacts.splice(index, 1);
        }
    }
    editContact(idx,newContact){
        var index =this.contacts.findIndex(el => el.id == idx);
        console.log(`final index to modify = ${index}`);
        if (index !== -1) {
            this.contacts[index].name=newContact.name;
            this.contacts[index].email=newContact.email;
            this.contacts[index].phone=newContact.phone;
            modifyRecord(newContact,idx);
        }
    }
}

var contactList = new ContactList("myContacts"); //Instance from contactList OBJ

class Contact {
    constructor(name, phone, email) {
        this.id = ++id;
        this.name = formatName(name);
        this.phone = phone;
        this.email = email;
    }
}

function saveContact() {
    var name = document.getElementById("nameInput").value;
    var email = document.getElementById("emailInput").value;
    var phoneNo = document.getElementById("phoneInput").value;
    if (validateEmail(email) && phoneNo.length > 10 && name != "") {
        contactList.addContact(new Contact(name, phoneNo, email));
        editMode=-1;
    }
}

//Build the Contact container
function constructRecord(contact) {
    console.log(`Contact ID (LOCKED): ${contact.id}`);
    contact.id=555;
    console.log(`The new Contact ID  (555) is : ${contact.id}`);
    var newRow = document.createElement("tr");
    newRow.setAttribute("id", contact.id);

    var tdElement = document.createElement("td");
    tdElement.textContent = contact.name;
    newRow.appendChild(tdElement);

    tdElement = document.createElement("td");
    tdElement.textContent = contact.phone;
    newRow.appendChild(tdElement);

    tdElement = document.createElement("td");
    tdElement.textContent = contact.email;
    newRow.appendChild(tdElement);

    var cell = document.createElement("td");

    var img1 = document.createElement("img");
    img1.setAttribute("name", contact.id);
    img1.setAttribute("src", "edit.ico");
    img1.addEventListener("click", populateData);
    cell.appendChild(img1)

    var img2 = document.createElement("img");
    img2.setAttribute("name", contact.id);
    img2.setAttribute("src", "delete.ico");
    img2.addEventListener("click", deleteContact);
    cell.appendChild(img2)

    newRow.appendChild(cell);
    table.appendChild(newRow);
    console.log("done")
}

//Apply the modification on the Contact
function modifyRecord(contact,index){
    var selectedContact = document.getElementById(index);
    selectedContact.children[0].innerHTML=contact.name;
    selectedContact.children[1].innerHTML=contact.phone;
    selectedContact.children[2].innerHTML=contact.email;
    editMode=-1;
}

//Populate the Contact info in the inputs to modify
function populateData(e) {
    editMode=e.target.name;
    console.log(editMode);
    var selectedContact = document.getElementById(editMode);
    var nameInput =document.getElementById("nameInput");
    nameInput.value=selectedContact.children[0].innerHTML;

    var phoneInput =document.getElementById("phoneInput");
    phoneInput.value=selectedContact.children[1].innerHTML;

    var emailInput =document.getElementById("emailInput");
    emailInput.value=selectedContact.children[2].innerHTML;
}

//Commit Modification of Contact to the Table and the Array
function ModifyContact() {
    if(editMode!=-1){
        var name = document.getElementById("nameInput").value;
        var email = document.getElementById("emailInput").value;
        var phoneNo = document.getElementById("phoneInput").value;
        if(validateEmail(email) && phoneNo.length > 10 && name != ""){
            contactList.editContact(editMode,new Contact(name, phoneNo, email)); 
            console.log("Take the input values and fire the editContact in the Class")
        }
    }
}


//Custom Methods
function deleteContact(e) {
    var id = e.target.name;
    editMode=-1;
    deleteRow(id)
    contactList.removeContact(id)
}
function formatName(name) {
    if (hasSpaces(name)) {
        return name.split(" ")[0][0].toUpperCase() + "." + name.split(" ")[1].charAt(0).toUpperCase() + name.split(" ")[1].slice(1);
    } else {
        return name;
    }
}
function deleteRow(rowid) {
    var row = document.getElementById(rowid);
    row.parentNode.removeChild(row);
}
function validateEmail(inputText) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(inputText)) {
        return true;
    } else {
        return false;
    }
}
function hasSpaces(str) {
    if (str.indexOf(' ') !== -1) {
        return true
    } else {
        return false
    }
}