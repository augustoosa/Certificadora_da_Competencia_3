import { createClient } from '@supabase/supabase-js';

// O Vite usa import.meta.env para acessar as variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verificacao
// esquecer de configurar o arquivo .env.local
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltam as variáveis de ambiente do Supabase. Verifique o arquivo .env.local');
}

//export
export const supabase = createClient(supabaseUrl, supabaseAnonKey);