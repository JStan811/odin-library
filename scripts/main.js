// Library object

function Library() {
  this.books = [];
}

// function addBookToLibrary() {
//   let title = prompt("What is the book's title?");
//   let author = prompt("Who is the book's author?");
//   let pages = prompt("How many pages does the book have?");
//   let readStatusResponse = prompt("Have you read the book? Enter y for yes. Any other response will be taken as no.");
//   let readStatus = false;

//   if(readStatusResponse === 'y') {
//     readStatus = true;
//   }

//   myLibrary.push(new Book(title, author, pages, readStatus))
// }

Library.prototype.createBookCardElement = function() {
  const bookCard = document.createElement('article');
  bookCard.classList.add('card');
  return bookCard;
}

Library.prototype.createBookCardImgElement = function(book) {
  const bookCardImg = document.createElement('img');
  bookCardImg.src = book.coverImage;
  bookCardImg.alt = 'Book cover, either a default generic one or one inputted by a user';
  return bookCardImg;
}

Library.prototype.createBookCardTextElement = function() {
  const bookCardText = document.createElement('section');
  bookCardText.classList.add('card-text');
  return bookCardText;
}

Library.prototype.createBookTitleElement = function(book) {
  const bookTitle = document.createElement('h2');
  bookTitle.textContent = book.title;
  return bookTitle;
}

Library.prototype.createBookAuthorElement = function(book) {
  const bookAuthor = document.createElement('p');
  bookAuthor.textContent = book.author;
  return bookAuthor;
}

Library.prototype.createBookPagesElement = function(book) {
  const bookPages = document.createElement('p');
  bookPages.textContent = book.pages;
  return bookPages;
}

Library.prototype.createBookReadStatusElement = function(book) {
  const bookReadStatus = document.createElement('p');
  bookReadStatus.textContent = book.readStatus;
  return bookReadStatus;
}

Library.prototype.addContentsToBookCard = function(bookCard, book) {
  bookCard.appendChild(this.createBookCardImgElement(book));
  const bookCardText = this.createBookCardTextElement();
  this.addContentsToBookCardText(bookCardText, book);
  bookCard.appendChild(bookCardText);
}

Library.prototype.addContentsToBookCardText = function(bookCardText, book) {
  bookCardText.appendChild(this.createBookTitleElement(book));
  bookCardText.appendChild(this.createBookAuthorElement(book));
  bookCardText.appendChild(this.createBookPagesElement(book));
  bookCardText.appendChild(this.createBookReadStatusElement(book));
}

Library.prototype.displayBookCards = function() {
  const cardContainer = document.querySelector('.card-container');

  this.books.forEach (book => {
    const bookCard = this.createBookCardElement();
    this.addContentsToBookCard(bookCard, book);
    cardContainer.appendChild(bookCard);
  })
}

// Book object

function Book(title, author, pages, readStatus, coverImage = 'img/default-cover.jpg') {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.coverImage = coverImage;
}

Book.prototype.info = function () {
  if(this.readStatus === true) {
    return `${this.title} by ${this.author}, ${this.pages} pages, read.`;
  }
  else {
    return `${this.title} by ${this.author}, ${this.pages} pages, not read yet
        `;
  }
}

// Main
const library = new Library();

const dune = new Book('Dune', 'Frank Herbert', 400, true, 'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-book-covers-fall-2019/large/bbcdune.jpg?1384968217')

const genericBook = new Book('Title', 'Author', 300, false)

library.books.push(dune);
library.books.push(genericBook);
library.books.push(genericBook);
library.books.push(genericBook);
library.books.push(genericBook);

library.displayBookCards();
