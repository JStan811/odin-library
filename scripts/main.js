// Object set up
const library = new Library();

// Library object

function Library() {
  this.books = [];
}

Library.prototype.createBookCardElement = function(bookIndex) {
  const bookCard = document.createElement('article');
  bookCard.classList.add('card');
  bookCard.dataset.indexNumber = bookIndex;
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
  bookReadStatus.textContent = book.readStatus ? 'Read' : 'Unread';
  return bookReadStatus;
}

Library.prototype.createRemoveBookButton = function() {
  const removeBookButton = document.createElement('button');
  removeBookButton.textContent = 'Remove';
  return removeBookButton;
}

Library.prototype.addRemoveBookClickEvent = function(removeBookButton) {
  const parentCard = removeBookButton.parentNode;
  const bookIndex = parentCard.dataset.indexNumber;
  removeBookButton.addEventListener('click', () => {
    this.books.splice(bookIndex, 1);
    this.clearBookCards();
    this.displayBookCards();
  })
}

Library.prototype.setUpRemoveBookButton = function(bookCard) {
  const removeBookButton = this.createRemoveBookButton();
  bookCard.appendChild(removeBookButton);
  this.addRemoveBookClickEvent(removeBookButton);
}

Library.prototype.createChangeReadStatusButton = function() {
  const changeReadStatusButton = document.createElement('button');
  changeReadStatusButton.textContent = 'Change Read Status';
  return changeReadStatusButton;
}

Library.prototype.addChangeReadStatusClickEvent = function(changeReadStatusButton) {
  const parentCard = changeReadStatusButton.parentNode;
  const bookIndex = parentCard.dataset.indexNumber;
  changeReadStatusButton.addEventListener('click', () => {
    this.books[bookIndex].changeReadStatus();
    this.clearBookCards();
    this.displayBookCards();
  })
}

Library.prototype.setUpChangeReadStatusButton = function(bookCard) {
  const changeReadStatusButton = this.createChangeReadStatusButton();
  bookCard.appendChild(changeReadStatusButton);
  this.addChangeReadStatusClickEvent(changeReadStatusButton);
}

Library.prototype.addContentsToBookCard = function(bookCard, book) {
  bookCard.appendChild(this.createBookCardImgElement(book));
  const bookCardText = this.createBookCardTextElement();
  this.addContentsToBookCardText(bookCardText, book);
  bookCard.appendChild(bookCardText);
  this.setUpChangeReadStatusButton(bookCard);
  this.setUpRemoveBookButton(bookCard);
}

Library.prototype.addContentsToBookCardText = function(bookCardText, book) {
  bookCardText.appendChild(this.createBookTitleElement(book));
  bookCardText.appendChild(this.createBookAuthorElement(book));
  bookCardText.appendChild(this.createBookPagesElement(book));
  bookCardText.appendChild(this.createBookReadStatusElement(book));
}

Library.prototype.displayBookCards = function() {
  const cardContainer = document.querySelector('.card-container');

  this.books.forEach((book, index) => {
    const bookCard = this.createBookCardElement(index);
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
  const readStatus = document.getElementById('readStatus').checked;
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

Book.prototype.changeReadStatus = function () {
  this.readStatus = this.readStatus === true ? false : true;
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
