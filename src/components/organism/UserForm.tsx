import { useState } from "react";
import { User } from "../../types/User";
import { styled } from "styled-components";
import { SubmitButton } from "../atoms/button/SubmitButton";

const Form = styled.form`
  padding: 1em;
  border-radius: 8px;

  & fieldset {
    border: 5px solid var(--color-secondary);
  }

  & > * + * {
    margin-top: 0.5rem;
  }

  & input {
    background: transparent;
    border: 0;
    border-bottom: 1px solid var(--color-secondary);
  }
`;

export const UserForm = () => {

  const [newUser, setNewUser] = useState<User>();

  const onClickButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    // const user: User = {
    //   name: event.target.form.name.value,
    //   role: event.target.form.role.value,
    //   email: event.target.form.email.value,
    //   age: event.target.form.age.value,
    //   postCode: event.target.form.postCode.value,
    //   phone: event.target.form.phone.value,
    //   hobbies: event.target.form.hobbies.value,
    //   url: event.target.form.url.value,
    //   studyMinutes: event.target.form.studyMinutes.value,
    //   taskCode: event.target.form.taskCode.value,
    //   studyLangs: event.target.form.studyLangs.value,
    //   score: event.target.form.score.value,
    // }

    // if (validateUser(user)) {
    // setNewUser(user)
    const form = event.currentTarget.form!
    setNewUser({
      id: 1,
      name: form.name.valueOf(),
      role: form.roleOfUser.value,
      email: form.email.value,
      age: form.age.value,
      postCode: form.postCode.value,
      phone: form.phone.value,
      hobbies: form.hobbies.value,
      url: form.url.value,
    });
  };

  // const [newUser, setNewUser] = useState<User>(sampleUser);

  // const user = { ...newUser}
  // user[event.target.id] = event.target.value

  const onChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
  };

  return (
    <Form>
      <fieldset>
        <legend>New User</legend>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            onChange={onChangeForm}
            placeholder="渋沢栄一"
            required
          />
        </div>
        <div>
          <label htmlFor="roleOfUser">role: </label>
          <input
            type="text"
            id="roleOfUser"
            onChange={onChangeForm}
            placeholder="students"
            required
          />
        </div>
        <div>
          <label htmlFor="email">email: </label>
          <input
            type="email"
            id="email"
            onChange={onChangeForm}
            placeholder="abc@gmail.com"
            required
          />
        </div>
        <div>
          <label htmlFor="age">age: </label>
          <input
            type="text"
            id="age"
            onChange={onChangeForm}
            placeholder="20"
            required
          />
        </div>
        <div>
          <label htmlFor="postCode">postCode: </label>
          <input
            type="text"
            id="postCode"
            onChange={onChangeForm}
            placeholder="20"
            required
          />
        </div>
        <div>
          <label htmlFor="phone">phone: </label>
          <input
            type="text"
            id="phone"
            onChange={onChangeForm}
            placeholder="20"
            required
          />
        </div>
        <div>
          <label htmlFor="hobbies">hobbies: </label>
          <input
            type="text"
            id="hobbies"
            onChange={onChangeForm}
            placeholder="20"
            required
          />
        </div>
        <div>
          <label htmlFor="url">url: </label>
          <input
            type="text"
            id="url"
            onChange={onChangeForm}
            placeholder="20"
            required
          />
        </div>
        <div>
          <label htmlFor="studyMinutes">studyMinutes: </label>
          <input
            type="text"
            id="studyMinutes"
            onChange={onChangeForm}
            placeholder="20"
            required
          />
        </div>
        <div>
          <label htmlFor="taskCode">taskCode: </label>
          <input
            type="text"
            id="taskCode"
            onChange={onChangeForm}
            placeholder="20"
            required
          />
        </div>
        <div>
          <label htmlFor="studyLangs">studyLangs: </label>
          <input
            type="text"
            id="studyLangs"
            onChange={onChangeForm}
            placeholder="20"
            required
          />
        </div>
        <div>
          <label htmlFor="score">score: </label>
          <input
            type="text"
            id="score"
            onChange={onChangeForm}
            placeholder="20"
            required
          />
        </div>
      </fieldset>
      <SubmitButton onClick={onClickButton}>add</SubmitButton>
    </Form>
  );
};
