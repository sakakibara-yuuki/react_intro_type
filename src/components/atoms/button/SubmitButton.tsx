import { styled } from "styled-components";
import { Button } from "./Button";

export const SubmitButton = styled(Button)`
  width: 100%;

  &:hover {
    background-color: var(--color-tertiary);
  }
`;
