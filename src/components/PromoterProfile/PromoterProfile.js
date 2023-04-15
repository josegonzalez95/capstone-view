import React, { useEffect, useState } from 'react'
import { getPromoterById, updatePromoter } from '../../api/Promoters/promotersRoutes';
import { Card, Button, Modal, Form } from 'semantic-ui-react';
import styles from './PromoterProfile.module.css'
import { useNavigate } from 'react-router-dom';

const PromoterProfile = ({id}) => {
    const [userInfo, setUserInfo] = useState({name:"", password:"",email:"", address:""})
    const [editInfo, setEditInfo] = useState({name:"", password:"",email:"", address:""})

    
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)


    useEffect(()=>{
        async function getPromoter(){
            const promoterResponse = await getPromoterById({id: JSON.parse(localStorage.getItem('user')).id})
            // const promoter = JSON.parse(localStorage.getItem('user'))
            const promoter = promoterResponse.promoter
            setUserInfo(promoter)
        }
        getPromoter()
    },[])

    const updateProfileEventCall=async(e)=>{
        e.preventDefault()
        console.log('update profile call')
        // console.log({...editInfo, id: JSON.parse(localStorage.getItem('user')).id})
        // const updateResponse = await updatePromoter(editInfo)
        // setEditInfo({name:"", password:"",email:"", address:""})
    }
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
                <Form.Input onChange={(e)=>{setEditInfo({...editInfo, name:e.target.value})}} fluid label='Name' placeholder='Name' />
                <Form.Input onChange={(e)=>{setEditInfo({...editInfo, email:e.target.value})}} fluid label='Email' placeholder='Email' />
                <Form.Input onChange={(e)=>{setEditInfo({...editInfo, address:e.target.value})}} fluid label='Address' placeholder='Address' />
                {/* <Form.Input onChange={(e)=>{setEventInfo({...eventInfo, photo:e.target.value})}} fluid label='Photo' placeholder='Photo' /> */}
                
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
                const updateResponse = await updatePromoter({...editInfo, id: JSON.parse(localStorage.getItem('user')).id})

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