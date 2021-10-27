import boom from '@hapi/boom';

//sacamos información del request, aplicamos el schema
// y creamos un middleware

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}

export { validatorHandler };
