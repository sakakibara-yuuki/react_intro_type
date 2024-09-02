import { ReactNode } from "react";
import { styled } from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-areas:
    "header header header"
    "side-a main side-b"
    "footer footer footer";
  grid-template-columns: 240px 1fr 150px;
  grid-template-rows: auto 1fr auto;
  gap: 16px;
  height: 100svh;
  padding: 16px;

  > .header {
    grid-area: header;
    margin-top: -16px;
    margin-left: -16px;
    width: 100vw;
  }

  > .main {
    grid-area: main;
    margin: 16px;
    overflow: auto;
  }

  > .side-a {
    grid-area: side-a;
    overflow: auto;
  }

  > .side-b {
    grid-area: side-b;
    overflow: auto;
    min-width: 200px;
  }

  > .footer {
    grid-area: footer;
  }

  @media (max-width: 768px) {
    grid-template-areas:
      "header"
      "side-b"
      "main"
      "side-a"
      "footer";
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr auto auto;
    height: 100%;
  }
`;

interface HolyProps {
  Header: ReactNode;
  SideA: ReactNode;
  Main: ReactNode;
  SideB: ReactNode;
  Footer: ReactNode;
}

export const Holy = ({
  Header,
  SideA,
  Main,
  SideB,
  Footer,
}: HolyProps) => {
  return (
    <Wrapper>
      <div className="header">{Header}</div>
      <div className="side-a">{SideA}</div>
      <div className="main">{Main}</div>
      <div className="side-b">{SideB}</div>
      <div className="footer">{Footer}</div>
    </Wrapper>
  );
};
