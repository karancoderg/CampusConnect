/**
 * Collection ID: creativefeedposts
 * Interface for CreativeFeedPosts
 */
export interface CreativeFeedPosts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  postType?: string;
  /** @wixFieldType text */
  authorUsername?: string;
  /** @wixFieldType text */
  communityName?: string;
  /** @wixFieldType text */
  mood?: string;
  /** @wixFieldType text */
  textContent?: string;
  /** @wixFieldType image */
  imageUrl?: string;
  /** @wixFieldType number */
  reactionCount?: number;
}
