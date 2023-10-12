import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PORT_NUMBER } from './config';

function CollectClinicals({ match, history }) {
    const [state, setState] = useState({});
    const [componentName, setComponentName] = useState('');
    const [componentValue, setComponentValue] = useState('');
  
    useEffect(() => {
      const fetchPatientDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:${PORT_NUMBER}/clinicalservices/api/patients/${match.params.patientId}`);
          const patientData = response.data;
          setState(patientData);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchPatientDetails();
    }, [match.params.patientId]);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const data = {
        patientId: match.params.patientId,
        componentName,
        componentValue,
      };
  
      try {
        const response = await axios.post(`http://localhost:${PORT_NUMBER}/clinicalservices/api/clinicals`, data);
        console.log(response);
        history.push('/'); // Redirect to the home page
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div className="container">
        <h2>Patient Details:</h2>
        First Name: {state.firstName}<br />
        Last Name: {state.lastName}<br />
        Age: {state.age}
        <h2>Patient Clinical Data:</h2>
        <form>
          Clinical Entry Type:
          <select onChange={(event) => setComponentName(event.target.value)}>
            <option>Select One</option>
            <option value="bp">Blood Pressure(Sys/Dys)</option>
            <option value="hw">Height/Weight</option>
            <option value="heartrate">Heart Rate</option>
          </select>
          <br />
          Value:
          <input type="text" name="componentValue" onChange={(event) => setComponentValue(event.target.value)} />
          <br />
          <button type="button" className="btn btn-success" onClick={handleSubmit}>Confirm</button>
        </form>
      </div>
    );
  }
  
  export default CollectClinicals;
// class CollectClinicals extends React.Component{
//     state = {}

//     componentWillMount(){
//         console.log(`http://localhost:${PORT_NUMBER}/clinicalservices/api/patients/`+this.props.match.params.patientId);
//         axios.get(`http://localhost:${PORT_NUMBER}/clinicalservices/api/patients/`+this.props.match.params.patientId)
//         .then(res=>{
//             console.log(res.data);
//             this.setState(res.data);
//         })
//     }
 
//     handleSubmit(event){
//         event.preventDefault();
//         const data = {
//             patientId:this.props.match.params.patientId,
//             componentName:this.componentName,
//             componentValue:this.componentValue,
//         }
//         axios.post(`http://localhost:${PORT_NUMBER}/clinicalservices/api/clinicals`,data)
//         .then(res=>{
//             console.log(res);
//             this.props.history.push('/'); // redirect to the home page
//             //this.props.history.push('/confirmReservation/'+res.data.id)
//         })
//     }

//     render(){
//         return (<div class="container">
//                 <h2>Patient Details:</h2>
//                 First Name: {this.state.firstName}<br/>
//                 Last Name: {this.state.lastName}<br/>
//                 Age: {this.state.age}
//                 <h2>Patient Clinical Data:</h2>
//                 <form>
//                     Clinical Entry Type:<select onChange={(event)=>{this.componentName=event.target.value}}>
//                         <option>Select One</option>
//                         <option value="bp">Blood Pressure(Sys/Dys)</option>
//                         <option value="hw">Height/Weight</option>
//                         <option value="heartrate">Heart Rate</option>
//                         </select><br/>
//                     Value:<input type="text" name="componentValue" onChange={(event)=>{this.componentValue=event.target.value}}/><br/>
//                     <button type="button" class="btn btn-success" onClick={this.handleSubmit.bind(this)}>Confirm</button>
//                 </form>
//         </div>)
//     }
// }

// export default CollectClinicals;
//to do: convert to funtional component





