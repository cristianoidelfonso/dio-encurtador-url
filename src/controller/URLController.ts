import { Request, Response, NextFunction } from 'express';
import { config } from '../config/Constants';
import shortid from 'shortid';

export class URLController {
  public async shorten(request: Request, response: Response, next: NextFunction): Promise<void> {
		// Ver se a url já nao existe
    
    // Criar o hash para essa url
    const { originURL } = request.body;
    const hash = shortid.generate();
    const shortURL = `${config.API_URL}/${hash}`;

    // Salvar a url no banco de dados

    // Retornar a url que foi salva 
    response.json({ originURL, hash, shortURL});

    // const { originURL } = req.body
		// const url = await URLModel.findOne({ originURL })
		// if (url) {
		// 	response.json(url)
		// 	return
		// }
		// const hash = shortId.generate()
		// const shortURL = `${config.API_URL}/${hash}`
		// const newURL = await URLModel.create({ hash, shortURL, originURL })
		// response.json(newURL)
	}

  public async redirect(request: Request, response: Response, next: NextFunction): Promise<void> {
		// Capturar o hash da url
    const { hash } = request.params;

    // Encontrar a url original pelo hash
    const url = {
      "originURL": "https://cloud.mongodb.com/v2/621fa7673f1d3c25e99e44aa#clusters/detail/url-shortener-dio/connect?clusterId=url-shortener-dio",
      "hash": "orf68XFDU",
      "shortURL": "http://localhost:5000/orf68XFDU"
    };

    // Redirecionar para a url original a partir da que foi encontrada no banco de dados
    response.redirect(url.originURL);


		// const url = await URLModel.findOne({ hash })

		// if (url) {
			// response.redirect(url.originURL)
			// return
		// }

		// response.status(400).json({ error: 'URL not found' })
	}
}