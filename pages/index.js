import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [retreats, setRetreats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch first 10 retreats
    (async () => {
      const { data, error } = await supabase
        .from('retreats')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      if (error) console.error(error);
      else setRetreats(data);
      setLoading(false);
    })();
  }, []);

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>Yoga Retreat Finder</h1>
      <p>Discover serene yoga & meditation retreats worldwide.</p>

      {loading && <p style={{ marginTop: '2rem' }}>Loading retreats…</p>}

      {!loading && retreats.length === 0 && (
        <p style={{ marginTop: '2rem' }}>No retreats yet—stay tuned!</p>
      )}

      <ul style={{ marginTop: '2rem', listStyle: 'none', padding: 0 }}>
        {retreats.map((r) => (
          <li
            key={r.id}
            style={{
              marginBottom: '1.5rem',
              padding: '1rem',
              border: '1px solid #eee',
              borderRadius: '8px',
            }}
          >
            <strong>{r.name}</strong> • {r.location}
            <br />
            <em>{r.type}</em>
            {r.price_range && <> • {r.price_range}</>}
            <p style={{ marginTop: '0.5rem' }}>{r.description}</p>
            {r.website && (
              <a
                href={r.website.startsWith('http') ? r.website : `https://${r.website}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit website
              </a>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
