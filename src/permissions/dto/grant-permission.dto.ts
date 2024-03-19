export class GrantPermissionDto {
  userId: number;
  ownerId: number;
  spaceId?: number;
  deckId?: number;
  cardId?: number;
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
  canCreate: boolean;
}
