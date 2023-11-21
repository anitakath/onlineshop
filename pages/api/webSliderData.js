


export default function handler(req, res){

    if(req.method === 'GET'){

        const images = [
            {
                name: 'necklace',
                image: '/webslider/necklaceI.jpg'
            },
            {
                name: 'ring',
                image: '/webslider/homeRing.jpg'
            },
            {
                name: 'bracelet',
                image: '/webslider/bracelet.jpg'
            },
            {
                name: 'handbag',
                image: '/webslider/handbag.jpg'
            },
            {
                name: 'decor',
                image: '/webslider/decor.jpg'
            }
        ]

        return res.status(200).json(images)
    }
}