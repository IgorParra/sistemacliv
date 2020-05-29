import React,{useState} from 'react';
import './styles.css';
import taskImg from '../../Assets/task.png';
import logoImg from '../../Assets/logo.svg';
import {FiLogIn} from 'react-icons/fi';
import {Link,useHistory} from 'react-router-dom';
import api from '../../Services/api'

export default function Login(){
    const[id,setId]=useState('');
    const history = useHistory()

    async function handleLogin(e){
       e.preventDefault();
       console.log(id)
       
       try{
           const response = await api.post('sessions',{ id });
           
           console.log(response.data.name);
           localStorage.setItem('userId',id);
           localStorage.setItem('userName',response.data.name);
           localStorage.setItem('userFirstName',response.data.name.split(" ")[0]);
           history.push('/profile');
       }catch(err){
           alert("Falha no login! Verifique seus dados");
           
       }
    }
    return(
        <div className="login-container">

            <section className="form">
                <img src={logoImg} alt="SisteMacliv"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>
                    <input
                     value={id}
                     onChange={e => setId(e.target.value)}
                     placeholder="Sua ID"/>
                    <button className="button" type="subit">Entrar</button>
                    <Link className="back-link" to="/Register">
                        <FiLogIn size={16} color="#0058B3"/>
                        Não tenho cadastro</Link>
                </form>

            </section>
            <img src={taskImg} alt="" />
        </div>
    )
    
};