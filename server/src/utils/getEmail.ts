//todo: migrate to app services
function getEmail(slug) {
  const clients = {
    admin: 'admin',
    support: 'support',
  };

  return clients[slug] + '@' + process.env.domain;
}

export default getEmail;
