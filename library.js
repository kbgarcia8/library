const myCatalogs = [];
   
function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.addSuccess = function() {
        let message = `The book ${title} by ${author} with\n${pages} total pages and status: ${status}!`;
        return message;
    }
    this.getInfo = function() {
      let allInfo = { bookTitle: `${title}`, bookAuthor: `${author}`, numPages: `${pages}`, currentStat: `${status}`, printed: false };
      return allInfo;
    }
}


function addBookToLibrary(title, author, pages, status) {
    let newBook = new Book(title, author, pages, status);
    //transform into dialog and modals when getting info
    myCatalogs.push(newBook.getInfo());
    /* Looping through a list using foreach
      <list_name>.forEach(function(<set_var_for_list_items/elements, <var_name_for_index>) {
        // do something
      });
    */
    const mainPage = document.querySelector("output");


    myCatalogs.forEach(function(myCatalog, indx) {
      if(!myCatalog.printed) {
        const catalogDiv = document.createElement("div");
        catalogDiv.classList.add('catalogBase');
        catalogDiv.id = "catalogDiv" + indx; //to have individual ids despite having same class
        mainPage.appendChild(catalogDiv);

        //x-button to delete catalog entry
        const delbtnSpace = document.createElement("div");
        delbtnSpace.classList.add('remove-button-space');
        catalogDiv.appendChild(delbtnSpace);

        const delButton = document.createElement('button');
        delButton.classList.add('remove-button');
        delButton.id = "delButton" + indx;
        delButton.textContent = "X";
        delbtnSpace.appendChild(delButton);
      
        //space for info to be printed
        const catalogInfos = document.createElement("div");
        catalogInfos.classList.add('catalogTextSection');
        catalogDiv.appendChild(catalogInfos);
        //infos to be printed
        const infoList = document.createElement("ul");
        infoList.classList.add('catalogList');
        catalogInfos.appendChild(infoList);
        const titleItem = document.createElement('li');
        titleItem.textContent = `Title: ${myCatalogs[indx].bookTitle}`;
        const authorItem = document.createElement('li');
        authorItem.textContent = `Author: ${myCatalogs[indx].bookAuthor}`;
        const pagesItem = document.createElement('li');
        pagesItem.textContent = `Pages: ${myCatalogs[indx].numPages}`;
        infoList.appendChild(titleItem);
        infoList.appendChild(authorItem);
        infoList.appendChild(pagesItem);
        
        //space for toggel button
        const statusItemSpace = document.createElement('div');
        statusItemSpace.classList.add('toggle-button-space');
        statusItemSpace.id = "togglestatusSpace"+indx;
        catalogDiv.appendChild(statusItemSpace);
        //toggle button
        const statusItem = document.createElement('button');
        statusItem.classList.add('toggle-button');
        statusItem.id = "toggleStatus"+indx;
        statusItem.textContent = `${myCatalogs[indx].currentStat}`;
        statusItemSpace.appendChild(statusItem);
        myCatalogs[indx].printed = true;
      
      } else {
        let alreadyPrinted = `${myCatalogs[indx].bookTitle} alredy added and displayed in the library!`
        console.log(alreadyPrinted);
      }
    });
    //ADD TOGGLE BUTTON for READ and NOT YET READ
    const toggleButtons = document.querySelectorAll(".toggle-button");
        toggleButtons.forEach(function(toggleButton, index) {
         toggleButton.addEventListener("click", function() {
           const toggled = event.target.id;
           const refId = "toggleStatus" + index;
           let displayed = event.target.textContent;
           if (displayed === "Read") {
             event.target.textContent = "Not Yet Read";
           } else if (displayed === "Not Yet Read") {
             event.target.textContent = "Read";
           }
         });
        });
    //to remove catalog entry when "X" button is clicked
    const mainPage1 = document.querySelector("#output");
    const removeBooks = document.querySelectorAll(".remove-button");
      //const removeBtn = document.getElementById("delButton" + indx);
      removeBooks.forEach(function(removeBook, index) {
        removeBook.addEventListener("click", function() {
          const clicked = event.target.id;
          const refId = "delButton" + index;
          const currentDivId = event.target.parentNode.parentNode.id; //div with class: remove-button-space> catalogDiv0
          const outputId = event.target.parentNode.parentNode.parentNode.id; //div with class: remove-button-space> catalogDiv0 > OUTPUT
          const currentDiv = document.getElementById(`${currentDivId}`);
          const output = document.getElementById(`${outputId}`);

          if (currentDiv && (clicked === refId)) {
            //remove currentDiv
            output.removeChild(currentDiv);
            myCatalogs.splice(index, 1); //in order to reset the push of element unto the list, otherwise remove can only be done once
          }
        });
      });
}
const addLib = document.getElementById("addlib");
const dialog = document.getElementById("addDialog");
const addBook = document.getElementById("add_button");
const cancelAdd = document.getElementById("cancel_button");
const dialogForms = document.querySelectorAll("#dialog_form");
//show dialog
addLib.addEventListener("click", () => {
  //reset all forms upon making another submission
  dialogForms.forEach(function(dialogForms) {
    dialogForms.reset();
  });
  //show the dialog/modal
  dialog.showModal();
});
//function when the forms are submitted
dialogForms.forEach(function(dialogForms) { //remember that if there are multiple element with same class or id need to run through forEach
    dialogForms.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const bookName = document.getElementById("book-title").value;
    const authorName = document.getElementById("book-author").value;
    const pageNumber = document.getElementById("book-pages").value;
    const currStatus = document.getElementById("status-menu").value;

    addBookToLibrary(bookName, authorName, pageNumber, currStatus);
    dialog.close();
    });
});

cancelAdd.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
});