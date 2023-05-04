  // shows promoter information and allow to edit such information

import React, { useEffect, useState } from 'react'
import { getPromoterById, updatePromoter } from '../../api/Promoters/promotersRoutes';
import { Card, Button, Modal, Form } from 'semantic-ui-react';
import styles from './PromoterProfile.module.css'

const PromoterProfile = ({id}) => {
    const [userInfo, setUserInfo] = useState({name:"", password:"",email:"", address:""})
    const [editInfo, setEditInfo] = useState({name:"", password:"",email:"", address:""})

    

    const [open, setOpen] = useState(false)


      // use effect hook used to load promoter data before rendering component
    useEffect(()=>{
        async function getPromoter(){
            const promoterResponse = await getPromoterById({id: JSON.parse(localStorage.getItem('user')).id})
            // const promoter = JSON.parse(localStorage.getItem('user'))
            const promoter = promoterResponse.promoter
            setUserInfo(promoter)
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
                <Form.Input onChange={(e)=>{setEditInfo({...editInfo, name:e.target.value})}} fluid label='Name' placeholder='Name' />
                <p style={{marginLeft:"0.5rem"}}>{editInfo.name.length}/50</p>
              
                <Form.Input onChange={(e)=>{setEditInfo({...editInfo, email:e.target.value})}} fluid label='Email' placeholder='Email' />
                <p style={{marginLeft:"0.5rem"}}>{editInfo.email.length}/254</p>
                <Form.Input onChange={(e)=>{setEditInfo({...editInfo, address:e.target.value})}} fluid label='Address' placeholder='Address' />
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

              const {name, email, address} = editInfo

              if(name.length<=50 && address<=200 && email.length<=254){

                await updatePromoter({...editInfo, id: JSON.parse(localStorage.getItem('user')).id})
              }
                console.log({...editInfo, id: JSON.parse(localStorage.getItem('user')).id})
                setEditInfo({name:"", password:"",email:"", address:""})
                setOpen(false)
                window.location.reload()
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