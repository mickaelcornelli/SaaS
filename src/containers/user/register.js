import React, {useState, useEffect} from 'react';
import { Redirect, Link } from 'react-router-dom';
import RegisterImg from '../../assets/img/Register.png';
import { config } from '../../config';
import {saveUser} from '../../api/user';

const Register = (props)=>{
    
    const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [redirect, setRedirect] = useState(false);
	
	const onSubmitForm = ()=>{
	    let data = {
	        firstName: firstName,
	        lastName: lastName,
	        email: email,
	        password: password
	    }
	    
	    saveUser(data)
	        .then((res)=>{
	            console.log(res);
	            if(res.status === 200) {
	                setRedirect(true);
	            }
	        })
	}
    
    return (
        <div>
            {redirect && <Redirect to="/login" />}
			<h1 className="c-g title2">
				Welcome to <span className="santa-monica">Commer</span><span className="bel-air">Saas</span> <span>!</span>
			</h1>
			<div className="log-container bgc-santa-monica">
				<div className="log-nav-container">
					<div className="bgc-bel-air log-link">
						<Link to="/login">Login :</Link>
					</div>
					<div className="bgc-santa-monica log-link">
						<Link to="/register">Register :</Link>
					</div>
				</div>
				<div>
					<div className="log-container-form">
					
						<form
							className="form-trl"
							onSubmit={(e)=>{
								e.preventDefault();
								onSubmitForm();
							}}
						>
							<label>Prénom</label>
							<input 
								type="text" 
								name="firstName" 
								onChange={(e)=>{  
									setFirstName(e.currentTarget.value) 
								}}
							/>
							<label>Nom</label>
							<input 
								type="text" 
								name="lastName" 
								onChange={(e)=>{  
									setLastName(e.currentTarget.value) 
								}}
							/>
							<label>Email</label>
							<input 
								type="email" 
								name="email" 
								onChange={(e)=>{  
									setEmail(e.currentTarget.value) 
								}}
							/>
							<label>Password</label>
							<input 
								type="password" 
								name="password" 
								onChange={(e)=>{  
									setPassword(e.currentTarget.value) 
							}}/>
							<input className="button-form bgc-bel-air" type="submit" value="Go"/>
						</form>

					</div>
					<div className="log-container-img">
						<img className="log-img" src={RegisterImg} style={{marginTop: 100}} />
					</div>
				</div>
			</div>
        </div>
    )
}

export default Register