/* Direct-Exports */
export const routeNotFound = (req, res, next) => {
  const err = { 
    message: `Route ${req.method}::${req.originalUrl} not found`, 
    status: 404 
  };

  next(err);
};

export const getCorsWhitelist = () => process.env.CORS_WHITELIST.split(',');

export const getCorsOpts = () => {
  const corsWhitelist = getCorsWhitelist();

  return { 
    credentials: true, 
    origin: (origin, callback) => { 
      if(corsWhitelist.includes(origin) || !origin) callback(null, true);
      else callback(new Error('not allowed by Cors!'));
    }
  }
}

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false
  };
}

export const generateBadge = (key, value, severity) => {
  switch (severity) {
    case 'success': severity = '#4c1'; break;
    case 'error': severity = '#e05d44'; break;
    case 'warning': severity = '#dab639'; break;
    case 'info': severity = '#007ec6'; break;
    default: severity = '#9f9f9f'; break;
  }

  const additionalWidthPerCharacter = 7.35;
  const keyWidth = Math.max(Math.floor(key.length * additionalWidthPerCharacter), 30);
  const valueWidth = Math.max(Math.floor(value.length * additionalWidthPerCharacter), 30);
  const totalWidth = keyWidth + valueWidth;

  const keyXPosition = keyWidth / 2;
  const valueXPosition = keyWidth + (valueWidth / 2);

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20">
    <linearGradient id="b" x2="0" y2="100%">
      <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
      <stop offset="1" stop-opacity=".1"/>
    </linearGradient>

    <mask id="a">
      <rect width="${totalWidth}" height="20" rx="3" fill="#fff"/>
    </mask>

    <g mask="url(#a)">
      <path fill="#555" d="M0 0 h${keyWidth} v20 H0 z"/>
      <path fill="${severity}" d="M${keyWidth} 0 h${valueWidth} v20 H${keyWidth} z"/>
      <path fill="url(#b)" d="M0 0 h${totalWidth} v20 H0 z"/>
    </g>

    <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
      <text x="${keyXPosition}" y="15" fill="#010101" fill-opacity=".3">
        ${key}
      </text>
      <text x="${keyXPosition}" y="14">
        ${key}
      </text>
      <text x="${valueXPosition}" y="15" fill="#010101" fill-opacity=".3">
        ${value}
      </text>
      <text x="${valueXPosition}" y="14">
        ${value}
      </text>
    </g>
  </svg>
  `;

  return svg;
}

/* Default-Export */
export default { routeNotFound, getCorsWhitelist, getCorsOpts, isValidUrl, generateBadge }