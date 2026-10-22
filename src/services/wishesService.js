/**
 * Wedding Wishes Service (Local Storage + Online Cloud Sync)
 * 
 * Primary Local Key: 'wedding_wishes_data'
 * 
 * Supports:
 * 1. LocalStorage (Primary default - instant loading & persistence)
 * 2. Supabase Free Tier (Cross-device Cloud database using REST API)
 * 3. Firebase Firestore (Schema and integration ready)
 */

export const STORAGE_KEY = 'wedding_wishes_data';

// Optional Supabase credentials from Vite environment variables (.env)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isCloudConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

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
 * Fetch wishes from online cloud (Supabase REST API)
 * Schema expected in Supabase table "wishes":
 *  - id (text, primary key)
 *  - name (text)
 *  - message (text)
 *  - attending (boolean)
 *  - receipt_url (text, nullable)
 *  - created_at (timestamptz)
 */
export const fetchCloudWishes = async () => {
  if (!isCloudConfigured) return null;

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/wishes?select=*&order=created_at.desc`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    if (!res.ok) {
      console.warn('[WishesService] Supabase fetch error status:', res.status);
      return null;
    }

    const data = await res.json();
    return data.map((item) => ({
      id: item.id,
      name: item.name,
      message: item.message,
      willAttend: item.attending ?? true,
      receiptImage: item.receipt_url || null,
      createdAt: item.created_at || new Date().toISOString(),
    }));
  } catch (err) {
    console.warn('[WishesService] Cloud fetch failed, falling back to local:', err);
    return null;
  }
};

/**
 * Push new wish to online cloud (Supabase)
 */
export const saveWishToCloud = async (wish) => {
  if (!isCloudConfigured) return false;

  try {
    const payload = {
      id: wish.id,
      name: wish.name,
      message: wish.message,
      attending: wish.willAttend,
      receipt_url: wish.receiptImage || null,
      created_at: wish.createdAt || new Date().toISOString(),
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/wishes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(payload),
    });

    return res.ok;
  } catch (err) {
    console.warn('[WishesService] Could not send wish to cloud:', err);
    return false;
  }
};

/**
 * Delete a wish from online cloud (Supabase)
 */
export const deleteWishFromCloud = async (wishId) => {
  if (!isCloudConfigured) return false;

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/wishes?id=eq.${wishId}`, {
      method: 'DELETE',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    return res.ok;
  } catch (err) {
    console.warn('[WishesService] Could not delete wish from cloud:', err);
    return false;
  }
};
