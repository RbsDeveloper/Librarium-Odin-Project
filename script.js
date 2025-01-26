
//Btns
    const depositNewBookOnShelfBtn = document.getElementById('addBookBtn');
    const dialogCancelBtn = document.getElementById('cancelBtn')

//Dialog 
    const dialog = document.getElementById('dialog');

//Main 
    const shelf = document.getElementById('shelf');

// Form 
    const form = document.getElementById('bookForm');

//Logic
    const bookArray = [];

    //* Book Constructor * Creates a new book object with the given properties.
    function Book(title, author, pages, status){
        this.title=title;
        this.author=author;
        this.pages=pages;
        this.status=status;
    }

    //* Toggles the read status of the book.
    Book.prototype.toggleStatus = function() {
        this.status = this.status === 'true' ? 'false' : 'true';
    }
    

    //* Creates a new book object and adds it to the book array.
    function createBookObj(t, a, p, s) {
        bookArray.push(new Book(t, a,p, s));
    }

    //Add an initial book for demonstration purposes
    createBookObj('Atomic habits', 'James Clear', '280', 'true')

    //* Displays all books from the array on the shelf.

    function displayBooks(arr) {
        shelf.innerHTML = '';
        arr.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');
            bookCard.setAttribute('data-name', `${book.title}`);

            const title = document.createElement('p');
            title.classList.add('bookTitle');
            title.innerText = `${book.title}`;
            bookCard.appendChild(title);

            const auth = document.createElement('p');
            auth.classList.add('bookAuthor');
            auth.innerText = `${book.author}`;
            bookCard.appendChild(auth);

            const pag = document.createElement('p');
            pag.classList.add('bookPages');
            pag.innerText = `${book.pages} pages`;
            bookCard.appendChild(pag);

            const bookBtns = document.createElement('div');
            bookBtns.classList.add('bookBtns')
            bookCard.appendChild(bookBtns);

            const statusBtn = document.createElement('button');
                if(book.status === 'true'){
                    statusBtn.classList.add('btn', 'bReadStatus', 'read');
                    statusBtn.innerText = 'Read'
                }
                if(book.status === 'false'){
                    statusBtn.classList.add('btn', 'bReadStatus', 'notRead');
                    statusBtn.innerText = 'Not Read'
                }
            bookBtns.appendChild(statusBtn);

            const deleteBtn = document.createElement('button');    
            deleteBtn.innerText = 'Delete'
            deleteBtn.classList.add('btn', 'deleteBtn')    
            bookBtns.appendChild(deleteBtn);

            shelf.appendChild(bookCard)
            
        });
    }

    //Helper Function: Find a Book Object by Title
    function findObj(arr, target) {
        // Use .findIndex to locate the object
        return arr.findIndex((obj) => obj.title === target);
    }

    //Rerender the status button of a book when the status changes.
    function rerenderBtn(targetedBtn ,obj){
        if(obj.status === 'false'){
            targetedBtn.classList.remove('read');
            targetedBtn.classList.add('notRead');
            targetedBtn.innerText = 'Not Read'
        }

        if(obj.status === 'true'){
            targetedBtn.classList.remove('notRead');
            targetedBtn.classList.add('read');
            targetedBtn.innerText = 'Read'
        }
    }


    //Event Listeners 

    // Show the dialog to add a new book
    depositNewBookOnShelfBtn.addEventListener('click', ()=>{
        dialog.showModal();
    })

    // Close the dialog without saving
    dialogCancelBtn.addEventListener('click', ()=>{
        dialog.close()
    })

    // Handle form submission to add a new book
    form.addEventListener('submit', (e)=> {
        e.preventDefault();
        const formData = new FormData(e.target);
        const bTitle = formData.get('title');
        const bAuthor = formData.get('author');
        const bPages = formData.get('pages');
        const bStatus = formData.get('bookStatus');

        createBookObj(bTitle, bAuthor, bPages, bStatus);
        console.log(bookArray)
        form.reset()
        dialog.close()
        displayBooks(bookArray)
    })

    // Handle button clicks on the shelf (delete or toggle status)
    shelf.addEventListener('click', (e)=>{

        if(e.target.tagName === 'BUTTON' && e.target.classList.contains('deleteBtn')){
            const bookToDelete = e.target.closest('.book-card').dataset.name;

            const indexOfTheBookToDelete = findObj(bookArray, bookToDelete);
        
            bookArray.splice(indexOfTheBookToDelete, 1);
            
            e.target.closest('.book-card').remove()
        }

        if(e.target.tagName === 'BUTTON' && e.target.classList.contains('bReadStatus')){
            const bookToChange = e.target.closest('.book-card').dataset.name;

            const indexOfTheBookToChangeStat = findObj(bookArray, bookToChange);
    
            console.log(bookToChange)
            console.log(indexOfTheBookToChangeStat)
    
            bookArray[indexOfTheBookToChangeStat].toggleStatus();
            console.log(bookArray[indexOfTheBookToChangeStat])
            
            const btn = e.target;
            
    
            rerenderBtn(btn, bookArray[indexOfTheBookToChangeStat])
        }

    })

    // Initial render
    displayBooks(bookArray)


