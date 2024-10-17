
import React, { useEffect, useState } from 'react';
import { Doughnut, Pie, Line } from 'react-chartjs-2';
import { ArcElement, CategoryScale, Chart, LinearScale, PointElement, LineElement } from 'chart.js'; // Import ArcElement
import '../../Css/admin/analytics.css'
import  {ToastContainer, toast} from 'react-toastify' ;
import 'react-toastify/dist/ReactToastify.css';

Chart.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement );

class Analytics extends React.Component {



  render() {

    // this.componentDidMount(()=>{
    //   this.GetAnlysisData();

    // }) 
    function Analyze(){

      useEffect(()=>{

      },[])

    
    



    function GetAnlysisData(){


      const AdminToken = localStorage.getItem('lemon-admin')

      fetch('http://localhost:3232/admin/Order-Analysis', {
        
        method: 'Get',
        headers: {
        'Content-Type': 'application/json',
        'Authorization':  `Bearer ${AdminToken}`
        },
        })    
        
        .then((response)=>{
          if(response.ok){
            response.json().then((data)=>{

              if (data.message === 'success'){
                console.log(data.data)
                toast.success('Success!' , {
                  duration: 2500,
                  position: 'top-center', 
                })


              }
              else if(data.message === 'invalid_token') {
                toast.error('Invalid Token, Login Agian!' , {
                  duration: 2500,
                  position: 'top-center', 
                })


              }
              else {
                toast.error('Error, Something went wrong!' , {
                  duration: 2500,
                  position: 'top-center', 
                })


              }



            })
          }
          else {
            toast.error('Error, Something went wrong!' , {
              duration: 2500,
              position: 'top-center', 
            })

          }
        })
        .catch(()=>{
          toast.error('Error, Something went wrong!' , {
            duration: 2500,
            position: 'top-center', 
          })

        }) 
          


        
      
      
      
      }
    }

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Accepted Orders',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'round',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 0, 90, 105, 45, 78, 30, 12],
    },
    {
      label: 'Declined Orders',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(255,99,132,0.4)',
      borderColor: 'rgba(255,99,132,1)',
      borderCapStyle: 'round',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(255,99,132,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [28, 48, 40, 19, 86, 27, 0, 0, 0, 0, 5, 9],
    },
  ],
};
    
return(
<>
  <div style={{Width:'100vw', backgroundColor:''}}>
    <h2 style={{textAlign:'center', marginBottom:' 5%' , marginLeft:'15%',marginTop:'3%', color:'rgba(75,192,192)'}}>Accepted And Declined Orders Analysis</h2>
      <div style={{height:'40vh', width: '70vw', paddingLeft:'15%'}}>

      <Line 
          data={data}           
          options={{
                    maintainAspectRatio: false,
                  }} 
      />
      </div>


      <div style={{display:'flex' , alignItems: 'center', marginLeft:'30%',marginTop:'2%'}}  >
        <div style={{ width: '20px', height: '20px', marginLeft: '20px', backgroundColor:'rgba(75,192,192,0.4)'}} ></div>
        <span> Accepted</span>
        <div style={{ width: '20px', height: '20px', marginLeft: '20px', backgroundColor:'rgba(255,99,132,1)'}} ></div>
        <span > Declined</span>
    </div>

</div>

<ToastContainer />
</>
)


  }
}

export default Analytics;
