import { styled } from 'styled-components';

const FooterContainer = styled.footer`
  text-align: center;
  border-top: 1px solid #bababa;
  padding: 1rem;
  font-size: 1.5rem;
`;

export const Footer = () => {
  return (
    <FooterContainer>
    © 2024 Sakakibara Yuuki. All rights reserved.
    </FooterContainer>
  )
};
