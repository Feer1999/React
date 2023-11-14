import React, { useState } from 'react';
import * as S from './styles';

const apiUrl = 'https://brasilapi.com.br/api/registrobr/v1/';

const Menu: React.FC = () => {
  const [domainName, setDomainName] = useState<string>('');
  const [domainData, setDomainData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchDomainData = async () => {
    try {
      const response = await fetch(apiUrl + domainName);
      const data = await response.json();

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
      <h1>Consulta de Domínios</h1>
      <S.Input
        type="text"
        placeholder="Digite o nome do domínio"
        onChange={(e) => setDomainName(e.target.value)}
      />
      <S.Button onClick={fetchDomainData}>Consultar</S.Button>
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      {domainData && (
        <S.Result>
          <S.ResultItem>Situação: {domainData.status}</S.ResultItem>
          <S.ResultItem>FQDN: {domainData.fqdn}</S.ResultItem>
          <S.ResultItem>Hosts: {domainData.hosts.join(', ')}</S.ResultItem>
          <S.ResultItem>Status de publicação: {domainData['publication-status']}</S.ResultItem>
          <S.ResultItem>Expira em: {domainData['expires-at']}</S.ResultItem>
        </S.Result>
      )}
      {domainData?.suggestions && (
        <S.Result>
          <p>Sugestões:</p>
          <ul>
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
