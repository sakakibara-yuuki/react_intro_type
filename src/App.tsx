// TODO: 1. validation for the json file
// TODO: 2. immigrate type definition to the json file
// TODO: 3. create a table with the json file

import { useState } from "react";

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
  console.log("sampleUser", typeof sampleUser);

  const [newUser, setNewUser] = useState<User>(sampleUser);

  return (
    <Holy
      Header={<Header />}
      SideA={<UserForm />}
      Main={<Table userList={USER_LIST} sampleUser={sampleUser} />}
      SideB={<Filter sampleUser={sampleUser} />}
      Footer={<Footer />}
    />
  );
}


export default App;
