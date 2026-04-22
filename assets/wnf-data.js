/**
 * wnf-data.js — Woobly & Friends Supabase data layer
 * Include this on any public page that needs live data.
 * 
 * SETUP: Replace SUPABASE_URL and SUPABASE_ANON_KEY with your values.
 * Get them from: supabase.com → your project → Settings → API
 */

// ════════════════════════════════════════════
// REPLACE THESE TWO VALUES WITH YOUR OWN
// ════════════════════════════════════════════
const SUPABASE_URL      = 'https://ubfscsqjirqmuuqctook.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViZnNjc3FqaXJxbXV1cWN0b29rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NDI2MjUsImV4cCI6MjA5MjQxODYyNX0.j9fi_89oBRMOK7Pyc5-RtiM2kIJbOkWnI92-8nzn02g';
// ════════════════════════════════════════════

let _sb = null;
function getClient() {
  if (_sb) return _sb;
  if (!window.supabase) { console.error('Supabase SDK not loaded'); return null; }
  if (SUPABASE_URL === 'YOUR_SUPABASE_URL') { console.warn('Supabase not configured in wnf-data.js'); return null; }
  _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return _sb;
}

/* ── PUBLIC API ── */

async function getStories() {
  const sb = getClient(); if (!sb) return [];
  const { data } = await sb.from('stories').select('id,title,tag,excerpt,cover_url,book_no,created_at').order('created_at',{ascending:false});
  return data || [];
}

async function getStory(id) {
  const sb = getClient(); if (!sb) return null;
  const { data } = await sb.from('stories').select('*').eq('id',id).single();
  return data;
}

async function getShopItems() {
  const sb = getClient(); if (!sb) return [];
  const { data } = await sb.from('shop_items').select('*').order('sort_order');
  return data || [];
}

async function getFriends() {
  const sb = getClient(); if (!sb) return [];
  const { data } = await sb.from('friends').select('*').order('sort_order');
  return data || [];
}

async function getFaq() {
  const sb = getClient(); if (!sb) return [];
  const { data } = await sb.from('faq_items').select('*').order('sort_order');
  return data || [];
}

async function getSocialLinks() {
  const sb = getClient(); if (!sb) return {};
  const { data } = await sb.from('site_settings').select('key,value').like('key','social_%');
  const result = {};
  (data||[]).forEach(r => { result[r.key.replace('social_','')] = r.value; });
  return result;
}

window.WNF = { getStories, getStory, getShopItems, getFriends, getFaq, getSocialLinks };
