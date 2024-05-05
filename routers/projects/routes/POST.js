/* Schemas */
import Project from "../../../schemas/Project.js";

/* Route-Definition */
export default async (req, res, next) => {
  try {
    let resData = { httpStatus: 500, data: { err: undefined }};
    const { name, version } = req.body;

    if(!name) throw new Error('name must be provided');
    if(!version) throw new Error('version must be provided');

    const project = await Project.findOne({ name });

    if(project) await Project.findByIdAndUpdate(project._id, { version, timestamp: new Date() });
    else {
      const _project = new Project({ name, version, timestamp: new Date() });
      await _project.save();
    }

    resData.httpStatus = 200;
    res.send(resData.data)
  } catch (err) {
    next(err);
  }
}