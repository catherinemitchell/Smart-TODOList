DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE categories (
    category_id INT PRIMARY KEY,
    category_name VARCHAR(255)
);


/* const arrayHashmap = originalArray.reduce((obj, item) => {
  obj[
item.id
] ? obj[
item.id
].elements.push(...item.elements) : (obj[
item.id
] = { ...item });
  return obj;
}, {});
 */
