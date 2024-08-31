import { styled } from "styled-components";
import { User } from "../../types/User";

interface TableProps {
  userList: Array<User>;
  sampleUser: User;
}

const Wrapper = styled.table`
  border: 5px solid var(--color-secondary);
  border-radius: 4px;

  & td {
    padding: 5px;
    border-bottom: 1px solid var(--color-secondary);
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const Table = ({ userList, sampleUser }: TableProps) => {
  return (
    <Wrapper>
      <thead>
        <tr>
          {Object.keys(sampleUser).map((key: string) => {
            return <th key={key}>{key}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {userList.map((user: User, index: number) => {
          return (
            <tr key={index}>
              {Object.keys(user).map((key) => {
                return <td key={key}>{user[key as keyof User]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Wrapper>
  );
};
