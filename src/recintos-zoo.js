class RecintosZoo {
    constructor() {

        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] },
        ];

        this.animais = {
            LEAO: { tamanho: 3, bioma: ['savana', 'savana e rio'], carnívoro: true },
            LEOPARDO: { tamanho: 2, bioma: ['savana', 'savana e rio'], carnívoro: true },
            CROCODILO: { tamanho: 3, bioma: ['rio', 'savana e rio'], carnívoro: true },
            MACACO: { tamanho: 1, bioma: ['savana', 'floresta', 'savana e rio'], carnívoro: false },
            GAZELA: { tamanho: 2, bioma: ['savana', 'savana e rio'], carnívoro: false },
            HIPOPOTAMO: { tamanho: 4, bioma: ['rio', 'savana e rio'], carnívoro: false }
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


            if (animal.carnívoro) {
                if (recinto.animais.some(a => a.especie !== tipoAnimal)) return false;
            } else {
                if (recinto.animais.some(a => this.animais[a.especie].carnívoro)) return false;
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
export { RecintosZoo as RecintosZoo };