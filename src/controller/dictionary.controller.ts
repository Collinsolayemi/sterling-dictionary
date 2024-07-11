import { Request, Response } from 'express';
import { asyncWrapper } from '../utilis/errors/async.wrapper';
import { Dictionary } from '../entity/dictionary.entity';
import { BadRequestException } from '../utilis/errors/error.utilis';
import EmailSender, { EmailOptions } from '../utilis/email/email';
import { In } from 'typeorm';
import { AppDataSource } from '../datasource/datasource';

export class DictionaryController {
  uploadNewWord = asyncWrapper(async (req: Request, res: Response) => {
    const { word, meaning, link } = req.body;

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
    const { id, word, meaning } = req.body;

    const existingWord = await Dictionary.findOne({
      where: { id, isDeleted: false },
    });

    if (!existingWord) {
      throw new BadRequestException('Word does not exist');
    }

    existingWord.meaning = meaning;
    existingWord.word = word;

    existingWord.save();

    res.status(200).json({
      message: 'word updated successfully',
    });
  });

  deleteExistingWord = asyncWrapper(async (req: Request, res: Response) => {
    const { id } = req.body;

    const existingWord = await Dictionary.findOne({
      where: { id, isDeleted: false },
    });

    if (!existingWord) {
      throw new BadRequestException('Word does not exist');
    }

    existingWord.isDeleted = true;
    existingWord.save();

    res.status(200).json({ message: 'Deleted successfully!' });
  });

  searchForWords = asyncWrapper(async (req: Request, res: Response) => {
    const { word } = req.body;

    const existingWord = await Dictionary.findOne({
      where: { word, isDeleted: false },
    });

    if (!existingWord) {
      throw new BadRequestException('Word does not exist');
    }

    res.status(200).json({ existingWord });
  });

  getAllExistingWords = asyncWrapper(async (req: Request, res: Response) => {
    const words = await Dictionary.find({ where: { isDeleted: false } });

    res.status(200).json({ words });
  });

  sendWordToEmail = asyncWrapper(async (req: Request, res: Response) => {
    const { word } = req.body;

    const email = '';

    const emailSender = new EmailSender();

    const emailOptions: EmailOptions = {
      email,
      subject: 'Unavailable Word',
      message: `A user searched for  "${word}". And it is not available.`,
    };

    emailSender.sendEmail(emailOptions);

    res.status(200).json({});
  });

  addManyWordsAndMeaning = asyncWrapper(async (req: Request, res: Response) => {
    const wordsAndMeanings = req.body;

    // Validate the request body
    if (!Array.isArray(wordsAndMeanings)) {
      return res.status(400).json({
        message:
          'Invalid input format. Expected an array of word-meaning pairs.',
      });
    }

    for (const entry of wordsAndMeanings) {
      if (typeof entry.word !== 'string' || typeof entry.meaning !== 'string') {
        return res.status(400).json({
          message:
            'Invalid input format. Each entry must have a "word" and a "meaning" as strings.',
        });
      }
    }

    const dictionaryRepository = AppDataSource.getRepository(Dictionary);

    const words = wordsAndMeanings.map((entry) => entry.word);

    // Fetch existing words from the database
    const existingEntries = await dictionaryRepository.find({
      where: { word: In(words) },
    });

    const existingWords = existingEntries.map((entry) => entry.word);

    // Filter out words that already exist
    const newWordsAndMeanings = wordsAndMeanings.filter(
      (entry) => !existingWords.includes(entry.word)
    );

    if (newWordsAndMeanings.length === 0) {
      return res.status(200).json({
        message: 'No new words to add. All provided words already exist.',
      });
    }

    const entities = newWordsAndMeanings.map(({ word, meaning }) => {
      const dictionaryEntry = new Dictionary();
      dictionaryEntry.word = word;
      dictionaryEntry.meaning = meaning;
      return dictionaryEntry;
    });

    await dictionaryRepository.save(entities);

    res.status(200).json({ message: 'Words and meanings added successfully' });
  });
}
