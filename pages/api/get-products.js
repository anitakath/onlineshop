import { supabase } from "@/services/supabaseClient";

export default async (req, res) => {
  try {
    const { data, error } = await supabase.from("SHOPNAME_").select("*");

    if (error) {
      console.error("Error fetching users:", error.message);
      res.status(500).json({ error: "Error fetching users" });
    } else {
      console.log("Users:", data);
      res.status(200).json(data);
    }
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Error fetching users" });
  }
};
