import React from "react";
import { styled } from "styled-components";

const StyledButton = styled.button<ButtonProps>`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.buttonBackground};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.buttonBackground};
    background-color: ${({ theme }) => theme.text};
  }
`;

interface ButtonProps {
  theme?: {
    primary: string;
    secondary: string;
  };
  label?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button(props: ButtonProps) {
  const label = props.label;
  const onClick = props.onClick;
  const type = props.type;

  return (
    <StyledButton onClick={onClick} type={type}>
      {" "}
      {label}
    </StyledButton>
  );
}
