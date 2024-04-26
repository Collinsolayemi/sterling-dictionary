import { Router } from 'express';
import { uploadNewWord_validation } from '../utilis/validation/dictionary/dictionary.validation';

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
  handleRestriction.handleAdminRestriction,
  dictionaryController.editExistingWord
);

router.post(
  '/delete-existing-word',
  handleRestriction.handleAdminRestriction,
  handleRestriction.handleAdminRestriction,
  dictionaryController.deleteExistingWord
);

router.post(
  '/search-word',
  handleRestriction.handleUserRestriction,
  dictionaryController.searchForWords
);

export default router;
