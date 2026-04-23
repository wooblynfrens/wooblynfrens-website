/**
 * wnf-data.js — Woobly & Friends Supabase data layer v3
 * Include on any public page that needs live data from Supabase.
 */

const SUPABASE_URL      = 'https://ifnxgkrsibdtvktddnnn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlmbnhna3JzaWJkdHZrdGRkbm5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5MzcxMDcsImV4cCI6MjA5MjUxMzEwN30.j822XEgDhPqJ1k9oGJBD4WcSSl89bevHEWRCQpBhgjg';

let _sb = null;
function _client() {
  if (_sb) return _sb;
  if (!window.supabase) { console.error('[WNF] Supabase SDK not loaded'); return null; }
  _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return _sb;
}

/** Get all stories (for the stories page grid) */
async function getStories() {
  const sb = _client(); if (!sb) return [];
  const { data, error } = await sb
    .from('stories')
    .select('id,title,tag,excerpt,cover_url,book_no,created_at')
    .order('created_at', { ascending: false });
  if (error) { console.error('[WNF] getStories:', error); return []; }
  return data || [];
}

/** Get a single story by id */
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

/** Get shop items — used on homepage. Fields: name, price, url, img_url */
async function getShopItems() {
  const sb = _client(); if (!sb) return [];
  const { data, error } = await sb
    .from('shop_items')
    .select('*')
    .order('sort_order');
  if (error) { console.error('[WNF] getShopItems:', error); return []; }
  return data || [];
}

/** Get friends — fields: name, species, isle, color, short_desc, full_desc, pfp_url */
async function getFriends() {
  const sb = _client(); if (!sb) return [];
  const { data, error } = await sb
    .from('friends')
    .select('*')
    .order('sort_order');
  if (error) { console.error('[WNF] getFriends:', error); return []; }
  return data || [];
}

/** Get FAQ items */
async function getFaq() {
  const sb = _client(); if (!sb) return [];
  const { data, error } = await sb
    .from('faq_items')
    .select('*')
    .order('sort_order');
  if (error) { console.error('[WNF] getFaq:', error); return []; }
  return data || [];
}

/** Get social links from site_settings */
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

window.WNF = { getStories, getStory, getShopItems, getFriends, getFaq, getSocialLinks };
