import { Recinto } from './Recinto.js';
import { Animal } from './Animal.js';

class RecintosZoo {
    constructor() {
        this.recintos = [
            new Recinto(1, 'savana', 10, [{ especie: 'MACACO', quantidade: 3 }]),
            new Recinto(2, 'floresta', 5, []),
            new Recinto(3, 'savana e rio', 7, [{ especie: 'GAZELA', quantidade: 1 }]),
            new Recinto(4, 'rio', 8, []),
            new Recinto(5, 'savana', 9, [{ especie: 'LEAO', quantidade: 1 }]),
        ];

        this.animais = {
            LEAO: new Animal(3, ['savana', 'savana e rio'], true),
            LEOPARDO: new Animal(2, ['savana', 'savana e rio'], true),
            CROCODILO: new Animal(3, ['rio', 'savana e rio'], true),
            MACACO: new Animal(1, ['savana', 'floresta', 'savana e rio'], false),
            GAZELA: new Animal(2, ['savana', 'savana e rio'], false),
            HIPOPOTAMO: new Animal(4, ['rio', 'savana e rio'], false)
        };
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

            const ocupacaoAtual = recinto.animais.reduce((acc, a) => acc + (this.animais[a.especie].tamanho * a.quantidade), 0);
            const espacoNecessario = quantidade * animal.tamanho;
            const espacoLivre = recinto.tamanhoTotal - ocupacaoAtual - espacoNecessario;

            return espacoLivre >= 0;
        };

        const recintosViaveis = [];

        for (const recinto of this.recintos) {
            if (recintoViavel(recinto)) {
                const ocupacaoAtual = recinto.animais.reduce((acc, a) => acc + (this.animais[a.especie].tamanho * a.quantidade), 0);
                const espacoNecessario = quantidade * animal.tamanho;
                const espacoExtra = recinto.animais.length > 0 && recinto.animais[0].especie !== tipoAnimal ? 1 : 0;
                const espacoLivre = recinto.tamanhoTotal - ocupacaoAtual - espacoNecessario - espacoExtra;
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`);
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };
    }
}

export { RecintosZoo };