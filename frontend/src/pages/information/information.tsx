import { useEffect, useState } from 'react'
import { api } from '../../lib/axios'
import {
  InformationContainer,
  InformationTable,
  InformationTableLine,
  LoadingContainer,
  NavigationContainer,
  SearchFormContainer,
} from './styles'
import {
  CaretDoubleLeft,
  CaretDoubleRight,
  MagnifyingGlass,
} from 'phosphor-react'

interface CSVprops {
  id: string
  nrCpfCnpj: string
  vlPresta: string
  vlMora: string
  qtPrestacoes: string
  vlMovimento: string
  vlPag: string
  vlTotal: string
  dtPag: string
  dtContrato: string
  dtVctPre: string
  isConsistent: boolean
}

export function Information() {
  const [listInfo, setListInfo] = useState<CSVprops[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await api.get(
          `/find?q=${searchQuery}&page=${currentPage}`,
        )
        setListInfo(response.data)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [currentPage, searchQuery])

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  return (
    <InformationContainer>
      <SearchFormContainer>
        <input
          type="text"
          placeholder="Busque CPF ou CNPJ"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button type="submit">
          <MagnifyingGlass size={20} />
          Buscar
        </button>
      </SearchFormContainer>
      <InformationTable>
        <thead>
          <th>CPF | CNPJ</th>
          <th>Qte Presta</th>
          <th>VL Presta</th>
          <th>VL Mora</th>
          <th>VL Movimento</th>
          <th>VL Pag</th>
          <th>VL Total</th>
          <th>Dta Pagamento</th>
          <th>Dta Contrato</th>
          <th>Dta Vencimento</th>
        </thead>
        <tbody>
          {listInfo.map((item) => {
            return (
              <InformationTableLine key={item.id} variant={item.isConsistent}>
                <td>{item.nrCpfCnpj}</td>
                <td>{item.qtPrestacoes}</td>
                <td>{item.vlPresta}</td>
                <td>{item.vlMora}</td>
                <td>{item.vlMovimento}</td>
                <td>{item.vlPag}</td>
                <td>{item.vlTotal}</td>
                <td>{item.dtPag}</td>
                <td>{item.dtContrato}</td>
                <td>{item.dtVctPre}</td>
              </InformationTableLine>
            )
          })}
        </tbody>
      </InformationTable>
      {isLoading && <LoadingContainer>Carregando...</LoadingContainer>}
      <NavigationContainer>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          <CaretDoubleLeft size={24} />
        </button>
        <span>Página {currentPage}</span>
        <button onClick={handleNextPage}>
          <CaretDoubleRight size={24} />
        </button>
      </NavigationContainer>
    </InformationContainer>
  )
}
