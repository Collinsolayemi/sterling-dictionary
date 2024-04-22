import { Request, Response } from 'express';

import { asyncWrapper } from '../utilis/errors/async.wrapper';
import { Dictionary } from '../entity/dictionary.entity';

export class DictionaryController {
  uploadNewWord = asyncWrapper(async (req: Request, res: Response) => {
    const { word, meaning } = req.body;

    const dictionary = new Dictionary();
    dictionary.word = word;
    dictionary.meaning = meaning;

    dictionary.save();
  });

  editExistingWord = asyncWrapper(async (req: Request, res: Response) => {});

  deleteExistingWord = asyncWrapper(async (req: Request, res: Response) => {});

  searchForWords = asyncWrapper(async (req: Request, res: Response) => {});
}
