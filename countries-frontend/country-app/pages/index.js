import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const CountryListPage = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await axios.get('http://localhost:4000/countries');
        console.log('API Response:', response.data);  // Verificando a resposta da API
        if (response.data && Array.isArray(response.data)) {
          setCountries(response.data);
        } else {
          setError('A resposta da API não é um array válido');
        }
      } catch (err) {
        console.error('Erro ao buscar os países:', err);
        setError('Failed to fetch countries');
      } finally {
        setLoading(false);
      }
    }

    fetchCountries();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center">Countries List</h1>
      <ul className="mt-8 space-y-4">
        {countries.map((country) => (
          <li key={country.countryCode} className="p-4 border rounded-lg hover:bg-gray-100">
            <Link href={`/country/${country.countryCode}`} style={{ display: 'inline-block', maxWidth: '300px' }}>
                {country.name}
              </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryListPage;
