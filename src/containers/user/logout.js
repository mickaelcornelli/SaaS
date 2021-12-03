import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {logoutUser} from '../../actions/user/userAction';


const Logout = (props)=>{
	const [redirect, setRedirect] = useState(false);

	useEffect(()=>{
		props.logoutUser();
		window.localStorage.removeItem('commersaas');
		setRedirect(true)
	}, [])

	return (
		<div>
			{redirect && <Redirect to="/login" />}
		</div>
	)
}

const mapDispatchToProps = {
	logoutUser
}

const mapStateToProps = (store)=>{
	return {
		user: store.user
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);