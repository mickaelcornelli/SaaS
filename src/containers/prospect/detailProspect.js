import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {deleteProspect, getAllProspect} from '../../api/prospect';
import {loadProspect} from '../../actions/prospect/prospectAction';
import AddFollowPopUp from '../../components/addFollowPopUp'
import EditFollowPopUp from '../../components/editFollowPopUp'
import moment from 'moment'
import 'moment/locale/fr';
moment.locale('fr');

const DetailProspect = (props)=>{

	const [index, setIndex] = useState(null);
	const [follows, setFollows] = useState([])
	const [selectedFollow, setSelectedFollow] = useState([])
	const [redirect, setRedirect] = useState(false);
	const [showAddPopUp, setShowAddPopUp] = useState(false);
	const [showEditPopUp, setShowEditPopUp] = useState(false);

	useEffect(()=>{
		let id = props.match.params.id;
		let goodIndex = props.follow.prospects.findIndex((prospect)=>{
			return prospect.id == id;
		})
		if(goodIndex !== -1) {
			setIndex(goodIndex);
			if(props.detail.follows.length > 0) {
				let filterFollows = props.detail.follows.filter((follow)=>{
					return follow.prospect_id === props.follow.prospects[goodIndex].id
				})

				setFollows(filterFollows);
			}

		}



	}, [props])

	return (
		<div className="detail-prospect">
			{redirect && <Redirect to="/follow" />}
			
			{index !== null && <div>
				{ showAddPopUp && <AddFollowPopUp  
									prospects_id={props.follow.prospects[index].id}
									onClickclose={(e)=>{
										setShowAddPopUp(false);
									}}
								/>
				}
				{ showEditPopUp && <EditFollowPopUp  
									prospects_id={props.follow.prospects[index].id}
									selectedFollow={selectedFollow}
									onClickclose={(e)=>{
										setShowEditPopUp(false);
									}}
								/>
				}
				<h2>{props.follow.prospects[index].firstName} {props.follow.prospects[index].lastName} <span>({props.follow.prospects[index].status})</span></h2>
				<div className="detail-prospects-buttons">
					<div
						className="delete"
						onClick={(e)=>{
							if (window.confirm('Attention, vous êtes sur le point de supprimer un prospect, êtes vous sur de continuer')) {
							   deleteProspect(props.match.params.id)
							   	.then((res)=>{
							   		console.log(res);
							   		if(res.status === 200) {
							   			setRedirect(true);
							   			getAllProspect(props.user.infos.id)
										.then((res)=>{
											props.loadProspect(res.prospects);
										})
							   			
							   		}
							   	})

							} else {
							  
							}

						}}
					>
						Supprimer
					</div>
					<div
						className="update"
					>
						<Link to={"/editProspect/"+props.match.params.id}>Modifier</Link>
					</div>
				</div>
				<p>{props.follow.prospects[index].company} : {props.follow.prospects[index].address} {props.follow.prospects[index].zip} {props.follow.prospects[index].city}</p>
				<p>tel : {props.follow.prospects[index].phone}</p>
				<p>email : {props.follow.prospects[index].email}</p>
				<p>Description : {props.follow.prospects[index].description}</p>
				<div
					className="new"
					onClick={()=>{
						setShowAddPopUp(true);
					}}
				>
					Ajoutez un suivit
				</div>
				{follows.length > 0 && <ul className="prospect-list">
					{follows.map((follow)=>{

						return(
							<li 
								key={follow.id}
								onClick={(e)=>{
									setSelectedFollow(follow);
									setShowEditPopUp(true)
								}}
							>
								{follow.type} ({moment(follow.callDateTime).format('L')} {moment(follow.callDateTime).format('LTS')})
							</li>
						)
					})}
				</ul>}
			</div>}
		</div>
	)
}

const mapDispatchToProps = {
	loadProspect
}

const mapStateToProps = (store)=>{
	return {
		user: store.user,
		follow: store.prospects,
		detail: store.follows
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailProspect);