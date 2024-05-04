import { Router } from 'express';
import {
  deleteWord_validation,
  editExistingWord_validation,
  searchWord_validation,
  uploadNewWord_validation,
} from '../utilis/validation/dictionary/dictionary.validation';

import { DictionaryController } from '../controller/dictionary.controller';
import handleRestriction from '../middleware/role/user.role';

const router = Router();
const dictionaryController = new DictionaryController();

router.post(
  '/upload-new-word',
  handleRestriction.handleAdminRestriction,
  uploadNewWord_validation(),
  dictionaryController.uploadNewWord
);

router.post(
  '/edit-existing-word',
  handleRestriction.handleAdminRestriction,
  editExistingWord_validation(),
  dictionaryController.editExistingWord
);

router.post(
  '/delete-existing-word',
  handleRestriction.handleAdminRestriction,
  deleteWord_validation(),
  dictionaryController.deleteExistingWord
);

router.post(
  '/search-word',
  searchWord_validation(),
  dictionaryController.searchForWords
);

router.get('/all-existing-words', dictionaryController.getAllExistingWords);

export default router;
