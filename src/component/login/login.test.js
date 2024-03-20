import { render, screen } from '@testing-library/react';
import Login from './Login';
//import {BrowserRouter as Router} from 'react-router-dom';

const mockedNavigate = jest.fn();

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockedNavigate
// }));


test('login', () => {
  const component = render(<Login />);
  <Login />
  const linkElement = component.getByText('Create an New Account');
  //expect(linkElement).toBeInTheDocument();
  expect(linkElement).toBeInTheDocument();

});
// test('renders login form', () => {


//   const { getByLabelText, getByText } = render(<Login/>);
  
//   // Check if input fields are rendered
//   expect(getByLabelText('Mobile Number')).toBeInTheDocument();
//   expect(getByLabelText('Password')).toBeInTheDocument();
 
//   // Check if submit button is rendered
//   expect(getByText('Login')).toBeInTheDocument();
// });
 
// test('allows user to login', async () => {
//   const { getByLabelText, getByText } = render(<Login />);
//   const usernameInput = getByLabelText('Mobile Number');
//   const passwordInput = getByLabelText('Password');
//   const loginButton = getByText('Login');
 
//   // Simulate user input
//    fireEvent.change(usernameInput, { target: { value: '9871233455' } });
//    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
 
//   // Submit form
// fireEvent.click(loginButton);
 
//   // Wait for login process (mocked API call, etc.)
//   await waitFor(() => {
//     // Add assertions for what should happen after successful login
//     // For example, expect certain text to be rendered after successful login
//     expect(getByText('Hi you! Welcome to Yorkshire')).toBeInTheDocument();
//   });
// });



