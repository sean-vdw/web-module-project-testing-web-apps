import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
  render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
  render(<ContactForm/>);
  const header = screen.queryByText(/Contact Form/i);
  expect(header).toBeInTheDocument();
  expect(header).toBeTruthy();
  expect(header).toHaveTextContent(/Contact Form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  render(<ContactForm/>);
  const fNameInput = screen.getByLabelText(/First Name*/i);
  userEvent.type(fNameInput, "Ben");

  const fNameError = await screen.getByText(/firstName must have at least 5 characters/i);
  expect(fNameError).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render(<ContactForm/>);
  const button = screen.getByRole("button");

  userEvent.click(button);

  const fNameError = await screen.getByText(/firstName must have at least 5 characters/i);
  const lNameError = await screen.getByText(/lastName is a required field/i);
  const emailError = await screen.getByText(/email must be a valid email address/i);

  expect(fNameError).toBeInTheDocument();
  expect(lNameError).toBeInTheDocument();
  expect(emailError).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  render(<ContactForm/>);
  const fNameInput = screen.getByLabelText(/First Name*/i);
  const lNameInput = screen.getByLabelText(/Last Name*/i); 
  const button = screen.getByRole("button");

  userEvent.type(fNameInput, "Jeevan");
  userEvent.type(lNameInput, "DeMartini");
  userEvent.click(button);

  const emailError = await screen.getByText(/email must be a valid email address/i);
  expect(emailError).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm/>);
  const emailInput = screen.getByLabelText(/Email*/i);
  userEvent.type(emailInput, "Sean");

  const emailError = await screen.getByText(/email must be a valid email address/i);
  expect(emailError).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
});