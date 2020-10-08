var backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === 'dev-school.uppercampus.com') {
  backendHost = 'https://dev-vct.uppercampus.com';
} else if (hostname === 'qa-school.uppercampus.com') {
  backendHost = 'https://qa-vct.uppercampus.com';
} else if (hostname === 'staging-school.uppercampus.com') {
  backendHost = `https://staging-vct.uppercampus.com`;
} else if (hostname === 'school.uppercampus.com') {
  backendHost = `https://admin.uppercampus.com`;
} else {
  backendHost = `https://dev-vct.uppercampus.com`;
}

export const API_URL = `${backendHost}/api/`;
