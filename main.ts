import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Accepts the three YouTube video address shapes:
//   https://www.youtube.com/shorts/<id>
//   https://www.youtube.com/watch?v=<id> (extra query params allowed)
//   https://youtu.be/<id>
const YOUTUBE_URL_PATTERN =
  /^https:\/\/(?:www\.)?youtube\.com\/shorts\/[\w-]+\/?$|^https:\/\/(?:www\.)?youtube\.com\/watch\?v=[\w-]+(?:&.*)?$|^https:\/\/youtu\.be\/[\w-]+(?:\?.*)?$/;

function readVideoUrl(path: string): string {
  let raw: string;
  try {
    raw = readFileSync(path, "utf8");
  } catch (err) {
    throw new Error(`cannot read VIDEO.json at ${path}: ${err instanceof Error ? err.message : String(err)}`);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    throw new Error(`VIDEO.json at ${path} is not valid JSON: ${err instanceof Error ? err.message : String(err)}`);
  }

  const url = (parsed as { url?: unknown } | null)?.url;
  if (typeof url !== "string" || url.length === 0) {
    throw new Error(`VIDEO.json at ${path} has no url field`);
  }
  if (!YOUTUBE_URL_PATTERN.test(url)) {
    throw new Error(`VIDEO.json url is not a YouTube video address: ${url}`);
  }
  return url;
}

try {
  const source = join(botDir, "VIDEO.json");
  const dest = join(outputDir, "VIDEO.json");

  // Validate before copying: missing file, unparsable JSON, or a
  // non-YouTube url all fail here with a clear error.
  const url = readVideoUrl(source);
  console.log(`VIDEO.json url verified: ${url}`);

  mkdirSync(outputDir, { recursive: true });
  copyFileSync(source, dest);

  // Verify the copied file also parses as JSON with a url field.
  readVideoUrl(dest);
} catch (err) {
  console.error(`failed to copy VIDEO.json: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
}
