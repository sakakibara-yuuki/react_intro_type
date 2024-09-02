import { Button } from "../atoms/button/Button";
import { Select } from "../atoms/select/Select";
import { User } from "../../types/User"
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(auto, 1fr);
  gap: 8px;
  padding-right: 8px;
  width: 80%;
  padding-top: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    align-items: center;
  }
`;

interface FilterProperty {
  sampleUser: User
}

export function Filter({ sampleUser }: FilterProperty) {

  return (
    <Wrapper>
      <Button label={"全員"} />
      <Button label={"生徒"} />
      <Button label={"メンター"} />

      <Select>
        {Object.keys(sampleUser).map((key: string) => {
          return (
            <option key={key} value={key}>
              {key}
            </option>
          );
        })}
      </Select>
    </Wrapper>
  );
};
