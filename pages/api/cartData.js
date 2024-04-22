// /pages/api/cartData.js

export default function handler(req, res) {
  if (req.method === "POST") {
    const { cartItems } = req.body;

    // Hier kannst du die cartItems speichern, z.B. in einer Datenbank oder einem File
    // Beispiel: Speichern in einer globalen Variable (nicht für den Produktiveinsatz geeignet)
    global.cartItems = cartItems;

    res.status(200).json({ message: "Cart items saved successfully" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
