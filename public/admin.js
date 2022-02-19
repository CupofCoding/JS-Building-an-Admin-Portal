
// Your Code Here
async function main() {

    let response = await fetch('http://localhost:3001/listBooks')
    let books = await response.json()

    books.forEach(renderBook)
}

let root = document.querySelector('#root');
let root2 = document.querySelector('#root2')
const year = new Date().getFullYear();

function renderBook(book) {
    let li = document.createElement('li');     
    li.textContent = book.title;               //li element created with book title
    
    let quantityInput = document.createElement('input');
    quantityInput.value = book.quantity;

    let saveButton = document.createElement('button')
    saveButton.textContent = 'Save';

    let deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete';

    saveButton.addEventListener('click', ()=>{
        fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: book.id,
                quantity: quantityInput.value
            })
        })
        window.location.reload();
    })

    deleteButton.addEventListener('click', ()=>{
        fetch(`http://localhost:3001/removeBook/${book.id}`, {
            method: 'Delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: book.id,
                quantity: quantityInput.value
            })
        })
        window.location.reload();
    })

    li.append(quantityInput, saveButton, deleteButton);
    root.append(li)
}

let id = 5;
//adding book function
function addBook(){
    // ---- FORM ---
    let form = document.createElement("form");
    form.setAttribute("method", "post");

    let bookTitle = document.createElement('input');
    bookTitle.setAttribute('type', 'text');
    bookTitle.setAttribute('placeholder', 'Book Title');

    let bookDescription = document.createElement('input');
    bookDescription.setAttribute('type', 'text');
    bookDescription.setAttribute('placeholder', 'Enter a Description');

    let imgUrl = document.createElement('input');
    imgUrl.setAttribute('type', 'text');
    imgUrl.setAttribute('placeholder', 'Enter img URL');

    let submitButton = document.createElement('button')
    submitButton.textContent = 'Submit';

    form.append(bookTitle);
    form.append(bookDescription);
    form.append(imgUrl);

    root2.append(form,submitButton);

    //setting default quantity = 1
    let quantityInput = 1;

    submitButton.addEventListener('click', ()=>{
        fetch(`http://localhost:3001/addBook`, {
            method: 'Post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: id,
                title: bookTitle.value,
                description: bookDescription.value,
                year: year,
                quantity: quantityInput,
                imageURL: imgUrl.value
            })
        })
        //window.location.reload();
    })
}

main()
addBook();