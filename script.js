import * as getPosts from "./Posts/getPosts.js";

const postContainer = document.getElementById("post-container");
const pageContainer = document.getElementById("pagination-wrapper");

// Loads the first page with 10 posts
let page = 1;
getPosts.loadPosts(page);

// Paginates posts
pageContainer.addEventListener("click", function (evt) {
  if (evt.target.localName === "button") {
    postContainer.innerHTML = "";
    pageContainer.innerHTML = "";
    const currentPage = Number(evt.target.value);
    getPosts.loadPosts(currentPage);
  }
});
