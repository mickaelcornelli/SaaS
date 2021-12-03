import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {saveProspect, getAllProspect} from '../../api/prospect';
import {loadProspect} from '../../actions/prospect/prospectAction'


const AddProspect = (props)=>{

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [company, setCompany] = useState("");
	const [address, setAddress] = useState("");
	const [zip, setZip] = useState("");
	const [city, setCity] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [status, setStatus] = useState("prospect");
	const [description, setDescription] = useState("");
	const [redirect, setRedirect] = useState(false);


	const onSubmitForm = ()=>{
		let data = {
			firstName: firstName,
			lastName: lastName,
			company: company,
			address: address,
			zip: zip,
			city: city,
			email: email,
			phone: phone,
			status: status,
			description: description,
			user_id: props.user.infos.id
		}
		console.log(data)

		saveProspect(data)
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
	}

	return (
		<div>
			{redirect && <Redirect to="/follow" />}
			<h2>Ajout d'un prospect</h2>
			<form 
				className="form-trl bgc-bel-air" 
				style={{width: "40%"}}
				onSubmit={(e)=>{
					e.preventDefault()
					onSubmitForm()
				}}
			>
				<input 
					type="text" 
					placeholder="Prénom"
					onChange={(e)=>{
						setFirstName(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="Nom"
					onChange={(e)=>{
						setLastName(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="entreprise"
					onChange={(e)=>{
						setCompany(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="adresse"
					onChange={(e)=>{
						setAddress(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="code postal"
					onChange={(e)=>{
						setZip(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="ville"
					onChange={(e)=>{
						setCity(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="email"
					onChange={(e)=>{
						setEmail(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="téléphone"
					onChange={(e)=>{
						setPhone(e.currentTarget.value)
					}}
				/>
				<select
				
					onChange={(e)=>{
						setPhone(e.currentTarget.value)
					}}
				>
					<option value="prospect">prospect</option>
					<option value="attente">en attente</option>
					<option value="client">client</option>
				</select>
				<textarea
					type="text" 
					placeholder="description"
					onChange={(e)=>{
						setDescription(e.currentTarget.value)
					}}
				>

				</textarea>
				<input type="submit" value="enregistrer"/>
			</form>
		</div>
	)
}

const mapDispatchToProps = {
	loadProspect
}

const mapStateToProps = (store)=>{
	return {
		user: store.user
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProspect);