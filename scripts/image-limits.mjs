/**
 * content/ の画像ルールの閾値。ここが唯一の定義場所で、
 * optimize-images(自動修正)と generate-content(検証)の両方が参照する。
 * docs/content-guide.md の記述もこの値に合わせる。
 */

/** 長辺の上限(px)。超えていたら optimize-images が縮小する */
export const MAX_LONG_EDGE = 2000;

/** 1枚あたりのサイズ上限。超えていたら警告し、optimize-images が圧縮する */
export const MAX_IMAGE_BYTES = 500 * 1024;

/** カメラ元データとみなすサイズ。超えていたら生成をエラーで止める(履歴を守る最後の防波堤) */
export const ORIGINAL_IMAGE_BYTES = 5 * 1024 * 1024;

/** content/ 内で画像として扱う拡張子。サイトの画像は JPEG のみ */
export const JPEG_EXTENSIONS = [".jpg", ".jpeg"];

/** JPEG 以外でも画像が紛れ込んだら気づけるように見張る拡張子 */
export const OTHER_IMAGE_EXTENSIONS = [
  ".png",
  ".webp",
  ".gif",
  ".avif",
  ".heic",
];
