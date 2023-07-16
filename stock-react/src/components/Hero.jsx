import styled from 'styled-components'
import Navbar from './Navbar'
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial }from "@react-three/drei"
import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';
import { Link } from 'react-scroll';
import { scroller } from 'react-scroll';

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-betweem;
  @media only screen and (max-width: 768px) {
    height: 200vh;
  }
`
const Container = styled.div`
  height: 100%;
  scroll-snap-align: center;
  width: 1400px;
  display: flex;
  justify-content: space-betweem;
  @media only screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

const Left = styled.div`
  flex: 3.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  @media only screen and (max-width: 768px) {
    flex: 1;
    align-items: center;
    margin-bottom: 100px;
  }
`

const Title = styled.h1`
  font-size: 74px;
  padding: 0px;
  position: relative;
  top: 0px;
  padding-left: 20px;
  @media only screen and (max-width: 768px) {
    // margin-bottom: 80px;
    font-size: 50px;
    text-align: center;
  }
`
const Desc = styled.p`
  font-size: 20px;
  color: lightgrey;
  position: relative;
  padding-left: 30px;
  padding-bottom: 20px;
  left-margin: 10px
  @media only screen and (max-width: 768px) {
    
  }
`
const SearchBar = styled.div`
  position: relative;
  top: 0px;
  left: 0px;
  @media only screen and (max-width: 768px) {
    max-width: 700px;
    left: 0px;
    padding-right: 30px;
  }

`
const SearchForm = styled.form`
  width: 100%;
  max-width: 630px;
  background: rgba(225, 225, 225, 0.2);
  display: flex;
  align-items: center;
  border-radius: 60px;
  padding: 10px 20px;
  justify-content: space-around; // Add this to distribute space evenly between the elements in the form
  @media only screen and (max-width: 768px) {
    max-width: 300px;
    flex-direction: column; // Change direction to column for small screens
  }
`

const StyledDateInput = styled.input`
  background: transparent;
  border: 0;
  outline: none;
  padding: 10px 20px;
  font-size: 15px;
  color: #cac7ff;
`

const StyledInput = styled.input`
  background: transparent;
  flex: 1;
  border: 0;
  outline: none;
  padding: 24px 20px;
  font-size: 20px;
  color: #cac7ff;
  &::placeholder {
    color: #cac7ff;
  }
  @media only screen and (max-width: 768px) {
   
  }
`

const StyledButton = styled.button`
  border: 0;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background: #58629b;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
`


const SearchIcon = styled.img`
  width: 25px;
`

const Right = styled.div`
  flex: 3;
  position: relative;
  padding-botton: 300px;
  @media only screen and (max-width: 768px) {
    flex: 1;
    width: 100%;
  }

`
const Img = styled.img`
  width: 450px;
  height: 600px;
  object-fit: contain;
  position: absolute;
  top: 0;
  bottom: 150px;
  left: 0;
  right: 0;
  margin: auto;
  animation: animate 2s infinite ease alternate;
  @media only screen and (max-width: 768px) {
    width: 400px;
    height: 400px;
    margin-top: 100px;
  }
  @keyframes animate {
    to{
      transform: translateY(25px);
    }
  }
`

const CanvasContainer = styled.div`
@media only screen and (max-width: 768px) {
  margin-top: 100px;
}
`
function Hero() {
  const { searchTerm, handleSearchTermChange, startDate, handleStartDateChange, endDate, handleEndDateChange, fetchData, onFormSubmit } = useContext(AppContext);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onFormSubmit();
  };

  return (
    <Section>
      <Navbar/>
      <Container>
        <Left>
          <Title>Stock Market Sentiment Analysis </Title>
          <Desc>Type in the ticker you want to look for!</Desc>
          <SearchBar>
          <SearchForm onSubmit={handleFormSubmit}>
        <StyledInput type="text" placeholder="search for ticker..." name="q" value={searchTerm} onChange={handleSearchTermChange} />
        <StyledDateInput type="date" value={startDate} onChange={(e) => handleStartDateChange(e.target.value)} />  {/* Start date input */}
        <StyledDateInput type="date" value={endDate} onChange={(e) => handleEndDateChange(e.target.value)} />  {/* End date input */}
        {/* <Link to="headlines" containerId="container" spy={true} smooth={true} offset={50} duration={500}> */}
          <StyledButton type="submit">
            <SearchIcon src="./img/search.png" />
          </StyledButton>
        {/* </Link> */}
      </SearchForm>
          </SearchBar>
        </Left>
        <Right>
          <Canvas>
            <OrbitControls enableZoom={false}  />
            <ambientLight intensity={1} />
            <directionalLight position={[3, 2, 1]} />
            <Sphere args= {[1,100,200]} scale={2.4}>
            <MeshDistortMaterial
              color="#220736" 
              attach="material" 
              distort={0.5} 
              speed={2}
            />
            </Sphere>
          </Canvas>
          <Img src="./img/moon.png" />
        </Right>
      </Container>
    </Section>
  )
}

export default Hero
