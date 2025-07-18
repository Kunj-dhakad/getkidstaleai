// src/types/video-thumbnail-generator.d.ts
declare module 'video-thumbnail-generator' {
  export interface ThumbnailGeneratorOptions {
    sourcePath: string;
    thumbnailPath: string;
    tmpDir?: string;
  }

  export interface ThumbnailGenerator {
    generate(): Promise<string[]>;
    generateOneByPercent(percent: number): Promise<string>;
    generateCb(callback: (err: Error | null, result: string[]) => void): void;
    generateOneByPercentCb(
      percent: number,
      callback: (err: Error | null, result: string) => void
    ): void;
    generateGif(options?: { fps?: number; scale?: number; speedMultiple?: number; deletePalette?: boolean }): Promise<string>;
    generateGifCb(options?: { fps?: number; scale?: number; speedMultiple?: number; deletePalette?: boolean }, callback?: (err: Error | null, result: string) => void): void;
  }

  const ThumbnailGenerator: new (options: ThumbnailGeneratorOptions) => ThumbnailGenerator;

  export default ThumbnailGenerator;
}
