import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import ControlledTextField from '../../Helpers/ControlledTextField';
import { LoginData } from '../../Helpers/Models/Login';
import { login } from "../../Redux/Auth";


export default function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  
  // using react form hooks
  const {
      control,
      handleSubmit,
      formState: { errors },
      } = useForm({
      defaultValues: {
        email: "",
        password: "",
      },
  });

  const onSubmit = async (data: LoginData) => {
    setLoading(true) 
    try {
      // send request & get response data
      let res = await axios.post("https://private-052d6-testapi4528.apiary-mock.com/authenticate", data )
      const {token , personalDetails } = res.data[0];
      
      // save data to redux state
      dispatch(login({ token , personalDetails }));
      
      // save auth data to use it if user refresh the page
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("personalDetails", JSON.stringify(personalDetails));
      
      navigate("/info");
    } catch (error) {
      alert("An Error Has Occured");
    }
    setLoading(false)
  }
    return (
        <Paper sx={{height:"50vh", width: "50vw"}} elevation={5}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems:'center',
              height: "100%"
            }}
          >
            <ControlledTextField
              control={control}
              name="email"
              errors={errors}
              rules={{ 
                  required: "Field is required",
                  pattern: {
                      value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: "Email is not valid",
                  },
              }}
              label="Email"
              type="text"
            />
            <ControlledTextField
              control={control}
              type="password"
              name="password"
              label="Password"
              errors={errors}
              rules={{ 
                  required: "Field is required",
                  pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                      message: "Password is not valid",
                  }
              }}
            />

            <div >
              {
                loading 
                ?
                  <CircularProgress />
                :
                  <Button
                    type="submit"
                    variant="contained"
                  >
                      Login
                
                  </Button>
              }

            </div>
          </form>
        </Paper>
    );
}