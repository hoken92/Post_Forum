import * as getPosts from "./Posts/getPosts.js";
import * as createPosts from "./Posts/createPost.js";

const postContainer = document.getElementById("post-container");
const pageContainer = document.getElementById("pagination-wrapper");

const newPostModal = document.getElementById("post-modal");
const postModal = new bootstrap.Modal("#staticBackdrop");

const newTitleEl = document.getElementById("new-title");
const newNameEl = document.getElementById("new-name");
const newContentEl = document.getElementById("new-content");

// Loads the first page with 10 posts
let page = 1;
getPosts.loadPosts(page);

// Allows users to paginate through posts
pageContainer.addEventListener("click", function (evt) {
  if (evt.target.localName === "button") {
    postContainer.innerHTML = "";
    pageContainer.innerHTML = "";
    const currentPage = Number(evt.target.value);
    getPosts.loadPosts(currentPage);
  }
});

// Create Post event listener
newPostModal.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const newTitle = newTitleEl.value;
  const newName = newNameEl.value.split(" ");
  const firstName = newName.slice(0, 1);
  const lastName = newName.slice(1);
  const newContent = newContentEl.value;

  // Validates create post modal isn't empty
  createPosts.validateFields(newTitle, newNameEl.value, newContent);

  // If post modal fields are filled and return true. Create the post and hide the modal
  if (createPosts.validateFields === true) {
    createPosts.createNewPost(newTitle, firstName, lastName, newContent);

    postModal.hide();
  }
});
