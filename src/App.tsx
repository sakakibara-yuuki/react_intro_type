import { useState, useRef } from "react";

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

export type RoleType = "student" | "mentor";
export type CategoryType = "all" | RoleType;
type UserListType = (Student | Mentor)[];
export interface StudentInputIF extends Student {
  inputHobbies: string;
  inputStudyLangs: string;
}
export interface MentorInputIF extends Mentor {
  inputHobbies: string;
  inputUseLangs: string;
}
type SubmitUserFuncType = (data: StudentInputIF | MentorInputIF) => void;
export type SubmitUserType = (roleOfUser: RoleType) => SubmitUserFuncType;


function App() {
  // for add new user
  const [theme, setTheme] = useState(lightTheme);
  const [category, setCategory] = useState<CategoryType>("all");
  const allUserList: UserListType = assignInChargeToUsers(USER_LIST as UserListType);
  const userListRef = useRef<UserListType>(allUserList);
  const [showList, setShowList] = useState<UserListType>(userListRef.current);

  function assignInChargeToUsers(
    allUserList: UserListType,
  ): UserListType {
    for (const user of allUserList) {
      if (user.role === "student") {
        addStudentInCharge(user, allUserList);
      } else {
        addMentorInCharge(user, allUserList);
      }
    }
    return allUserList;
  }

  function addStudentInCharge(user: Student, userList: UserListType) {
    user.incharge = [];
    for (const otherUser of userList) {
      if (otherUser.role === "student") continue;
      if (
        otherUser.availableStartCode <= user.taskCode &&
        user.taskCode <= otherUser.availableEndCode
      ) {
        user.incharge.push(otherUser.name);
      }
    }
  }

  function addMentorInCharge(user: Mentor, userList: UserListType) {
    user.incharge = [];
    for (const otherUser of userList) {
      if (otherUser.role === "mentor") continue;
      if (
        user.availableStartCode <= otherUser.taskCode &&
        otherUser.taskCode <= user.availableEndCode
      ) {
        user.incharge.push(otherUser.name);
      }
    }
  }

  function addNewUser(user: Student | Mentor) {

    const userList = userListRef.current;

    if (user.id == null) {
      user.id = userList.length + 1;
    }

    for (const hobby of user.hobbies) {
      if (!hobby.includes(" ")) continue;
      user.hobbies.splice(user.hobbies.indexOf(hobby), 1);
      user.hobbies.concat(hobby.split(" "));
    }

    if (user.role === "student") {
      addStudentInCharge(user, userList);
      for (const lang of user.studyLangs) {
        if (!lang.includes(" ")) continue;
        user.studyLangs.splice(user.studyLangs.indexOf(lang), 1);
        user.studyLangs.concat(lang.split(" "));
      }
    } else {
      addMentorInCharge(user, userList);
      for (const lang of user.useLangs) {
        if (lang.includes(" ")) {
          user.useLangs.splice(user.useLangs.indexOf(lang), 1);
          user.useLangs.concat(lang.split(" "));
        }
      }
    }
    userListRef.current = [...userList, user];
  }

  // for submit
  function submitUser(roleOfUser: RoleType) {
    const userList = userListRef.current;
    return (data: StudentInputIF | MentorInputIF) => {
      data.role = roleOfUser;
      data.hobbies = data.inputHobbies.split(" ");
      if (data.role === "student") {
        data.studyLangs = data.inputStudyLangs.split(" ");
      } else {
        data.useLangs = data.inputUseLangs.split(" ");
      }
      data.id = userList.length + 1;
      addNewUser(data);
      setShowList([...userListRef.current]);
    };
  }

  // for filter
  function filterTable(event: React.MouseEvent<HTMLButtonElement>): void {
    const userList = userListRef.current;
    switch (event.currentTarget.innerText) {
      case "全員":
        setCategory("all");
        setShowList([...userList]);
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
  function sortStudentList(
    key: "score" | "studyMinutes",
    order: "asc" | "desc",
  ) {
    let sortFn: (a: Student, b: Student) => number;
    if (order === "asc") {
      sortFn = (a: Student, b: Student) => a[key] - b[key];
    } else {
      sortFn = (a: Student, b: Student) => b[key] - a[key];
    }
    const showUserList = userListRef.current.filter((user) => user.role == "student");
    setShowList([...showUserList.sort(sortFn)]);
  }

  function sortMentorList(key: "experienceDays", order: "asc" | "desc") {
    let sortFn: (a: Mentor, b: Mentor) => number;
    if (order === "asc") {
      sortFn = (a: Mentor, b: Mentor) => a[key] - b[key];
    } else {
      sortFn = (a: Mentor, b: Mentor) => b[key] - a[key];
    }
    const showMentorList = userListRef.current.filter((user) => user.role == "mentor");
    setShowList([...showMentorList.sort(sortFn)]);
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Holy>
        <Header
          themeToggler={() =>
            theme == lightTheme ? setTheme(darkTheme) : setTheme(lightTheme)
          }
        />
        <UserForm submitUser={submitUser} />
        <Table
          showList={showList}
          category={category}
          sortStudentList={sortStudentList}
          sortMentorList={sortMentorList}
        />
        <Filter onClick={filterTable} />
        <Footer />
      </Holy>
    </ThemeProvider>
  );
}

export default App;
