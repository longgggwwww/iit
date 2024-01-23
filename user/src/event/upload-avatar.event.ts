export type UploadAvatarDto = {
  userId: number;
  imageUrl: string;
};

export class UploadAvatarEvent {
  private readonly userId: number;
  private readonly imageUrl: string;

  constructor({ userId, imageUrl }: UploadAvatarDto) {
    this.userId = userId;
    this.imageUrl = imageUrl;
  }
}
