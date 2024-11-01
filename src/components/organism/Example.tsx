// @ts-check
import { useState } from "react";

interface User {
  name: string;
  age: number;
}

export const ExampleComponent = () => {
  const [user, setUser] = useState<User>({ name: "", age: 0 });

  const onClick = () => {
    // 型チェックが正しく機能していれば、これはエラーになる
    setUser({ name: "Bob", age: 0 }); // ここでエラーが発生するはず
  };

  console.log(user);

  return (
    <div>
      <button onClick={onClick}>Set User</button>
    </div>
  );
};
