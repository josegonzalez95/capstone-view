  // shows promoter information and allow to edit such information

import React, { useEffect, useState } from 'react'
import { getPromoterById, updatePromoter } from '../../api/Promoters/promotersRoutes';
import { Card, Button, Modal, Form, Label } from 'semantic-ui-react';
import styles from './PromoterProfile.module.css'

const PromoterProfile = ({id}) => {
    const [userInfo, setUserInfo] = useState({name:"", password:"",email:"", address:""})
    const [editInfo, setEditInfo] = useState({name:"", password:"",email:"", address:""})

    
    const [validationErrors, setValidationErrors] = useState({});

    const validateParticipant = (editInfo) => {
      const errors = {};
  
      if (!editInfo.name) {
        errors.name = "Name is required";
      }else{
        delete errors.name
      }
  
      if (!editInfo.email) {
        errors.email = "Email is required";
      }else{
        delete errors.email
      }
  
      if (!editInfo.address) {
        errors.address = "Address is required";
      }else{
        delete errors.address
      }
  
      // Add more validation rules here...
  
      return errors;
    };
  
  
    useEffect(()=>{
      console.log("is form valid", isFormValid());
      if(isFormValid()) setOpen(false)
    }, [validationErrors])
  
    const handleValidation = () => {
      const newErrors = validateParticipant(editInfo)
      console.log('new errors', newErrors);
      
      setValidationErrors(newErrors);
    };
  
    const isFormValid = () => {
      return Object.keys(validationErrors).length === 0;
    };
    const [open, setOpen] = useState(false)


      // use effect hook used to load promoter data before rendering component
    useEffect(()=>{
        async function getPromoter(){
            const promoterResponse = await getPromoterById({id: JSON.parse(localStorage.getItem('user')).id})
            // const promoter = JSON.parse(localStorage.getItem('user'))
            const promoter = promoterResponse.promoter
            setUserInfo(promoter)
            setEditInfo(promoter)
        }
        getPromoter()
    },[])


    return(
        <div className={styles.container}>
            <Card className={styles.card}>
            <Card.Content>
            <Card.Header>{userInfo.name}</Card.Header>
              <Card.Meta>
                <span className='date'>{userInfo.email}</span>
              </Card.Meta>
              <Card.Description>
                {userInfo.address}
              </Card.Description>
            </Card.Content>
            <Button onClick={()=>{setOpen(true)}} className={styles.sbmtBtn} type='submit'>Update</Button>
          </Card>
          <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      // trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>Update Profile</Modal.Header>
      <Modal.Content >
        {/* <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped /> */}
        <Modal.Description>
          {/* <Header>Default Profile Image</Header> */}
          {/* <p>
            We've found the following gravatar image associated with your e-mail
            address.
          </p>
          <p>Is it okay to use this photo?</p> */}
          <Form >
            <Form.Group widths='equal' className={styles.eventForm}>
              <div style={{width:"100%"}}>
                <Form.Field inline>
                <label>Name</label>
                {validationErrors && validationErrors.name &&
                  <Label basic color='red' pointing='left'>
                    {validationErrors.name}
                  </Label>
                }
                <Form.Input onChange={(e)=>{setEditInfo({...editInfo, name:e.target.value})}} value={editInfo.name} fluid placeholder='Name' />
                </Form.Field>
                <p style={{marginLeft:"0.5rem"}}>{editInfo.name.length}/50</p>
              
                <Form.Field inline>
                <label>Email</label>
                {validationErrors && validationErrors.email &&
                  <Label basic color='red' pointing='left'>
                    {validationErrors.email}
                  </Label>
                }
                <Form.Input onChange={(e)=>{setEditInfo({...editInfo, email:e.target.value})}} value={editInfo.email} fluid placeholder='Email' />
                </Form.Field>
                <p style={{marginLeft:"0.5rem"}}>{editInfo.email.length}/254</p>
                
                <Form.Field inline>
                <label>Address</label>
                {validationErrors && validationErrors.address &&
                  <Label basic color='red' pointing='left'>
                    {validationErrors.address}
                  </Label>
                }
                <Form.Input onChange={(e)=>{setEditInfo({...editInfo, address:e.target.value})}} value={editInfo.address} fluid placeholder='Address' />
                </Form.Field>
                <p style={{marginLeft:"0.5rem"}}>{editInfo.address.length}/200</p>
                {/* <Form.Input onChange={(e)=>{setEventInfo({...eventInfo, photo:e.target.value})}} fluid label='Photo' placeholder='Photo' /> */}
              </div>
            </Form.Group>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Update Profile"
          labelPosition='right'
          icon='checkmark'
          onClick={async() => {
            //   updateProfileEventCall();
            //   console.log(editInfo);
              // call update promoter endpoint function

              handleValidation()

              const {name, email, address} = editInfo

              if(name && name.length<=50 && address && address.length<=200 && email && email.length<=254){

                await updatePromoter({...editInfo, id: JSON.parse(localStorage.getItem('user')).id})
              console.log({...editInfo, id: JSON.parse(localStorage.getItem('user')).id})
                setEditInfo({name:"", password:"",email:"", address:""})
                setOpen(false)
                window.location.reload()
              }
                
            }
          }
          positive
        />
      </Modal.Actions>
    </Modal>
        </div>
    )
};

export default PromoterProfile