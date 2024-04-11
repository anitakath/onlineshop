import { supabase } from "@/services/supabaseClient";

export default async (req, res) => {
  try {
    const { data, error } = await supabase.from("shopname").select("*");

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

/*import { supabase } from "@/services/supabaseClient";



 export default async (req, res) => {
   try {
     const { data, error } = await supabase
        .from("shopname")
        .select("*");

     if (error) {
       console.error("Error fetching todos:", error.message);
     } else {
       console.log("Users:", data);
       return data;
     }
   } catch (error) {
     console.error("Error fetching todos:", error.message);
   }


   res.status(200).json({ data });
 }
*/
