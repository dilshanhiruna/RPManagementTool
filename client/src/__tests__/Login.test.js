import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import "../setupTests";
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from "../components/Login/index";
import { Experimental_CssVarsProvider } from "@mui/material";

jest.mock('axios', () => ({
    _esModule: true,

    default: {
        get: () => ({
            data: { email:'it19999955@my.sliit.lk', password: 'JohnDoe@12345'}
        })
    }
}));

test('Login email input should be rendered', () => {
    render(
        <Route exact path='/login'>
          <Login />
        </Route>
    );
    const emailInput = screen.getByPlaceholderText(/Email/i);
    expect(emailInput).toBeInTheDocument();
});

test('Login button should be rendered', () => {
    render(
        <Route exact path='/login'>
          <Login />
        </Route>
    );
    const button = screen.getByTestId('signin');
    expect(button).toBeInTheDocument();
});

test('Login email input should be empty', () => {
    render(
        <Route exact path='/login'>
          <Login />
        </Route>
    );
    const emailInput = screen.getByPlaceholderText(/Email/i);
    expect(emailInput.value).toBe('');
});

test('Login password input should be empty', () => {
    render(
        <Route exact path='/login'>
          <Login />
        </Route>
    );
    const passwordInput = screen.getByLabelText(/Password/i);
    expect(passwordInput.value).toBe('');
});