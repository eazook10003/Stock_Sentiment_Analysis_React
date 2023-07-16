import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-scroll';
const Section = styled.div`
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`

const Container = styled.div`
  width: 1400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
  @media only screen and (max-width: 768px) {
    width: 100%;

  }
`

const Links = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

const LogoDiv = styled.div`
  @media only screen and (max-width: 768px) {
    right: 50px;
  }
`

const List = styled.ul`
    display: flex;
    gap: 70px;
    list-style: none;
    text-align: right;

    @media only screen and (max-width: 768px) {
      display: none;
    }
`

const ListItem = styled.li`
  cursor: pointer;
`

const Logo = styled.img`
    margin-top: 0px;
    height: 50px;
    @media only screen and (max-width: 768px) {
      margin-left: 30px;
    }
`

function Navbar() {
  return (
    <Section>
      <Container>
        <Links>
          <Logo src="./img/logo.png"/>
          <List>
              <ListItem>
                <Link to="hero" containerId="container" spy={true} smooth={true} offset={50} duration={500}>Home</Link>
                </ListItem>
              <ListItem>
                <Link to="headlines" containerId="container" spy={true} smooth={true} offset={50} duration={100}>Headlines</Link>
                </ListItem>
              <ListItem>
                <Link to="result" containerId="container" spy={true} smooth={true} offset={50} duration={500}>Result</Link>
                </ListItem>
              <ListItem>
                <Link to="contact" containerId="container" spy={true} smooth={true} offset={50} duration={500}>Footer</Link>
                </ListItem>
          </List>
        </Links>
      </Container>
    </Section>
  )
}

export default Navbar
