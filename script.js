import * as getPosts from "./Posts/getPosts.js";
import * as createPosts from "./Posts/createPost.js";
import * as updatePosts from "./Posts/updatePost.js";

const postContainer = document.getElementById("post-container");
const pageContainer = document.getElementById("pagination-wrapper");

const newPostModal = document.getElementById("post-modal");
const postForm = document.getElementById("post-form");
const postModal = new bootstrap.Modal("#staticBackdrop");

const newTitleEl = document.getElementById("new-title");
const newNameEl = document.getElementById("new-name");
const newContentEl = document.getElementById("new-content");

// Toast
const toastbody = document.getElementById("toast-body");

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
  const validateState = createPosts.validateFields(
    newTitle,
    newNameEl.value,
    newContent
  );

  // If post modal fields are filled and return true. Create the post and hide the modal
  if (validateState === true) {
    createPosts.createNewPost(newTitle, firstName, lastName, newContent);

    postForm.reset();
    postModal.hide();

    showToast("Post has successfully been created!");
  }
});

postContainer.addEventListener("click", function (evt) {
  evt.stopPropagation();

  // Checks to see if the img icon is the target
  if (evt.target.localName === "img") {
    const postID =
      evt.target.parentElement.previousElementSibling.getAttribute("id");

    if (evt.target.alt === "likes") {
      const likeEl = evt.target.previousSibling;
      let likeAmount = likeEl.textContent;

      // If post is liked, it will remove the like and added count
      if (likeEl.classList.contains("fw-bold")) {
        console.log("already liked");
        likeEl.classList.remove("fw-bold");
        likeEl.classList.remove("text-success");
        likeAmount--;

        updatePosts.updateLikes(postID, likeAmount).then((likes) => {
          likeEl.textContent = likes;
        });
      } else if (!likeEl.classList.contains("fw-bold")) {
        console.log("not liked");
        likeEl.classList.add("fw-bold");
        likeEl.classList.add("text-success");
        likeAmount++;
        updatePosts.updateLikes(postID, likeAmount).then((likes) => {
          likeEl.textContent = likes;
        });
      }
    } else if (evt.target.alt === "dislikes") {
      const dislikeEl = evt.target.previousSibling;
      let dislikeAmount = dislikeEl.textContent;

      if (dislikeEl.classList.contains("fw-bold")) {
        dislikeEl.classList.remove("fw-bold");
        dislikeEl.classList.remove("text-danger");
        dislikeAmount++;

        updatePosts.updateDislikes(postID, dislikeAmount).then((dislikes) => {
          dislikeEl.textContent = dislikes;
        });
      } else if (!dislikeEl.classList.contains("fw-bold")) {
        console.log("not liked");
        dislikeEl.classList.add("fw-bold");
        dislikeEl.classList.add("text-danger");
        dislikeAmount--;
        updatePosts.updateDislikes(postID, dislikeAmount).then((dislikes) => {
          dislikeEl.textContent = dislikes;
        });
      }
    }
  }
});

// Displays a toast with a message
function showToast(message) {
  const bsToast = new bootstrap.Toast("#success-toast");

  toastbody.textContent = message;
  bsToast.show();
}
