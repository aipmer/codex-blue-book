const { mdToPdf } = require('md-to-pdf');
const path = require('path');
const fs = require('fs');

async function compile() {
  // Resolve the workspace root dynamically relative to this script's directory (__dirname is /scripts)
  const scriptDir = __dirname;
  const workspace = path.dirname(scriptDir);
  const downloads = path.join(workspace, 'public', 'downloads');
  fs.mkdirSync(downloads, { recursive: true });

  function writeBoth(filename, content) {
    if (!content || content.length === 0) {
      throw new Error(`PDF compiler returned no content for ${filename}`);
    }
    fs.writeFileSync(path.join(workspace, filename), content);
    fs.writeFileSync(path.join(downloads, filename), content);
  }
  
  console.log('Converting Chinese Book to PDF...');
  const pdfZh = await mdToPdf(
    { path: path.join(workspace, 'codex_blue_book_zh.md') },
    {
      launch_options: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      },
      pdf_options: {
        format: 'A4',
        margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
        printBackground: true
      }
    }
  );
  writeBoth('codex_blue_book_zh.pdf', pdfZh.content);
  console.log('Created both copies of codex_blue_book_zh.pdf');

  console.log('Converting English Book to PDF...');
  const pdfEn = await mdToPdf(
    { path: path.join(workspace, 'codex_blue_book_en.md') },
    {
      launch_options: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      },
      pdf_options: {
        format: 'A4',
        margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
        printBackground: true
      }
    }
  );
  writeBoth('codex_blue_book_en.pdf', pdfEn.content);
  console.log('Created both copies of codex_blue_book_en.pdf');
}

compile().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
