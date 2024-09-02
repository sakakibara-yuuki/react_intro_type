import styled from "styled-components";
import { Button } from "../atoms/button/Button";

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

interface UserFormProps {
  onChangeForm: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickAdd: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function UserForm(props: UserFormProps) {

  const { onChangeForm, onClickAdd } = props;

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
      <Button label={"追加"} onClick={onClickAdd} />
    </Form>
  );
};
