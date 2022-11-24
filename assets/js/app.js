const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
closeIcon = popupBox.querySelector("header i")
titleTag = popupBox.querySelector("input")
descTag = popupBox.querySelector("textarea")
addBtn = popupBox.querySelector("button")

const months = ["January", "Februrary", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December" ]

addBox.addEventListener("click", () => {
    popupBox.classList.add("show")
})

closeIcon.addEventListener("click", () => {
    popupBox.classList.remove("show")
})

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
            date: `{month} ${day}, ${year}`
        }
    const notes = [];
    notes.push(noteInfo);
    }
})