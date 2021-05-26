import './App.css';
import {useState, useEffect} from 'react'
import dados from './produtos.json';

function App() {

  const [produtos, setProdutos] = useState([])
  const [nomes, setNomes] = useState([])
  const [precos, setPrecos] = useState([])
  const [filtro, setFiltro] = useState('')

  const [nomesSelecionados, setNomesSelecionados] = useState([])
  const [precosSelecionados, setPrecosSelecionados] = useState([])

  useEffect( () => {
    setProdutos(dados.itens);
  }, [])

  function filtrar() {
    //lembrar de colocar value para pegar o valor digitado
    var texto = document.getElementById('pesquisa').value
    var filtrados = dados.itens.filter( (produto) => produto.nome.includes(texto))
    setProdutos(filtrados)
  }

  function cadastrar() {
    var nome = document.getElementById('nome').value
    var valor = document.getElementById('valor').value
    var erro = 0

    if (parseFloat(valor) <= 0 ) {
      erro = 1
      alert('Valor do produto deve ser maior que zero')
    }

    if (nome.length < 3){
      erro = 1
      alert('Nome do produto deve ter minimo 3 caracteres')
    }

    if (nome === '' || valor === '') {
      erro = 1
      alert('Preencha todos os campos')
    }

    if (erro === 0) {
      setNomes([...nomes, nome])
      setPrecos([...precos, valor])
    }
  }

  function comprar(nome, preco) {
      setNomesSelecionados([...nomesSelecionados, nome])
      setPrecosSelecionados([...precosSelecionados, preco])
  }

  return (
    <main>
    <div id='cabecalho'>
      <h1>LOJINHA DO SEU ZÉ</h1>
    </div>
    <div id='menu'>
      <ul>
        <li><a href="#">HOME</a></li>
        <li><a href="#">PRODUTOS</a></li>
        <li><a href="#">CONTATO</a></li>
      </ul>
    </div>
    {
      nomesSelecionados.length > 0 && (
        <div>
          <h1>Carrinho</h1>
          <p>{nomesSelecionados.length} produtos</p>
          <p>
            {precosSelecionados.reduce((acc, preco) => {
              return acc + parseFloat(preco)
            },0)
          }
          </p>
        </div>
      )
    }
    <div>
      <input type='text' id='pesquisa' placeholder='Nome do produto'/>
      <button onClick={filtrar}>Filtrar</button>
    </div>
    <div>
        {
          produtos.map( (item, index) => (
            <div key={index}>
              <img alt="Foto do produto" width={160} src={item.imagem}/>
              <h2>{item.nome}</h2>
              <h4>{item.preco}</h4>
              <button onClick={() => comprar(item.nome, item.preco)}>Comprar</button>
            </div>
          ))
        }
      </div>
   </main>
  );
}

export default App;
