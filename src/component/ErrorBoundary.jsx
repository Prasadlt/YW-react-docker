import { Component } from 'react';
import { logError } from './Logger';
//import App from '../App';

// const logError = async (error, errorInfo) =>{

//     const obj = {
//         Error: error,
//         ErrorInfo: errorInfo
//         };

//         alert(obj);
//     const response = await fetch(process.env.REACT_APP_API_BASE_URI +API.exceptionLogging.logException,
//         {
//           method: 'POST',
//           crossDomain: true,
//           headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             Accept: 'application/json',
//           },
//           body: obj,
//         }
//       );
// }


class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error) {
    this.setState({ hasError: true });
    logError(error);
  }

  render() {
    if (this.state.hasError) {
      const errorMessageStyle = {
        color: 'red',
        fontSize: '18px',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '20px',
        border: '2px solid red',
        borderRadius: '5px',
        backgroundColor: '#ffebee',
      };

      return (
        <div style={errorMessageStyle}>
          Something went wrong!
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
