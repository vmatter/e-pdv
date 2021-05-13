import { getAccessToken } from './token';

const { API_URL } = process.env;

export async function fetchGetJSON(url: string) {
  const accessToken = getAccessToken();
  try {
    const data = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${accessToken}`,
      },
    }).then(res => res.json());
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export const authRequest = async (data?: Record<string, unknown>) => {
  try {
    // Default options are marked with *
    const response = await fetch(`${API_URL}auth/token`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data || {}), // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  } catch (err) {
    throw new Error(err.message);
  }
};

export async function fetchPostJSON(
  url: string,
  data?: Record<string, unknown>
) {
  const accessToken = getAccessToken();

  try {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${accessToken}`,
      },
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data || {}), // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  } catch (err) {
    throw new Error(err.message);
  }
}
