import React,{useState,useEffect} from 'react';
import { Link,useHistory } from "react-router-dom";
import logoImg from '../../Assets/logo.svg'
import {FiPower,FiTrash2} from 'react-icons/fi';
import './style.css';
import api from '../../Services/api'

export default function Profile(){
    const [task,setTask]=useState([]);
    const userFirstName = localStorage.getItem('userFirstName');
    const userId = localStorage.getItem('userId');
    let [requestData,setRequestData] = useState('');
    let [expectationData,setExpectationData]=useState('');
    const history = useHistory();
    

    useEffect(()=>{
        api.get('profile',{
            headers:{
                Authorization:userId,
            }
        }).then(response => { 
            setTask(response.data);

            setRequestData(new Intl.DateTimeFormat('pt-BR',
             {
                year: 'numeric', 
                month: '2-digit',
                day: '2-digit', 
            })
             .format(task.date));

            setExpectationData(new Intl.DateTimeFormat('pt-BR',
             {
                year:'numeric',
                month:'2-digit',
                day:'2-digit'

             })
             .format(task.expectation));   
        })
    },[userId])

    async function DeleteTask(id){
        try{
            await api.delete(`task/${id}`,{
                headers:{
                    Authorization:userId
                }
            })
            setTask(task.filter(task => task.id != id));
            alert('Tarefa deletada com sucesso!')
            
        }catch(err){
            alert('Erro ao deletar tarefa')
        }
    }
    function Logout(){
        localStorage.clear();
        history.push('/')

    }
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="SisteMacliv" />
                <span>Seja bem vindo {userFirstName}</span>
                <Link className="button" to="/task/new">Cadastrar nova tarefa</Link>
                <button onClick={Logout} type="button">
                    <FiPower size={18} color="#0058B3" />

                </button>

            </header>
            <h1>Tarefas Cadastradas</h1>
            <ul>
                {task.map(task=>(
                   <li key={task.id}> 
                      <strong>SOLICITANTE:</strong>
                      <p>{task.name} |  {requestData}</p>

                      <strong>TAREFA:</strong>
                      <p>{task.descri}</p>

                      <strong>URGÊNCIA:</strong>
                      <p>{task.urgencia}</p>

                      <strong>PRECISO DISSO ATÉ:</strong>
                      <p>{expectationData}</p>

                      <button onClick={()=>DeleteTask(task.id)} type="button">
                          <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
                      </button>
                   </li> 
                ))}
            </ul>
        </div>
    )

}