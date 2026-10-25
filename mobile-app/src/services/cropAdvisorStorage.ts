import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Directory, File, Paths } from 'expo-file-system';

export interface ConsultationMedia {
  uri: string;
}

export type ConsultationStatus = 'In-progress' | 'Completed';

export interface Consultation {
  id: string;
  cropName: string;
  issue: string;
  description: string;
  photos: ConsultationMedia[];
  videos: ConsultationMedia[];
  status: ConsultationStatus;
  createdAt: string;
}

// Web-only browser APIs (the project's TS config has no DOM lib).
declare const indexedDB: any;
type IDBDatabase = any;

const KEY = '@farmmarket/crop-advisor/consultations';
const DB_NAME = 'farmmarket-crop-advisor';
const STORE = 'consultations';

/* ---------- Web: IndexedDB (stores the real image/video files) ---------- */

type WebRecord = Omit<Consultation, 'photos' | 'videos'> & {
  photos: Blob[];
  videos: Blob[];
};

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: 'id' });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function toBlob(uri: string): Promise<Blob> {
  return (await fetch(uri)).blob();
}

async function webLoad(): Promise<Consultation[]> {
  const db = await openDb();
  const records = await new Promise<WebRecord[]>((resolve, reject) => {
    const req = db.transaction(STORE).objectStore(STORE).getAll();
    req.onsuccess = () => resolve(req.result as WebRecord[]);
    req.onerror = () => reject(req.error);
  });
  return records
    .map((r) => ({
      ...r,
      photos: r.photos.map((b) => ({ uri: (URL as any).createObjectURL(b) })),
      videos: r.videos.map((b) => ({ uri: (URL as any).createObjectURL(b) })),
    }))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

async function webSave(item: Consultation): Promise<void> {
  const record: WebRecord = {
    ...item,
    photos: await Promise.all(item.photos.map((p) => toBlob(p.uri))),
    videos: await Promise.all(item.videos.map((v) => toBlob(v.uri))),
  };
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put(record);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/* ---------- Native: AsyncStorage + files copied to app storage ---------- */

async function copyToAppStorage(uri: string, name: string): Promise<string> {
  const dir = new Directory(Paths.document, 'crop-advisor');
  if (!dir.exists) dir.create({ intermediates: true });
  const ext = (uri.split('?')[0].split('.').pop() || 'bin').replace(/[^a-zA-Z0-9]/g, '');
  const dest = new File(dir, `${name}.${ext}`);
  if (dest.exists) dest.delete();
  new File(uri).copy(dest);
  return dest.uri;
}

async function nativeLoad(): Promise<Consultation[]> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Consultation[];
  } catch {
    return [];
  }
}

async function nativeSave(item: Consultation): Promise<Consultation> {
  const saved: Consultation = {
    ...item,
    photos: await Promise.all(
      item.photos.map(async (p, i) => ({ uri: await copyToAppStorage(p.uri, `${item.id}-photo-${i}`) })),
    ),
    videos: await Promise.all(
      item.videos.map(async (v, i) => ({ uri: await copyToAppStorage(v.uri, `${item.id}-video-${i}`) })),
    ),
  };
  const existing = await nativeLoad();
  await AsyncStorage.setItem(KEY, JSON.stringify([saved, ...existing]));
  return saved;
}

/* ---------- Public API ---------- */

export async function loadConsultations(): Promise<Consultation[]> {
  try {
    return Platform.OS === 'web' ? await webLoad() : await nativeLoad();
  } catch {
    return [];
  }
}

/** Persists the consultation and returns the stored version (media URIs may change). */
export async function persistConsultation(item: Consultation): Promise<Consultation> {
  if (Platform.OS === 'web') {
    await webSave(item);
    return item;
  }
  return nativeSave(item);
}
