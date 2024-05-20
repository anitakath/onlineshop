import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/services/supabaseClient";


// const supabase = createClient("SUPABASE_URL", "SUPABASE_KEY");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { item } = req.body;

    console.log( item)

    const { data: insertedData, error } = await supabase
      .from("SHOPNAME_wishlist")
      .insert(item);

    if (error) {
      return res.status(500).json({ error: "Error inserting data" });
    }

    return res.status(200).json(insertedData);
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
