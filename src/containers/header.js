import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(
faSignOutAlt 
)

const Header = (props)=>{
	return (
		<ul className="trl-header">
	
			{props.user.isLogged && <div>
				<Link to="/">Accueil</Link>
				<Link to="/agenda">Mon agenda</Link>
				<Link to="/follow">Mon suivi client</Link>
				<Link to="/stat">Mes statistiques</Link>
				<Link to="/logout">Déconnexion <FontAwesomeIcon icon={faSignOutAlt }/></Link>

			</div>}
			
      	</ul>
	)
}

const mapDispatchToProps = {

}

const mapStateToProps = (store)=>{
	return {
		user: store.user
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);