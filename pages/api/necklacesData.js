

export default function handler (req, res){

    if(req.method === 'GET'){
        
        const necklacesData = [
          {
            id: "necklaceHana",
            name: "NECKLACE 'HANA'",
            price: "79.99",
            desc: "a simple elegant necklace for ",
            img: "/necklaces/necklaceHana.jpg",
          },
          {
            id: "necklaceAmelie",
            name: "NECKLACE 'AMELIE'",
            price: "89.99",
            desc: " a simple elegant necklace for ",
            img: "/necklaces/necklaceAmelie.jpg",
          },
          {
            id: "necklaceCleo",
            name: "NECKLACE 'CLEO'",
            price: "79.99",
            desc: " a simple elegant necklace for ",
            img: "/necklaces/necklaceCleo.jpg",
          },
          {
            id: "necklaceFreya",
            name: "NECKLACE 'FREYA'",
            price: "79.99",
            desc: " a simple elegant necklace for",
            img: "/necklaces/necklaceFreya.jpg",
          },
          {
            id: "necklaceAlisha",
            name: "NECKLACE 'ALISHA'",
            price: "99.99",
            desc: " a simple elegant necklace for",
            img: "/necklaces/necklaceAlisha.jpg",
          },
          {
            id: "necklaceLouise",
            name: "NECKLACE 'LOUISE'",
            price: "59.99",
            desc: " a simple elegant necklace for",
            img: "/necklaces/necklaceLouise.jpg",
          },
          {
            id: "necklaceLinda",
            name: "NECKLACE 'LOUISE'",
            price: "59.99",
            desc: " a simple elegant necklace for",
            img: "/necklaces/necklaces.jpg",
          },
        ];

        return res.status(200).json(necklacesData);


    }


}