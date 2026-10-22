"""Export the approved Book images; preserve originals and record hashes/copy."""
from pathlib import Path
import csv
import hashlib
import json
import subprocess
from urllib.parse import urlencode

ROOT = Path(__file__).resolve().parents[3]
MEDIA = ROOT / 'docs/promotion/2026-10-21'
PROFILE = '/System/Library/ColorSync/Profiles/sRGB Profile.icc'
COPY = {
    'en': {
        'title': 'Put Codex to work: practical workflows and example projects',
        'description': 'Learn project rules, engineering workflows and product delivery with Codex Blue Book. Read 13 chapters in English or Chinese, explore example projects and download both PDF editions. An independent guide, not an official OpenAI publication.',
        'alt': 'Codex Blue Book: Put Codex to work. A blue book, open notebook and connected glass coding workflow cards.',
        'destination': 'https://book.pmer.cn/en/'
    },
    'zh': {
        'title': '让 Codex 真正干活：项目规约、工作流与工程示例',
        'description': '用 Codex 蓝皮书学习项目规约、工程工作流与产品交付。阅读 13 章中英文指南，使用规约生成器、查看工程示例，并下载双语 PDF。独立维护，并非 OpenAI 官方出版物。',
        'alt': 'Codex 蓝皮书：让 Codex 真正干活。蓝色书籍、笔记本与相连的编程工作流卡片。',
        'destination': 'https://book.pmer.cn/'
    }
}


def metadata(path):
    raw = subprocess.check_output(['sips', '-g', 'pixelWidth', '-g', 'pixelHeight', '-g', 'profile', str(path)], text=True)
    info = dict(line.strip().split(': ', 1) for line in raw.splitlines()[1:] if ': ' in line)
    return dict(width=int(info['pixelWidth']), height=int(info['pixelHeight']),
                profile=info.get('profile'), bytes=path.stat().st_size,
                sha256=hashlib.sha256(path.read_bytes()).hexdigest())


def main():
    for kind, size in [('og', (1200, 630)), ('pinterest', (1000, 1500))]:
        rows = []
        for language, copy in COPY.items():
            original = MEDIA / 'originals' / f'{kind}-{language}.png'
            target = (ROOT / 'public/social' / f'brand-{language}-20261021.jpg' if kind == 'og'
                      else MEDIA / 'pinterest' / f'book-{language}-1000x1500.jpg')
            source_info = metadata(original)
            if abs(source_info['width'] / source_info['height'] - size[0] / size[1]) > 0.01:
                raise ValueError('Unexpected source aspect ratio: ' + str(original))
            target.parent.mkdir(parents=True, exist_ok=True)
            subprocess.run(['sips', '--resampleHeightWidth', str(size[1]), str(size[0]),
                            '--setProperty', 'format', 'jpeg', '--setProperty', 'formatOptions', '88',
                            '--matchTo', PROFILE, str(original), '--out', str(target)], check=True, stdout=subprocess.DEVNULL)
            info = metadata(target)
            assert (info['width'], info['height']) == size and info['bytes'] < 500_000
            row = dict(site='book', locale=language, original=str(original.relative_to(ROOT)),
                       **copy, **info, originalMetadata=source_info,
                       publicationStatus='prepared_not_published', checked_at='2026-10-21')
            if kind == 'og':
                row.update(runtime=str(target.relative_to(ROOT)), public_url='https://book.pmer.cn/social/' + target.name,
                           deployment_status='local_candidate_not_deployed')
            else:
                row.update(image=str(target.relative_to(ROOT)), board='')
                row['destination'] += '?' + urlencode(dict(utm_source='pinterest', utm_medium='organic_social',
                                                          utm_campaign='book_brand_20261021', utm_content='book_' + language))
            rows.append(row)
        (MEDIA / f'{kind}-manifest.json').write_text(json.dumps(rows, ensure_ascii=False, indent=2) + '\n')
        if kind == 'pinterest':
            with (MEDIA / 'pinterest-copy.csv').open('w', encoding='utf-8-sig', newline='') as file:
                writer = csv.DictWriter(file, fieldnames=['site', 'locale', 'image', 'title', 'description', 'alt', 'destination', 'board', 'publicationStatus'], extrasaction='ignore', lineterminator='\n')
                writer.writeheader()
                writer.writerows(rows)
        print(kind, [(r['locale'], r['width'], r['height'], r['bytes']) for r in rows])


if __name__ == '__main__':
    main()
