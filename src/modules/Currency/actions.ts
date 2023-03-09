import axios from "axios";

const API_KEY = "12334053ccb42cfd1d398a2f";

export const getCurrency = async () => {
  try {
    const response = await axios({
      method: "get",
      url: "https://gist.githubusercontent.com/JCGonzaga01/9f93162c5fb799b7c084bb28fc69a2f1/raw/94c55f89dc4c1e2e7ca49de5658c3441a2b348af/Updated-Common-Currency.json",
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getExchangeRate = async (currencyType: string) => {
  try {
    const response = await axios({
      method: "get",
      url: `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/USD/${currencyType}`,
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};
