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

/**
 * The main application component that manages the state and behavior of the school app.
 * 
 * @component
 * @returns {JSX.Element} The rendered component.
 * 
 * @remarks
 * This component handles the following functionalities:
 * - Theme toggling between light and dark themes.
 * - Modifying user data to add in-charge information for students and mentors.
 * - Adding new users with validation and data processing.
 * - Submitting user data through a form.
 * - Filtering the user list based on role (all, student, mentor).
 * - Sorting the user list based on specific criteria for students and mentors.
 * 
 * @function modifyUsers
 * @param {Array<Student | Mentor>} allUserList - The list of all users.
 * @returns {Array<Student | Mentor>} The modified list of users with in-charge information.
 * 
 * @function addMentorInCharge
 * @param {Mentor} user - The mentor user to add in-charge information.
 * @param {Array<Student | Mentor>} userList - The list of all users.
 * 
 * @function addStudentInCharge
 * @param {Student} user - The student user to add in-charge information.
 * @param {Array<Student | Mentor>} userList - The list of all users.
 * 
 * @function addNewUser
 * @param {Student | Mentor} user - The new user to be added.
 * 
 * @function submitUser
 * @param {"student" | "mentor"} roleOfUser - The role of the user to be submitted.
 * @returns {Function} The onSubmit function to handle form submission.
 * 
 * @function filterTable
 * @param {React.MouseEvent<HTMLButtonElement>} event - The click event to filter the user list.
 * 
 * @function sortStudentList
 * @param {"score" | "studyMinutes"} key - The key to sort the student list by.
 * @param {"asc" | "desc"} order - The order to sort the student list (ascending or descending).
 * 
 * @function sortMentorList
 * @param {"experienceDays"} key - The key to sort the mentor list by.
 * @param {"asc" | "desc"} order - The order to sort the mentor list (ascending or descending).
 */
function App() {
  // for add new user
  const [theme, setTheme] = useState(lightTheme);
  const allUserList: (Student | Mentor)[] = modifyUsers(USER_LIST as (Student | Mentor)[]);
  const [userList, setUserList] = useState<(Student | Mentor)[]>(allUserList);
  const [category, setCategory] = useState<"user" | "student" | "mentor">("user");

  function modifyUsers(
    allUserList: (Student | Mentor)[],
  ): (Student | Mentor)[] {
    for (const user of allUserList) {
      if (user.role === "student") {
        addStudentInCharge(user, allUserList);
      } else {
        addMentorInCharge(user, allUserList);
      }
    }
    return allUserList;
  }

  function addMentorInCharge(user: Mentor, userList: (Student | Mentor)[]) {
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

  function addStudentInCharge(user: Student, userList: (Student | Mentor)[]) {
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

  function addNewUser(user: Student | Mentor) {
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
      setUserList([...userList, user]);
      for (const lang of user.studyLangs) {
        if (!lang.includes(" ")) continue;
        user.studyLangs.splice(user.studyLangs.indexOf(lang), 1);
        user.studyLangs.concat(lang.split(" "));
      }
    } else {
      addMentorInCharge(user, userList);
      setUserList([...userList, user]);
      for (const lang of user.useLangs) {
        if (lang.includes(" ")) {
          user.useLangs.splice(user.useLangs.indexOf(lang), 1);
          user.useLangs.concat(lang.split(" "));
        }
      }
    }
  }

  interface StudentInput extends Student{
    inputHobbies: string;
    inputStudyLangs: string;
  }
  interface MentorInput extends Mentor{
    inputHobbies: string;
    inputUseLangs: string;
  }

  // for submit
  function submitUser(roleOfUser: "student" | "mentor") {
    const onSubmit = (data: StudentInput | MentorInput) => {
      data.role = roleOfUser;
      data.hobbies = data.inputHobbies.split(" ");
      if (data.role === "student") {
        data.studyLangs = data.inputStudyLangs.split(" ");
      } else {
        data.useLangs = data.inputUseLangs.split(" ");
      }
      data.id = userList.length + 1;
      addNewUser(data);
    };
    setShowList(userList);
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
