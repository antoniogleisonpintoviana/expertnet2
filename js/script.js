class CalculadoraServicos {
    constructor() {
        this.precos = {
            xerox: 0.70,
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
            xerox: "XEROX (CÓPIAS)",
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
        this.configurarEventosInput();
    }

    configurarEventosInput() {
        const inputs = document.querySelectorAll('.service-input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.erro.style.display = 'none';
            });
            
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.calcular();
                }
            });
        });
    }

    calcular() {
        let total = 0;
        const itens = [];

        for (const [servico, preco] of Object.entries(this.precos)) {
            const input = document.getElementById(servico);
            const quantidade = parseInt(input.value) || 0;
            
            if (quantidade > 0) {
                const valor = quantidade * preco;
                total += valor;
                
                itens.push({
                    nome: this.nomesServicos[servico],
                    quantidade: quantidade,
                    valor: valor,
                    input: input
                });
            }
        }

        if (itens.length === 0) {
            this.mostrarErro('⚠️ Selecione pelo menos um serviço para calcular.');
            this.resultado.style.display = 'none';
            return;
        }

        this.erro.style.display = 'none';
        this.exibirResultados(itens, total);
    }

    exibirResultados(itens, total) {
        this.resultItems.innerHTML = '';
        this.resultado.style.display = 'block';

        itens.sort((a, b) => b.valor - a.valor);

        itens.forEach(item => {
            const div = document.createElement('div');
            div.className = 'result-item';
            
            div.innerHTML = `
                <span class="service-name">${item.nome}</span>
                <div class="item-details">
                    <span class="item-quantity">${item.quantidade} un.</span>
                    <span class="service-value">R$ ${item.valor.toFixed(2)}</span>
                </div>
            `;
            
            this.resultItems.appendChild(div);
        });

        this.valorTotal.textContent = `R$ ${total.toFixed(2)}`;
        
        // Scroll para o resultado
        this.resultado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    mostrarErro(mensagem) {
        this.erro.textContent = mensagem;
        this.erro.style.display = 'block';
        this.erro.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Inicializar quando o documento carregar
document.addEventListener('DOMContentLoaded', () => {
    new CalculadoraServicos();
});

// Adicionar estilos para detalhes do item
const style = document.createElement('style');
style.textContent = `
    .item-details {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .item-quantity {
        color: #718096;
        font-weight: 500;
        font-size: 0.9em;
    }
    
    @media (max-width: 480px) {
        .item-details {
            flex-direction: column;
            gap: 5px;
            align-items: flex-end;
        }
        
        .result-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
        }
        
        .item-details {
            align-items: flex-start;
        }
    }
`;
document.head.appendChild(style);
