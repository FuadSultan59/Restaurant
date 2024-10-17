import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import  {ToastContainer, toast} from 'react-toastify' ;
import 'react-toastify/dist/ReactToastify.css';

const Analytics2 = () => {
  const [orderData, setOrderData] = useState([]);
  const [labels, setLabels] = useState(null)
  const [AcceptedData, setAcceptedData] = useState(null)  
  const [DeclinedData, setDeclinedData] = useState({})
  const data = {
    labels: labels,
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
        data: AcceptedData,
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
        data: DeclinedData,
      },
    ],
  };
  let myData;


  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  useEffect(() => {

    GetAnlysisData()
  }, []);


  // const labels = myData.map((entry) => entry.month);
  // const acceptedData = myData.map((entry) => entry.accepted);
  // const declinedData = myData.map((entry) => entry.declined);


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

              myData = data.data
              setOrderData(myData)

              setLabels(myData.map((entry) => entry.month));
              setAcceptedData(myData.map((entry) => entry.accepted));
              setDeclinedData(myData.map((entry) => entry.declinedcount));


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

  

  return (
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


<table style={{marginLeft:'10%',marginTop:'3%', width:'90%'}}>
      <thead >
          <tr style={{marginLeft:'10px', backgroundColor:'DarkGreen', color:'yellow'}} >
              {months.map((month) => (
                <td key={month} style={{marginLeft:'10px'}}>{month}</td>
              ))}
            </tr>
      </thead>

      <tbody>

        <tr>
          {months.map((month) => (
            <td key={month} style={{backgroundColor:'rgba(75,192,192,0.4)'}}>
              {orderData.find((entry) => entry.month === month)?.accepted || 0}
            </td>
          ))}
        </tr>
        <tr>
          {months.map((month) => (
            <td key={month} style={{backgroundColor:'rgba(255,99,132,0.4)'}}>
              {orderData.find((entry) => entry.month === month)?.declinedcount || 0}
            </td>
          ))}
        </tr>
      </tbody>
    </table>

<ToastContainer />
</>
  );
};

export default Analytics2;
