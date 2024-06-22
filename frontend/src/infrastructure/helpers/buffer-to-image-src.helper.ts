import { Buffer } from "buffer";

export const bufferToImageSrc = (buffer: number[]) => {
  const base64String = Buffer.from(buffer).toString("base64");
  return `data:image/png;base64,${base64String}`;
};
