import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { Chart } from "react-google-charts";
import moment from 'moment'

let result = [
			    ['date', 'rdv', 'call'],
			    ['2020-12-1', 1, 12],
			    ['2020-12-1', 2, 15],
			    ['2020-12-3', 1, 23],
			    ['2020-12-5', 4, 2],
			  ];

let result2 = [
			    ['date', 'prospects'],
			    ['2020-12-1', 1],
			    ['2020-12-1', 2],
			    ['2020-12-3', 1],
			    ['2020-12-5', 8],
			  ]


const Stat = (props)=>{

	const [follows, setFollows] = useState(result);
	const [prospects, setProspect] = useState(result2);

	useEffect(()=>{
		let clearFollows = []
		for (let i = 0; i < props.detail.follows.length  ; i++) {
			let index = clearFollows.findIndex(f => moment(f.date).format("YYYY-MM-DD") == moment(props.detail.follows[i].callDateTime).format("YYYY-MM-DD"))
			if(props.detail.follows[i].type === "call") {
				if(index !== -1) {
					clearFollows[index].call += 1
				} else {
					clearFollows.push({date: moment(props.detail.follows[i].callDateTime).format("YYYY-MM-DD"), call: 1, rdv: 0})
				}
			} else {
				if(index !== -1) {
					clearFollows[index].rdv += 1;
				} else {
					clearFollows.push({date: moment(props.detail.follows[i].callDateTime).format("YYYY MM DD"), rdv: 1, call:0})
				}
			}
			
		}
		
		let newFollow = [['date', 'rdv', 'call']];

		clearFollows.map((follow)=>{
			let tab = [moment(follow.date).format('DD-MM-YYYY'), follow.rdv, follow.call];
			newFollow.push(tab);
		})

		setFollows(newFollow);

	}, [props.detail])

	useEffect(()=>{
		let clearProspects = []
		for (let i = 0; i < props.follow.prospects.length  ; i++) {
			let index = clearProspects.findIndex(p => moment(p.date).format("YYYY-MM-DD") == moment(props.follow.prospects[i].creationTimestamp).format("YYYY-MM-DD"))
			
			if(index !== -1) {
				clearProspects[index].quantity += 1;
			} else {
				clearProspects.push({date: moment(props.follow.prospects[i].creationTimestamp).format("YYYY MM DD"), quantity: 1})
			}
		}
		console.log(clearProspects)
		let newProspects = [['date', 'prospects']];

		clearProspects.map((prospect)=>{
			let tab = [moment(prospect.date).format('DD-MM-YYYY'), prospect.quantity];
			newProspects.push(tab);
		})
		console.log(newProspects)
		setProspect(newProspects);

	}, [props.follow])

	return (
		<div>
			<h2>Statistiques</h2>
			<Chart
			  width={'800px'}
			  height={'600px'}
			  chartType="AreaChart"
			  loader={<div>Loading Chart</div>}
			  data={follows}
			  options={{
			    title: 'Statistique Rdv et appels',
			    hAxis: { title: 'Date', titleTextStyle: { color: '#333' } },
			    vAxis: { minValue: 0 },
			    // For the legend to fit, we make the chart area smaller
			    chartArea: { width: '50%', height: '70%' },
			    // lineWidth: 25
			  }}
			  // For tests
			  rootProps={{ 'data-testid': '1' }}
			/>
			<Chart
			  width={'800px'}
			  height={'600px'}
			  chartType="AreaChart"
			  loader={<div>Loading Chart</div>}
			  data={prospects}
			  options={{
			    title: 'Statistique prospects',
			    hAxis: { title: 'Date', titleTextStyle: { color: '#333' } },
			    vAxis: { minValue: 0 },
			    // For the legend to fit, we make the chart area smaller
			    chartArea: { width: '50%', height: '70%' },
			    // lineWidth: 25
			  }}
			  // For tests
			  rootProps={{ 'data-testid': '1' }}
			/>
		</div>
	)
}


const mapDispatchToProps = {
	
}

const mapStateToProps = (store)=>{
	return {
		user: store.user,
		follow: store.prospects,
		detail: store.follows
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Stat);