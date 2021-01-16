export default (body) => {
  const requiredFields = ['email', 'password'];
  const requestFields = Object.keys(body);
  const errors = [];

  requiredFields.forEach((requiredField) => {
    if (!requestFields.includes(requiredField)) {
      errors.push({
        field: requiredField,
        message: `The ${requiredField} is a required field.`
      });
    }
  });

  return errors;
};
