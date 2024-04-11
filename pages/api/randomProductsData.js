


export default function handler (req, res){
    if(req.method === 'GET'){

        const randomProducts = [
          {
            id: "bridesDress ",
            name: " DRESS 'BRIDE' ",
            price: " 3000",
            desc: "a nice dress ",
            img: "/randomProducts/bridesDress.jpg",
          },
          {
            id: "bridesRing ",
            name: " RING 'BRIDE' ",
            price: " 300",
            desc: "a nice ring ",
            img: "/randomProducts/bridesRing.jpg",
          },
          {
            id: "bridesShoes",
            name: " SHOES 'BRIDE' ",
            price: " 900",
            desc: "nice shoes ",
            img: "/randomProducts/bridesShoes.jpg",
          },
          {
            id: "carpet_lua ",
            name: " CARPET 'LUA' ",
            price: " 500",
            desc: "a nice carpet ",
            img: "/randomProducts/carpet0.jpg",
          },
          {
            id: "carpet_zoe ",
            name: " CARPET 'ZOE' ",
            price: " 500",
            desc: "a nice carpet ",
            img: "/randomProducts/carpet3.jpg",
          },
         
          {
            id: "lamp_lily ",
            name: " LAMP 'LILY' ",
            price: " 195",
            desc: "a nice lamp ",
            img: "/randomProducts/lamp3.jpg",
          },
          {
            id: "lamp_rosie ",
            name: " LAMP 'ROSIE'",
            price: " 295",
            desc: "a nice lamp ",
            img: "/randomProducts/lamp5.jpg",
          },
         
          {
            id: "vase_luis ",
            name: " VASE 'LUIS'",
            price: " 95",
            desc: "a nice vase ",
            img: "/randomProducts/vase4.jpg",
          },
          {
            id: "vase_jona",
            name: " VASE 'JONA'",
            price: " 75",
            desc: "a nice vase ",
            img: "/randomProducts/vase0.jpg",
          },
          {
            id: "vase_luigi ",
            name: " VASE 'LUIGI' ",
            price: " 115",
            desc: "a nice vase",
            img: "/randomProducts/vase1.jpg",
          },
          {
            id: "vase_max ",
            name: " VASE 'MAX' ",
            price: " 215",
            desc: "a nice vase",
            img: "/randomProducts/vase2.jpg",
          },
          {
            id: "vase_fynn",
            name: " VASE 'FYNN' ",
            price: " 60",
            desc: "a nice vase",
            img: "/randomProducts/vase3.jpg",
          },
          
        ];

        return res.status(200).json(randomProducts)
    }
}