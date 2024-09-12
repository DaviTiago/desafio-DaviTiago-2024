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

    calcularEspacoExtra(tipoAnimal) {
        return this.animais.length > 0 && this.animais[0].especie !== tipoAnimal ? 1 : 0;
    }

    calcularEspacoLivre(animaisInfo, tipoAnimal, quantidade) {
        const espacoNecessario = quantidade * animaisInfo[tipoAnimal].tamanho;
        const espacoOcupado = this.calcularEspacoOcupado(animaisInfo);
        const espacoExtra = this.calcularEspacoExtra(tipoAnimal);
        return this.tamanhoTotal - espacoOcupado - espacoNecessario - espacoExtra;
    }
}

export { Recinto };