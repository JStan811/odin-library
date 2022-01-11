let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function() {
    if(this.read === true) {
      return `${title} by ${author}, ${pages} pages, read.`
    }
    else {
      return `${title} by ${author}, ${pages} pages, not read yet.`
    }
  }
}

function addBookToLibrary() {
  let title = prompt("What is the book's title?");
  let author = prompt("Who is the book's author?");
  let pages = prompt("How many pages does the book have?");
  let read_answer = prompt("Have you read the book? Enter y or n");
  let read = false;

  if(read_answer === 'y') {
    read = true;
  }

  myLibrary.push(new Book(title, author, pages, read))
}

// addBookToLibrary();

// console.log(myLibrary);
