let myLibrary = [];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

Book.prototype.info = function () {
  if(this.readStatus === true) {
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
  let readStatusResponse = prompt("Have you read the book? Enter y for yes. Any other response will be taken as no.");
  let readStatus = false;

  if(readStatusResponse === 'y') {
    readStatus = true;
  }

  myLibrary.push(new Book(title, author, pages, readStatus))
}

function createBookCardElement() {
  const bookCard = document.createElement('article');
  bookCard.classList.add('card');
  return bookCard;
}

function createBookCardImgElement() {
  const bookCardImg = document.createElement('img');
  bookCardImg.src = 'img/default-cover.jpg';
  bookCardImg.alt = 'Default generic book cover'
  return bookCardImg;
}

function createBookCardTextElement() {
  const bookCardText = document.createElement('section');
  bookCardText.classList.add('card-text');
  return bookCardText;
}

function createBookTitleElement() {
  const bookTitle = document.createElement('h2');
  bookTitle.textContent = 'Book Title';
  return bookTitle;
}

function createBookAuthorElement() {
  const bookAuthor = document.createElement('p');
  bookAuthor.textContent = 'Book Author';
  return bookAuthor;
}

function createBookPagesElement() {
  const bookPages = document.createElement('p');
  bookPages.textContent = 'Book Pages';
  return bookPages;
}

function createBookReadStatusElement () {
  const bookReadStatus = document.createElement('p');
  bookReadStatus.textContent = 'Book Read Status';
  return bookReadStatus;
}

function addContentsToBookCard(bookCard) {
  bookCard.appendChild(createBookCardImgElement());
  const bookCardText = createBookCardTextElement();
  addContentsToBookCardText(bookCardText);
  bookCard.appendChild(bookCardText);
}

function addContentsToBookCardText(bookCardText) {
  bookCardText.appendChild(createBookTitleElement());
  bookCardText.appendChild(createBookAuthorElement());
  bookCardText.appendChild(createBookPagesElement());
  bookCardText.appendChild(createBookReadStatusElement());
}

function displayBookCards() {
  const cardContainer = document.querySelector('.card-container');

  const bookCard = createBookCardElement();
  addContentsToBookCard(bookCard);
  cardContainer.appendChild(bookCard);
}

// Functions called upon page load
displayBookCards();
