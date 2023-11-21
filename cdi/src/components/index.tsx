import React, { useState } from 'react';
import * as S from './styles';

// URL da API para consulta de domínios
const apiUrl = 'https://brasilapi.com.br/api/registrobr/v1/';

const Menu: React.FC = () => {
  // Estados para o nome do domínio, dados do domínio e erro
  const [domainName, setDomainName] = useState<string>('');
  const [domainData, setDomainData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar dados do domínio
  const fetchDomainData = async () => {
    try {
      const response = await fetch(apiUrl + domainName);
      const data = await response.json();

      // Verifica se a resposta indica um domínio encontrado
      if (data.status_code === 2) {
        setDomainData(data);
        setError(null);
      } else {
        setDomainData(null);
        setError('Nenhum domínio com este nome encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar dados do domínio:', error);
      setDomainData(null);
      setError('Erro ao buscar dados do domínio. Por favor, tente novamente.');
    }
  };

  return (
    <S.Container>
      {/* Título da página */}
      <h1>Consulta de Domínios</h1>

      {/* Input para digitar o nome do domínio */}
      <S.Input
        type="text"
        placeholder="Digite o nome do domínio"
        onChange={(e) => setDomainName(e.target.value)}
      />

      {/* Botão para realizar a consulta */}
      <S.Button onClick={fetchDomainData}>Consultar</S.Button>

      {/* Exibe mensagem de erro se houver */}
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

      {/* Exibe os dados do domínio se disponíveis */}
      {domainData && (
        <S.Result>
          {/* Exibe os detalhes do domínio */}
          <S.ResultItem>Situação: {domainData.status}</S.ResultItem>
          <S.ResultItem>FQDN: {domainData.fqdn}</S.ResultItem>
          <S.ResultItem>Hosts: {domainData.hosts.join(', ')}</S.ResultItem>
          <S.ResultItem>Status de publicação: {domainData['publication-status']}</S.ResultItem>
          <S.ResultItem>Expira em: {domainData['expires-at']}</S.ResultItem>
        </S.Result>
      )}

      {/* Exibe sugestões de domínios se disponíveis */}
      {domainData?.suggestions && (
        <S.Result>
          <p>Sugestões:</p>
          <ul>
            {/* Mapeia e exibe as sugestões de domínios */}
            {domainData.suggestions.map((suggestion: string, index: number) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </S.Result>
      )}
    </S.Container>
  );
};

export default Menu;
