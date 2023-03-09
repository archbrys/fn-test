import { useEffect, useState, useCallback } from "react";
import { getCurrency, getExchangeRate } from "../../modules/Currency/actions";
import { ICurrency } from "../../modules/Currency/interface";

const useCurrencyExchange = () => {
  const [currency, setCurrency] = useState<ICurrency | undefined>(undefined);
  const [currencyList, setCurrencyList] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [rate, setRate] = useState(null);
  const [error, setError] = useState<any>(null);

  const fetchCurrency = useCallback(async () => {
    try {
      const _currency = await getCurrency();

      setCurrencyList(_currency);
    } catch (err: any) {
      setError(err);
    }
  }, []);

  const fetchExchangeRate = useCallback(async () => {
    setError(null);
    try {
      const res = await getExchangeRate(selectedCurrency);

      setRate(res.conversion_rate);
      const curr = Object.values(currencyList).find((c: ICurrency) => {
        return c.code === selectedCurrency;
      });

      setCurrency(curr);
      return res;
    } catch (err: any) {
      setError(err.response);
      setRate(null);
    }
  }, [selectedCurrency]);

  useEffect(() => {
    fetchCurrency();
  }, []);

  useEffect(() => {
    selectedCurrency !== "" && fetchExchangeRate();
  }, [selectedCurrency]);

  return {
    error,
    rate,
    currency,
    currencyList,
    selectedCurrency,
    setSelectedCurrency,
  };
};

export default useCurrencyExchange;
