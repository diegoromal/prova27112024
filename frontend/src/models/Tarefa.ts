import { Categoria } from "./Categoria";

export interface Tarefa {
    tarefaId?: string;
    titulo: string;
    descricao: string;
    criadoEm?: string;
    categoria?: Categoria;
    categoriaId: number;    
    status?: string;
}

export interface AltetarTarefa {
    tarefaId?: string;
    titulo: string;
    descricao: string;
    criadoEm?: string;
    categoria?: Categoria;
    categoriaId: number;    
    status: string;
}