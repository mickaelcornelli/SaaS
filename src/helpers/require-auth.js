import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {config} from '../config';
import axios from 'axios';
import {loadUserInfo} from '../actions/user/userAction';
import {loadRdv} from '../actions/rdv/rdvAction';
import {loadProspect} from '../actions/prospect/prospectAction';
import {getAllRdv} from '../api/rdv';
import {getAllProspect} from '../api/prospect';
import {getAllFollow} from '../api/follow';
import {loadFollow} from '../actions/follow/followAction';
import {connect} from 'react-redux';

export default function (ChildComponent, withAuth=false){
	const RequireAuth = (props)=>{
		const [redirect, setRedirect] = useState(false);

		useEffect(()=>{
			console.log(props.user)
			const token = window.localStorage.getItem('commersaas')
            if(token === null && withAuth) {
                setRedirect(true);
            } else {
                if(props.user.isLogged === false) {
                	axios.get(config.api_url+'/api/v1/checkToken', {headers: {'x-access-token': token}})
	                .then((response)=>{
	                    console.log(response);
	                    if(response.data.status !== 200) {
	                        if(withAuth === true) {
	                            setRedirect(true);
	                        }
	                    } else {
	                        console.log('connecté', response.data);
	                        props.loadUserInfo(response.data.user[0]);
	                        getAllRdv(response.data.user[0].id)
	                        .then((res)=>{
	                        	console.log('rdv', res);
	                        	props.loadRdv(res.rdv);
	                        })
	                        getAllProspect(response.data.user[0].id)
	                        	.then((res)=>{
	                        		console.log('prospect', res)
	                        		props.loadProspect(res.prospects);
	                        	})
	                        getAllFollow(response.data.user[0].id)
	                        	.then((res)=>{
	                        		console.log('follow', res);
	                        		props.loadFollow(res.follows);
	                        	})
	                    }
	                })
                }
                                
                
            }
		}, [])

		if(redirect) {
            return <Redirect to="/login" />
        }
        return (<ChildComponent {...props} />)
	}

	const mapDispatchToProps = {
        loadUserInfo,
        loadRdv,
        loadProspect,
        loadFollow
    }
    
    const mapStateToProps = (store)=>{
        return {
            user: store.user
        }
    }
    
    
    return connect(mapStateToProps, mapDispatchToProps)(RequireAuth);
}