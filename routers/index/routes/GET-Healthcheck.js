/* Route-Definition */
export default async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}