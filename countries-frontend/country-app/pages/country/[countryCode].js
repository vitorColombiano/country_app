import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CountryInfoPage = () => {
  const router = useRouter();
  const { countryCode } = router.query;
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!countryCode) return;

    async function fetchCountryInfo() {
      try {
        const response = await axios.get(`http://localhost:4000/countries/info?code=${countryCode}`);
        setCountry(response.data);
      } catch (err) {
        setError('Failed to fetch country details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCountryInfo();
  }, [countryCode]);

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  // Dados do gráfico de população
  const populationChartData = {
    labels: country.populationData.map((data) => data.year),
    datasets: [
      {
        label: 'Population Over Time',
        data: country.populationData.map((data) => data.value),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">{country.countryName}</h1>
      <img
        src={country.flagUrl}
        alt={`Flag of ${country.countryName}`}
        className="mx-auto mb-6"
        width={150}
      />

      <div className="border-t pt-4">
        <h2 className="text-2xl font-semibold mt-4">Border Countries</h2>
        <ul className="mt-2 list-disc pl-6 space-y-2">
          {country.borderCountries.map((border, index) => (
            <li key={index} className="text-lg">{border}</li>
          ))}
        </ul>
      </div>

      <div className="border-t pt-6">
        <h2 className="text-2xl font-semibold mt-4">Population Chart</h2>
        <div className="mt-4">
          <Line data={populationChartData} />
        </div>
      </div>
    </div>
  );
};

export default CountryInfoPage;
