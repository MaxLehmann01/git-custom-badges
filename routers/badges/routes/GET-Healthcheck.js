/* Dependencies */
import axios from "axios";

/* Utils */
import { generateBadge, isValidUrl } from "../../../utils/lib.js";

/* Route-Definition */
export default async (req, res, next) => {
  try {
    let resData = { httpStatus: 500, data: { err: undefined }};
    const { url, custom_key } = req.query;
    
    if(!url || !isValidUrl(url)) throw new Error('invalid url provided');

    try {
      const response = await axios.get(url);

      if(response.status === 200) resData.data = generateBadge(custom_key || 'healthcheck', 'healthy', 'success');
      else throw new Error('healthcheck failed');
    } catch (err) {
      resData.data = generateBadge(custom_key || 'healthcheck', 'unhealthy', 'error');
    }
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    resData.httpStatus = 200;
    res.send(resData.data)
  } catch (err) {
    next(err);
  }
}