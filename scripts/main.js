let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  if(this.read === true) {
    return `${this.title} by ${this.author}, ${this.pages} pages, read.`
  }
  else {
    return `${this.title} by ${this.author}, ${this.pages} pages, not read yet.`
  }
}

function addBookToLibrary() {
  let title = prompt("What is the book's title?");
  let author = prompt("Who is the book's author?");
  let pages = prompt("How many pages does the book have?");
  let read_answer = prompt("Have you read the book? Enter y for yes. Any other response will be taken as no.");
  let read = false;

  if(read_answer === 'y') {
    read = true;
  }

  myLibrary.push(new Book(title, author, pages, read))
}

// addBookToLibrary();

// console.log(myLibrary);
