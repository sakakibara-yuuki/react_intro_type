import { styled } from "styled-components";

const Wrapper = styled.header`
  box-shadow:
    12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
    100px 100px 80px rgba(0, 0, 0, 0.07);
  padding: 0.5rem 0 0.5rem 1.75rem;
`;

const Title = styled.div`
  font-size: ${1.75 * 1.5}rem;
  text-align: start;
  font-weight: bold;
`;

export const Header = () => {
  return (
    <Wrapper>
      <Title>HPC</Title>
    </Wrapper>
  );
};
