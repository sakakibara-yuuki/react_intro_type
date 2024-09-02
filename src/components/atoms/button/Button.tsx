import React from "react";
import { styled } from "styled-components";


const StyledButton = styled.button<ButtonProps>`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 5px;
  color: ${(props) => props.theme.secondary};
  background-color: ${(props) => props.theme.primary};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.primary};
    background-color: ${(props) => props.theme.secondary};
  }
`;

interface ButtonProps {
  theme?: {
    primary: string;
    secondary: string;
  };
  label?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button(props: ButtonProps) {
  const label = props.label;
  const onClick = props.onClick;

  return (
    < StyledButton onClick={onClick} > {label}</ StyledButton >
  );
}
