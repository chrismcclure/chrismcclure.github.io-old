//Homework for the weekend.
//- Add dates

//Get's cookie and slices to just the listname
//If I change my cookie string later this will need to change
var listName = document.cookie.slice(9);

// local Storage of all the user objects
var stuffOnYourBrowser = localStorage;


//Array of all the items in storage form the correct list name
// To Do List page
if(stuffOnYourBrowser.getItem(listName) != null){
var toDoItems = stuffOnYourBrowser.getItem(listName).split(",");
}

//enables buttons when user inputs any values
//Both Page
function enableButtons(text) {
    var clicky = document.getElementById("button");
    if (text.length > 0) {
        clicky.disabled = false;
    } else {
        clicky.disabled = true;
    }
}


//fun way to link enter on return to click button
function engageButton() {
    if (event.keyCode == 13) {
        document.getElementById('button').click();
    }
}

//Makes cookie and adds to browser
//This is used on the select user page and holds value of list name
function createCookie(username) {
    document.cookie = "ListName =" + username;
}


//constructor to create name and list object
//This is only used on the User Select Page
function PersonalizedList(listname) {
    this.listname = listname;
    //Array of tasks that will have all the pending todo items
    this.todoTasks = ["Make Your First To Do Item!"];
};

//make an new instance of list called user.
//What to I need to do to pass my user object around?
function makeNewUserObject(typedname) {
    var name = typedname.toLowerCase();
    var trueOrFalse = checkForDuplicateList(name);
    if (trueOrFalse == false) {

        // if the name isn't taken, do all the stuff to make a new list and forward to list items
        createCookie(name);
        var user = new PersonalizedList(name);
        stuffOnYourBrowser.setItem(user.listname, user.todoTasks);
        window.location.assign("todo.html");
    }

    // if name is taken, make user put in new name;
    else {
      duplicateListTrue();
    }
}

function duplicateListTrue(){
  document.getElementById('dupName').innerHTML = "That name is taken, please chose another list name!"
        var inputbox = document.getElementById('username');
        inputbox.value = "";
        inputbox.placeholder = "Choose A Different Name ";
        inputbox.style.width = "200px";
}

//Check local storage for duplicate list names
function checkForDuplicateList(listname) {
    var halt = false;
    for (var x in stuffOnYourBrowser) {
        if (x == listname.toLowerCase()) {
            halt = true;
        }
    }
    return halt;
}

//All the functions to be called when the To Do List loads to populate numbers on page with local storage data
function OnLoad() {

    //Calls function to personalize the page
    addUserNameToHTML(listName, "userName");

    //Pull items from storage and creats the initial list of tasks
    makeFirstList();

    //Count number of tasks to be done
    itemsInList();

    //This is BROKEN
    document.getElementById("totaldone").innerHTML = "<br>Not Currently Working :(";
}

//This function will change inner html of all elements with this class name
function addUserNameToHTML(newHTML, className) {

    // creates an array of all the elements that have that class name
    var useOfClassName = document.getElementsByClassName(className);

    //loop to go through all the elements in the list
    for (var i = 0; i < useOfClassName.length; i++) {

        //change the inner HTML to the new text
        useOfClassName[i].innerHTML = newHTML;
    }
}

//Upon load I need to have a funtion that display all the items in local storage
//for each value in local storage, append to my myList
function makeFirstList() {
    //foreach loop to go throught my array of to items
    for (var k in toDoItems) {
        //If no tasks, there will be a single "" item in array by default
        //Removed items from array and tells user to create task
        if (toDoItems[k] == "") {
            toDoItems.splice(0, 1);
            zeroItems();
        } else {
            addItemToDoToList(toDoItems[k]);
        }
    }
}


function addToListOnClick(item) {
    //TODO ***** Make Function To Check For Name and if name is eqaul to value in array, then tell user to get a life and be more specific

    //Add item to array
    toDoItems.push(item);

    //update local storage
    stuffOnYourBrowser[listName] = toDoItems;

    //Make new element
    addItemToDoToList(item);

    document.getElementById('additem').innerHTML = "";

    return false;
}



//Function that Add Tasks to the list by creating elements and jamming them in ul
function addItemToDoToList(item) {

    //createinput checkbox and it's attributes
    var checkboxitem = document.createElement('input');
    checkboxitem.type = "checkbox";

    checkboxitem.className = "todoitem";

    // took a while to figure out that I didn't need quotes or () to call function
    checkboxitem.onclick = rem;

    //create label for each checkbox
    var label = document.createElement('label');
    label.innerHTML = item;

    //create list item
    var node = document.createElement("LI");
    node.className = "todoValue";
    node.setAttribute("data-title", item);




    //append both the checkbox and label to each list item
    node.appendChild(checkboxitem);
    node.appendChild(label);

    //append li to ul id="myList"
    document.getElementById("myList").appendChild(node);

    // Display total number of items in todo list
    itemsInList();

    //Clear the todo item input box
    document.forms['todoinput'].reset();

    //return false to prevent form from reloading page
    return false;
}

//Remove Tasks
function rem(e) {

    // define event target is the checkbox
    var eventarget = e.target;

    //define parent element,in this case "LI"
    var parent = eventarget.parentElement;

    //remove list item
    parent.parentNode.removeChild(parent);

    //Define the name of the item to be removed from array
    var itemname = e.target.name;

    //Index item to remove from array
    var indexNumer = toDoItems.indexOf(itemname);

    //Remove item from array of tasks
    toDoItems.splice(indexNumer, 1);

    //Update local storage
    stuffOnYourBrowser[listName] = toDoItems;

    //Display total number of items in todo list
    itemsInList();

}

//User Selecet Page, populates list of all the users
function popluarToDoLists() {
    //If no list are in storage,
    if (stuffOnYourBrowser.key(0) == null) {

        document.getElementById("noUsers").innerHTML = "No Lists Availabe";
    } else {
        for (var x in stuffOnYourBrowser) {
            //creates elements one by one
            createLinkElements(x);
        }
    }


    //Creates element for list of all the todo lists
    //More elements that I needed to make, but it served as a great practice creating elements and nesting them to a parent
    function createLinkElements(linkText) {

        var listElementToHoldEverything = document.createElement('LI');
        listElementToHoldEverything.className = "listholderlist";

        var linkToUserToDoList = document.createElement('a');
        linkToUserToDoList.name = linkText;
        linkToUserToDoList.className = "listName";
        linkToUserToDoList.onclick = bakeCookie;
        linkToUserToDoList.href = "todo.html";

        var deleteListButton = document.createElement('button');
        deleteListButton.onclick = removeList2;
        deleteListButton.className = "btn btn-danger btn-md deleteListButton";
        deleteListButton.href = "#";
        deleteListButton.name = linkText;

        var buttonText = document.createTextNode("click to delete list");
        deleteListButton.appendChild(buttonText);

        var userListName = document.createTextNode(linkText);
        linkToUserToDoList.appendChild(userListName);
        listElementToHoldEverything.appendChild(linkToUserToDoList);
        listElementToHoldEverything.appendChild(deleteListButton);
        document.getElementById("users").appendChild(listElementToHoldEverything);
    }

    function bakeCookie(e) {
        var cookieReceipe = e.target.name;
        createCookie(cookieReceipe);
    }
}

function removeList2(e) {
    var listToRemove = e.target.name;
    stuffOnYourBrowser.removeItem(listToRemove);

    // define event target is the checkbox
    var eventarget = e.target;

    //define parent element,in this case "LI"
    var parent = eventarget.parentElement;
    parent.parentNode.removeChild(parent);
    //    popluarToDoLists();
    if (stuffOnYourBrowser.key(0) == null) {

        document.getElementById("noUsers").innerHTML = "No Lists Availabe";
    }
}

function removeList() {
    stuffOnYourBrowser.removeItem(listName);
}

// Function counts and displays total number of tasks that still need to be completed
function itemsInList() {
    var totalitems = toDoItems.length;
    if (totalitems == 0) {
        zeroItems();
    }
    document.getElementById("total").innerHTML = totalitems;
}

//If no items are in to do list, tell user to add more
function zeroItems() {
    document.getElementById('additem').innerHTML = "You Have Zero To Do Items.<br> Please Add An Item!";
}

/////////////////////////////////////////
///  Part 2 of the project, add some sweet jQuery
////////////////////////////////////////////


//If coooke is blank then display help on Select User Screen
if (document.cookie == ""){
    $('.help').removeClass('hide');
    $('.selectUser').addClass('hide');
    $('#or').addClass('hide');
}

//If first time loading list, display help
if(toDoItems == "Make Your First To Do Item!"){
    $('.sidehelp').removeClass('hide');
}

//when user clicks exit help button, the side help will hide
$('#removeSideHelp').click(function(){
        $('.sidehelp').addClass('hide');
});

//User clicks help button in havbar, side help appears
$('#helpButton').click(function(){
     $('.sidehelp2').removeClass('hide');
      $('.sidehelp').addClass('hide');
});


//when user clicks exit help button, the side help will hide
$('#removeSideHelp2').click(function(){
        $('.sidehelp2').addClass('hide');
});
