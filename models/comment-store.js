'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const commentStore = {

  store: new JsonStore('./models/comment-store.json', { comments: [] }),
  collection: 'comments',

  getAllComments() {
    return this.store.findAll(this.collection);
  },

  getCommentById(id) {
    return this.store.findOneBy(this.collection, (comment => comment.id === id));
  },
  
  async addComment(comment) {
    this.store.addCollection(this.collection, comment);
  }
};

export default commentStore;
