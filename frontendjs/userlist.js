// console.log('its working');
function editUserInfo(event) {
    const rowElement = getRowElement(event);
    const childrenElements = rowElement.children;
    const userFirstNameElement = childrenElements.item(1);
    const userLastNameElement = childrenElements.item(2);
    const userEmailElement = childrenElements.item(3);
    const userAgeElement = childrenElements.item(4);
    makeElementEditable(userFirstNameElement);
    makeElementEditable(userLastNameElement);
    makeElementEditable(userEmailElement);
    makeElementEditable(userAgeElement);
}

function deleteUserInfo(event) {
    // Send a POST request
    const userid = getRowElement(event).children.item(0).textContent;
    const first_name = getRowElement(event).children.item(1).textContent;
    const last_name = getRowElement(event).children.item(2).textContent;
    const email = getRowElement(event).children.item(3).textContent;
    const age = getRowElement(event).children.item(4).textContent;
    
    const userToDelete = {
        userid,
        first_name,
        last_name,
        email,
        age 
    }
axios({
    method: 'delete',
    url: '/deleteuser',
    data: {
      userToDelete
    }
  });
    getRowElement(event).remove();
    console.log(event);
}

function getRowElement(event) {
    const rowElement = event.target.parentElement.parentElement.parentElement;
    return rowElement; 
}

function makeElementEditable(element) {
    element.style.backgroundColor="lightgray";
    element.style.border = "2px solid #0000FF";
    element.contentEditable=true;
}

function saveUserInfo(event) {
    const userid = getRowElement(event).children.item(0).textContent;
    const first_name = getRowElement(event).children.item(1).textContent;
    const last_name = getRowElement(event).children.item(2).textContent;
    const email = getRowElement(event).children.item(3).textContent;
    const age = getRowElement(event).children.item(4).textContent;
    
    const userToUpdate = {
        userid,
        first_name,
        last_name,
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

function searchByLastName(event) {  
  const inputElement = document.querySelector('#search');
  const search = inputElement.value;
  const descending = getUrlParameter('descending'); 
  window.location = '/userlist?descending=' + descending + '&search=' + search;
  console.log('searched successfully');
}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};