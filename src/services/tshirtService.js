import { supabase } from '../lib/supabase';

export const tshirtService = {
  async getAll() {
    const { data, error } = await supabase
      .from('Tshirt')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      throw new Error('Failed to fetch t-shirts');
    }
    return { tshirts: data };
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('Tshirt')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error('Failed to fetch t-shirt');
    }
    return data;
  },

  async create(tshirt) {
    const { data, error } = await supabase
      .from('Tshirt')
      .insert([tshirt])
      .select()
      .single();
    console.log('created t-shirt', data);

    if (error) {
      throw new Error('Failed to create t-shirt');
    }
    return data;
  },

  async update(id, tshirt) {
    console.log('Updating t-shirt - ID:', id);
    console.log('Updating t-shirt - Data:', tshirt);

    const { data, error } = await supabase
      .from('Tshirt')
      .update(tshirt)
      .eq('id', id)
      .select();

    console.log('Update response - Data:', data);
    console.log('Update response - Error:', error);

    if (error) {
      console.error('Supabase update error details:', error);
      throw new Error(`Failed to update t-shirt: ${error.message}`);
    }

    if (!data || data.length === 0) {
      console.warn('Update returned no data - possible RLS policy issue');
    }

    return data;
  },

  async delete(id) {
    const { data, error } = await supabase
      .from('Tshirt')
      .delete()
      .eq('id', id)
      .select();

    if (error) {
      throw new Error('Failed to delete t-shirt');
    }
    return data;
  },
};
