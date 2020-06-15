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
    var button = ""
    

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

    function changeTask(id,statusValue){
        const field ='status'
        const status = statusValue
        
        const data={
             field,
             status
        }
        try{
             api.put(`task/${id}`,data);
             alert("Status da tarefa alterado!")
        }catch(err){
            alert("Ocorreu um erro");
            window.location.reload(true);

        }
       
    
    
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="SisteMacliv" />
                <span id="welcomeMessage">Seja bem vindo {userFirstName}</span>
                <Link id="newTask" className="button" to="/task/new">Cadastrar nova tarefa</Link>
                <button onClick={Logout} type="button">
                    <FiPower size={18} color="#0058B3" />

                </button>

            </header>
            <h1>Tarefas Cadastradas</h1>
            <ul>
                {task.map(task=>(
                   <li key={task.id}> 
                      <div style={{height:'90%'}}>
                        <strong>SOLICITANTE:</strong>
                        <p>{task.name} |  {requestData}</p>

                        <strong>TAREFA:</strong>
                        <p>{task.description}</p>

                        <strong>URGÊNCIA:</strong>
                        <p>{task.urgency}</p>
                        <strong>STATUS:</strong>
                        <p>{task.statusName}</p>

                        <strong>PRECISO DISSO ATÉ:</strong>
                        <p>{expectationData}</p>
                      </div>

                      <button id="del" onClick={()=>DeleteTask(task.id)} type="button">
                          <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
                      </button>
                      { 
                        task.status == 1 // Sequência de If's ternários para saber qual botão renderizar e liberar acesso ou não a uma ação na tarefa (Tentar melhorar na refatoração)
                        ? task.executant == userId // Verifica se o usuario logado é o executante, se for, permite "executar" a tarefa
                          ?(<button id={task.id}  value={2} onClick={e =>changeTask(e.target.id,e.target.value)} style={{backgroundColor:"#00b34f"}}className="button">Executar</button>)
                          :('')
                        : task.status == 2 // Verifica o status dda tarefa para saber qual botão renderizar assim como na linha 104
                          ? task.executant == userId
                               ?(<button id={task.id} value={3} onClick={e =>changeTask(e.target.id,e.target.value)} style={{backgroundColor:"#0058b3"}} className="button">Entregar</button>) // SE sim, renderiza, se não, não renderiza(Igual a linha 106 e 113)
                               :('')
                          : task.requester == userId 
                               ?(<button id={task.id} value={4} onClick={e =>changeTask(e.target.id,e.target.value)}  style={{backgroundColor:"#41414e"}} className="button">Finalizar</button>)
                               :('')    
                      }   
                   </li> 
                ))}
            </ul>
        </div>
    )

}