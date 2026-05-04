"use strict";

import { supabase } from './supabase.js';
let hasWarnedSupabaseDisabled = false;

function getSupabaseClient() {
  if (supabase) return supabase;

  if (!hasWarnedSupabaseDisabled) {
    console.warn('Supabase is disabled, so chat history and memory will not persist.');
    hasWarnedSupabaseDisabled = true;
  }

  return null;
}

/**
 * Get chat history for a session.
 * @param {string} sessionId
 * @returns {Promise<Array>} history array (contents format: { role, parts }[])
 */
async function getHistory(sessionId) {
  const client = getSupabaseClient();
  if (!client) return [];

  try {
    const { data, error } = await client
      .from('chat_messages')
      .select('role, parts')
      .eq('session_id', sessionId)
      .order('message_order', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting history:', error);
    return [];
  }
}

/**
 * Set full chat history for a session.
 * Deletes existing messages and inserts new ones.
 * @param {string} sessionId
 * @param {Array} history
 */
async function setHistory(sessionId, history) {
  const client = getSupabaseClient();
  if (!client) return;

  try {
    if (!Array.isArray(history)) {
      console.error('History must be an array');
      return;
    }

    // Check if session exists
    const { data: sessionData, error: sessionError } = await client
      .from('chat_sessions')
      .select('id')
      .eq('id', sessionId)
      .single();

    if (sessionError && sessionError.code !== 'PGRST116') {
      throw sessionError;
    }

    if (!sessionData) {
      console.warn(`Session ${sessionId} does not exist, skipping history save`);
      return;
    }

    // Delete existing messages for this session
    await client
      .from('chat_messages')
      .delete()
      .eq('session_id', sessionId);

    // Insert new messages
    if (history.length > 0) {
      const messages = history.map((msg, index) => ({
        session_id: sessionId,
        role: msg.role,
        parts: msg.parts,
        message_order: index
      }));
      const { error } = await client
        .from('chat_messages')
        .insert(messages);

      if (error) throw error;
    }
  } catch (error) {
    console.error('Error setting history:', error);
  }
}

/**
 * Get all sessions for a user.
 * @param {string} userEmail
 * @returns {Promise<Array>}
 */
async function getSessions(userEmail) {
  const client = getSupabaseClient();
  if (!client) return [];

  try {
    // First get or create user
    const { data: userData, error: userError } = await client
      .from('users')
      .select('id')
      .eq('email', userEmail)
      .single();

    if (userError && userError.code !== 'PGRST116') throw userError;
    if (!userData) return [];

    // Get sessions for this user
    const { data, error } = await client
      .from('chat_sessions')
      .select('id, title, timestamp')
      .eq('user_id', userData.id)
      .order('timestamp', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting sessions:', error);
    return [];
  }
}

/**
 * Save sessions for a user.
 * @param {string} userEmail
 * @param {Array} allSessions
 */
async function setSessions(userEmail, allSessions) {
  const client = getSupabaseClient();
  if (!client) return;

  try {
    if (!userEmail) {
      console.error('User email is required for setSessions');
      return;
    }

    let sessions = allSessions;
    if (typeof allSessions === 'string') {
      sessions = JSON.parse(allSessions);
    }

    if (!Array.isArray(sessions)) {
      console.error('Sessions must be an array');
      return;
    }

    // Get or create user
    let { data: userData, error: userError } = await client
      .from('users')
      .select('id')
      .eq('email', userEmail)
      .single();

    if (userError && userError.code === 'PGRST116') {
      // User doesn't exist, create new user
      const { data: newUser, error: createError } = await client
        .from('users')
        .insert({ email: userEmail })
        .select('id')
        .single();

      if (createError) throw createError;
      userData = newUser;
    } else if (userError) {
      throw userError;
    }

    // Delete all existing sessions for this user
    await client
      .from('chat_sessions')
      .delete()
      .eq('user_id', userData.id);

    // Insert new sessions
    if (sessions.length > 0) {
      const sessionsToInsert = sessions.map(session => ({
        id: session.id,
        user_id: userData.id,
        title: session.title || 'New Chat',
        timestamp: session.timestamp || Date.now()
      }));

      const { error } = await client
        .from('chat_sessions')
        .insert(sessionsToInsert);

      if (error) throw error;
    }
  } catch (error) {
    console.error('Error setting sessions:', error);
  }
}

/**
 * Remove session history.
 * @param {string} sessionId
 */
async function deleteHistory(sessionId) {
  const client = getSupabaseClient();
  if (!client) return;

  try {
    const { error } = await client
      .from('chat_messages')
      .delete()
      .eq('session_id', sessionId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting history:', error);
  }
}

/**
 * Get all available sessions.
 * @returns {Promise<object>} map of sessionId -> history
 */
async function getAllSessions() {
  const client = getSupabaseClient();
  if (!client) return {};

  try {
    const { data, error } = await client
      .from('chat_sessions')
      .select('id');

    if (error) throw error;

    const sessions = {};
    for (const session of data || []) {
      sessions[session.id] = await getHistory(session.id);
    }

    return sessions;
  } catch (error) {
    console.error('Error getting all sessions:', error);
    return {};
  }
}

/**
 * Get AI memory for a user.
 * @param {string} userEmail
 * @returns {Promise<Array>}
 */
async function getMemory(userEmail) {
  const client = getSupabaseClient();
  if (!client) return [];

  try {
    const { data: userData, error: userError } = await client
      .from('users')
      .select('id')
      .eq('email', userEmail)
      .single();

    if (userError && userError.code !== 'PGRST116') throw userError;
    if (!userData) return [];

    const { data, error } = await client
      .from('ai_memory')
      .select('memory_item')
      .eq('user_id', userData.id)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return (data || []).map(item => item.memory_item);
  } catch (error) {
    console.error('Error getting memory:', error);
    return [];
  }
}

/**
 * Set AI memory for a user.
 * @param {string} userEmail
 * @param {Array} memory
 */
async function setMemory(userEmail, memory) {
  const client = getSupabaseClient();
  if (!client) return;

  try {
    const memoryArray = Array.isArray(memory) ? memory : [memory];

    // Get or create user
    let { data: userData, error: userError } = await client
      .from('users')
      .select('id')
      .eq('email', userEmail)
      .single();

    if (userError && userError.code === 'PGRST116') {
      const { data: newUser, error: createError } = await client
        .from('users')
        .insert({ email: userEmail })
        .select('id')
        .single();

      if (createError) throw createError;
      userData = newUser;
    } else if (userError) {
      throw userError;
    }

    // Delete existing memory
    await client
      .from('ai_memory')
      .delete()
      .eq('user_id', userData.id);

    // Insert new memory items
    if (memoryArray.length > 0) {
      const memoryItems = memoryArray.map(item => ({
        user_id: userData.id,
        memory_item: item
      }));

      const { error } = await client
        .from('ai_memory')
        .insert(memoryItems);

      if (error) throw error;
    }
  } catch (error) {
    console.error('Error setting memory:', error);
  }
}

/**
 * Get user data including sessions and memory.
 * @param {string} userEmail
 * @returns {Promise<object>}
 */
async function getUser(userEmail) {
  try {
    const [aiMemory, chatSessions] = await Promise.all([
      getMemory(userEmail),
      getSessions(userEmail)
    ]);

    return {
      aiMemory: aiMemory || [],
      chatSessions: chatSessions || []
    };
  } catch (error) {
    console.error('Error getting user:', error);
    return {
      aiMemory: [],
      chatSessions: []
    };
  }
}

export {
  getHistory,
  setHistory,
  deleteHistory,
  getAllSessions,
  getMemory,
  setMemory,
  getSessions,
  setSessions,
  getUser
};
