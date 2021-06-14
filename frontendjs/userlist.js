// console.log('its working');
function editUserInfo(event) {
    const rowElement = getRowElement(event);
    const childrenElements = rowElement.children;
    const userNameElement = childrenElements.item(1);
    const userEmailElement = childrenElements.item(2);
    const userAgeElement = childrenElements.item(3);
    makeElementEditable(userNameElement);
    makeElementEditable(userEmailElement);
    makeElementEditable(userAgeElement);
    console.log(event, rowElement, childrenElements);
    console.log(userNameElement);
}

function deleteUserInfo(event) {
    // Send a POST request
    const userIdToDelete = getRowElement(event).children.item(0).textContent;
axios({
    method: 'delete',
    url: '/deleteuser',
    data: {
      userIdToDelete
    }
  });
    getRowElement(event).remove();
    console.log(event);
}

function getRowElement(event) {
    const rowElement = event.target.parentElement.parentElement.parentElement;
    return rowElement 
}

function makeElementEditable(element) {
    element.style.backgroundColor="lightgray";
    element.style.border = "2px solid #0000FF";
    element.contentEditable=true;
}

function saveUserInfo(event) {
    const userid = getRowElement(event).children.item(0).textContent;
    const username = getRowElement(event).children.item(1).textContent;
    const email = getRowElement(event).children.item(2).textContent;
    const age = getRowElement(event).children.item(3).textContent;
    
    const userToUpdate = {
        userid,
        username,
        email,
        age 
    }
    
    axios({
        method: 'put',
        url: '/updateuser',
        data: {
          userToUpdate
        }
      });
}