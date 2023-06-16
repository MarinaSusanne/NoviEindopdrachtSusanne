import './App.css';
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LogIn from './pages/logIn/LogIn';
import AssignmentsAdmin from './pages/assignmentsAdmin/AssignmentsAdmin';
import CreateGroupAdmin from './pages/createGroupAdmin/CreateGroupAdmin';
import AssignmentsUser from './pages/assignmentsUser/AssignmentsUser';
import ReadingPageAdmin from './pages/readingPageAdmin/ReadingPageAdmin';
import RegisterUser from './pages/registerUser/RegisterUser';
import Navigation from './components/navigation/Navigation';
import GroupPage1 from './pages/groupPages/GroupPage1';
import GroupPage2 from './pages/groupPages/GroupPage2';
import GroupPage3 from './pages/groupPages/GroupPage3';


function App() {
  return (
      <>
        <div className="outer-container">
              <div className="inner-container">
                  <Navigation/>
                </div>
            </div>
          <div className="content">
            <Routes>
              <Route path="/" element={<LogIn/>}/>
              <Route path="/registreer" element={<RegisterUser/>}/>
              <Route path="/groepspagina1" element={<GroupPage1/>}/>
              <Route path="/groepspagina2" element={<GroupPage2/>}/>
              <Route path="/groepspagina3" element={<GroupPage3/>}/>
              <Route path="/opdrachten" element={<AssignmentsUser/>}/>
              <Route path="/admin/opdrachten" element={<AssignmentsAdmin/>}/>
              <Route path="/admin/groep-aanmaken" element={<CreateGroupAdmin/>}/>
              <Route path="/admin/lees-pagina" element={<ReadingPageAdmin/>}/>
              {/*TODO:maak-een-NotFound-pagina!*/}
              {/*TODO:pas-groepspagina's-aan-naar-dynamische-paginas--zoals-ah-productpagina*/}
              {/*<Route path="*" element={<NotFound/>}/>*/}
            </Routes>
          </div>
      </>
  );
}

//TODO: responsive maken
//TODO: mobile version maken
//TODO: aanpassen vanwege relationship???
//TODO: goede error berichten en error en loading!

export default App;
