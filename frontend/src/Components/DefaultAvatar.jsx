import React from 'react';
import { Avatar } from "@mui/material";

const DefaultAvatar = ({ firstName, lastName }) => {

    const getInitials = (fullname) => {
      if (!fullname) return '';
      const splitName = fullname.split(' ');
      const initials = splitName[0][0] + (splitName[1] ? splitName[1][0] : '');
      return initials.toUpperCase();
    };
  
    const initials = getInitials(firstName + ' ' + lastName);
  
    return (
        <Avatar>{initials}</Avatar>
    );
  };
  
  export default DefaultAvatar;