let book;

const addBtn = document.querySelector('.new-book');
const cancelBtn = document.querySelector('#cancel');

const bookName = document.querySelector('#name');
const authorName = document.querySelector('#author');
const pagesRead = document.querySelector('#pages');

const dialog = document.querySelector('#book-dialog');
const form = document.querySelector('#book-dialog form');

const container = document.querySelector('#container');

const myLibrary = [];


// events
addBtn.addEventListener('click', (e) => {
    e.preventDefault();

    dialog.showModal() // show the modal
});
cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();

    dialog.close();
    form.reset();
})
form.addEventListener('submit', e =>{
    e.preventDefault(); // safeguard for smth IDK

    book = new Book(bookName.value, authorName.value, pagesRead.value, generateID());
    // creating the book object

    myLibrary.push(book);
    displayBooks();

    dialog.close();
    form.reset();
});

// helper functions / constructors
function Book(name, author, pagesRead, id) {
    if (!new.target) {
        throw new Error("You need to use the `new` operator to create an object using Book constructor.")
    }

    this.name = name;
    this.author = author;
    this.pagesRead = pagesRead;
    this.id = id;
    this.color = backgroundColor()
    this.isRead = false;
} // Book constructor
Book.prototype.markAsRead = function() {
    this.isRead = true;

}

function generateID() {
    return self.crypto.randomUUID();
}
function displayBooks() {
    container.innerHTML = '';


    for (const book of myLibrary) {
        let card = document.createElement('div');
        card.setAttribute('id', book.id);
        container.appendChild(card)

        const book_name = document.createElement('h3');
        book_name.classList.add(book.name.split(" ").join("_"));
        card.appendChild(book_name);
        book_name.textContent = book.name;

        const author = document.createElement('p');
        author.classList.add(book.author.split(" ").join("_"));
        card.appendChild(author);
        author.textContent = book.author;

        const pages_read = document.createElement('p');
        pages_read.classList.add('pages_read');
        card.appendChild(pages_read);
        pages_read.textContent = `${book.pagesRead} pages has been read`;

        // styling
        card.style.display = "flex";
        card.style.flexDirection = "column";
        card.style.gap = "25px";
        card.style.justifyContent = "center";
        card.style.alignItems = "center";
        card.style.backgroundColor = book.color;

        const readStatusBtn = document.createElement('button');
        readStatusBtn.classList.add('readst')
        readStatusBtn.textContent = "Finish"; // default value

        // styling
        readStatusBtn.style.padding = "7px 16px";
        readStatusBtn.style.border = "1.5px solid rgba(255, 255, 255, 0.5)";
        readStatusBtn.style.borderRadius = "20px";
        readStatusBtn.style.backgroundColor = "rgba(16, 185, 129, 0.85)";
        readStatusBtn.style.color = "#ffffff";
        readStatusBtn.style.fontWeight = "600";
        readStatusBtn.style.fontSize = "13px";
        readStatusBtn.style.cursor = "pointer";
        readStatusBtn.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.12)";
        card.appendChild(readStatusBtn);

        readStatusBtn.addEventListener('click', e => {})



        const removeBookBtn = document.createElement('button');
        removeBookBtn.classList.add('remove-btn');
        removeBookBtn.dataset.id = book.id;
        removeBookBtn.textContent = "Remove";

        // styling
        readStatusBtn.style.padding = "7px 16px";
        readStatusBtn.style.border = "1.5px solid rgba(255, 255, 255, 0.5)";
        readStatusBtn.style.borderRadius = "20px";
        readStatusBtn.style.color = "#ffffff";
        readStatusBtn.style.fontWeight = "600";
        readStatusBtn.style.fontSize = "13px";
        readStatusBtn.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.12)";

        if (book.isRead) {
            readStatusBtn.textContent = "Finished";
            readStatusBtn.disabled = true;
            readStatusBtn.style.backgroundColor = "rgba(107, 114, 128, 0.6)";
            readStatusBtn.style.cursor = "not-allowed";
            readStatusBtn.style.opacity = "0.7";
        } else {
            readStatusBtn.textContent = "Finish";
            readStatusBtn.style.backgroundColor = "rgba(16, 185, 129, 0.85)";
            readStatusBtn.style.cursor = "pointer";
        }

        card.appendChild(removeBookBtn);
        readStatusBtn.addEventListener('click', e => {
            book.markAsRead();
            displayBooks();
        })

        removeBookBtn.addEventListener('click', () => {
            const index = myLibrary.findIndex(item => item.id === book.id);
            if (index !== -1) {
                myLibrary.splice(index, 1);
            }
            displayBooks();
        });

    }



}
function backgroundColor() {

    let o = Math.round, r = Math.random, s = 255;

    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';

}