import { styled } from "styled-components";
import { Student, Mentor } from "../../types/User";
import type { CategoryType  } from "../../App";

interface TableProps {
  showList: (Student | Mentor)[];
  category: CategoryType;
  sortStudentList: (
    key: "score" | "studyMinutes",
    order: "asc" | "desc",
  ) => void;
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

export function Table({
  showList,
  category,
  sortStudentList,
  sortMentorList,
}: TableProps) {
  let attributes = [
    "id",
    "name",
    "email",
    "age",
    "postCode",
    "phone",
    "hobbies",
    "url",
    "role",
    "incharge",
  ];
  const studentAttributes = ["score", "studyMinutes", "taskCode", "studyLangs"];
  const mentorAttributes = [
    "experienceDays",
    "useLangs",
    "availableStartCode",
    "availableEndCode",
  ];
  const sortableAttributes = ["score", "studyMinutes", "experienceDays"];

  if (category === "all") {
    attributes = [...attributes, ...studentAttributes, ...mentorAttributes];
  } else if (category === "student") {
    attributes = [...attributes, ...studentAttributes];
  } else {
    attributes = [...attributes, ...mentorAttributes];
  }

  const attributeTableHeader = attributes.map((key) => {
    let buttons;
    if (category === "all") {
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

  function showUserList() {
    switch (category) {
      case "all":
        return showList;
      case "student":
        return showList.filter((user) => user.role == "student");
      case "mentor":
        return showList.filter((user) => user.role == "mentor");
    }
  }

  function showTableData<T extends Student | Mentor>(user: T) {
    return attributes.map((key) => {
      let value: string;
      if (Object.keys(user).includes(key)) {
        if (Array.isArray(user[key as keyof T])) {
          value = (user[key as keyof T] as string[]).join("　");
        } else {
          value = user[key as keyof T] as string;
        }
      } else {
        value = "x";
      }
      return <td key={key}>{value}</td>;
    });
  }

  function showTableRows<T extends Student | Mentor>(user: T, index: number) {
    return <tr key={index}>{showTableData<T>(user)}</tr>;
  }

  return (
    <Wrapper>
      <thead>
        <tr>{attributeTableHeader}</tr>
      </thead>
      <tbody>
        {showUserList().map((user: Student | Mentor, index: number) => {
          if (user.role === "student") {
            return showTableRows<Student>(user, index);
          } else {
            return showTableRows<Mentor>(user, index);
          }
        })}
      </tbody>
    </Wrapper>
  );
}
