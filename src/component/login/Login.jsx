import { Link, Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LoginSchema } from './Schema';
import { useFormik } from 'formik';
import logo from '../../images/logo.png';
import ImageBG from '../../images/login_page_background.png';
import './Style.css';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../../store/Action/LoginAction'
import { useState } from 'react';
import { useDispatch } from 'react-redux';

/**
 * 
 * @returns {string}
 */
const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      
    </Typography>
  );
};


const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundColor: '#d4d4d4',
    backgroundImage: `url(${ImageBG})`,
  },
  paperContainer: {
    backgroundImage: `url(${ImageBG})`,
  },
}));

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [setLoading] = useState(false);
  //const base_uri = process.env.development.REACT_APP_API_BASE_URI;
  
  const formik = useFormik({
    initialValues: {
      email:'',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { resetForm }) => {
      const { email, password } = values;
      
      dispatch(loginAction({ email, password }))
      .then((response) => {
        setSessionStorageValues(response);
        navigate('/layout/home');
      })

      function setSessionStorageValues(response)
      {
        sessionStorage.setItem('username', response.data.user.name);
        sessionStorage.setItem('role', response.data.user.role);
        sessionStorage.setItem('mobileNumber', response.data.user.mobileNumber);
        sessionStorage.setItem('accesstoken', response.data.token);
      }

      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        resetForm();
      }, 1000 * 2);
    },
  });
  
  return (    
    <div className={`container-fluid login-container ${classes.root}`}>
      <div className=''>
        <div className="rounded d-flex justify-content-center">
          <div className="col-md-5 col-sm-12 shadow-lg p-5 bg-light">
            <div className="text-center">
              <img src={logo} alt={'logo'} />
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="p-4">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mobile Number"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <span className=''>{formik.errors.email}</span>
                )}
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                </div>
                {formik.touched.password && formik.errors.password && (
                  <span className=''>{formik.errors.password}</span>
                )}
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                     
                      {'Forgot Password?'}
                    </Link>
                  </Grid>
                </Grid>
                <div className="input-group mb-3">
                  <button
                    className=" form-control btn btn-primary text-center mt-2 "
                    type="submit"
                  > 
                    Login
                  </button>
                </div>
                <Grid container justifyContent='center'>
                  <Grid item>
                    {'Not a member? '}
                    <Link href="#" variant="body2">
                      {'Create an New Account'}
                    </Link>
                  </Grid>
                </Grid>
              </div>
              <Box>
                <Copyright />
              </Box>
            </form>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Login;
