// Post container
const postContainer = document.getElementById("post-container");
const newTitleEl = document.getElementById("new-title");
const newNameEl = document.getElementById("new-name");
const newContentEl = document.getElementById("new-content");

export async function createNewPost(title, firstName, lastName, body) {
  // Validate the fields aren't empty
  const data = await newPostRequest(title, firstName, lastName, body);

  const template = document.getElementById("post-template");
  const clone = template.content.cloneNode(true);

  clone.getElementById("title").textContent = data.title;
  clone.getElementById(
    "subtitle"
  ).textContent = `Posted by: ${firstName} ${lastName}`;
  clone.getElementById("card-body").textContent = body;
  clone.getElementById("likes").textContent = 0;
  clone.getElementById("dislikes").textContent = 0;

  postContainer.prepend(clone);
}

async function newPostRequest(title, firstName, lastName, body) {
  try {
    const response = await fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        userId: 5,
        firstname: firstName,
        lastname: lastName,
        body: body,
      }),
    });

    // If response is not a 201 status, it will throw an error
    if (response.status !== 201) {
      throw "The create request has failed";
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export function validateFields(title, newName, body) {
  if (title === "") {
    newTitleEl.focus();
    return false;
  }

  if (newName === "") {
    newNameEl.focus();
    return false;
  }

  if (body === "") {
    newContentEl.focus();
    return false;
  }

  return true;
}
