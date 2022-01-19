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

Library.prototype.createBookCardImgElement = function() {
  const bookCardImg = document.createElement('img');
  bookCardImg.src = 'img/default-cover.jpg';
  bookCardImg.alt = 'Default generic book cover'
  return bookCardImg;
}

Library.prototype.createBookCardTextElement = function() {
  const bookCardText = document.createElement('section');
  bookCardText.classList.add('card-text');
  return bookCardText;
}

Library.prototype.createBookTitleElement = function() {
  const bookTitle = document.createElement('h2');
  bookTitle.textContent = 'Book Title';
  return bookTitle;
}

Library.prototype.createBookAuthorElement = function() {
  const bookAuthor = document.createElement('p');
  bookAuthor.textContent = 'Book Author';
  return bookAuthor;
}

Library.prototype.createBookPagesElement = function() {
  const bookPages = document.createElement('p');
  bookPages.textContent = 'Book Pages';
  return bookPages;
}

Library.prototype.createBookReadStatusElement = function() {
  const bookReadStatus = document.createElement('p');
  bookReadStatus.textContent = 'Book Read Status';
  return bookReadStatus;
}

Library.prototype.addContentsToBookCard = function(bookCard) {
  bookCard.appendChild(this.createBookCardImgElement());
  const bookCardText = this.createBookCardTextElement();
  this.addContentsToBookCardText(bookCardText);
  bookCard.appendChild(bookCardText);
}

Library.prototype.addContentsToBookCardText = function(bookCardText) {
  bookCardText.appendChild(this.createBookTitleElement());
  bookCardText.appendChild(this.createBookAuthorElement());
  bookCardText.appendChild(this.createBookPagesElement());
  bookCardText.appendChild(this.createBookReadStatusElement());
}

Library.prototype.displayBookCards = function() {
  const cardContainer = document.querySelector('.card-container');

  const bookCard = this.createBookCardElement();
  this.addContentsToBookCard(bookCard);
  cardContainer.appendChild(bookCard);
}

// Book object

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
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

library.displayBookCards();

