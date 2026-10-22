/**
 * Wedding Wishes Service (Local Storage + Supabase Storage & Database Integration)
 * 
 * Storage Key: 'wedding_wishes_data'
 * Supabase Bucket: 'receipts'
 * Supabase Table: 'wishes'
 */
import { supabase, isSupabaseConfigured } from './supabaseClient';

export { supabase, isSupabaseConfigured };

export const STORAGE_KEY = 'wedding_wishes_data';

/**
 * Read wishes from localStorage
 */
export const getLocalWishes = (defaultWishes = []) => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('khmer_wedding_wishes');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((w, idx) => {
          if (!w.createdAt) {
            return {
              ...w,
              createdAt: new Date(Date.now() - (idx + 1) * 3600000).toISOString(),
            };
          }
          return w;
        });
      }
    }
  } catch (err) {
    console.warn('[WishesService] Could not read from localStorage:', err);
  }
  return defaultWishes;
};

/**
 * Save wishes array to localStorage
 */
export const saveLocalWishes = (wishes) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
  } catch (err) {
    console.warn('[WishesService] Could not save to localStorage:', err);
  }
};

/**
 * Upload receipt image directly to Supabase Storage Bucket 'receipts'
 * Returns the public URL or null
 */
export const uploadReceiptToSupabase = async (file) => {
  if (!supabase || !file) return null;

  try {
    // Generate unique filename
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;

    // Upload file to bucket 'receipts'
    const { error: uploadError } = await supabase.storage
      .from('receipts')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('[Supabase Storage] Upload error:', uploadError);
      return null;
    }

    // Retrieve public URL
    const { data } = supabase.storage
      .from('receipts')
      .getPublicUrl(fileName);

    return data?.publicUrl || null;
  } catch (err) {
    console.error('[Supabase Storage] Unexpected error:', err);
    return null;
  }
};

/**
 * Fetch wishes from Supabase Database Table 'wishes'
 */
export const fetchWishesFromSupabase = async () => {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[Supabase Database] Fetch error:', error);
      return null;
    }

    return (data || []).map((item) => ({
      id: item.id?.toString() || Date.now().toString(),
      name: item.name,
      message: item.message,
      willAttend: item.attending ?? true,
      receipt_url: item.receipt_url || null,
      receiptImage: item.receipt_url || null,
      createdAt: item.created_at || new Date().toISOString(),
    }));
  } catch (err) {
    console.warn('[Supabase Database] Failed to fetch:', err);
    return null;
  }
};

/**
 * Insert a new wish record into Supabase Database Table 'wishes'
 */
export const insertWishToSupabase = async ({ name, message, attending, receipt_url, created_at }) => {
  if (!supabase) return null;

  try {
    const record = {
      name,
      message,
      attending,
      receipt_url: receipt_url || null,
      created_at: created_at || new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('wishes')
      .insert([record])
      .select();

    if (error) {
      console.error('[Supabase Database] Insert error:', error);
      return null;
    }

    return data?.[0] || null;
  } catch (err) {
    console.error('[Supabase Database] Insert unexpected error:', err);
    return null;
  }
};

/**
 * Delete a wish from Supabase Database Table 'wishes'
 */
export const deleteWishFromSupabase = async (id) => {
  if (!supabase) return false;

  try {
    const { error } = await supabase
      .from('wishes')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[Supabase Database] Delete error:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[Supabase Database] Delete unexpected error:', err);
    return false;
  }
};
