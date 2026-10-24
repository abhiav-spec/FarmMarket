import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import {
  Consultation,
  loadConsultations,
  persistConsultation,
} from '../services/cropAdvisorStorage';

export type { Consultation } from '../services/cropAdvisorStorage';
export type NewConsultation = Omit<Consultation, 'id' | 'status' | 'createdAt'>;

interface CropAdvisorContextValue {
  consultations: Consultation[];
  ready: boolean;
  addConsultation: (data: NewConsultation) => Promise<Consultation>;
  getConsultation: (id: string) => Consultation | undefined;
}

const CropAdvisorContext = createContext<CropAdvisorContextValue | null>(null);
const FIRST_ID = 1025;

export function CropAdvisorProvider({ children }: { children: React.ReactNode }) {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [ready, setReady] = useState(false);
  const nextId = useRef(FIRST_ID);

  useEffect(() => {
    let active = true;
    loadConsultations().then((items: Consultation[]) => {
      if (!active) return;
      const max = items.reduce((m: number, c: Consultation) => Math.max(m, Number(c.id) || 0), FIRST_ID - 1);
      nextId.current = max + 1;
      setConsultations(items);
      setReady(true);
    });
    return () => {
      active = false;
    };
  }, []);

  const addConsultation = useCallback(async (data: NewConsultation) => {
    const item: Consultation = {
      ...data,
      id: String(nextId.current++),
      status: 'In-progress',
      createdAt: new Date().toISOString(),
    };
    const saved = await persistConsultation(item);
    setConsultations((current) => [saved, ...current]);
    return saved;
  }, []);

  const getConsultation = useCallback(
    (id: string) => consultations.find((c) => c.id === id),
    [consultations],
  );

  const value = useMemo(
    () => ({ consultations, ready, addConsultation, getConsultation }),
    [consultations, ready, addConsultation, getConsultation],
  );

  return <CropAdvisorContext.Provider value={value}>{children}</CropAdvisorContext.Provider>;
}

export function useCropAdvisor() {
  const ctx = useContext(CropAdvisorContext);
  if (!ctx) throw new Error('useCropAdvisor must be used within CropAdvisorProvider');
  return ctx;
}
