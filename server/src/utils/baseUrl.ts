function getBaseUrl() {
  const domain = process.env.domain;
  const protocol = process.env.ssl === '1' ? 'https' : 'http';

  return protocol + '://' + domain;
}

export default getBaseUrl;
