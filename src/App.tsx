import { getUsers } from "./api";
import { DataTable } from "./components/dataTable";
import { tableColumns } from "./components/dataTable/constants";
import { NavigationPanel } from "./components/navigationPanel";
import AppLayout from "./layouts/appLayout";
import { mockedUsers } from "./mocks";
import React from "react";

function App() {
  const fetchUsers = async () => {
    return await getUsers();
  };

  const users = fetchUsers();
  console.log("🚀 ~ App ~ users:", users);

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <NavigationPanel />
        <DataTable data={mockedUsers} columns={tableColumns} />
      </div>
    </AppLayout>
  );
}

export default App;
