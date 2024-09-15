// TODO: 1. validation for the json file
// TODO: 2. immigrate type definition to the json file
// TODO: 3. create a table with the json file

import { useState } from "react";

import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/global";
import { lightTheme, darkTheme } from "./styles/themes";

import USER_LIST from "./userList.json";
import { Student, Mentor } from "./types/User";
import { Header } from "./components/organism/Header";
import { UserForm } from "./components/organism/UserForm";
import { Table } from "./components/organism/Table";
import { Filter } from "./components/organism/Filter";
import { Footer } from "./components/organism/Footer";
import { Holy } from "./components/templates/Holy";


function App() {

  // for add new user
  const [user, setUser] = useState<Student | Mentor>(USER_LIST[0] as Student | Mentor);
  const [theme, setTheme] = useState(lightTheme);

  // for add new user
  const onChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.id]: event.target.value,
    });
  };

  // for add new user
  const onClickAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("newUser", event);
  }

  // for filter
  const allUserList: (Student | Mentor)[] = USER_LIST as (Student | Mentor)[];
  const [userList, setUserList] = useState<(Student | Mentor)[]>(allUserList);
  const [category, setCategory] = useState<"user" | "student" | "mentor">("user");

  function filterTable(event: React.MouseEvent<HTMLButtonElement>): void {
    switch (event.currentTarget.innerText) {
      case "全員":
        setUserList(allUserList);
        setCategory("user");
        break;
      case "生徒":
        setUserList(allUserList.filter((user) => user.role == "student"));
        setCategory("student");
        break;
      case "メンター":
        setUserList(allUserList.filter((user) => user.role == "mentor"));
        setCategory("mentor");
        break;
    }
  }

  // for sort
  function sortStudentList(key: "score" | "studyMinutes", order: "asc" | "desc") {
    let sortFn: (a: Student, b: Student) => number;
    if (order === "asc") {
      sortFn = (a: Student, b: Student) => a[key] - b[key];
    } else {
      sortFn = (a: Student, b: Student) => b[key] - a[key];
    }
    setUserList([...(userList as Student[]).sort(sortFn)]);
  }


  function sortMentorList(key: "experienceDays", order: "asc" | "desc") {
    let sortFn: (a: Mentor, b: Mentor) => number;
    if (order === "asc") {
      sortFn = (a: Mentor, b: Mentor) => a[key] - b[key];
    } else {
      sortFn = (a: Mentor, b: Mentor) => b[key] - a[key];
    }
    setUserList([...(userList as Mentor[]).sort(sortFn)]);
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Holy
        Header={<Header themeToggler={() => theme == lightTheme ? setTheme(darkTheme) : setTheme(lightTheme)} />}
        SideA={<UserForm onChangeForm={onChangeForm} onClickAdd={onClickAdd} />}
        Main={<Table userList={userList} category={category} sortStudentList={sortStudentList} sortMentorList={sortMentorList} />}
        SideB={<Filter onClick={filterTable} />}
        Footer={<Footer />}
      />
    </ThemeProvider>
  );
}


export default App;
