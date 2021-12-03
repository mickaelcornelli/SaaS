import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';



const Follow = (props)=>{
	useEffect(()=>{
		console.log(props.follow)
	}, [])
	
	return (
		<div>
			<h2>Suivi clients</h2>
			<Link to="/addProspect"><i className="fa fa-plus-circle"></i> Ajoutez un nouveau prospect </Link>

			<h3>Liste des prospects</h3>
			{props.follow.prospects.length > 0 ? <ul className="prospect-list">
				{props.follow.prospects.map((prospect)=>{
					return (<li key={prospect.id}>
						<Link to={"/detail/"+prospect.id}>{prospect.firstName} {prospect.lastName}</Link>
					</li>)
				})}
			</ul> : 
			<p>Aucun prospects enregistré</p>}
		</div>
	)
}

const mapDispatchToProps = {

}

const mapStateToProps = (store)=>{
	return {
		user: store.user,
		follow: store.prospects
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Follow);