import React,{useState,useEffect} from 'react';
import './App.css';
import { Container, Col,Form,Table,Row } from 'react-bootstrap';
import Datarow from './DataRow'

function App() {
  const [contctRw,setContacts]=useState([])
  
  useEffect(() => {
    const apiurl='/allcontacts'
    fetch(apiurl).then((out)=>{
      return out.json()
    }).then((datajsonout)=>{
        console.log(datajsonout)
        setContacts(datajsonout)
    })
    }, [contctRw])

  return (
    <div className="App">
      <Table hover borderless striped style={{position:'absolute',top:'100px'}}>
        <thead style={{backgroundColor:'#393e46',color:'white'}}>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone #</th>
                        <th>Address</th>
                    </tr>
        </thead>
        <tbody style={{backgroundColor:'#e8e4e1'}}>
              {contctRw.map((dta)=><Datarow fname={dta.fname} lname={dta.lname} email={dta.email} phone={dta.phone} address={dta.address}/>)}              
          </tbody>
      </Table>
    </div>
  );
}

export default App;