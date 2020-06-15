import React,{useState} from 'react';
import './style.css';
import logoImg from '../../Assets/logo.svg';
import {Link,useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../Services/api';



export default function NewTask(){
    const requesterName = localStorage.getItem('userFirstName');
    const requester = localStorage.getItem('userId')

    
    const [executant,setExecutant] = useState('');
    const [urgency,setUrgency]=useState('');
    const [description,setDescription]=useState('');
    var [expectation,setExpectation]=useState('');
    const history =useHistory();
    
   
    async function createTask(e){
        e.preventDefault();
        


       
       
        expectation = new Date(expectation)
        expectation = (expectation.getTime()/1000)
        
        
        const data = ({
            executant,
            urgency,
            description,
            expectation
        })
        
        try{
            const response = await api.post('/task',data,{
                headers:{
                    Authorization:requester
                }
            });
            alert("Tarefa Cadastrada com Sucesso!");
            history.push('/profile')
        }catch(err){
            alert('Falha ao criar tarefa, aguarde alguns minutos e tente novamente, caso o erro persista, procure o setor de')
        }
        
    }
    return (
        <div className="new-task-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="SisteMacliv"/>
                     <h1>Cadastrar nova tarefa</h1>
                     <p>Descreva a nova tarefa detalhadamente e lembre-se,  
                    quanto melhor a descrição, mais fácil e precisa será a execução!
                    </p>
                     <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#0058B3"/>
                        Voltar para home
                        </Link>

                </section>
                <form onSubmit={createTask}>
                    <input 
                       required
                       disabled
                       value={requesterName}placeholder="Solicitante"/>
                    
                    <select
                       required
                       value={executant}
                       onChange={e => setExecutant(e.target.value)}>
                        <option value="" disable selected hidden>Será executada por...</option>
                        <option value="af4836e0">Igor Parra</option>
                        <option value="bce23b2a">José Witiuk</option>
                    </select>
                    <textarea 
                        placeholder="Descrição"
                        required
                        value={description}
                        onChange={e=>setDescription(e.target.value)}/>

                    <select 
                        required 
                        value={urgency}
                        onChange={e => setUrgency(e.target.value)}
                        id="">
                        <option value="" disable selected hidden>Urgência</option>
                        <option value="1">Baixa</option>
                        <option value="2">Normal</option>
                        <option value="3">Alta</option>
                    </select>

                    <input 
                       type="date" 
                       onChange={e=>setExpectation(e.target.value)} />
                   
                    <button className="button" type="submit">Cadastrar</button>
                    
                </form>
            </div>
        </div>
    )
}