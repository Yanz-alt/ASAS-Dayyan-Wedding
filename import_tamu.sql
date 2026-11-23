-- ==============================================================
-- QUERY PEMBUATAN TABEL & INSERT DATA TAMU UNDANGAN DI SUPABASE
-- Project / Database: db tamu undangan
-- ==============================================================

-- 1. Buat tabel jika belum ada
CREATE TABLE IF NOT EXISTS public.tamu_undangan (
    id SERIAL PRIMARY KEY,
    nama_tamu VARCHAR(255) NOT NULL,
    instansi VARCHAR(255),
    kategori VARCHAR(100),
    no_whatsapp VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 2. Aktifkan Row Level Security (RLS) dan izinkan akses baca untuk web undangan
ALTER TABLE public.tamu_undangan ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Access" 
ON public.tamu_undangan 
FOR SELECT 
USING (true);

-- 3. Masukkan data tamu undangan (CSV)
INSERT INTO public.tamu_undangan (id, nama_tamu, instansi, kategori, no_whatsapp)
VALUES
    (1, 'Dr. Rina Kusumawati, M.Pd.', 'Universitas Indonesia', 'Universitas', '6281234567890'),
    (2, 'Budi Santoso, S.Kom.', 'PT Telkom Indonesia (Persero) Tbk', 'Perusahaan', '6281398765432'),
    (3, 'Siti Rahmawati', 'Institut Teknologi Bandung', 'Universitas', '6285711223344'),
    (4, 'Ahmad Fauzi', 'Alumni Angkatan 2022 - Software Engineer', 'Alumni', '6287855667788'),
    (5, 'Dian Pratama, S.T.', 'PT Astra International Tbk', 'Perusahaan', '6282199001122'),
    (6, 'Prof. Hendra Wijaya', 'Universitas Bina Nusantara (BINUS)', 'Universitas', '6281144556677'),
    (7, 'Nadia Putri', 'Alumni Angkatan 2023 - UI/UX Designer', 'Alumni', '6289633445566')
ON CONFLICT (id) DO UPDATE 
SET 
    nama_tamu = EXCLUDED.nama_tamu,
    instansi = EXCLUDED.instansi,
    kategori = EXCLUDED.kategori,
    no_whatsapp = EXCLUDED.no_whatsapp;
