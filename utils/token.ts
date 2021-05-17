/*

ACCESS TOKEN

*/
export const setAccessToken = (value: string) => {
  localStorage.setItem('token', value);
};

export const getAccessToken = () => {
  return typeof window !== 'undefined' ? localStorage.getItem('token') : '';
};
