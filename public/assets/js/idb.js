//CREATE A VAR TO HOLD THE DB CONNECTION
let db;
//ESTABLISH A CONNECTION TO INDEXEDDB CALLED 'PIZZA_HUNT' AND SET TO VERSION 1
const request = indexedDB.open('pizza_hunt', 1);

//THIS EVENT WILL EMIT IF THE DB VERSION CHANGES
request.onupgradeneeded = function (event) {
    //SAVE A REFERENCE TO THE DATABASE
    const db = event.target.result;
    //CREATE AN OBJECT STORE(TABLE) CALLED 'NEW_PIZZA', SET TO HAVE A SIM SWL AUTO INCREMENTING PRIMARY KEY
    db.createObjectStore('new_pizza', { autoIncrement: true });
};

//ADDITIONAL EVENT LISTENERS
//UPON SUCCESS
request.onsuccess = function (event) {
    //WHEN DB IS OK - CREATED W OBJECT STORE - OR - EST. A CONNECTION = SAVE A REF TO THE DB IN  GLOBAL VAR
    db = event.target.result;

    //CHECK IF APP IS ONLINE --> IF Y RUN UPLOADPIZZA() AND SEND ALL LOCAL DB DATA TO API
    if (navigator.online) {
        //ADD FUNCTION TO UPLOADPIZZA();
        uploadPizza();
    }
};

request.onerror = function (event) {
    //LOG ERR HERE
    console.log(event.target.errorCode);
};

//NO INTERNET CONNECTION
function saveRecord(record) {
    //OPEN A NEW TRANSACTION W THE DB W READ AND WRITE PERMISSIONS
    const transaction = db.transaction(['new_pizza'], 'readwrite');

    //ACCESS THE OBJECT STORE FOR `NEW_PIZZA`
    const pizzaObjectStore = transaction.objectStore('new_pizza');

    //ADD RECORD TO YOUR STORE W ADD METHOD
    pizzaObjectStore.add(record);
}


function uploadPizza() {
    //OPEN A TRANSACTION ON YOUR DB
    const transaction = db.transaction(['new_pizza'], 'readwrite');

    //ACCESS THE OBJECT STORE
    const pizzaObjectStore = transaction.objectStore('new_pizza');

    //SET ALL RECORDS TO A VARIABLE
    const getAll = pizzaObjectStore.getAll();

    getAll.onsuccess = function () {
        //SEND LOCALLY STORED DATA FROM INDEXEDDB'S STORE TO THE API'S SERVER USING A FETCH()
        if (getAll.result.length > 0) {
            fetch('/api/pizzas', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(serverResponse => {
                    if (serverResponse.message) {
                        throw new Error(serverResponse);
                    }
                    //OPEN ONE MORE TRANSACTION
                    const transaction = db.transaction(['new_pizza'], 'readwrite');
                    const pizzaObjectStore = transaction.objectStore('new_pizza');
                    //CLEAR-OUT STORE
                    pizzaObjectStore.clear();

                    alert('All saved pizza has been submitted!');
                })
                .catch(err => {
                    //REDIRECT REFERENCE
                    console.log(err);
                });
        }
    };
}

//LISTEN FOR APP TO COME BACK ONLINE
window.addEventListener('online', uploadPizza);
