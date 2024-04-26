import { Request, Response } from 'express';

import { asyncWrapper } from '../utilis/errors/async.wrapper';
import { Dictionary } from '../entity/dictionary.entity';
import { BadRequestException } from '../utilis/errors/error.utilis';

export class DictionaryController {
  uploadNewWord = asyncWrapper(async (req: Request, res: Response) => {
    const { word, meaning } = req.body;

    const existingWord = await Dictionary.findOne({
      where: { word, isDeleted: false },
    });

    if (existingWord) {
      throw new BadRequestException('Word already exists');
    }

    const dictionary = new Dictionary();
    dictionary.word = word;
    dictionary.meaning = meaning;

    dictionary.save();

    res.status(201).json({
      message: 'Words and meaning saved successfully',
    });
  });

  editExistingWord = asyncWrapper(async (req: Request, res: Response) => {
    const { word, changeWord, meaning } = req.body;

    const existingWord = await Dictionary.findOne({
      where: { word, isDeleted: false },
    });

    if (!existingWord) {
      throw new BadRequestException('Word does not exist');
    }

    existingWord.meaning = meaning;
    existingWord.word = changeWord;

    existingWord.save();

    res.status(200).json({
      message: 'word updated successfully',
    });
  });

  deleteExistingWord = asyncWrapper(async (req: Request, res: Response) => {
    const { word } = req.body;

    const existingWord = await Dictionary.findOne({
      where: { word, isDeleted: false },
    });

    if (!existingWord) {
      throw new BadRequestException('Word does not exist');
    }

    existingWord.isDeleted = true;
    existingWord.save();

    res.status(200).json({ message: 'Deleted successfully!' });
  });

  searchForWords = asyncWrapper(async (req: Request, res: Response) => {});
}
