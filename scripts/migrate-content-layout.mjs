/**
 * content/ を Keystatic 互換レイアウトへ一括変換する使い捨てスクリプト。
 * 変換が終わったら削除してよい(経緯はコミット履歴に残る)。
 *
 *   - portfolio/<slug>/work.yaml       → index.yaml(thumbnail の明示参照を追加)
 *   - <service>/<slug>/commission.yaml → index.yaml(meta をマップから配列へ)
 *   - <section>/order.txt              → order.yaml(items: slug の配列)
 *   - section.yaml は変更しない
 */
import { readdir, readFile, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { parse, stringify } from "yaml";

const root = process.cwd();
const contentDir = join(root, "content");

const listWorkDirs = async (sectionDir) =>
  (await readdir(sectionDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(sectionDir, entry.name));

const migrateOrder = async (sectionDir) => {
  const items = (await readFile(join(sectionDir, "order.txt"), "utf8"))
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"));
  await writeFile(
    join(sectionDir, "order.yaml"),
    `# 表示順(上ほど先に表示)。フォルダ名を並べる。\n${stringify({ items })}`,
  );
  await unlink(join(sectionDir, "order.txt"));
};

const migratePortfolio = async () => {
  const sectionDir = join(contentDir, "portfolio");
  for (const workDir of await listWorkDirs(sectionDir)) {
    const data = parse(await readFile(join(workDir, "work.yaml"), "utf8"));
    const { title, category, client, year, thumbnailAlt, images } = data;
    const next = {
      title,
      category,
      client,
      year,
      thumbnail: "thumbnail.jpg",
      thumbnailAlt,
      ...(images === undefined ? {} : { images }),
    };
    await writeFile(join(workDir, "index.yaml"), stringify(next));
    await unlink(join(workDir, "work.yaml"));
  }
  await migrateOrder(sectionDir);
};

const migrateCommissions = async (service) => {
  const sectionDir = join(contentDir, service);
  for (const workDir of await listWorkDirs(sectionDir)) {
    const data = parse(
      await readFile(join(workDir, "commission.yaml"), "utf8"),
    );
    const meta = Object.entries(data.meta ?? {}).map(([label, value]) => ({
      label,
      value: typeof value === "number" ? String(value) : value,
    }));
    await writeFile(join(workDir, "index.yaml"), stringify({ ...data, meta }));
    await unlink(join(workDir, "commission.yaml"));
  }
  await migrateOrder(sectionDir);
};

await migratePortfolio();
await migrateCommissions("corporate");
await migrateCommissions("wedding");
console.log("✓ content/ を新レイアウトへ移行しました");
