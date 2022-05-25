import React, { useState } from 'react';
import Button from '@mui/material/Button';
import './Header.css';
import { useHistory } from 'react-router';

export default function SupervisorHeader({ userType }) {
  const history = useHistory();

  const redirect = () => {
    console.log('hey');
    history.push('/supervisor/topicReq');
  };
  return (
    <>
      <header>
        <div className="header__component">
          <div className="header__left">
            <div>
              <p>Research Project Management</p>
              <p>{userType} Portal</p>
            </div>
            <div className="header__buttonGroup">
              <Button
                variant="outlined"
                className="header__button"
                onClick={() => redirect()}
              >
                Topic Requests
              </Button>
              <Button variant="outlined" className="header__button">
                My Groups
              </Button>
              <Button variant="outlined" className="header__button">
                Click
              </Button>
              <Button variant="outlined" className="header__button">
                Click
              </Button>
            </div>
          </div>
          <div className="header__right">
            <Button
              variant="contained"
              style={{
                borderRadius: '20px',
                width: '100px',
                backgroundColor: 'rgb(60, 60, 60)',
              }}
              className="header__button"
            >
              Profile
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
