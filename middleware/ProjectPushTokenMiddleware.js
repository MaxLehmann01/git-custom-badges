/* Default-Export */
export default async (req, res, next) => {
  try {
    const projectPushToken = req.headers['project-push-token']

    if(!projectPushToken) throw new Error('project-push-token must be provided');
    if(projectPushToken !== process.env.PT_PROJECT) throw new Error('invalid project-push-token provided');

    next();
  } catch (err) {
    next(err);
  }
}