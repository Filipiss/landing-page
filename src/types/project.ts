export interface ScreenshotItem {
  id: string;
  tag: string;
  title: string;
  route: string;
  caption: string;
  src: string;
}

export interface ProjectMetadata {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}
