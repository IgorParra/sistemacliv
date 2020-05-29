import React,{useState} from 'react';
import './styles.css';
import logoImg from '../../Assets/logo.svg';
import {Link,useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../Services/api';




export default function  Register (){
    const [name,setName] = useState('');
    let   [email,setEmail] = useState('');
    const [atEmail,setAtEmail] = useState('@macliv.com.br');
    const [sector,setSector] = useState('');
    const [executant,setExecutant] = useState('');
    const group = 2;
    const history = useHistory();



    async function hangleRegister(e){
        
        e.preventDefault();
        email = email+atEmail;
        const data = ({
            name,
            email,
            sector,
            group,
            executant
        });
        console.log(data)
        try {
            const response = await api.post('/user',data);
            alert(`Seu ID de acesso:${response.data.id}`);
            history.push('/')
        }catch (err){
            alert('Erro no cadastro, tente novamente ou solicite ajuda ao setor de T.I')
        }




    }
    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="SisteMacliv"/>
                     <h1>Cadastro</h1>
                     <p>Faça seu cadastro, acesse a plataforma para solicitar ou realizar tarefas, qualquer dúvida, procure o setor de T.I</p>
                     <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#0058B3"/>
                        Retornar ao início.
                        </Link>

                </section>
                <form onSubmit={hangleRegister}>
                    <input 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Nome"
                    />
                    <div className="input-group">
                        <input 
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="E-mail" style={{width:150}}
                        />
                        <select 
                           value={atEmail}
                           onChange={e =>setAtEmail(e.target.value)}
                           name="sector" id="sector"
                        >
                            <option value="@macliv.com.br">@macliv.com.br</option>
                            <option value="@gmail.com">@gmail.com</option>
                            <option value="@hotmail.com">@hotmail.com</option>
                            <option value="@outlook.com">@outlook.com</option>
                        </select>
                    </div>
                    
                    
                    <select 
                       value={sector}
                       onChange={e =>setSector(e.target.value)}
                       name="sector" id="sector"
                    >
                        <option value="" disabled selected hidden>Setor</option>
                        <option value="1">Gerencia</option>
                        <option value="3">Marketing</option>
                        <option value="2">T.I</option>
                    </select>

                    <select 
                       value={executant}
                       onChange={e => setExecutant(e.target.value)}
                       name="executant" id="executant" 
                    >
                    <option value="" disabled selected hidden>Eu vou...</option>
                        <option value="1">Executar tarefas</option>
                        <option value="0">Delegar tarefas</option>
                        <option value="1">Executar e delegar tarefas</option>
                    </select>

                    <button className="button" type="submit">Cadastrar</button>
                    
                </form>
            </div>
        </div>
    )
}