/**
 * Collection ID: anonymousadvice
 * Interface for AnonymousAdvice
 */
export interface AnonymousAdvice {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType number */
  upvotes?: number;
  /** @wixFieldType boolean */
  isAnswered?: boolean;
}
