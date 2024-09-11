class Recinto {
    constructor(numero, bioma, tamanhoTotal, animais = []) {
        this.numero = numero;
        this.bioma = bioma;
        this.tamanhoTotal = tamanhoTotal;
        this.animais = animais;
    }

    calcularEspacoOcupado(animaisInfo) {
        return this.animais.reduce((acc, a) => acc + (animaisInfo[a.especie].tamanho * a.quantidade), 0);
    }

    calcularEspacoLivre(animaisInfo, tipoAnimal, quantidade) {
        const espacoNecessario = quantidade * animaisInfo[tipoAnimal].tamanho;
        const espacoOcupado = this.calcularEspacoOcupado(animaisInfo);
        return this.tamanhoTotal - espacoOcupado - espacoNecessario;
    }
}

export { Recinto };