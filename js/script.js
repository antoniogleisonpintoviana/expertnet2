class CalculadoraServicos {
    constructor() {
        this.precos = {
            impressaoPB: 1.00,
            curriculoElaborar: 4.00,
            curriculoAlterar: 2.00,
            oficiosDeclaracoes: 10.00,
            declaracoesCompraVenda: 20.00,
            contratosLocacao: 6.00,
            digitacao: 4.00,
            emissaoBoletos: 2.00,
            plastificacaoRgCpf: 2.50,
            plastificacaoFolha: 5.00,
            fotoPapelFotog: 6.00,
            fotoPapelAdesivo: 7.00,
            folhaCorrida: 3.00
        };

        this.nomesServicos = {
            impressaoPB: "IMPRESSÃO PB (UNID.)",
            curriculoElaborar: "CURRÍCULUM PARA ELABORAR",
            curriculoAlterar: "CURRÍCULUM NO SISTEMA P/ALTERAR",
            oficiosDeclaracoes: "OFÍCIOS E DECLARAÇÕES",
            declaracoesCompraVenda: "DECLARAÇÕES DE COMPRA/VENDA",
            contratosLocacao: "CONTRATOS DE LOCAÇÃO",
            digitacao: "DIGITAÇÃO (UNIDADE)",
            emissaoBoletos: "EMISSÃO DE BOLETOS",
            plastificacaoRgCpf: "PLASTIFICAÇÃO RG e CPF",
            plastificacaoFolha: "PLASTIFICAÇÃO FOLHA INTEIRA",
            fotoPapelFotog: "IMPRESSÃO FOTO PAPEL FOTOG",
            fotoPapelAdesivo: "IMPRESSÃO FOTO PAPEL ADESIVO",
            folhaCorrida: "FOLHA CORRIDA OU CRIMINAL"
        };

        this.inicializar();
    }

    inicializar() {
        this.btnCalcular = document.getElementById('btnCalcular');
        this.resultado = document.getElementById('resultado');
        this.resultItems = document.getElementById('resultItems');
        this.valorTotal = document.getElementById('valorTotal');
        this.erro = document.getElementById('erro');

        this.btnCalcular.addEventListener('click', () => this.calcular());
    }

    calcular() {
        let total = 0;
        const itens = [];

        // Calcular cada serviço
        for (const [servico, preco] of Object.entries(this.precos)) {
            const quantidade = parseInt(document.getElementById(servico).value) || 0;
            
            if (quantidade > 0) {
                const valor = quantidade * preco;
                total += valor;
                
                itens.push({
                    nome: this.nomesServicos[servico],
                    quantidade: quantidade,
                    valor: valor
                });
            }
        }

        // Validar se há serviços selecionados
        if (itens.length === 0) {
            this.mostrarErro('Selecione pelo menos um serviço para calcular.');
            this.resultado.style.display = 'none';
            return;
        }

        // Esconder mensagem de erro se houver serviços
        this.erro.style.display = 'none';

        // Exibir resultados
        this.exibirResultados(itens, total);
    }

    exibirResultados(itens, total) {
        this.resultItems.innerHTML = '';

        itens.forEach(item => {
            const div = document.createElement('div');
            div.className = 'result-item';
            
            div.innerHTML = `
                <span class="service-name">${item.nome} (${item.quantidade} un.)</span>
                <span class="service-value">R$ ${item.valor.toFixed(2)}</span>
            `;
            
            this.resultItems.appendChild(div);
        });

        this.valorTotal.textContent = `R$ ${total.toFixed(2)}`;
        this.resultado.style.display = 'block';
    }

    mostrarErro(mensagem) {
        this.erro.textContent = mensagem;
        this.erro.style.display = 'block';
    }

    formatarMoeda(valor) {
        return valor.toFixed(2).replace('.', ',');
    }
}

// Inicializar a calculadora quando o documento carregar
document.addEventListener('DOMContentLoaded', () => {
    new CalculadoraServicos();
});

// Limpar mensagens de erro ao digitar nos campos
const inputs = document.querySelectorAll('input[type="number"]');
inputs.forEach(input => {
    input.addEventListener('input', () => {
        document.getElementById('erro').style.display = 'none';
    });
});
