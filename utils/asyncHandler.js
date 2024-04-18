export const asycHandler = function (requiredHandler) {
  return (req, res, next) =>
    Promise.resolve(requiredHandler(req, res, next)).catch((err) => next(err));
};
