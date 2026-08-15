import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  return <Routes><Route path="/" element={<HomePage />} /><Route path="/profile" element={<ProfilePage />} /><Route path="*" element={<HomePage />} /></Routes>;
}
