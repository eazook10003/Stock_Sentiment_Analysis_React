import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [data, setData] = useState({ news: [], ratings: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [stockPrice, setStockPrice] = useState(null);
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value.toUpperCase());
    console.log("term: ")
    console.log(event.target.value)
  };

  const handleStartDateChange = (date) => {
    console.log("HAndle start date: ")
    console.log(date)
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    console.log("HAndle end date: ")
    console.log(date)
    setEndDate(date);
  };

  const fetchData = async () => {
    try {
      let url = `http://127.0.0.1:5000/${searchTerm}`;
  
      if (startDate && endDate) {
        const startDateFormatted = startDate.split('-').reverse().join('/');
        const endDateFormatted = endDate.split('-').reverse().join('/');
  
        url += `?start_date=${startDateFormatted}&end_date=${endDateFormatted}`;
      }
      console.log("URL: ")
      console.log(url); // Log the URL here

      const res = await fetch(url);
      const fetchedData = await res.json();
      const newsData = JSON.parse(fetchedData.news);
      const ratingsData = JSON.parse(fetchedData.ratings);

      setData({ news: newsData, ratings: ratingsData });
    } 
    catch (err) {
      alert("Invalid Input!");
      console.error(err);
    }
  };
  
  

  
  const fetchStockPrice = async () => {
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${searchTerm}&apikey=LGTQPB6H1O71QVAA`);
      const data = await response.json();
      setStockPrice(data["Global Quote"]["05. price"]);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStock = () => {
    if (!data.news[0]) {
      return;
    }
    const API_KEY = 'LGTQPB6H1O71QVAA';
    let StockSymbol = data.news[0].ticker;
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;

    fetch(API_Call)
      .then(response => response.json())
      .then(data => {
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];
      
        for (var key in data['Time Series (Daily)']) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
        }

        setStockChartXValues(stockChartXValuesFunction);
        setStockChartYValues(stockChartYValuesFunction);
      });
  };

const onFormSubmit = () => {
    if (searchTerm !== "") {
      fetchData();
      fetchStockPrice();
    }
  };

useEffect(() => {
  if (data.news.length > 0) {
    fetchStock();
  }
}, [data]);

return (
  <AppContext.Provider value={{ data, searchTerm, handleSearchTermChange, startDate, handleStartDateChange, endDate, handleEndDateChange, fetchData, onFormSubmit, stockPrice, stockChartXValues, stockChartYValues }}>
    {children}
  </AppContext.Provider>
);
};

