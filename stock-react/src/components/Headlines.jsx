
import React, { useContext, useState } from 'react';
import { AppContext } from '../AppContext';
import styled from 'styled-components'
import { Tetrahedron } from '@react-three/drei';



const message = [
  "We",
  "Analyze",
  "Headlines",
  "for",
  "Sentiment",
  "Analysis",
]; 
const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    height: 200vh;
  }
`
const Container = styled.div`
  width: 1400px;
  display:flex;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`
const Left = styled.div`
  flex: 2;
  @media only screen and (max-width: 768px) {
    flex: 1;
    align-items: center;
  }
`
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 768px) {
    flex: 1;
    align-items: center;
    margin-top: 100px;
  }
`
const Message = styled.h1`
  font-size: 90px;
  padding-top: 120px;
  padding-left: 50px;
  margin-right: 50px;
  position: relative;
  top: -70px;
  color: transparent;
  font-weight: bold;
  -webkit-text-stroke: 1.5px white;

  &:after{
    content: "we Analyze Headlines for Sentiment Analysis";
    position: absolute;
    top: 120px;
    left: 50px;
    color: pink;
    width: 0px;
    overflow: hidden;
    white-space: nowrap;
  }

  &:hover{
    &:after{
      animation: moveText 0.5s linear both;

      @keyframes moveText {
        to{
          width: 100%;
        }
      }
    }
  }
`

const Ticker = styled.h1`
  color: white;
  //color: transparent;
  -webkit-text-stroke: 1.5px white;
  padding-left: 55px;
  padding-top: 50px;
  font-size: 50px;
  position: relative;
  span {
    margin-left: 460px;
  }

  @media only screen and (max-width: 768px) {
    text-align: center;
    align-items: center;
    padding-left: 0px;
    margin: 0px;
    span {
      margin-left: 0;
    }
  }
`

const ScrollBox = styled.div`
  height: 540px; 
  width: 800px;
  overflow: auto;
  padding: 1rem;
  margin: 1rem;
  @media only screen and (max-width: 768px) {
    width: 400px;
    margin: 0px;
    padding: 0;
    align-items: center;
    &::-webkit-scrollbar{
      display: none;
    }
    margin-top: 30px;
  }
`;
const TextBox = styled.div`
  width: 30px
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 30px;
  margin-right: 0px;
  //box-shadow: 0px 5px 15px rgba(0,0,0,0.1);
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;  border-radius: 30px;
  transition: transform 0.3s ease-in-out;   /* Add this */
  background: -webkit-linear-gradient( 36deg, #3a1c71, #d76d77, #ffaf7b);
  &:hover {
    transform: scale(1.05);  /* And this */
  }
`
const Title = styled.a`
  color: white;
  // -webkit-text-stroke: 1.5px white;
  font-size: 50px;
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  text-decoration:none;
  @media only screen and (max-width: 768px) {
    font-size: 40px;
  }
`
const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Text = styled.li`
  font-size: 85px;
  font-weight: bold;
  cursor: pointer;
  color: transparent;
  -webkit-text-stroke: 1px white;
  position: relative;
  &:after{
    content: "${(props)=>props.text}";
    position: absolute;
    top: 0;
    left: 0;
    color: pink;
    width: 0px;
    overflow: hidden;
  }

  &:hover{
    &:after{
      animation: moveText 0.5s linear both;
      @keyframes moveText{
        to{
          width: 100%;
        }
      }
    }
  }
`
const Ele = styled.div`
`

function Headlines() {
  const { data, stockPrice} = useContext(AppContext);
  // console.log("StockPrice");
  // console.log(stockPrice);
  return (
    <Section>
      <Container>
      <Left>
        {(data.news.length === 0) ? (
          <Ticker>Loading...</Ticker>
        ) : (
          <>
            <Ticker>{data.news[0].ticker.toUpperCase()} {stockPrice && <span>${parseFloat(stockPrice).toFixed(2)}</span>}</Ticker>
            <ScrollBox>
              {data.news.map((member, i) => (
                <TextBox key={i}>
                  <p>{member.date} {member.time}</p>
                  <Title href={member.link} target="_blank">{member.title}</Title>
                </TextBox>
              ))}
            </ScrollBox>
          </>
        )}
      </Left>
      <Right>
          <List>
              {message.map(item=>(
                <Text key={item} text={item}>{item}</Text>
              ))}
          </List>
      </Right>
      </Container>
    </Section>
  );
}

export default Headlines;
