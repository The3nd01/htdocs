import Section from '../../componentes/Section'


import '../../App.css'

function Home() {
  
 const user={
 email :'dmp0005@gmail.com',
 password : '12345678'
 }
 
 const options ={
 method:'post',
 headers:{'Content-Type':'application/json'},
 body: JSON.stringify(user)
 }
 

  return (
   <div className='bg-zinc-300 h-screen'>
    <Section/>
   </div>
  )
}

export default Home

