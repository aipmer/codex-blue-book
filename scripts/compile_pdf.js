const { mdToPdf } = require('md-to-pdf');
const path = require('path');
const fs = require('fs');

const BOOKS = {
  codex: {
    zhMd: 'codex_blue_book_zh.md',
    enMd: 'codex_blue_book_en.md',
    zhPdf: 'codex_blue_book_zh.pdf',
    enPdf: 'codex_blue_book_en.pdf'
  },
  claude: {
    zhMd: 'claude_blue_book_zh.md',
    enMd: 'claude_blue_book_en.md',
    zhPdf: 'claude_blue_book_zh.pdf',
    enPdf: 'claude_blue_book_en.pdf'
  },
  gemini: {
    zhMd: 'gemini_blue_book_zh.md',
    enMd: 'gemini_blue_book_en.md',
    zhPdf: 'gemini_blue_book_zh.pdf',
    enPdf: 'gemini_blue_book_en.pdf'
  },
  kimi: {
    zhMd: 'kimi_blue_book_zh.md',
    enMd: 'kimi_blue_book_en.md',
    zhPdf: 'kimi_blue_book_zh.pdf',
    enPdf: 'kimi_blue_book_en.pdf'
  }
};

function detectChromeExecutable() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH && fs.existsSync(process.env.PUPPETEER_EXECUTABLE_PATH)) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }
  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium'
  ];
  return candidates.find((p) => fs.existsSync(p));
}

async function renderPdf(inputPath, rootOutPath, downloadOutPath) {
  const executablePath = detectChromeExecutable();
  const launchOptions = {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  };
  if (executablePath) {
    launchOptions.executablePath = executablePath;
  }
  const pdf = await mdToPdf(
    { path: inputPath },
    {
      launch_options: launchOptions,
      pdf_options: {
        format: 'A4',
        margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
        printBackground: true
      }
    }
  );
  fs.writeFileSync(rootOutPath, pdf.content);
  fs.mkdirSync(path.dirname(downloadOutPath), { recursive: true });
  fs.writeFileSync(downloadOutPath, pdf.content);
}

async function compile() {
  const scriptDir = __dirname;
  const workspace = path.dirname(scriptDir);
  const downloadsDir = path.join(workspace, 'public', 'downloads');

  const argIdx = process.argv.indexOf('--book');
  const requested = argIdx !== -1 ? process.argv[argIdx + 1] : 'all';
  const keys = requested === 'all' ? Object.keys(BOOKS) : [requested];

  for (const key of keys) {
    const spec = BOOKS[key];
    if (!spec) {
      throw new Error(`Unknown book target: ${key}`);
    }
    console.log(`Converting [${key}] Chinese Book to PDF...`);
    await renderPdf(
      path.join(workspace, spec.zhMd),
      path.join(workspace, spec.zhPdf),
      path.join(downloadsDir, spec.zhPdf)
    );
    console.log(`Created & synced ${spec.zhPdf}`);

    console.log(`Converting [${key}] English Book to PDF...`);
    await renderPdf(
      path.join(workspace, spec.enMd),
      path.join(workspace, spec.enPdf),
      path.join(downloadsDir, spec.enPdf)
    );
    console.log(`Created & synced ${spec.enPdf}`);
  }
}

compile().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
