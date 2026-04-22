/**
 * wnf-data.js — Woobly & Friends Supabase data layer v2
 * Include on any public page that needs live data from Supabase.
 *
 * SETUP: Replace the two values below with your Supabase project details.
 * Supabase → Settings → API → Project URL + anon public key
 */

// ════════════════════════════════════════
//  REPLACE THESE WITH YOUR VALUES
// ════════════════════════════════════════
const SUPABASE_URL      = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
// ════════════════════════════════════════

let _sb = null;
function _client() {
  if (_sb) return _sb;
  if (!window.supabase) { console.error('[WNF] Supabase SDK not loaded'); return null; }
  if (SUPABASE_URL.includes('YOUR_')) { console.warn('[WNF] Supabase not configured in wnf-data.js'); return null; }
  _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return _sb;
}

/**
 * Get all stories (for the stories page grid)
 */
async function getStories() {
  const sb = _client(); if (!sb) return [];
  const { data, error } = await sb
    .from('stories')
    .select('id,title,tag,excerpt,cover_url,book_no,created_at')
    .order('created_at', { ascending: false });
  if (error) { console.error('[WNF] getStories:', error); return []; }
  return data || [];
}

/**
 * Get a single story by id (for the story reader)
 */
async function getStory(id) {
  const sb = _client(); if (!sb) return null;
  const { data, error } = await sb
    .from('stories')
    .select('*')
    .eq('id', id)
    .single();
  if (error) { console.error('[WNF] getStory:', error); return null; }
  return data;
}

/**
 * Get shop items — used on homepage for "New on Shop" section
 * Returns up to 6 items ordered by sort_order
 */
async function getShopItems() {
  const sb = _client(); if (!sb) return [];
  const { data, error } = await sb
    .from('shop_items')
    .select('*')
    .order('sort_order');
  if (error) { console.error('[WNF] getShopItems:', error); return []; }
  return data || [];
}

/**
 * Get friends — used on homepage crew section + about page
 */
async function getFriends() {
  const sb = _client(); if (!sb) return [];
  const { data, error } = await sb
    .from('friends')
    .select('*')
    .order('sort_order');
  if (error) { console.error('[WNF] getFriends:', error); return []; }
  return data || [];
}

/**
 * Get FAQ items — used on about page
 */
async function getFaq() {
  const sb = _client(); if (!sb) return [];
  const { data, error } = await sb
    .from('faq_items')
    .select('*')
    .order('sort_order');
  if (error) { console.error('[WNF] getFaq:', error); return []; }
  return data || [];
}

/**
 * Get social links — used in footer
 * Returns { instagram: 'https://...', x: 'https://...', ... }
 */
async function getSocialLinks() {
  const sb = _client(); if (!sb) return {};
  const { data, error } = await sb
    .from('site_settings')
    .select('key,value')
    .like('key', 'social_%');
  if (error) { console.error('[WNF] getSocialLinks:', error); return {}; }
  const result = {};
  (data || []).forEach(row => {
    result[row.key.replace('social_', '')] = row.value;
  });
  return result;
}

// Expose to global scope so all pages can call WNF.getShopItems() etc.
window.WNF = {
  getStories,
  getStory,
  getShopItems,
  getFriends,
  getFaq,
  getSocialLinks
};
