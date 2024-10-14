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
