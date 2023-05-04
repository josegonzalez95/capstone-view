//   This component is a form that allows user input to login user as a promoter

import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { logIn } from '../../api/Promoters/promotersRoutes';
import { useAuth } from '../../customHooks/useAuth';
import styles from './Login.module.css'


const Login = () => {
    //   user info state initialization, this will be used to store and update user info
    const [userInfo, setUserInfo] = useState({email:"", password:""})
    const {login} = useAuth()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const {email, password} = userInfo
        if(email && password){
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
                }
                setUserInfo({email:"", password:""})
            }
        }
    }

    //   renders form element
    return(
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
                            <label className={styles.labels}>Email</label>
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
                            <label className={styles.labels}>Password</label>
                            <input className={styles.inputFields} placeholder='Password' 
                                onChange={(e) =>
                                    setUserInfo({ ...userInfo, password: e.target.value })
                                }
                                value={userInfo.password}
                            />
                        </div>
                    </Form.Field>
                <Button className={styles.sbmtBtn} type='submit'>Submit</Button>
                <p>Not registered yet ? <a href='/signup'>Create an Account</a></p>
                </Form>
            </div>
        </div>
    )
};

export default Login