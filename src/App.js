import './App.css';
import React from "react";
import { Routes, Route, Link } from 'react-router-dom';
import LogIn from './pages/logIn/LogIn';
import AssignmentsAdmin from './pages/assignmentsAdmin/AssignmentsAdmin';
import CreateGroupAdmin from './pages/createGroupAdmin/CreateGroupAdmin';
import AssignmentsUser from './pages/assignmentsUser/AssignmentsUser';
import ReadingPageAdmin from './pages/readingPageAdmin/ReadingPageAdmin';
import RegistrerUser from './pages/registrerUser/RegistrerUser';
import Navigation from './components/navigation/Navigation';
import GroupPage from "./pages/groupPage/GroupPage";


function App() {
  return (
      <>
      <Navigation/>
          <div className="content">
          <Routes>
              <Route path="/" element={<LogIn/>}/>
              <Route path="/registreer" element={<RegistrerUser/>}/>
              <Route path="/groepspagina" element={<GroupPage/>}/>
              <Route path="/opdrachten" element={<AssignmentsUser/>}/>
              <Route path="/admin/opdrachten" element={<AssignmentsAdmin/>}/>
              <Route path="/admin/groep-aanmaken" element={<CreateGroupAdmin/>}/>
              <Route path="/admin/lees-pagina" element={<ReadingPageAdmin/>}/>
              TODO:maak-een-NotFound-pagina!
              {/*<Route path="*" element={<NotFound/>}/>*/}
          </Routes>
          </div>
      </>
  );
}

export default App;
