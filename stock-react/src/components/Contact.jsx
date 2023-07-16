import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { LogoFacebook, LogoGithub, LogoLinkedin, LogoInstagram } from 'react-ionicons';
import Wave from "react-wavify";

const Section = styled.div`
  scroll-snap-align: center;
  @media only screen and (max-width: 768px) {
    margin-top: 400px;
  }
`
const Footer = styled.footer`
  height: 30vh;
  position: relative;
  width: 100%;
  background: #3586ff;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SocialIcon = styled.ul`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  flex-wrap: wrap;
`;

const SocialIconItem = styled.li`
  list-style: none;
`;

const SocialIconLink = styled.a`
  font-size: 2rem;
  color: #fff;
  margin: 0 10px;
  display: inline-block;
  transition: 0.5s;

  &:hover {
    transform: translateY(-10px);
  }
`;

const Menu = styled.ul`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  flex-wrap: wrap;
`;

const MenuItem = styled.li`
  list-style: none;
`;

const MenuLink = styled.a`
  font-size: 1.2rem;
  color: #fff;
  margin: 0 10px;
  display: inline-block;
  transition: 0.5s;
  text-decoration: none;
  opacity: 0.75;
  font-weight: 300;

  &:hover {
    opacity: 1;
  }
`;

const Copyright = styled.p`
  color: #fff;
  margin: 15px 0 10px 0;
  font-size: 1rem;
  font-weight: 300;
`;
const StyledWave = styled(Wave)`
  position: relative;
  top: 10px;
`;
function Contact() {
  return (
    <Section>
      <StyledWave 
      fill='#3586ff'
      paused={false}
      options={{
        height: 80,
        amplitude: 8,
        speed:0.7,
        points: 6
      }}
    />
      <Footer>
      <SocialIcon>
        <SocialIconItem>
          <SocialIconLink href="https://github.com/eazook10003">
            <LogoGithub color="#ffffff" />
          </SocialIconLink>
        </SocialIconItem>
        <SocialIconItem>
          <SocialIconLink href="https://www.linkedin.com/in/dongwoo-kang-0775a9209/">
            <LogoLinkedin color="#ffffff" />
          </SocialIconLink>
        </SocialIconItem>
      </SocialIcon>
      <Menu>
        <MenuItem><MenuLink href="#">My personal Website</MenuLink></MenuItem>
        
      </Menu>
      <Copyright>&copy;2023 Dongwoo Kang | All Rights Reserved</Copyright>
    </Footer>
    </Section>
  )
}

export default Contact
