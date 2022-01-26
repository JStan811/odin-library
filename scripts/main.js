//library class
class Library {
  constructor() {
    this.books = [];
  }

  createBookCardElement(bookIndex) {
    const bookCard = document.createElement('article');
    bookCard.classList.add('card');
    bookCard.dataset.indexNumber = bookIndex;
    return bookCard;
  }

  createBookCardImgElement(book) {
    const bookCardImg = document.createElement('img');
    bookCardImg.src = book.coverImage;
    bookCardImg.alt = 'Book cover, either a default generic one or one inputted by a user';
    return bookCardImg;
  }

  createBookCardInfoElement() {
    const bookCardText = document.createElement('section');
    bookCardText.classList.add('card-info');
    return bookCardText;
  }

  createBookTitleElement(book) {
    const bookTitle = document.createElement('h2');
    bookTitle.textContent = book.title;
    return bookTitle;
  }

  createBookAuthorElement(book) {
    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = `by ${book.author}`;
    return bookAuthor;
  }

  createBookPagesElement(book) {
    const bookPages = document.createElement('p');
    bookPages.textContent = `${book.pages} pages`;
    return bookPages;
  }

  createBookReadStatusElement(book) {
    const bookReadStatus = document.createElement('p');
    bookReadStatus.textContent = book.readStatus ? 'Read' : 'Unread';
    return bookReadStatus;
  }

  createRemoveBookButton() {
    const removeBookButton = document.createElement('button');
    removeBookButton.classList.add('remove-book-button');
    removeBookButton.textContent = 'Remove';
    return removeBookButton;
  }

  addRemoveBookClickEvent(removeBookButton) {
    const parentCard = removeBookButton.parentElement.parentElement.parentElement;
    const bookIndex = parentCard.dataset.indexNumber;
    removeBookButton.addEventListener('click', () => {
      this.books.splice(bookIndex, 1);
      this.clearBookCards();
      this.displayBookCards();
    })
  }

  setUpRemoveBookButton(bookCardInfo) {
    const removeBookButton = this.createRemoveBookButton();
    bookCardInfo.appendChild(removeBookButton);
    this.addRemoveBookClickEvent(removeBookButton);
  }

  createChangeReadStatusButton() {
    const changeReadStatusButton = document.createElement('button');
    changeReadStatusButton.classList.add('change-read-status-button');
    changeReadStatusButton.textContent = 'Change';
    return changeReadStatusButton;
  }

  addChangeReadStatusClickEvent(changeReadStatusButton) {
    const parentCard = changeReadStatusButton.parentElement.parentElement.parentElement.parentElement
    const bookIndex = parentCard.dataset.indexNumber;
    changeReadStatusButton.addEventListener('click', () => {
      this.books[bookIndex].changeReadStatus();
      this.clearBookCards();
      this.displayBookCards();
    })
  }

  setUpChangeReadStatusButton(readStatusElement) {
    const changeReadStatusButton = this.createChangeReadStatusButton();
    readStatusElement.appendChild(changeReadStatusButton);
    this.addChangeReadStatusClickEvent(changeReadStatusButton);
  }

  addContentsToBookCard(bookCard, book) {
    const flexDiv1 = document.createElement('div');
    flexDiv1.classList.add('flex-item-1');
    flexDiv1.appendChild(this.createBookCardImgElement(book))
    bookCard.appendChild(flexDiv1);
    const flexDiv2 = document.createElement('div');
    flexDiv2.classList.add('flex-item-2');
    const bookCardInfo = this.createBookCardInfoElement();
    this.addContentsToBookCardInfo(bookCardInfo, book);
    flexDiv2.appendChild(bookCardInfo);
    bookCard.appendChild(flexDiv2);
    const readStatusElement = bookCardInfo.children[3];
    this.setUpChangeReadStatusButton(readStatusElement);
    this.setUpRemoveBookButton(bookCardInfo);
  }

  addContentsToBookCardInfo(bookCardInfo, book) {
    bookCardInfo.appendChild(this.createBookTitleElement(book));
    bookCardInfo.appendChild(this.createBookAuthorElement(book));
    bookCardInfo.appendChild(this.createBookPagesElement(book));
    bookCardInfo.appendChild(this.createBookReadStatusElement(book));
  }

  displayBookCards() {
    const cardContainer = document.querySelector('.card-container');

    this.books.forEach((book, index) => {
      const bookCard = this.createBookCardElement(index);
      this.addContentsToBookCard(bookCard, book);
      cardContainer.appendChild(bookCard);
    })
  }

  clearBookCards() {
    const cardContainer = document.querySelector('.card-container');

    while (cardContainer.firstChild) {
      cardContainer.removeChild(cardContainer.firstChild);
    }
  }

  addBookToLibraryOnSubmit() {
    let title;
    if(document.getElementById('title').value) {
      title = document.getElementById('title').value;
    };
    let author;
    if(document.getElementById('author').value) {
      author = document.getElementById('author').value;
    }
    let pages;
    if(document.getElementById('pages').value) {
      pages = document.getElementById('pages').value
    };
    const readStatus = document.getElementById('readStatus').checked;
    let coverImage;
    if (document.getElementById('coverImage').value) {
      coverImage = document.getElementById('coverImage').value;
    };

    this.books.push(new Book(title, author, pages, readStatus, coverImage));

    this.clearBookCards();
    this.displayBookCards()

    newBookFormContainer.style.display = 'none';
  }
}

//book class
class Book {
  constructor(title = 'Untitled', author = 'Unknown', pages = 0, readStatus, coverImage = 'img/default-cover.jpg') {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.coverImage = coverImage;
  }

  info() {
    if(this.readStatus === true) {
      return `${this.title} by ${this.author}, ${this.pages} pages, read.`;
    }
    else {
      return `${this.title} by ${this.author}, ${this.pages} pages, not read yet
          `;
    }
  }

  changeReadStatus() {
    this.readStatus = this.readStatus === true ? false : true;
  }
}

// Object set up
const library = new Library();

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
