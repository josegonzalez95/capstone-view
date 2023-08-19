//   This component is a form that allows user input to login user as a promoter

import React, { useEffect, useState } from 'react'
import { Button, Form, Icon, Label, Message } from 'semantic-ui-react'
import { logIn } from '../../api/Promoters/promotersRoutes';
import { useAuth } from '../../customHooks/useAuth';
import styles from './Login.module.css'
import MessageBar from '../MessageBar/MessageBar';
import { useLocation, useNavigate } from 'react-router-dom';


const Login = () => {
    //   user info state initialization, this will be used to store and update user info
    const [userInfo, setUserInfo] = useState({email:"", password:""})
    const {login} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [showMessageBar, setShowMessageBar] = useState(false)


    const [showPass, setShowPass] = useState(false)


    const [validationErrors, setValidationErrors] = useState({});

    const validateParticipant = (userInfo) => {
      const errors = {};
  
      if (!userInfo.email) {
        errors.email = "Email is required";
      }else{
        delete errors.email
      }
  
      if (!userInfo.password) {
        errors.password = "Password is required";
      }else{
        delete errors.password
      }
  
      // Add more validation rules here...
  
      return errors;
    };
  
    useEffect(()=>{
        if(location.state && location.state.isSignUp){
            setShowMessageBar(true)
          }
    },[])

    useEffect(()=>{
        setTimeout(()=> {
          if(showMessageBar){
            navigate('', {replace: true})
    
            setShowMessageBar(false)
          }
        }, 5000);
      }, [showMessageBar])
  
    // useEffect(()=>{
    //   console.log("is form valid", isFormValid());
    //   if(isFormValid()) setOpen(false)
    // }, [validationErrors])
  
    const handleValidation = () => {
      const newErrors = validateParticipant(userInfo)
      console.log('new errors', newErrors);
      
      setValidationErrors(newErrors);
    };
  
    const isFormValid = () => {
      return Object.keys(validationErrors).length === 0;
    };


    const handleSubmit=async(e)=>{
        e.preventDefault()
        handleValidation()
        const {email, password} = userInfo
        if(isFormValid() && email && password){
            if(password.length<=20 && email.length<=254){
                console.log(userInfo)
                const response = await logIn(userInfo)
                const result = response.promoter
                console.log(result)
                console.log(result.status === "success" ? true:false)
                if(result.status ==="success"){
                    login(result.promoter)
                }else{
                    console.log(result)
                    setShowErrorMessage(true)
                }
                setUserInfo({email:"", password:""})
            }
        }
    }

    //   renders form element
    return(
        <div>
                              {/* {!showMessageBar && <MessageBar message={'Account created successfully'}/>} */}
                              {showMessageBar &&<p className={styles.message}> <div style={{width:"18rem"}}> <MessageBar message={"Account created successfully"}/></div></p>}


        <div className={styles.container}>

            <div className={styles.banner}>
                PUR Cycling
                {/* <img  src={mainLogo} alt="fireSpot"/> */}
            </div>
            <div className={styles.form}>
                <p className={styles.title}>Login</p>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Field>
                        <div className={styles.inputs}>
                            <span>
                                <label className={styles.labels}>Email</label>
                                {validationErrors && validationErrors.email &&
                                    <Label basic color='red' pointing='left'>
                                        {validationErrors.email}
                                    </Label>
                                }
                            </span>
                            <input className={styles.inputFields} placeholder='Email' 
                                onChange={(e) =>
                                    setUserInfo({ ...userInfo, email: e.target.value })
                                }
                                value={userInfo.email}
                            />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className={styles.inputs}>
                            <span>
                                <label className={styles.labels}>Password</label>
                                {validationErrors && validationErrors.password &&
                                    <Label basic color='red' pointing='left'>
                                        {validationErrors.password}
                                    </Label>
                                }
                            </span>
                            <span>
                            <input className={styles.inputFields} type={!showPass ? 'password':'text'} placeholder='Password' 
                                onChange={(e) =>
                                    setUserInfo({ ...userInfo, password: e.target.value })
                                }
                                value={userInfo.password}
                            />
                            {!showPass ? <Icon className={styles.eye} name='eye' onClick={()=>{setShowPass(true)}}></Icon>:<Icon className={styles.eye} name='eye slash' onClick={()=>{setShowPass(false)}}></Icon>}
                            </span>
                        </div>
                    </Form.Field>
                <Button className={styles.sbmtBtn} type='submit'>Submit</Button>
                <p>Not registered yet ? <a href='/signup'>Create an Account</a></p>
                {showErrorMessage && <Message negative>
                    <Message.Header>Email or Password is incorrect</Message.Header>
                    {/* <p>That offer has expired</p> */}
                </Message>}
                </Form>
            </div>
        </div>
        </div>

    )
};

export default Login