export const productValidation = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}) => {
  const errors: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
  } = { title: "", description: "", imageURL: "", price: "" };

  const validURL = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);

  if (
    !product.title.trim() ||
    product.title.length > 80 ||
    product.title.length < 10
  ) {
    errors.title = "Product title must be between 10 and 80 characters.";
  }
  if (
    !product.description.trim() ||
    product.description.length > 900 ||
    product.description.length < 10
  ) {
    errors.description =
      "Product description must be between 10 and 900 characters.";
  }
  if (!product.imageURL.trim() || !validURL) {
    errors.imageURL = "Valid image URL is required.";
  }
  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Valid price is required.";
  }
  return errors;
};
