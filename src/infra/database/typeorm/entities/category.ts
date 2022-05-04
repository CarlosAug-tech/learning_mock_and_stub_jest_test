import crypto from 'crypto';
import { ICategory } from '@domain/entities/category';

class Category implements ICategory {
  id: string;

  name: string;

  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = crypto.randomUUID();
    }
  }
}

export { Category };
