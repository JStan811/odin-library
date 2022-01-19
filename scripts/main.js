// Object set up
const library = new Library();

// Library object

function Library() {
  this.books = [];
}

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

Library.prototype.clearBookCards = function() {
  const cardContainer = document.querySelector('.card-container');

  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
}

Library.prototype.addBookToLibraryOnSubmit = function() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const readStatus = document.getElementById('readStatus').value;
  console.log(readStatus);
  let coverImage;
  if (document.getElementById('coverImage').value) {
    coverImage = document.getElementById('coverImage').value;
  }

  this.books.push(new Book(title, author, pages, readStatus, coverImage));

  this.clearBookCards();
  this.displayBookCards()

  newBookFormContainer.style.display = 'none';
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

// Page events
// show form upon clicking new book
const newBookBtn = document.querySelector('.new-book-button');
const newBookFormContainer = document.querySelector('.form-container');
newBookBtn.addEventListener('click', () => {
  newBookFormContainer.style.display = 'flex';
})

// add book to library upon clicking submit
const newBookForm = document.querySelector('form');
newBookForm.addEventListener('submit', e => {
  // prevent form from submitting
  e.preventDefault();

  library.addBookToLibraryOnSubmit();
});

// Main
library.displayBookCards();

// write a function to just display one book, then do that after a user adds it
// but then whats the point of having an array, I suppose since I have the array
// I should just add the new book to the array, wipe the page, then run display
// again
