import React, { useState, useEffect, useContext } from 'react';
import Plot from 'react-plotly.js';
import { AppContext } from '../AppContext';
import styled, { css } from 'styled-components';

const Container = styled.div`

`
const Title = styled.h1`
  text-align: center;
  font-family: 'Poppins', sans-serif;
  padding-bottom: 15px;
`

function Stock(){
  const { stockChartXValues, stockChartYValues } = useContext(AppContext);
  const [width, setWidth] = useState(window.innerWidth);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const plotWidth = width > 768 ? 600 : width - 70; // Adjust width as per your needs for mobile view
  const plotHeight = width > 768 ? 500 : 400; // Adjust height as per your needs for mobile view

   console.log("Xvalue");
   console.log(stockChartXValues)
  return (
    <Container>
      <Title>Stock Chart</Title>
      <Plot
        data={[
          {
            x: stockChartXValues,
            y: stockChartYValues,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          }
        ]}
        layout={{
          width: plotWidth, 
          height: plotHeight, 
          plot_bgcolor:"#F5F5F5", // Set plot background color to light gray
          paper_bgcolor:"#F5F5F5", // Set paper background color to light gray
        }}
      />

    </Container>
  );
}
export default Stock;
