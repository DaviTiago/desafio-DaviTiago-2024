import { Recinto } from './Recinto.js';
import { Animal } from './Animal.js';

class RecintosZoo {
    constructor() {
        this.recintos = this.inicializarRecintos();
        this.animais = this.inicializarAnimais();
    }

    inicializarRecintos() {
        return [
            new Recinto(1, 'savana', 10, [{ especie: 'MACACO', quantidade: 3 }]),
            new Recinto(2, 'floresta', 5, []),
            new Recinto(3, 'savana e rio', 7, [{ especie: 'GAZELA', quantidade: 1 }]),
            new Recinto(4, 'rio', 8, []),
            new Recinto(5, 'savana', 9, [{ especie: 'LEAO', quantidade: 1 }]),
        ];
    }

    inicializarAnimais() {
        const definicoesAnimais = [
            { tipo: 'LEAO', tamanho: 3, bioma: ['savana', 'savana e rio'], carnivoro: true },
            { tipo: 'LEOPARDO', tamanho: 2, bioma: ['savana', 'savana e rio'], carnivoro: true },
            { tipo: 'CROCODILO', tamanho: 3, bioma: ['rio', 'savana e rio'], carnivoro: true },
            { tipo: 'MACACO', tamanho: 1, bioma: ['savana', 'floresta', 'savana e rio'], carnivoro: false },
            { tipo: 'GAZELA', tamanho: 2, bioma: ['savana', 'savana e rio'], carnivoro: false },
            { tipo: 'HIPOPOTAMO', tamanho: 4, bioma: ['rio', 'savana e rio'], carnivoro: false }
        ];

        return definicoesAnimais.reduce((acc, { tipo, tamanho, bioma, carnivoro }) => {
            acc[tipo] = new Animal(tipo, tamanho, bioma, carnivoro);
            return acc;
        }, {});
    }

    analisaRecintos(tipoAnimal, quantidade) {
        if (!this.animais[tipoAnimal]) {
            return { erro: "Animal inválido" };
        }
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const animal = this.animais[tipoAnimal];
        const animalBioma = Array.isArray(animal.bioma) ? animal.bioma : [animal.bioma];

        const recintoViavel = (recinto) => {
            const biomasAdequados = Array.isArray(recinto.bioma) ? recinto.bioma : [recinto.bioma];
            if (!animalBioma.some(bioma => biomasAdequados.includes(bioma))) return false;

            if (animal.carnivoro) {
                if (recinto.animais.some(a => a.especie !== tipoAnimal)) return false;
            } else {
                if (recinto.animais.some(a => this.animais[a.especie].carnivoro)) return false;
            }

            if (tipoAnimal === 'HIPOPOTAMO') {
                if (recinto.bioma !== 'savana e rio' && recinto.bioma !== 'rio' && recinto.animais.length > 0) return false;
                if (recinto.bioma === 'rio' && recinto.animais.length > 0) {
                    if (!recinto.animais.every(a => a.especie === 'HIPOPOTAMO')) return false;
                }
            }
            if (tipoAnimal === 'MACACO' && quantidade === 1 && recinto.animais.length === 0) return false;
            if (recinto.animais.some(a => a.especie === 'HIPOPOTAMO') && recinto.bioma !== 'savana e rio') return false;

            const espacoLivre = recinto.calcularEspacoLivre(this.animais, tipoAnimal, quantidade);

            return espacoLivre >= 0;
        };

        const recintosViaveis = [];

        for (const recinto of this.recintos) {
            if (recintoViavel(recinto)) {
                const espacoLivre = recinto.calcularEspacoLivre(this.animais, tipoAnimal, quantidade);
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`);
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };