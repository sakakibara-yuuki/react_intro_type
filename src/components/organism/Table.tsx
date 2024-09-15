import { styled } from "styled-components";
import { Student, Mentor } from "../../types/User";

interface TableProps {
  userList: (Student | Mentor)[];
  category: "user" | "student" | "mentor";
  sortStudentList: (key: "score" | "studyMinutes", order: "asc" | "desc") => void;
  sortMentorList: (key: "experienceDays", order: "asc" | "desc") => void;
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

const AttributeContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: "attr ."
                       "attr .";
  justify-content: left;
  align-items: center;
  padding-left: 0.5em;
  column-gap: 0.5em;

  & span {
    grid-area: attr;
    width: min-content;
  }

  & button {
    padding: 0;
    margin: 0;
    border: none;
    background-color: transparent;
    height: 1em;
    cursor: pointer;
  }

  & button:active {
    background-color: ${({ theme }) => theme.buttonBackground};
  }
}
`;


export function Table({ userList, category, sortStudentList, sortMentorList }: TableProps) {
  let attributes = ["id", "name", "email", "age", "postCode", "phone", "hobbies", "url", "role"];
  const studentAttributes = ["score", "studyMinutes", "taskCode", "studyLangs"];
  const mentorAttributes = ["experienceDays", "useLangs", "availableStartCode", "availableEndCode"];
  const sortableAttributes = ["score", "studyMinutes", "experienceDays"];

  if (category === "user") {
    attributes = [...attributes, ...studentAttributes, ...mentorAttributes];
  } else if (category === "student") {
    attributes = [...attributes, ...studentAttributes];
  } else {
    attributes = [...attributes, ...mentorAttributes];
  }

  const attributeTableHeader = attributes.map((key) => {
    let buttons;
    if (category === "user") {
      buttons = <></>;
    } else if (category === "student") {
      const sortKey = key === "score" ? "score" : "studyMinutes";
      buttons = (
        <>
          <button onClick={() => sortStudentList(sortKey, "asc")}>▲</button>
          <button onClick={() => sortStudentList(sortKey, "desc")}>▼</button>
        </>
      );
    } else {
      const sortKey = "experienceDays";
      buttons = (
        <>
          <button onClick={() => sortMentorList(sortKey, "asc")}>▲</button>
          <button onClick={() => sortMentorList(sortKey, "desc")}>▼</button>
        </>
      );
    }

    return (
      <th data-id={key} key={key}>
        <AttributeContainer>
          <span>{key}</span>
          {sortableAttributes.includes(key) && buttons}
        </AttributeContainer>
      </th>
    );
  });

  const selectedTableRows = userList.map((user: Student | Mentor, index: number) => {
    return user.role === "student" ? (
      <tr key={index}>
        {attributes.map((key) => <td key={key}>{
          Object.keys(user).includes(key) ?
            Array.isArray(user[key as keyof Student]) ? user[key as keyof Student].join('　') : user[key as keyof Student]
            : "x"}</td>)}
      </tr>
    ) : (
      <tr key={index}>
        {attributes.map((key) => <td key={key}>{
          Object.keys(user).includes(key) ?
            Array.isArray(user[key as keyof Mentor]) ? user[key as keyof Mentor].join('　') : user[key as keyof Mentor]
            : "x"}</td>)}
      </tr>
    );
  });

  return (
    <Wrapper>
      <thead>
        <tr>
          {attributeTableHeader}
        </tr>
      </thead>
      <tbody>
        {selectedTableRows}
      </tbody>
    </Wrapper>
  );
};
