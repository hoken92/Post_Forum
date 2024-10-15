export function updateRatings(evt) {
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
        likeEl.classList.remove("fw-bold");
        likeEl.classList.remove("text-success");
        likeAmount--;

        updateLikes(postID, likeAmount).then((likes) => {
          likeEl.textContent = likes;
        });
      } else if (!likeEl.classList.contains("fw-bold")) {
        likeEl.classList.add("fw-bold");
        likeEl.classList.add("text-success");
        likeAmount++;
        updateLikes(postID, likeAmount).then((likes) => {
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

        updateDislikes(postID, dislikeAmount).then((dislikes) => {
          dislikeEl.textContent = dislikes;
        });
      } else if (!dislikeEl.classList.contains("fw-bold")) {
        dislikeEl.classList.add("fw-bold");
        dislikeEl.classList.add("text-danger");
        dislikeAmount--;
        updateDislikes(postID, dislikeAmount).then((dislikes) => {
          dislikeEl.textContent = dislikes;
        });
      }
    }
  }
}

export async function updateLikes(id, value) {
  const updateObj = {
    reactions: {
      likes: `${value}`,
    },
  };

  try {
    const response = await axios.put(
      `https://dummyjson.com/posts/${id}`,
      updateObj
    );

    return response.data.reactions.likes;
  } catch (error) {
    console.log(error);
  }
}

export async function updateDislikes(id, value) {
  const updateObj = {
    reactions: {
      dislikes: `${value}`,
    },
  };

  try {
    const response = await axios.put(
      `https://dummyjson.com/posts/${id}`,
      updateObj
    );

    return response.data.reactions.dislikes;
  } catch (error) {
    console.log(error);
  }
}
