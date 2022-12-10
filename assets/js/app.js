const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector("header i")
titleTag = popupBox.querySelector("input")
descTag = popupBox.querySelector("textarea")
addBtn = popupBox.querySelector("button")
about = document.querySelector(".about")
charSpan = document.querySelectorAll(".about__span")

const months = ["January", "Februrary", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December" ]
 const notes = JSON.parse(localStorage.getItem("notes") || "[]")
 let isUpdate = false, updateId;
addBox.addEventListener("click", () => {
  titleTag.focus();
    popupBox.classList.add("show")
})
function aboutCloseIcon (){
  about.classList.remove("show")
}
closeIcon.addEventListener("click", () => {
  isUpdate = false;
    titleTag.value = "";
    descTag.value = "";
     addBtn.innerText = "Add Note";
  popupTitle.innerText = "Add a new Note";
    popupBox.classList.remove("show")
})


function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove())
    notes.forEach((note, index) => {
        let liTag = `<li class="note">
        <div class="details">
          <p>${note.title}</p>
          <span>
            ${note.description}
          </span>
        </div>
        <div class="bottom-content">
          <span>${note.date}</span>
          <div class="settings">
            <i onclick="showMenu(this)" class="ri-more-line"></i>
            <ul class="menu">
              <li class="main__menu" onclick="updateNote(${index}, '${note.title}', '${note.description}')">
                Edit<i class="ri-pencil-line icon1"></i>
              </li>
              <li class="main__menu"onclick="deleteNote(${index})">Delete
                <i class="ri-delete-bin-6-line icon2"></i>
              </li>
              <li class="main__menu" onclick="showAbout(${index})">
              About
                <i class="ri-more-2-fill icon3"></i>
              </li>
            </ul>
          </div>
        </div>
    `;
        addBox.insertAdjacentHTML("afterend", liTag)
        // charSpan[0].innerText = note.charCount
        // charSpan[1].innerText = note.TextCount
        // charSpan[2].innerText = "No"
        // charSpan[3].innerText = note.date
    })
}
showNotes();
function showAbout() {
  about.classList.add("show")
}
function showMenu(elem) {
    elem.parentElement.classList.add("show")
    document.addEventListener("click", e => { 
        if(e.target.tagName != "I" || e.target != elem){
            elem.parentElement.classList.remove("show")
        }
    })
}

function deleteNote(noteId) {
  let confirmDel = confirm("Are you sure you want to delete this note??")
  if(!confirmDel) return;
  notes.splice(noteId, 1);

  //saving notes to Localstorage
    localStorage.setItem("notes", JSON.stringify(notes));

    showNotes();
}

function updateNote(noteId, title, desc) {
  isUpdate = true;
  updateId = noteId;
  addBox.click();
  titleTag.value = title;
  descTag.value = desc;
  addBtn.innerText = "Update Note";
  popupTitle.innerText = "Update Note";

  console.log(noteId, title, desc)
}



addBtn .addEventListener('click', e => {
    e.preventDefault();
    let noteTitle = titleTag.value;
    noteDesc = descTag.value

    const regex = /[^A-Za-z0-9]/g;
    const newStr = noteDesc.replace(regex, '')

    let ChrCount = newStr.split("").length + noteTitle.split("").length
    let TxtCountt = noteDesc.split(" ").length + noteTitle.split(" ").length



    if(noteTitle || noteDesc){
        let dateObj = new Date();
        month = months[dateObj.getMonth()];
        day = dateObj.getDate();
        year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle, description: noteDesc,
            date: `${month} ${day}, ${year}`,
            
            charCount: ChrCount, TextCount: TxtCountt
        }
        if(!isUpdate) {
          notes.push(noteInfo);
        }
        else {
          isUpdate = false;
          notes[updateId] = noteInfo; // updating specifies note
        }
    //saving notes to Localstorage
    localStorage.setItem("notes", JSON.stringify(notes));
    closeIcon.click()
    showNotes()
    }
})