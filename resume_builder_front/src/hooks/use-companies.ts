// ===============================
// src/hooks/use-companies.ts
// ===============================

import type { Company } from 'src/api/company';

import { useEffect, useState } from 'react';

import { fetchCompanies } from 'src/api/company';

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const data = await fetchCompanies();
        if (isMounted) {
          setCompanies(data);
        }
      } catch (err) {
        console.error('Failed to fetch companies:', err);
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return { companies, loading, error };
}
