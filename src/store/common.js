export const headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
};

export const jsonResponse = (res) => {
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
};
