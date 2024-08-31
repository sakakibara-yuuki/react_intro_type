import { styled } from "styled-components";

export const Select = styled.select`
  background-color: var(--color-secondary);
  border-radius: 8px;
  cursor: pointer;

  & option:hover {
    background-color: var(--color-tertiary);
  }
`;
