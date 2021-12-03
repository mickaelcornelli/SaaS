import React, {useState, useEffect} from 'react';
import { Redirect, Link } from 'react-router-dom';
import LoginImg from '../../assets/img/Login.png';
import {loginUser} from '../../api/user'

const Login = (props)=>{
    
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState(null);
	
	const onSubmitForm = ()=>{
	       let data = {
	           email: email,
	           password: password
	       }
	       
	       loginUser(data)
	        .then((res)=>{
	            console.log(res);
	            if(res.status === 200) {
	                window.localStorage.setItem('commersaas', res.token);
	                setRedirect(true);
	            } else {
	            	setError(res.msg);
	            }
	        })
	}
    
    return (
        <div>
            {redirect && <Redirect to="/" />}
			<h1 className="c-g title2">
				Welcome to <span className="santa-monica">Commer</span><span className="bel-air">Saas</span> <span>!</span>
			</h1>
			{error !== null && <p className="errorMsg">{error}</p>}
			<div className="log-container bgc-bel-air">
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
							<label>Email</label>
							<input 
								type="email" 
								name="email" 
								onChange={(e)=>{  
									setEmail(e.currentTarget.value);
								}}
							/>
							<label>Password</label>
							<input 
								type="password" 
								name="password" 
								onChange={(e)=>{  
									setPassword(e.currentTarget.value);
								}}
							/>
							<input className="button-form bgc-santa-monica" type="submit" value="Go"/>
						</form>
						<div className="fgt-psw">
							<Link to="/forgot"><span>Mot de passe oublié ?</span></Link>
						</div>
					</div>
					<div className="log-container-img">
						<img className="log-img" src={LoginImg} />
					</div>
				</div>
			</div>
        </div>
    )
}

export default Login