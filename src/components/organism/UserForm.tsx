import styled from "styled-components";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Student, Mentor } from "../../types/User";
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

function ToggleRoleOfUser({
  roleOfUser,
  onChange,
}: {
  roleOfUser: "student" | "mentor";
  onChange: () => void;
}) {
  return (
    <ToggleDiv>
      <input
        type="checkbox"
        id="roleOfUser"
        checked={roleOfUser === "student" ? false : true}
        onChange={onChange}
      />
      <label htmlFor="roleOfUser">
        <span>student</span>
        <span>mentor</span>
      </label>
    </ToggleDiv>
  );
}

function AllUserInput({ register }: { register: any }) {
  return (
    <>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          placeholder="鈴木太郎"
          {...register("name", { required: true })}
        />
      </div>
      <div>
        <label htmlFor="email">email: </label>
        <input
          type="email"
          id="email"
          placeholder="test1@happiness.com"
          {...register("email", { required: true })}
        />
      </div>
      <div>
        <label htmlFor="age">age: </label>
        <input
          type="text"
          id="age"
          placeholder="26"
          {...register("age", { required: true, min: 0, max: 100 })}
        />
      </div>
      <div>
        <label htmlFor="postCode">postCode: </label>
        <input
          type="text"
          id="postCode"
          placeholder="100-0003"
          {...register("postCode", {
            required: true,
            pattern: /^[0-9]{3}-[0-9]{4}$/,
          })}
        />
      </div>
      <div>
        <label htmlFor="phone">phone: </label>
        <input
          type="text"
          id="phone"
          placeholder="0120000001"
          {...register("phone", { required: true, pattern: /^[0-9]{10,11}$/ })}
        />
      </div>
      <div>
        <label htmlFor="hobbies">hobbies: </label>
        <input
          type="text"
          id="hobbies"
          placeholder="旅行 食べ歩き サーフィン"
          {...register("hobbies", { required: true })}
        />
      </div>
      <div>
        <label htmlFor="url">url: </label>
        <input
          type="url"
          id="url"
          placeholder="https://aaa.com"
          {...register("url", { required: true, pattern: /^https?:\/\/.+/ })}
        />
      </div>
    </>
  );
}

function StudentInput({ register }: { register: any }) {
  return (
    <>
      <div>
        <label htmlFor="score">score: </label>
        <input
          type="text"
          id="score"
          placeholder="68"
          {...register("score", { required: true, min: 0 })}
        />
      </div>
      <div>
        <label htmlFor="studyMinutes">studyMinutes: </label>
        <input
          type="text"
          id="studyMinutes"
          placeholder="3000"
          {...register("studyMinutes", { required: true, min: 0 })}
        />
      </div>
      <div>
        <label htmlFor="taskCode">taskCode: </label>
        <input
          type="text"
          id="taskCode"
          placeholder="101"
          {...register("taskCode", { required: true, min: 0 })}
        />
      </div>
      <div>
        <label htmlFor="studyLangs">studyLangs: </label>
        <input
          type="text"
          id="studyLangs"
          placeholder="RailsJavascript"
          {...register("studyLangs", { required: true })}
        />
      </div>
    </>
  );
}

function MentorInput({ register }: { register: any }) {
  return (
    <>
      <div>
        <label htmlFor="experienceDays">experienceDays: </label>
        <input
          type="text"
          id="experienceDays"
          placeholder="1850"
          {...register("experienceDays", { required: true, min: 0 })}
        />
      </div>
      <div>
        <label htmlFor="useLangs">useLangs: </label>
        <input
          type="text"
          id="useLangs"
          placeholder="Next.jsGoLang"
          {...register("useLangs", { required: true })}
        />
      </div>
      <div>
        <label htmlFor="availableStartCode">availableStartCode: </label>
        <input
          type="text"
          id="availableStartCode"
          placeholder="201"
          {...register("availableStartCode", { required: true, min: 0 })}
        />
      </div>
      <div>
        <label htmlFor="availableEndCode">availableEndCode: </label>
        <input
          type="text"
          id="availableEndCode"
          placeholder="302"
          {...register("availableEndCode", { required: true, min: 0 })}
        />
      </div>
    </>
  );
}

export function UserForm({ submitUser }) {
  const [roleOfUser, setRoleOfUser] = useState<"student" | "mentor">("student");
  const { register, handleSubmit } = useForm<Student | Mentor>();

  return (
    <Form onSubmit={handleSubmit(submitUser(roleOfUser))}>
      <fieldset>
        <legend>New User</legend>
        <ToggleRoleOfUser
          roleOfUser={roleOfUser}
          onChange={() =>
            setRoleOfUser(roleOfUser === "student" ? "mentor" : "student")
          }
        />
        <AllUserInput register={register} />
        {roleOfUser === "student" ? (
          <StudentInput register={register} />
        ) : (
          <MentorInput register={register} />
        )}
      </fieldset>
      <Button label={"追加"} type="submit" />
    </Form>
  );
}
