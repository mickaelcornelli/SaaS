import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {updateProspect, getAllProspect} from '../../api/prospect';
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


	useEffect(()=>{
		let id = props.match.params.id;
		let index = props.follow.prospects.findIndex((prospect)=>{
			return prospect.id == id;
		})
		if(index !== -1) {
			setFirstName(props.follow.prospects[index].firstName);
			setLastName(props.follow.prospects[index].lastName);
			setCompany(props.follow.prospects[index].company);
			setAddress(props.follow.prospects[index].address);
			setZip(props.follow.prospects[index].zip);
			setCity(props.follow.prospects[index].city);
			setEmail(props.follow.prospects[index].email);
			setPhone(props.follow.prospects[index].phone);
			setStatus(props.follow.prospects[index].status);
			setDescription(props.follow.prospects[index].description);
		}

	}, [props])


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

		updateProspect(data, props.match.params.id)
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
					value={firstName}
					onChange={(e)=>{
						setFirstName(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="Nom"
					value={lastName}
					onChange={(e)=>{
						setLastName(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="entreprise"
					value={company}
					onChange={(e)=>{
						setCompany(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="adresse"
					value={address}
					onChange={(e)=>{
						setAddress(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="code postal"
					value={zip}
					onChange={(e)=>{
						setZip(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="ville"
					value={city}
					onChange={(e)=>{
						setCity(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="email"
					value={email}
					onChange={(e)=>{
						setEmail(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="téléphone"
					value={phone}
					onChange={(e)=>{
						setPhone(e.currentTarget.value)
					}}
				/>
				<select
					value={status}
					onChange={(e)=>{
						setStatus(e.currentTarget.value)
					}}
				>
					<option value="prospect">prospect</option>
					<option value="attente">en attente</option>
					<option value="client">client</option>
				</select>
				<textarea
					type="text" 
					placeholder="description"
					value={description}
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
		user: store.user,
		follow: store.prospects
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProspect);