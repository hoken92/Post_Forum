import * as getPosts from "./Posts/getPosts.js";

const postContainer = document.getElementById("post-container");
const pageContainer = document.getElementById("pagination-wrapper");

const newPostModal = document.getElementById("post-modal");
const postModal = new bootstrap.Modal("#staticBackdrop");

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

newPostModal.addEventListener("submit", function (evt) {
  evt.preventDefault();

  console.log(document.getElementById("new-title").value);
  console.log(document.getElementById("new-name").value);
  console.log(document.getElementById("new-content").value);

  postModal.hide();
});
