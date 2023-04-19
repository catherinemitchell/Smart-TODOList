function categorizeTask(title) {
  const keywords = {
    1: ["movie", "series", "show", "watch", "screen", "TV"],
    2: ["restaurant", "cafe", "food", "eat"],
    3: ["book", "novel", "read"],
    4: ["product", "buy", "purchase"],
    5: ["recipe", "cook", "ingredients"],
  };

  // Loop through each category
  for (const category in keywords) {
    // Check if the title contains any of the keywords for this category
    if (
      keywords[category].some((keyword) =>
        title.toLowerCase().includes(keyword)
      )
    ) {
      // Return the ID of the first matching category
      return category;
    }
  }

  // If no matching category was found, return null

  return null;
}

const categorizeTasksByAPI = (title) => {
  // API call to categorize task by title
  // Return the category ID received from API else null
  return null;
};

module.exports = { categorizeTask, categorizeTasksByAPI };
