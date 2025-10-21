var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkUrlInput = document.getElementById("bookmarkUrl");
var addBtn = document.getElementById("addBtn");

var allBookmarks;
if (localStorage.getItem("bookmarksBox") === null) {
  allBookmarks = [];
} else {
  allBookmarks = JSON.parse(localStorage.getItem("bookmarksBox"));
  displayBookmarks();
}

function addBookmark() {
  if (
    isValid(bookmarkRegex.bookmarkNameRegex, bookmarkNameInput) &&
    isValid(bookmarkRegex.bookmarkUrlRegex, bookmarkUrlInput)
  ) {
    var bookmark = {
      name: bookmarkNameInput.value,
      websiteUrl: bookmarkUrlInput.value,
    };
    allBookmarks.push(bookmark);
    localStorage.setItem("bookmarksBox", JSON.stringify(allBookmarks));

    console.log(allBookmarks);
    clearInputs();
    displayBookmarks();
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Name Must be between 4-11 letters & Url Must be Valid",
    });
  }
}

function clearInputs() {
  bookmarkNameInput.value = null;
  bookmarkUrlInput.value = null;
  bookmarkNameInput.classList.remove("is-valid", "is-invalid");
  bookmarkUrlInput.classList.remove("is-valid", "is-invalid");
}

function displayBookmarks() {
  var cartona = "";
  for (var i = 0; i < allBookmarks.length; i++) {
    cartona += `
                <tr>
                  <th scope="row" class="py-3">${i + 1}</th>
                  <td class="py-3">${allBookmarks[i].name}</td>
                  <td class="py-3">
                    <button class="btn visit-btn" onclick="visitSite(${i})">
                      <i class="fa-solid fa-eye"></i> Visit
                    </button>
                  </td>
                  <td class="py-3">
                    <button class="btn btn-danger" onclick="deleteBookmark(${i})">
                      <i class="fa-solid fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
    `;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}

function deleteBookmark(index) {
  allBookmarks.splice(index, 1);
  localStorage.setItem("bookmarksBox", JSON.stringify(allBookmarks));
  displayBookmarks();
}
function visitSite(index) {
  window.open(allBookmarks[index].websiteUrl, "_blank");
}

var bookmarkRegex = {
  bookmarkUrlRegex:
    /^(https?:\/\/)([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(:\d+)?(\/[^\s]*)?$/,
  bookmarkNameRegex: /^[A-Za-z][a-z_\s]{3,10}$/,
};
function isValid(regex, inputElement) {
  if (regex.test(inputElement.value)) {
    console.log("valid");
    inputElement.classList.add("is-valid");
    inputElement.classList.remove("is-invalid");
    return true;
  } else {
    console.log("Invalid");
    inputElement.classList.remove("is-valid");
    inputElement.classList.add("is-invalid");
    return false;
  }
}
