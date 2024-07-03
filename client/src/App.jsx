import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Applicant from './components/Applicant';
import Education from './components/Education';
import Application from './components/Application';
import Employment from './components/Employment';
import Reference from './components/Reference';
import AddApplicant from './components/AddApplicant';
import EditApplicant from './components/EditApplicant';
import AddEducation from './components/AddEducation';
import EditEducation from './components/EditEducation';
import AddEmployment from './components/AddEmployment'
import EditEmployment from './components/EditEmployment'
import AddApplication from './components/AddApplication';
import EditApplication from './components/EditApplication';
import AddReference from './components/AddReference';
import EditReference from './components/EditReference';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminlogin" element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />}>
        <Route path='' element={<Home />}></Route>
          <Route path="/dashboard/applicant" element={<Applicant />} />
          <Route path="/dashboard/education" element={<Education />} />
          <Route path="/dashboard/employment" element={<Employment />} />
          <Route path="/dashboard/application" element={<Application />} />
          <Route path="/dashboard/reference" element={<Reference />} />
          <Route path="/dashboard/add_applicant" element={<AddApplicant />} />
          <Route path="/dashboard/add_education" element={<AddEducation />} />
          <Route path="/dashboard/add_employment" element={<AddEmployment />} />
          <Route path="/dashboard/add_application" element={<AddApplication />} />
          <Route path="/dashboard/add_reference" element={<AddReference />} />
          <Route path="/dashboard/edit_applicant/:id" element={<EditApplicant />} />
          <Route path="/dashboard/edit_education/:id" element={<EditEducation />} />
          <Route path="/dashboard/edit_employment/:id" element={<EditEmployment />} />
          <Route path="/dashboard/edit_application/:id" element={<EditApplication />} />
          <Route path="/dashboard/edit_reference/:id" element={<EditReference />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
