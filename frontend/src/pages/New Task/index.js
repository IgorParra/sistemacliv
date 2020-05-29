import React,{useState} from 'react';
import './style.css';
import logoImg from '../../Assets/logo.svg';
import {Link} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi'


export default function NewTask(){
    const userFirstName = localStorage.getItem('userFirstName');

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
                <form>
                    <input disabled value={userFirstName}placeholder="Solicitante"/>
                    <select name="" id="">
                        <option value="" disable selected hidden>Será executada por...</option>
                        <option value="">Igor Parra</option>
                        <option value="">José Witiuk</option>
                    </select>
                    <textarea placeholder="Descrição"/>

                    <select name="" id="">
                        <option value="" disable selected hidden>Urgência</option>
                        <option value="">Baixa</option>
                        <option value="">Normal</option>
                        <option value="">Alta</option>
                    </select>
                   
                    <button className="button" type="submit">Cadastrar</button>
                    
                </form>
            </div>
        </div>
    )
}