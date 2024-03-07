import { useEffect, useState } from "react";
import CreateUser from "./components/CreateUser";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Users from "./components/Users";

function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [enabled, setEnabled] = useState(true);
  const [newUserAdded, setNewUserAdded] = useState(false);

  useEffect(() => {
    if (page === 1) {
      setNewUserAdded(false);
      return;
    }
    setPage(1);
    setNewUserAdded(false);
  }, [newUserAdded]);

  useEffect(() => {
    fetch(
      `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          if (page === 1) {
            setUsers(data.users);
          } else {
            setUsers((prev) => [...prev, ...data.users]);
          }
        } else {
          setEnabled(false);
        }
      });
  }, [page, newUserAdded]);

  return (
    <div className="2xl:w-[1170px] lg:w-[1024px] md:w-[768px] w-[360px] m-auto font-nunito">
      <Navbar />
      <Home />
      <Users users={users} enabled={enabled} setPage={setPage} />
      <CreateUser setNewUserAdded={setNewUserAdded} />
    </div>
  );
}

export default App;
