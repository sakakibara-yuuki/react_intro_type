import { styled } from "styled-components";
import { Button } from './Button';


export const Select = styled(Button)`
  & option:hover {
    background-color: var(--color-tertiary);
  }
`;
