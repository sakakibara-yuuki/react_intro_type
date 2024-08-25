import { RoleButton } from "../atoms/button/RoleButton";
import { Select } from "../atoms/button/Select";

import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(auto, 1fr);
  gap: 8px;
  padding-right: 8px;
  width: 80%;
  padding-top: 16px;
`;


export const Filter = ({ sampleUser }) => {
  return (
    <Wrapper>
      <RoleButton>全員</RoleButton>
      <RoleButton>生徒</RoleButton>
      <RoleButton>メンター</RoleButton>

      <Select>
        {Object.keys(sampleUser).map((key: string) => {
          return <option value={key}>{key}</option>;
        })}
      </Select>

    </Wrapper>
  );
};
