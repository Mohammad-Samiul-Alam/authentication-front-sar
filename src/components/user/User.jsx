import React from 'react'

const User = () => {
    const email = localStorage.getItem('email');
  return (
    <div>User email: {email}</div>
  )
}

export default User