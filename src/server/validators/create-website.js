export default (body) => {
  const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const regex = new RegExp(expression);
  const errors = [];

  if (!body.url) {
    errors.push({
      field: 'url',
      message: 'The URL string is a required field.'
    });
  }

  if (body.url && !body.url.match(regex)) {
    errors.push({
      field: 'url',
      message: 'The URL string is not valid.'
    });
  }

  return errors;
};
