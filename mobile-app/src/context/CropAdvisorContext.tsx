import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export interface ConsultationMedia {
  uri: string;
}

export interface Consultation {
  id: string;
  cropName: string;
  issue: string;
  description: string;
  photos: ConsultationMedia[];
  videos: ConsultationMedia[];
  status: 'Completed';
  createdAt: string;
}

export type NewConsultation = Omit<Consultation, 'id' | 'status' | 'createdAt'>;

interface CropAdvisorContextValue {
  consultations: Consultation[];
  addConsultation: (data: NewConsultation) => Consultation;
  getConsultation: (id: string) => Consultation | undefined;
}

const CropAdvisorContext = createContext<CropAdvisorContextValue | null>(null);
const FIRST_ID = 1025;

export function CropAdvisorProvider({ children }: { children: React.ReactNode }) {
  const [consultations, setConsultations] = useState<Consultation[]>([]);

  const addConsultation = useCallback(
    (data: NewConsultation) => {
      const item: Consultation = {
        ...data,
        id: String(FIRST_ID + consultations.length),
        status: 'Completed',
        createdAt: new Date().toISOString(),
      };
      setConsultations((current) => [item, ...current]);
      return item;
    },
    [consultations.length],
  );

  const getConsultation = useCallback(
    (id: string) => consultations.find((c) => c.id === id),
    [consultations],
  );

  const value = useMemo(
    () => ({ consultations, addConsultation, getConsultation }),
    [consultations, addConsultation, getConsultation],
  );

  return <CropAdvisorContext.Provider value={value}>{children}</CropAdvisorContext.Provider>;
}

export function useCropAdvisor() {
  const ctx = useContext(CropAdvisorContext);
  if (!ctx) throw new Error('useCropAdvisor must be used within CropAdvisorProvider');
  return ctx;
}
