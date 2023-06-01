import React, { useState } from'react';
import { Link } from'react-router-dom';

const Account = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
}

export default Account;