const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
closeIcon = popupBox.querySelector("header i")
titleTag = popupBox.querySelector("input")
descTag = popupBox.querySelector("textarea")
addBtn = popupBox.querySelector("button")

const months = ["January", "Februrary", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December" ]
 const notes = JSON.parse(localStorage.getItem("notes") || "[]")
addBox.addEventListener("click", () => {
    popupBox.classList.add("show")
})

closeIcon.addEventListener("click", () => {
    popupBox.classList.remove("show")
})


function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove())
    notes.forEach((note) => {
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
            <i class="ri-more-line"></i>
            <ul class="menu">
              <li>
                <i class="ri-pencil-line icon1">Edit</i>
                <i class="ri-delete-bin-6-line icon2">Delete</i>
              </li>
            </ul>
          </div>
        </div>`;
        addBox.insertAdjacentHTML("afterend", liTag)
    })
}
showNotes();
addBtn .addEventListener('click', e => {
    e.preventDefault();
    let noteTitle = titleTag.value;
    noteDesc = descTag.value


    if(noteTitle || noteDesc){
        let dateObj = new Date();
        month = months[dateObj.getMonth()];
        day = dateObj.getDate();
        year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle, description: noteDesc,
            date: `${month} ${day}, ${year}`
        }
    notes.push(noteInfo);
    //saving notes to Localstorage
    localStorage.setItem("notes", JSON.stringify(notes));
    closeIcon.click()
    showNotes()
    }
})