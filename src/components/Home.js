import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { PORT_NUMBER } from './config';


class Home extends React.Component{
    state ={
        patientData:[],
        loading:true
    }

    // componentWillMount(){
    //     const promise = axios.get(`http://localhost:${PORT_NUMBER}/clinicalservices/api/patients`);
    //     promise.then(res=>{
    //         const patientData = res.data;
    //         this.setState({patientData})
    //     })
    // }

componentDidMount(){
     axios.get(`http://localhost:${PORT_NUMBER}/clinicalservices/api/patients`)   
   .then(res=>{
    const data = res.data;
    this.setState({patientData:data,loading:false})
   }).catch(error =>{
    console.log(error);
    this.setState({loading:false});
   });
}

    render(){
        if (this.state.loading) {
            return <div>Loading...</div>;
          }

        return (<div class="container-fluid"> 
            <h2>Patients:</h2>
<table class="table table-striped">
  <thead>
    <tr>      
      <th class="text-center">Id</th>
      <th scope="col" class="center-text">First Name</th>
      <th scope="col" class="text-center">Last Name</th>
      <th scope="col" class="text-center">Age</th>
      <th scope="col" class="text-center"></th>
      <th scope="col" class="text-center"></th>
    </tr>
  </thead>
  <tbody>
    {this.state.patientData.map(patient=><RowCreator item={patient}/>)}
 </tbody>
</table>
            {/* <table align='center'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.patientData.map(patient=><RowCreator item={patient}/>)}
                </tbody>
            </table> */}
            <Link  to={'/addPatient'}>Register Patient</Link>
        </div>)
    }
}

class RowCreator extends React.Component{
    render(){
        var patient = this.props.item;
        return <tr>
            <td>{patient.id}</td>
            <td>{patient.firstName}</td>
            <td>{patient.lastName}</td>
            <td>{patient.age}</td>
            <td><Link to={'/patientDetails/'+patient.id}>Add Data</Link></td>
            <td><Link to={'/analyze/'+patient.id}>Analyze</Link></td>
        </tr>
    }
}

export default Home;