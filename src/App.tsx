// TODO: 1. validation for the json file
// TODO: 2. immigrate type definition to the json file
// TODO: 3. create a table with the json file

import { useState } from "react";

import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/global";
import { lightTheme, darkTheme } from "./styles/themes";

import USER_LIST from "./userList.json";
import { User } from "./types/User";
import { Header } from "./components/organism/Header";
import { UserForm } from "./components/organism/UserForm";
import { Table } from "./components/organism/Table";
import { Filter } from "./components/organism/Filter";
import { Footer } from "./components/organism/Footer";
import { Holy } from "./components/templates/Holy";


function App() {

  const sampleUser: User = USER_LIST[0];
  const [user, setUser] = useState<User>(sampleUser);
  const [theme, setTheme] = useState(lightTheme);

  const onChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.id]: event.target.value,
    });
  };

  const onClickAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("newUser", event);
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Holy
        Header={<Header themeToggler={() => theme == lightTheme ? setTheme(darkTheme) : setTheme(lightTheme)} />}
        SideA={<UserForm onChangeForm={onChangeForm} onClickAdd={onClickAdd} />}
        Main={<Table userList={USER_LIST} sampleUser={sampleUser} />}
        SideB={<Filter sampleUser={sampleUser} />}
        Footer={<Footer />}
      />
    </ThemeProvider>
  );
}


export default App;
