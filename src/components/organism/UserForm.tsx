import { styled } from "styled-components";
import { SubmitButton } from "../atoms/button/SubmitButton";


const Fieldset = styled.fieldset`
  padding: 1em;
  border: 5px solid var(--color-secondary);
  border-radius: 8px;

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
  function handleClick() {
    console.log("The link was clicked.");
  }

  return (
    <Fieldset>
      <legend>New User</legend>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          onChange={handleClick}
          placeholder="渋沢栄一"
          required
        />
      </div>
      <div>
        <label htmlFor="role">role: </label>
        <input
          type="text"
          id="role"
          onChange={handleClick}
          placeholder="students"
          required
        />
      </div>
      <div>
        <label htmlFor="email">email: </label>
        <input
          type="email"
          id="email"
          onChange={handleClick}
          placeholder="abc@gmail.com"
          required
        />
      </div>
      <div>
        <label htmlFor="age">age: </label>
        <input
          type="text"
          id="age"
          onChange={handleClick}
          placeholder="20"
          required
        />
      </div>
      <div>
        <label htmlFor="postCode">postCode: </label>
        <input
          type="text"
          id="postCode"
          onChange={handleClick}
          placeholder="20"
          required
        />
      </div>
      <div>
        <label htmlFor="phone">phone: </label>
        <input
          type="text"
          id="phone"
          onChange={handleClick}
          placeholder="20"
          required
        />
      </div>
      <div>
        <label htmlFor="hobbies">hobbies: </label>
        <input
          type="text"
          id="hobbies"
          onChange={handleClick}
          placeholder="20"
          required
        />
      </div>
      <div>
        <label htmlFor="url">url: </label>
        <input
          type="text"
          id="url"
          onChange={handleClick}
          placeholder="20"
          required
        />
      </div>
      <div>
        <label htmlFor="studyMinutes">studyMinutes: </label>
        <input
          type="text"
          id="studyMinutes"
          onChange={handleClick}
          placeholder="20"
          required
        />
      </div>
      <div>
        <label htmlFor="taskCode">taskCode: </label>
        <input
          type="text"
          id="taskCode"
          onChange={handleClick}
          placeholder="20"
          required
        />
      </div>
      <div>
        <label htmlFor="studyLangs">studyLangs: </label>
        <input
          type="text"
          id="studyLangs"
          onChange={handleClick}
          placeholder="20"
          required
        />
      </div>
      <div>
        <label htmlFor="studyLangs">studyLangs: </label>
        <input
          type="text"
          id="studyLangs"
          onChange={handleClick}
          placeholder="20"
          required
        />
      </div>
      <div>
        <label htmlFor="score">score: </label>
        <input
          type="text"
          id="score"
          onChange={handleClick}
          placeholder="20"
          required
        />
      </div>
      <SubmitButton>
        add
      </SubmitButton>
    </Fieldset>
  );
};
