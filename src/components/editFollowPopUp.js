import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import moment from 'moment'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import {updateFollow, getAllFollow, deleteFollow} from '../api/follow';
import {loadFollow} from '../actions/follow/followAction';


const EditFollowPopUp = (props)=>{
	const [date, setDate] = useState(moment(props.selectedFollow.callDateTime));
	const [type, setType] = useState(props.selectedFollow.type);
	const [description, setDescription] = useState(props.selectedFollow.description);

	const onSubmitForm = ()=>{
		let formDate = moment(date).format('yyyy-M-D')+' '+moment(date).format('HH:mm:ss')

		let data = {
			prospect_id: props.prospects_id,
			user_id: props.user.infos.id,
			callDateTime: formDate,
			description: description,
			type: type
		}
		console.log(data);
		updateFollow(data, props.selectedFollow.id)
			.then((res)=>{
				console.log(res);
				if(res.status === 200) {
					getAllFollow(props.user.infos.id)
						.then((res)=>{
							props.loadFollow(res.follows);
						})
					props.onClickclose();
				}
			})
	}


	return (
		<div className="popup">
			<div className="close"
				onClick={(e)=>{
					props.onClickclose();
				}}
			>X</div>
			<h2>ajouter un suivi</h2>
			<form
				style={{marginBottom: '30px'}}
				onSubmit={(e)=>{
					e.preventDefault();
					onSubmitForm();
				}}
			>
				<Datetime 
					value={date}
					onChange={(value)=>{
						console.log(value)
						setDate(value);
					}}
				/>
				<select
					value={type}
					onChange={(e)=>{
						setType(e.currentTarget.value);
					}}
				>
					<option>call</option>
					<option>rdv</option>
				</select>
				<textarea
					type="text"
					placeholder="description"
					value={description}
					onChange={(e)=>{
						setDescription(e.currentTarget.value);
					}}
				>
				</textarea>
				<input type="submit" value="modifier"/>
			</form>
			<div className="detail-prospects-buttons">
					<div
						className="delete"
						onClick={(e)=>{
							if (window.confirm('Attention, vous êtes sur le point de supprimer un suivi, êtes vous sûr de continuer ?')) {
							   deleteFollow(props.selectedFollow.id)
							   	.then((res)=>{
							   		console.log(res);
							   		if(res.status === 200) {
							   			getAllFollow(props.user.infos.id)
										.then((res)=>{
											props.loadFollow(res.follows);
											props.onClickclose();
										})
							   			
							   		}
							   	})

							} else {
							  console.log("t'as la trouille hein?")
							}

						}}
					>
						Supprimer
					</div>
					<div
						className="update"
						onClick={()=>{
							props.onClickclose();
						}}
					>
						Retour
					</div>
				</div>
		</div>
	)
}


const mapDispatchToProps = {
	loadFollow
}

const mapStateToProps = (store)=>{
	return {
		user: store.user,
		follow: store.prospects,
		detail: store.follows
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditFollowPopUp);