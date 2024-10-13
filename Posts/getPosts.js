export async function loadPosts(page) {
  let postsPerPage = 10;

  const postResponse = await fetch(`https://dummyjson.com/posts`);
  const postData = await postResponse.json();

  const paginatedPostData = pagination(postData, page, postsPerPage);

  pageButtons(paginatedPostData.pages);

  // Loop through the json data and create the posts with content inserted
  for (let i = 0; i < paginatedPostData.data.length; i++) {
    if ("content" in document.createElement("template")) {
      // Instantiate the table with the existing HTML tbody
      // and the row with the template
      const postContainer = document.getElementById("post-container");
      const template = document.getElementById("post-template");
      const clone = template.content.cloneNode(true);

      const findUserResponse = await fetch(
        `https://dummyjson.com/users/filter?key=id&value=${paginatedPostData.data[i].id}`
      );

      const userData = await findUserResponse.json();

      clone.getElementById("title").textContent =
        paginatedPostData.data[i].title;
      clone.getElementById(
        "subtitle"
      ).textContent = `Posted by: ${userData.users[0].firstName} ${userData.users[0].lastName}`;
      clone.getElementById("card-body").textContent =
        paginatedPostData.data[i].body;
      clone.getElementById("likes").textContent =
        paginatedPostData.data[i].reactions.likes;
      clone.getElementById("dislikes").textContent =
        paginatedPostData.data[i].reactions.dislikes;

      postContainer.appendChild(clone);
    }
  }
}

export function pagination(data, page, postsPerPage) {
  const indexStart = (page - 1) * postsPerPage;
  const indexEnd = indexStart + postsPerPage;

  const trimmedData = data.posts.slice(indexStart, indexEnd);

  const pages = Math.ceil(data.posts.length / postsPerPage);

  return {
    data: trimmedData,
    pages: pages,
  };
}

function pageButtons(pages) {
  const container = document.getElementById("pagination-wrapper");

  container.innerHTML = "";

  for (let i = 1; i <= pages; i++) {
    const li = container.appendChild(document.createElement("li"));
    li.classList.add("page-item");
    const button = li.appendChild(document.createElement("button"));
    button.setAttribute("value", [i]);
    button.classList.add("page-link");
    button.textContent = i;
  }
}
