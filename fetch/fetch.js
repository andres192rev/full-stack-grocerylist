
/////MY CONTAINERS for text////////////////////
const item_name_container = document.querySelector("#item_name_container");
const item_price_container = document.querySelector("#item_price_container");
const item_quantity_container = document.querySelector("#item_quantity_container");
const item_purchased_container = document.querySelector("#item_purchased_container");
const item_id_container = document.querySelector("#item_id_container");
const item_result_container = document.querySelector("#item_result_container");


/////whats gonna show on the page/////////////
////////////The result/////////////////
const responeMessage = document.querySelector('#response_message');


/////////////////my POST/Form STUFF/////////////
/////////////////and buttons/////////////////////
const itemNameBox = document.querySelector("#item_name_box");
const itemPriceBox = document.querySelector("#item_price_box");
const itemQuantityBox = document.querySelector("#item_quantity_box");
const itemPurchasedBox = document.querySelector("#item_purchased_box");
const itemIdBox = document.querySelector("#item_id_box");
const submitButton = document.querySelector("#submit");
const getAllButton = document.querySelector("#get_all_button");
//const getItemButton = document.querySelector("#get_item_button");
const editItemButton = document.querySelector("#edit_item_button");
const deleteItemButton = document.querySelector("#delete_item_button");


///Assign the buttons to a click event listener for respective functions
submitButton.addEventListener("click", addItem);
getAllButton.addEventListener("click", getAllItems);
deleteItemButton.addEventListener("click", deleteItem);
editItemButton.addEventListener("click", updateItemById);



//get all items using the get all button
async function getAllItems(){
    //assign values from boxes to vars we are gonna send 
    //let pokeId = searchBox.value;

    let url = `http://localhost:3000/api/groceryList`;
    try{
        let response = await fetch(url, {
          
            method: "GET"
        });
        let data = await response.json();
        renderHTML(data);
    }catch(err){
        console.error(err);
    }
}

//get item using the get item button
async function updateItemById(){
    
    let itemId = itemIdBox.value;
    let itemPurchased = itemPurchasedBox.value;
    
    try{
        const dataToSend = {id: itemId,
                            purchased: "Changed"
                            };
        const response = await fetch('http://localhost:3000/api/editItem', {
            method: 'PUT',
       
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', /* @dev First, read about security */
                'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT',
  
            },
            body: JSON.stringify(dataToSend)
        });
        if (!response.ok){
            throw new Error('Network response was not OK');
        }
        const data = await response.json();
        console.log(data);
    }catch(err){
        console.error(err);
    }
}

//post our data when adding a item 
async function addItem() {

    let itemName = itemNameBox.value;
    let itemPrice = itemPriceBox.value;
    let itemQuantity = itemQuantityBox.value;
    let itemPurchased = itemPurchasedBox.value;
    
    try{
        const dataToSend = {productName: itemName,
                            price: itemPrice,
                            qty: itemQuantity,
                            itemPurchased: itemPurchased
                            };
        const response = await fetch('http://localhost:3000/api/addItem', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', /* @dev First, read about security */
                'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
  
            },
            body: JSON.stringify(dataToSend)
        });
        if (!response.ok){
            throw new Error('Network response was not OK');
        }
        const data = await response.json();
        console.log(data);
    }catch(err){
        console.error(err);
    }
}

//delete item using id
async function deleteItem() {

    let itemId = itemIdBox.value;
    
    try{
        const dataToSend = {id: itemId
                            };
        const response = await fetch('http://localhost:3000/api/groceryList', {
            method: 'DELETE',
       
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', /* @dev First, read about security */
                'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, Delete, Update',
  
            },
            body: JSON.stringify(dataToSend)
        });
        if (!response.ok){
            throw new Error('Network response was not OK');
        }
        const data = await response.json();
        console.log(data);
    }catch(err){
        console.error(err);
    }
}



function renderHTML(data){
   
    res = JSON.stringify(data);

    responeMessage.innerText = res;
}