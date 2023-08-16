import cardapio from './cardapio.js';
class CaixaDaLanchonete {
    calcularValorDaCompra = (formaDePagamento, itens) => {
        if (!formaDePagamento || !itens) {
            return 'Verifique os dados';
        }

        if (formaDePagamento !== 'dinheiro' && formaDePagamento !== 'debito' && formaDePagamento !== 'credito') {
            return 'Forma de pagamento inválida!';
        }
        
        let valorTotal = 0;
        let itensPrincipais = [];
        let combos = [];
        let itensExtras = [];

        for (let item of itens) {
            const [codigo, quantidade] = item.split(',');
            const itemCardapio = cardapio[codigo];

            if (!itemCardapio) {
                return 'Item inválido!';
            }

            if (itemCardapio.codigo.startsWith('combo')) {
                combos.push(itemCardapio.codigo);
            } else if (itemCardapio.codigo === 'chantily' || itemCardapio.codigo === 'queijo') {
                if (itensPrincipais.length === 0) {
                    return 'Item extra não pode ser pedido sem o principal';
                }
                itensExtras.push(itemCardapio.codigo);
                valorTotal += itemCardapio.valor * quantidade;
            } else {
                itensPrincipais.push(itemCardapio.codigo);
                valorTotal += itemCardapio.valor * quantidade;
            }
        }

        for (let combo of combos) {
            const comboItens = combo.split('-');
            const principalCodigo = comboItens[1];

            if (!itensPrincipais.includes(principalCodigo)) {
                return 'Item extra não pode ser pedido sem o principal';
            }
        }

        if (itensPrincipais.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        if (valorTotal === 0) {
            return 'Quantidade inválida!';
        }

        if (formaDePagamento === 'dinheiro') {
            valorTotal -= valorTotal * 0.05;
        } else if (formaDePagamento === 'credito') {
            valorTotal += valorTotal * 0.03;
        }

        return valorTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    };
}

export { CaixaDaLanchonete };