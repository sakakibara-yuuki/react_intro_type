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
  const [theme, setTheme] = useState(lightTheme);
  const allUserList: (Student | Mentor)[] = USER_LIST as (Student | Mentor)[];
  const [userList, setUserList] = useState<(Student | Mentor)[]>(modifyUsers(allUserList));
  const [category, setCategory] = useState<"user" | "student" | "mentor">("user");

  function addInCharge(user: Mentor, userList: (Student | Mentor)[]) {
    user.incharge = [];
    for (const otherUser of userList) {
      if (otherUser.role !== "student") continue;
      if (user.availableStartCode <= otherUser.taskCode && otherUser.taskCode <= user.availableEndCode) {
        user.incharge.push(otherUser.name);
      }
    }
  }

  function modifyUsers(allUserList: (Student | Mentor)[]): (Student | Mentor)[] {
    for (const user of allUserList) {
      if (user.role !== "mentor") continue;
      addInCharge(user, allUserList);
    }
    return allUserList;
  }

  function addNewUser(user: Student | Mentor) {

    if (user.role !== "mentor") {
      setUserList([...userList, user]);
      return null;
    }
    addInCharge(user, userList);
    setUserList([...userList, user]);
  }

  // for submit
  function submitUser(roleOfUser: "student" | "mentor") {
    const onSubmit = (data) => {
      data.role = roleOfUser;
      data.hobbies = (data.hobbies as string).split(" ");
      if (data.role === "student") {
        data.studyLangs = (data.studyLangs as string).split(" ");
      } else {
        data.useLangs = (data.useLangs as string).split(" ");
      }
      data.id = userList.length + 1;
      addNewUser(data);
    }
    return onSubmit;
  }

  const [showList, setShowList] = useState<(Student | Mentor)[]>(userList);

  // for filter
  function filterTable(event: React.MouseEvent<HTMLButtonElement>): void {
    switch (event.currentTarget.innerText) {
      case "全員":
        setCategory("user");
        setShowList(userList);
        break;
      case "生徒":
        setCategory("student");
        setShowList(userList.filter((user) => user.role == "student"));
        break;
      case "メンター":
        setCategory("mentor");
        setShowList(userList.filter((user) => user.role == "mentor"));
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
    setShowList([...(showList as Student[]).sort(sortFn)]);
  }

  function sortMentorList(key: "experienceDays", order: "asc" | "desc") {
    let sortFn: (a: Mentor, b: Mentor) => number;
    if (order === "asc") {
      sortFn = (a: Mentor, b: Mentor) => a[key] - b[key];
    } else {
      sortFn = (a: Mentor, b: Mentor) => b[key] - a[key];
    }
    setShowList([...(showList as Mentor[]).sort(sortFn)]);
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Holy
        Header={<Header themeToggler={() => theme == lightTheme ? setTheme(darkTheme) : setTheme(lightTheme)} />}
        SideA={<UserForm submitUser={submitUser} />}
        Main={<Table showList={showList} category={category} sortStudentList={sortStudentList} sortMentorList={sortMentorList} />}
        SideB={<Filter onClick={filterTable} />}
        Footer={<Footer />}
      />
    </ThemeProvider>
  );
}


export default App;
