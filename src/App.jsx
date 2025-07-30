import React, { useState } from 'react';
import LoginScreen from './LoginScreen';
import MainPage from './MainPage';

function App() {
  // State untuk melacak apakah user sudah login atau belum
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Jika belum terautentikasi, tampilkan layar login
  if (!isAuthenticated) {
    // Kita passing sebuah fungsi ke LoginScreen
    // agar ia bisa "memberi tahu" App.jsx jika login berhasil
    return <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  // Jika sudah berhasil login, tampilkan halaman utama
  return <MainPage />;
}

export default App;