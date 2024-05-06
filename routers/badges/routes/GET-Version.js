/* Utils */
import { generateBadge } from "../../../utils/lib.js";

/* Schemas */
import Project from "../../../schemas/Project.js";

/* Route-Definition */
export default async (req, res, next) => {
  try {
    let resData = { httpStatus: 500, data: { err: undefined }};
    const { project: projectName, custom_key } = req.query;

    if(!projectName) throw new Error('invalid project provided');

    const project = await Project.findOne({ name: projectName });
    if(!project) throw new Error('invalid project provided');
    else resData.data = generateBadge(custom_key || 'version', project.version, 'info');
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    resData.httpStatus = 200;
    res.send(resData.data)
  } catch (err) {
    next(err);
  }
}