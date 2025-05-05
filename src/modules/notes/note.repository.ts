import { supabase } from "@/lib/supabase";

export const noteRepository = {
  async create(userId: string, params: { title?: string; parentId?: string }) {
    const { data, error } = await supabase
      .from("notes")
      .insert({
        user_id: userId,
        title: params.title,
        parent_id: params.parentId,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },
};
