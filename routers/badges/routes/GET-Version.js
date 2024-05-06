/* Route-Definition */
export default async (req, res, next) => {
  try {
    const params = new URLSearchParams({ ...req.query, version: Date.now( )});
    res.redirect(`${process.env.GCB_URI}/badges/version/dynamic?` + params.toString());
  } catch (err) {
    next(err);
  }
}