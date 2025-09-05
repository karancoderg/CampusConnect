/**
 * Collection ID: studentprofiles
 * Interface for StudentProfiles
 */
export interface StudentProfiles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  username?: string;
  /** @wixFieldType image */
  profilePicture?: string;
  /** @wixFieldType text */
  bio?: string;
  /** @wixFieldType text */
  major?: string;
  /** @wixFieldType number */
  graduationYear?: number;
  /** @wixFieldType text */
  interests?: string;
}
