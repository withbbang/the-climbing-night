import React from 'react';
import Index from 'screens/index';
import Member from 'screens/member';
import MemberDetail from 'screens/memberDetail';
import Admin from 'screens/admin';
import Meeting from 'screens/meeting';
import MeetingDetail from 'screens/meetingDetail';
import MeetingDetailForMember from 'screens/meetingDetailForMember';
import Login from 'screens/login';
import Join from 'screens/join';
import NotFound from 'screens/notFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/member" element={<Member />} />
        <Route path="/member/:id" element={<MemberDetail />} />
        <Route
          path="/meeting-detail/:id"
          element={<MeetingDetailForMember />}
        />
        <Route path="/admin" element={<Admin />} />
        <Route path="/meeting" element={<Meeting />} />
        <Route path="/meeting/:id" element={<MeetingDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
