import Contact from "./components/Contact"
import Hero from "./components/Hero"
import Result from "./components/Result"
import Headlines from "./components/Headlines"
import styled from "styled-components"
import { AppProvider } from './AppContext';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: none;
  color: white;
  background: url("./img/bg.jpeg");
  &::-webkit-scrollbar{
    display: none;
  }
  @media only screen and (max-width: 768px) {
    scroll-snap-type: none;
  }
`;

function App() {
  return (
    <AppProvider>
      <Container id="container">
        <div id="hero"><Hero/></div>
        <div id="headlines"><Headlines/></div>
        <div id="result"><Result/></div>
        <div id="contact"><Contact/></div>
      </Container>
    </AppProvider>
  )
}

export default App
