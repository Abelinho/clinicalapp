// import React from 'react';
// import axios from 'axios';
// import {Link} from 'react-router-dom';
import { PORT_NUMBER } from './config';


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AddPatient({ history }) {
  const [formData, setFormData] = useState({//creat a formData object with properties initialized to empty strings and a setFormData funct to update it
    firstName: '',
    lastName: '',
    age: '',
    errorMessage: '',
  });

  const { firstName, lastName, age, errorMessage } = formData;//destructure formData object that was created in useState hook into firstName, lastName etc variables
 //...so instead of const firstName = formData.firstName; const lastName = formData.lastName; you just do: const { firstName, lastName } = formData

  const handleChange = (event) => {// It updates the corresponding field in the formData state by spreading the current state and replacing the changed field with the new value.
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {//create 'data' obj with form values
      firstName,
      lastName,
      age,
    };

    console.log(data);
    console.log('added this for git');
    axios
      .post(`http://localhost:${PORT_NUMBER}/clinicalservices/api/patients`, data)
      .then((res) => {
        console.log(res);
        history.push('/'); // redirect to the home page
      })
      .catch((error) => {
        console.log(error);
        setFormData({ ...formData, errorMessage: 'Failed to create patient' });
      });
  };

  return (
    <div class="container">
      <h2>Create Patient:</h2>
      <form >
        First Name:
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleChange}
          align="left"
        />
        Last Name:
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleChange}
          align="left"
        />
        Age:
        <input
          type="text"
          name="age"
          value={age}
          onChange={handleChange}
          align="left"
        />
        <button type="button" class="btn btn-success" onClick={handleSubmit}>Confirm</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      <Link to="/">Go Back</Link>
    </div>
  );
}

export default AddPatient;



// class AddPatient extends React.Component{
//  //added code:
//  constructor(props) {
//     super(props);
//     this.state = {
//       firstName: '',
//       lastName: '',
//       age: '',
//       errorMessage: '',
//     };
//   }

//     handleSubmit(event){
//         event.preventDefault();
//         const data = {
//             firstName:this.state.firstName,
//             lastName:this.state.lastName,
//             age:this.state.age
//         }
//         console.log(data);
//         axios.post(`http://localhost:${PORT_NUMBER}/clinicalservices/api/patients`,data)
//         .then(res=>{
//           //  document.write("Patient Created Successfully!!");
//           console.log(res);
//         this.props.history.push('/'); // redirect to the home page
//       }).catch((error) => {
//         console.log(error);
//         this.setState({ errorMessage: 'Failed to create patient' });
//         });
//     }

//     render(){
//         return (<div>
//                 <h2>Create Patient:</h2>
//                 <form>
//                 First Name:<input type="text" name="firstName" onChange={(event)=>{this.setState({firstName:event.target.value});}} align="left"/>
//                 Last Name:<input type="text" name="lastName" onChange={(event)=>{this.setState({lastName:event.target.value})}} align="left"/>
//                 Age:<input type="text" name="age" onChange={(event)=>{this.setState({age:event.target.value})}} align="left"/>
//                 <button onClick={this.handleSubmit.bind(this)}>Confirm</button>
//                 </form>
//                 {/*added code below: */}
//                 {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
//                 <Link  to={'/'}>Go Back</Link>
//         </div>)
//     }
// }

 // }
//export default AddPatient;






