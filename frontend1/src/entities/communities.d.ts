/**
 * Collection ID: communities
 * Interface for Communities
 */
export interface Communities {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  slug?: string;
  /** @wixFieldType number */
  memberCount?: number;
  /** @wixFieldType boolean */
  isTrending?: boolean;
  /** @wixFieldType image */
  communityImage?: string;
  /** @wixFieldType date */
  creationDate?: Date | string;
}
