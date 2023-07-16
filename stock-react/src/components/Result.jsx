import React, { useContext, useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { AppContext } from '../AppContext';
import Stock from './Stock';


const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-betweem;
  @media only screen and (max-width: 768px) {
    height: 200vh;
    margin-top: 100px;
  }
  `

const Container = styled.div`
    height: 100%;
    width: 1400px;
    display: flex;
    justify-content: space-between;
    scroll-snap-align: center;
    align-items: center;
    padding: 0px;
    @media only screen and (max-width: 768px) {
      width: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
`

const Left = styled.div`
  flex: 1;
  @media only screen and (max-width: 768px) {
    flex: 1;
    display: flex;           
    flex-direction: column;   
    align-items: center;      
    justify-content: center;
    margin-bottom: 300px;
  }
`
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 768px) {
    flex: 1;
    display: flex;           
    flex-direction: column;   
    align-items: center;      
    justify-content: center;
  }
`
const SkillBox = styled.div`
  width: 700px;
  margin: 0;
  position: relative;
  bottom: 0px;
  right: 5px;
  height: 70px;
  @media only screen and (max-width: 768px) {
    align-items: center;
    width: 400px;
  }
  
`;

const ProgessionBar = styled.div`
  height: 40px;
  width: 100%;
  border-radius: 6px;
  margin-top: 6px;
  background-color: white; 
  margin-left: 20px;
  @media only screen and (max-width: 768px) {
    align-items: center;
    width: 400px;
    height: 30px;
    margin-left: 0px;
  }
`;

// Use transition instead of animation for smooth width change
const ProgressPer = styled.span`
  position: relative;
  display: block;
  height: 100%;
  width: ${props => props.isVisible ? (props.averageCompound + 1) / 2 * 100 : 0}%;
  border-radius: 0px;
  background: #cc2b5e;
  transition: width 2s ease-in-out;
  margin-left: 0px;
`;

const ToolTip = styled.span`
  position: absolute;
  right: -14px;
  top: -28px;
  font-size: 9px;
  font-weight: 500;
  color: #fff;
  padding: 2px 6px;
  border-radius: 3px;
  background: crimson;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -2px;
    height: 10px;
    width: 10px;
    z-index: -1;
    background-color: crimson;
    transform: translateX(-50%) rotate(45deg);
  }
`;

const AvgCmp = styled.h1`
    text-align: center;
    padding: 5px;
    position: relative;
    @media only screen and (max-width: 768px) {
      font-size: 15px;
      align-items: center;
    }
`

const CmpContainer = styled.div`
    margin-left: 0px;
    width: 700px;
    height: 50px;
    background: -webkit-linear-gradient( 36deg, #3a1c71, #d76d77, #ffaf7b);
    border-radius: 10px;
    position: relative;
    bottom: 30px;
    left: 15px;
    @media only screen and (max-width: 768px) {
      width: 50%;        // Updated
      max-width: 400px; 
      height: 30px;
      left: 0px;
      align-items: center;
    }
`

const StockContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 600px;
  width: 640px;
  margin-bottom: 150px;
  position: relative;
  left: 10px;
  top: 80px;
  border-radius: 0px;
  border: solid white;
  @media only screen and (max-width: 768px) {
    width: 400px;
    left: 0px;
    align-items: center;
    border: none;
    }
  `

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RefreshButton = styled.button`
  /* Your button styles go here */
  position: relative;
  left: 600px; 
  bottom: 250px;
  z-index: 1;
  border: 0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background: white;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
  @media only screen and (max-width: 768px) {
    left: 150px;
    top: 190px;
  }
  `;

const RefreshIcon = styled.img`
transition: all 0.3s ease-in-out;
  &:hover {
    animation: ${spin} 1s linear infinite;
  }
  
  height: 30px;`

const Title = styled.h1`
  font-size: 70px;
  padding: 0px;
  position: relative;
  bottom: 80px;
  padding-left: 20px;
  @media only screen and (max-width: 768px) {
    margin-top: 600px;
    font-size: 50px;
    text-align: center;
    padding: 10px;
  }
  
`
const Title1 = styled.h1`
  font-size: 70px;
  padding: 0px;
  position: relative;
  top: 20px;
  padding-left: 20px;
  @media only screen and (max-width: 768px) {
    padding: 0px;
    font-size: 50px;
    position: relative;
    top: 150px;
  }
`
const Desc = styled.p`
  font-size: 18px;
  color: lightgrey;
  position: relative;
  padding-left: 20px;
  bottom: 70px;
  left-margin: 10px;
  @media only screen and (max-width: 768px) {
    font-size: 20px;
    text-align: center;
    padding: 0px;
  }
`

const IndicatorContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-left: 0px;
  left: 20px;
  @media only screen and (max-width: 768px) {
    left: 0px;
    align-items: center;
    text-align: center;
  }
`;

const IndicatorLabel = styled.span`
  font-size: 15px;
  color: ${props => props.color || "black"};
`;

const Ticker = styled.h1`
  color: white;
  //color: transparent;
  -webkit-text-stroke: 1.5px white;
  padding-left: 55px;
  padding-top: 50px;
  font-size: 50px;
  position: relative;
  @media only screen and (max-width: 768px) {
    position: relative;
    top: 250px;
    font-size: 40px;
    text-align: center;
    padding: 0px;
  }
`
const TextBox = styled.div`
  height: 7px;
  margin-bottom: 10px;
  padding: 30px;
  //box-shadow: 0px 5px 15px rgba(0,0,0,0.1);
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
  transition: transform 0.3s ease-in-out;   /* Add this */
  background: -webkit-linear-gradient( 36deg, #3a1c71, #d76d77, #ffaf7b);
  @media only screen and (max-width: 768px) {
    
    }
`
const ScrollBox = styled.div`
  height: 190px; 
  width: 600px;
  overflow: auto;
  position: relative;
  top: 50px;
  left: 15px;
  @media only screen and (max-width: 768px) {
    width: 400px;
    height: 400px;
    left: 0px;
    align-items: center;
    position: relative;
    top: 200px;
    }
`;

const Text1 = styled.h1`
  color: white;
  // -webkit-text-stroke: 1.5px white;
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  text-decoration:none;
  position: relative;
  bottom: 20px;
  @media only screen and (max-width: 768px) {
    font-size: 17px;
  }
`
const Date = styled.p`
  color: white;
  // -webkit-text-stroke: 1.5px white;
  font-size: 10px;
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  text-decoration:none;
  position: relative;
  bottom: 20px;
  `
function Result() {
  const { data, stockPrice, fetchData} = useContext(AppContext);
  const onRefresh = () => {
    fetchData();
  };
  const averageCompound = parseFloat((data.news.reduce((sum, member) => sum + member.compound, 0) / data.ratings.length).toFixed(2));
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);

    // Clean up the observer when the component unmounts
    return () => observer.unobserve(domRef.current);
  }, []);

  return (
    <Section ref={domRef}>
      <Container>
        <Left>
        <Title>Analysis Result</Title>
        <Desc>-1 indicates highly negative sentiment and 1 indicates highly positive sentiment
</Desc>
        <CmpContainer>
        <AvgCmp>Average Sentiment Score: {averageCompound}</AvgCmp>
        </CmpContainer>
        <SkillBox>
        <ProgessionBar>
      <ProgressPer isVisible={isVisible} averageCompound={averageCompound}>
        <ToolTip>{(averageCompound).toFixed(2)}</ToolTip>
      </ProgressPer>
      </ProgessionBar>
      <IndicatorContainer>
        <IndicatorLabel color="white">-1</IndicatorLabel>
        <IndicatorLabel color="white">0</IndicatorLabel>
        <IndicatorLabel color="white">1</IndicatorLabel>
      </IndicatorContainer>
        </SkillBox>
      <Title1>Target Price</Title1>
      {(data.ratings.length === 0) ? (
          <Ticker>Loading...</Ticker>
        ) : (
          <>
            <ScrollBox>
              {data.ratings.map((member, i) => (
                <TextBox key={i}>
                  <Date>{member.date1}</Date>
                  <Text1>{member.name}<span style={{float: "right"}}>{member.prices}</span></Text1>

                </TextBox>
              ))}
            </ScrollBox>
          </>
        )}
      </Left>
      <Right>
      <RefreshButton onClick={onRefresh}>
          <RefreshIcon src="./img/refresh.png" />
        </RefreshButton>
        <StockContainer>
          <Stock/>
        </StockContainer>
      </Right>
      </Container>
    </Section>
  );
}

export default Result;