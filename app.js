/* add your code here */
document.addEventListener('DOMContentLoaded', () => {
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);
    generateUserList(userData, stocksData);
    const deleteButton = document.querySelector('#deleteButton');
    const saveButton = document.querySelector('#saveButton');
    deleteButton.addEventListener('click', (event) => {
      // we don't want the form to submit (since we will lose form state)
      event.preventDefault();
  
      // find the index of the user in the data array 
      const userId = document.querySelector('#userID').value;
      const userIndex = userData.findIndex(user => user.id == userId);
      // remove the user from the array
      userData.splice(userIndex, 1);
      // render the user list
      generateUserList(userData, stocksData);
    });
  
    saveButton.addEventListener('click', (event) => {
      // we don't want the form to submit (since we will lose form state)
      event.preventDefault();
  
      // find the user object in our data
      const id = document.querySelector('#userID').value;
  
      for (let i=0; i<users.length; i++) {
          // found relevant user, so update object at this index and redisplay
          if (users[i].id == id) {
  
              users[i].user.firstname = document.querySelector('#firstname').value;
              users[i].user.lastname = document.querySelector('#lastname').value;
              users[i].user.address = document.querySelector('#address').value;
              users[i].user.city = document.querySelector('#city').value;
              users[i].user.email = document.querySelector('#email').value;     
  
              generateUserList(users, stocks);
          }
      }
    });
  
  });

  function generateUserList(users,stocks) {
    // get the list element and for each user create a list item and append it to the list
    const userList = document.querySelector('.user-list');
  // clear out the list from previous render
    userList.innerHTML = '';

    users.map(({ user, id }) => {
      const listItem = document.createElement('li');
      listItem.innerText = user.lastname + ', ' + user.firstname;
      listItem.setAttribute('id', id);
      userList.appendChild(listItem);
      // register the event listener on the list
    userList.addEventListener('click', (event) => handleUserListClick(event, users));
    });
  }

  function handleUserListClick(event, users) {
    // get the user id from the list item
    const userId = event.target.id;
    // find the user in the userData array
    // we use a "truthy" comparison here because the user id is a number and the event target id is a string
    const user = users.find(user => user.id == userId);
    // populate the form with the user's data
    populateForm(user);
    renderPortfolio(user, stocks);
  }


  function populateForm(data) {
    const { user, id } = data;
  
    document.querySelector("#userID").value = id;
  
    const fields = [
      { fieldId: "#firstname", value: user.firstname },
      { fieldId: "#lastname", value: user.lastname },
      { fieldId: "#address", value: user.address },
      { fieldId: "#city", value: user.city },
      { fieldId: "#email", value: user.email },
    ];
  
    fields.forEach(({ fieldId, value }) => {
      document.querySelector(fieldId).value = value;
    });
  }
  
  function viewStock(symbol, stocks) {
    const stockArea = document.querySelector('.stock-form');
    if (stockArea) {
      const stock = stocks.find(s => s.symbol == symbol);
      document.querySelector('#stockName').textContent = stock.name;
      document.querySelector('#stockSector').textContent = stock.sector;
      document.querySelector('#stockIndustry').textContent = stock.subIndustry;
      document.querySelector('#stockAddress').textContent = stock.address;
      document.querySelector('#logo').src = `logos/${symbol}.svg`;
    }
  }



  function renderPortfolio(user, stocks) {
    // get the user's stock data
    const { portfolio } = user;
    // get the portfolio list element
    const portfolioDetails = document.querySelector('.portfolio-list');
    // clear the list from previous render
    portfolioDetails.innerHTML = '';
    // map over portfolio items and render them
    portfolio.map(({ symbol, owned }) => {
      // create a list item and append it to the list
      const symbolEl = document.createElement('p');
      const sharesEl = document.createElement('p');
      const actionEl = document.createElement('button');
      symbolEl.innerText = symbol;
      sharesEl.innerText = owned;
      actionEl.innerText = 'View';
      actionEl.setAttribute('id', symbol);
      portfolioDetails.appendChild(symbolEl);
      portfolioDetails.appendChild(sharesEl);
      portfolioDetails.appendChild(actionEl);
    });
    portfolioDetails.addEventListener('click', (event) => {
      // let's make sure we only handle clicks on the buttons
      if (event.target.tagName === 'BUTTON') {
        viewStock(event.target.id, stocks);
      }
    });
  }



  
