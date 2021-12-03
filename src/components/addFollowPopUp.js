import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import moment from 'moment'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import {saveFollow} from '../api/follow';
import {saveRdv} from '../api/rdv';
import {loadFollow} from '../actions/follow/followAction';
import {getAllFollow} from '../api/follow';

const AddFollowPopUp = (props)=>{
	const [date, setDate] = useState(moment());
	const [type, setType] = useState("call");
	const [description, setDescription] = useState("");
	
	useEffect(() => {
		console.log("essai",props.follow.prospects[props.prospect_id])
	}, [props])
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
		saveFollow(data)
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
				<input type="submit" value="ajouter"/>
			</form>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddFollowPopUp);