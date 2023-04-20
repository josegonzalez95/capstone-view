//  This component is a form that allows user input to signup and create a user as a promoter

import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { signUp } from '../../api/Promoters/promotersRoutes';
import styles from './Signup.module.css'

const Signup = () => {
    //   user info state initialization, this will be used to store and update user info
    const [userInfo, setUserInfo] = useState({name:"", password:"",email:"", address:""})
    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log(userInfo)
        const result = await signUp(userInfo)
        console.log(result.newPromoter)
        setUserInfo({name:"", password:"",email:"", address:""})
    }

    //  renders form element
    return(
        <div className={styles.container}>
            <div className={styles.banner}>
                PUR Cycling
            </div>
            <div className={styles.form}>
            <p className={styles.title}>Signup</p>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Field>
                        <div className={styles.inputs}>
                            <label className={styles.labels}>Name</label>
                            <input className={styles.inputFields} placeholder='Name' 
                                onChange={(e) =>
                                    setUserInfo({ ...userInfo, name: e.target.value })
                                }
                                value={userInfo.name}
                            />
                        </div>
                    </Form.Field>
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
                            <label className={styles.labels}>Address</label>
                            <input className={styles.inputFields} placeholder='Address' 
                                onChange={(e) =>
                                    setUserInfo({ ...userInfo, address: e.target.value })
                                }
                                value={userInfo.address}
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
                    <Button className={styles.sbmtBtn} type='submit'>SignUp</Button>
                    <p>Already have an account ? <a href='/login'>LogIn</a></p>
                </Form>
            </div>
        </div>
    )
};

export default Signup