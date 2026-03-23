"use client";

import { useEffect, useState } from "react";
import { getProdutosTodos } from "@/services/api"

export default function Home() {
  const [produtos, atualizarProdutos] = useState<any[]>([]);
  const [tituloPesquisa, setTituloPesquisa] = useState("");

  useEffect(() => {
    getProdutosTodos().then((resultado) => {
      atualizarProdutos(resultado.data.products);
    })
  }, []);

  const produtosFiltrados = produtos.filter((produto) =>
    produto.title.toLowerCase().includes(tituloPesquisa.toLowerCase())
  );

  return (
    <div>
      <header className="mb-6">
        <h1>Pesquisa de produtos</h1>
        <label htmlFor="tituloPesquisa">Pesquisar por título:</label>
        <input
          id="tituloPesquisa"
          type="text"
          value={tituloPesquisa}
          onChange={(e) => setTituloPesquisa(e.target.value)}
          placeholder="Digite o título do produto"
        />
      </header>
      
      <main>
        <h1 className="text-2xl font-bold text-slate-900">Produtos</h1>
        {produtosFiltrados.length === 0 ? (
          <p className="text-gray-500">Nenhum produto corresponde ao filtro.</p>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center">
            {produtosFiltrados.map((p) => (
              <CardProduto key={p.id} produto={p} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

type CardProdutoProps = { produto: ProdutoType };

function CardProduto({ produto }: CardProdutoProps) {
  return (
    <article
      className="h-120 w-120 rounded-lg border border-orange-300 border-2 p-4 shadow-sm transition hover:shadow-md"
    >
      {produto.thumbnail ? (
        <img
          className="mb-3 h-60 w-full rounded-md"
          src={produto.thumbnail}
          alt={produto.title}
        />
      ) : (
        <div className="mb-3 h-60 w-full rounded-md bg-gray-100" />
      )}

      <h2 className="mb-1 text-lg font-semibold text-slate-900">{produto.title}</h2>
      <p className="mb-3 text-sm text-gray-600">{produto.description}</p>
      <p className="text-xl font-bold text-emerald-600">R$ {produto.price}</p>
    </article>
  );
}
