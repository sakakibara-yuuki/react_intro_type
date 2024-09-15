import styled from "styled-components";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../atoms/button/Button";

const Form = styled.form`
  padding: 1em;
  border-radius: 8px;

  & fieldset {
    border: 5px solid ${({ theme }) => theme.buttonText};
  }

  & > * + * {
    margin-top: 0.5rem;
  }

  & input {
    background: transparent;
    border: 0;
  }
`;

interface UserFormProps {
  onChangeForm: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickAdd: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

type Inputs = {
  name: string;
  roleOfUser: string;
  email: string;
  age: number;
  postCode: number;
  phone: number;
  hobbies: string[];
  url: string;
}

type StudentInputs = {
  studyMinutes: number;
  taskCode: string;
  studyLangs: string[];
  score: number;
}

type TeacherInputs = {
  teachMinutes: number;
  teachLangs: string[];
}


function ToggleRoleOfUser({ roleOfUser, onChange }: { roleOfUser: "student" | "mentor", onChange: () => void }) {
  const ToggleDiv = styled.div`

    border: 1px solid ${({ theme }) => theme.text};
    border-radius: 10px;
    margin-bottom: 1em;

    input[type="checkbox"] {
      appearance: none;
      position: absolute;
      transition: all 0.3s;
      transition: all 0.3s;
    }

    label {
      display: grid;
      grid-template-columns: 1fr 1fr;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      text-align: center;
    }

    label :nth-child(1) {
      position: relative;
    }
    label :nth-child(2) {
      position: relative;
    }


    label :nth-child(1)::before {
      background-color: ${({ theme }) => theme.buttonBackground};
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      transition: all 0.3s;
    }

    label :nth-child(2)::before {
      background-color: ${({ theme }) => theme.buttonBackground};
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      z-index: -1;
      transition: all 0.3s;
    }

    input[type="checkbox"] {
      & + label :nth-child(1)::before {
        width: 100%;
      }
      & + label :nth-child(2)::before {
        width: 0%;
      }
    }

    input[type="checkbox"]:checked {
      & + label :nth-child(1)::before {
        width: 0%;
      }
      & + label :nth-child(2)::before {
        width: 100%;
      }
    }
  `;
  return (
    <ToggleDiv>
      <input type="checkbox" id="roleOfUser" checked={roleOfUser === "student" ? false : true} onChange={onChange} />
      <label htmlFor="roleOfUser">
        <span>student</span>
        <span>mentor</span>
      </label>
    </ToggleDiv>
  )
}

function UserFrom() {
  return (
    <>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          placeholder="鈴木太郎"
          required
        />
      </div>
      <div>
        <label htmlFor="email">email: </label>
        <input
          type="email"
          id="email"
          placeholder="test1@happiness.com"
          required
        />
      </div>
      <div>
        <label htmlFor="age">age: </label>
        <input
          type="text"
          id="age"
          placeholder="26"
          required
        />
      </div>
      <div>
        <label htmlFor="postCode">postCode: </label>
        <input
          type="text"
          id="postCode"
          placeholder="100-0003"
          required
        />
      </div>
      <div>
        <label htmlFor="phone">phone: </label>
        <input
          type="text"
          id="phone"
          placeholder="0120000001"
          required
        />
      </div>
      <div>
        <label htmlFor="hobbies">hobbies: </label>
        <input
          type="text"
          id="hobbies"
          placeholder="20"
          required
        />
      </div>
      <div>
        <label htmlFor="url">url: </label>
        <input
          type="url"
          id="url"
          placeholder="https://aaa.com"
          required
        />
      </div>
    </>
  );
}

function StudentForm() {
  return (
    <>
      <div>
        <label htmlFor="score">score: </label>
        <input
          type="text"
          id="score"
          placeholder="68"
          required
        />
      </div>
      <div>
        <label htmlFor="studyMinutes">studyMinutes: </label>
        <input
          type="text"
          id="studyMinutes"
          placeholder="3000"
          required
        />
      </div>
      <div>
        <label htmlFor="taskCode">taskCode: </label>
        <input
          type="text"
          id="taskCode"
          placeholder="101"
          required
        />
      </div>
      <div>
        <label htmlFor="studyLangs">studyLangs: </label>
        <input
          type="text"
          id="studyLangs"
          placeholder="RailsJavascript"
          required
        />
      </div>
    </>
  );
}

function MentorForm() {
  return (
    <>
      <div>
        <label htmlFor="experienceDays">experienceDays: </label>
        <input
          type="text"
          id="experienceDays"
          placeholder="1850"
          required
        />
      </div>
      <div>
        <label htmlFor="userLangs">useLangs: </label>
        <input
          type="text"
          id="userLangs"
          placeholder="Next.jsGoLang"
          required
        />
      </div>
      <div>
        <label htmlFor="availableStartCode">availableStartCode: </label>
        <input
          type="text"
          id="availableStartCode"
          placeholder="201"
          required
        />
      </div>
      <div>
        <label htmlFor="availableEndCode">availableEndCode: </label>
        <input
          type="text"
          id="availableEndCode"
          placeholder="302"
          required
        />
      </div>
    </>
  )
}


export function UserForm(props: UserFormProps) {

  const { onChangeForm, onClickAdd } = props;

  const [roleOfUser, setRoleOfUser] = useState<"student" | "mentor">("student");

  return (
    <Form>
      <fieldset>
        <legend>New User</legend>
        <ToggleRoleOfUser roleOfUser={roleOfUser} onChange={() => setRoleOfUser(roleOfUser === "student" ? "mentor" : "student")} />
        <UserFrom />
        {roleOfUser === "student" ? <StudentForm /> : <MentorForm />}
      </fieldset>
      <Button label={"追加"} onClick={onClickAdd} />
    </Form>
  );
};
