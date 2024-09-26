const { default: axios } = require("axios");
const authToken = process.env.NEXT_PUBLIC_AUTH_TOKEN;

export const GET = async (url) => {
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const data = await res?.data;
  return data;
};
