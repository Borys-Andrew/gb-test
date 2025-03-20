import { getUsers } from "./api";
import { DataTable } from "./components/dataTable";
import { tableColumns } from "./components/dataTable/constants";
import { NavigationPanel } from "./components/navigationPanel";
import AppLayout from "./layouts/appLayout";
import { User } from "./types";
// import { mockedUsers } from "./mocks";
import React, { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();

        setUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <NavigationPanel />
        <DataTable data={users} columns={tableColumns} />
      </div>
    </AppLayout>
  );
}

export default App;
