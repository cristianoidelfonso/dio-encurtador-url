import { Request, Response, NextFunction } from 'express';
import { config } from '../config/Constants';
import { URLModel } from '../database/models/URL';
import shortid from 'shortid';

export class URLController {
  public async shorten(request: Request, response: Response, next: NextFunction): Promise<void> {
    
    // Capturar a originURL que vem no corpo da requisição
    const { originURL } = request.body;
    
    // Verificar se a url já está cadastrada no banco de dados
    const url = await URLModel.findOne({ originURL });
    if (url) {
      response.json(url);
			return;
		}

    const hash = shortid.generate();
    const shortURL = `${config.API_URL}/${hash}`;
    
    // Salvar a url no banco de dados
    const newURL = await URLModel.create({ hash, shortURL, originURL });

    // Retornar a url que foi salva 
		response.json(newURL);
	}


  public async redirect(request: Request, response: Response, next: NextFunction): Promise<void> {
    
    const { hash } = request.params;
    
    const url = await URLModel.findOne({ hash });

		if (url) {
			response.redirect(url.originURL)
			return
		}

		response.status(400).json({ error: 'URL not found' })
	}
}