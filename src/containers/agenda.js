import React, {useState, useEffect} from 'react';
import { ReactAgenda , ReactAgendaCtrl , guid ,  Modal } from 'react-agenda';
import moment from 'moment';
import 'react-agenda/build/styles.css';
import 'react-datetime/css/react-datetime.css';
import {loadRdv} from '../actions/rdv/rdvAction';
import {saveRdv, deleteRdv, updateRdv} from '../api/rdv';
import {connect} from 'react-redux';
require('moment/locale/fr.js');

let colors= {
  'color-1':"rgba(102, 195, 131 , 1)" ,
  "color-2":"rgba(242, 177, 52, 1)" ,
  "color-3":"rgba(235, 85, 59, 1)"
}


 
let now = new Date();
 
let test = [
  {
   id            :guid(),
    name          : 'Meeting , dev staff!',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
    classes       : 'color-1'
  },
  {
   id            :guid(),
    name          : 'Working lunch , Holly',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 11, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 13, 0),
    classes       : 'color-2 color-3'
  },
 
];
const Agenda = (props) =>{

    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState([]);
    const [cellHeight, setCellHeight] = useState(30);
    const [showModal, setShowModal] = useState(false);
    const [locale, setLocale] = useState('fr');
    const [rowsPerHour, setRowsPerHour] = useState(2);
    const [numberOfDays, setNumberOfDays] = useState(4);
    const [startDate, setStartDate] = useState(new Date());

    useEffect(()=>{
		let rdv = props.agenda.rdv;
		rdv.map((item)=>{
            console.log("myRdv", rdv)
			item.startDateTime = new Date(item.startDateTime);
			item.endDateTime = new Date(item.endDateTime);
		})

		setItems(rdv);

	}, [props])


    const handleCellSelection = (item) => {
        console.log('handleCellSelection', item)

    }
    
    const handleRangeSelection = (item) => {
        console.log('handleRangeSelection', item)
        setSelected(item)
        setShowModal(true)
        
    }

    const handleItemEdit = (item, newItem) =>{
	    console.log('handleItemEdit', item)
	    console.log('handleItemEdit', newItem)
	    //mise à jour de la state selected et showModal
        setSelected([item]);
        setShowModal(true)
	    
	}
      
    const handleItemRemove = (items, deleteItem) => {
        console.log('handleItemRemove', items)
        console.log('handleItemRemove', deleteItem)
        //appel de la fonction pour supprimer les rdv dans notre api
        deleteRdv(deleteItem._id)
        //.then
        .then(response => {
            //si le status de la rep est 200
            if(response.status === 200){
                setItems(items)
            }
        })
    }


    const addNewEvent = (items, newItem) =>{
        console.log('addNewEvent', items)
        console.log('addNewEvent', newItem)
        
        //création d'un objet data pour le nouveau rdv
        const data = {
            name: newItem.name,
            startDateTime: moment(newItem.startDateTime).format('YYYY-MM-DD HH:mm:ss'),
            endDateTime: moment(newItem.endDateTime).format('YYYY-MM-DD HH:mm:ss'),
            classes: newItem.classes,
            user_id:props.user.infos.id,
            _id: newItem._id
        }
        
        saveRdv(data)
        .then(response => {
            console.log(response)
            if(response.status === 200){
                setItems(items);
            }
            setShowModal(false)
        })


    }
      
    const editEvent = (item, newItem) =>{
    console.log('editEvent', item)
    console.log('editEvent', newItem)
    //création d'un objet data pour le rdv modifié
    let data = {
	  	name: newItem.name,
	  	startDateTime: newItem.startDateTime.getFullYear()+'-'+(newItem.startDateTime.getMonth() + 1)+"-"+newItem.startDateTime.getDate()+' '+newItem.startDateTime.getHours()+':'+newItem.startDateTime.getMinutes(),
	  	endDateTime: newItem.endDateTime.getFullYear()+'-'+(newItem.endDateTime.getMonth() + 1)+"-"+newItem.endDateTime.getDate()+' '+newItem.endDateTime.getHours()+':'+newItem.endDateTime.getMinutes(),
	  	classes: newItem.classes,
	  }
        
    //on moddifie le rdv
    updateRdv(data, newItem._id)
	  	.then((res)=>{
	  		console.log(res);
	  		if(res.status === 200) {
	  			props.loadRdv(items)
	  		}
	  	})
	  setShowModal(false)
    }

    return(
        <div>
        <h2>Page agenda</h2>    
            { showModal &&
                      <Modal clickOutside={()=>setShowModal(false)} >

                        <div className="modal-content">
                          <ReactAgendaCtrl
                            items={items}
                            itemColors={colors}
                            selectedCells={selected}
                            Addnew={addNewEvent}
                            edit={editEvent}  />
                        </div>

                    </Modal>
            }
            <ReactAgenda
                minDate={now}
                maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
                disablePrevButton={false}
                startDate={startDate}
                cellHeight={cellHeight}
                startAtTime={8}
                endAtTime={20}
                locale={locale}
                items={items}
                numberOfDays={numberOfDays}
                rowsPerHour={rowsPerHour}
                itemColors={colors}
                autoScale={false}
                fixedHeader={true}
                onItemEdit={handleItemEdit}
                onItemRemove={handleItemRemove}
                onCellSelect={handleCellSelection}
                onRangeSelection={handleRangeSelection}
            />
            
      </div>

    )
}

const mapStateToProps = (store)=>{
	return {
		agenda: store.rdv,
		user: store.user
	}
}

const mapDispatchToProps = {
	loadRdv
}

export default connect(mapStateToProps, mapDispatchToProps)(Agenda);