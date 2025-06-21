// To store all book objects
const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}


// function for popup form when i click "add book"
function popup() {
    let openForm = document.querySelector(".create");
    let closeForm = document.querySelector(".close");
    let card = document.querySelector(".card");

    openForm.addEventListener("click", () => {
        card.classList.remove("hidden");
    })
    closeForm.addEventListener("click", () => {
        card.classList.add("hidden");
    })
}

function addBookToLibrary() {

    let form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        let author = formData.get("author");
        let title = formData.get("title");
        let pages = formData.get("pages");
        let read = formData.get("read");
        let book = new Book(title, author, pages, read);

        myLibrary.push(book);
        display();

    })
}
popup();
addBookToLibrary();

function display() {
    let books = document.querySelector(".books");
    books.innerHTML = null;

    myLibrary.forEach(book => {
        let div = document.createElement("div");
        div.classList.add("book");

        let heading = document.createElement("h4");
        heading.textContent = `${book.title}`;

        let body = document.createElement("div");
        body.classList.add("body");

        body.innerHTML = `<div class="book_author"> ~ written by ${book.author}</div>
                         <div class="book_pages">pages : ${book.pages}</div>
                         <div class="read_status">read : ${book.read}</div>`;

        const readStatus = body.querySelector(".read_status");
        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Toggle Read";
        toggleBtn.addEventListener("click", () => {
            book.read = (book.read === "yes") ? "not read" : "yes";
            readStatus.textContent = `read : ${book.read}`;
        });

        body.appendChild(toggleBtn);

        let bin = document.createElement("div");
        bin.classList.add("delete");

        let button = document.createElement("button");
        button.classList.add("bin");
        button.textContent = `delete`;
        button.addEventListener("click", () => {
            div.remove();
            myLibrary.splice(myLibrary.indexOf(book), 1);
        });

        books.appendChild(div);
        div.appendChild(heading);
        div.appendChild(body);
        div.appendChild(bin);
        bin.appendChild(button);
    });
}
