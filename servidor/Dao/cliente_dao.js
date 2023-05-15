import { Client } from "pg";
import Cliente from "../models/cliente.model";


//ACCESO A BBDDs PARA CLIENTES

async function getClientes(){
    return await Cliente.query().select();
}

async function getClienteById(id){
    return await Cliente.query().select().findById(id);
}

//async function insert