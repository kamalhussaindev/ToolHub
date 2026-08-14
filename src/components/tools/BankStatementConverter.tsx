import { useRef, useState } from 'preact/hooks';
import './bank-statement-converter.css';
import {
  MAX_FILE_BYTES,
  itemsToLines,
  linesToTransactions,
  transactionsToCsv,
  SAMPLE_TRANSACTIONS,
  type Transaction,
} from '../../lib/bankStatement';

type Status = { kind: 'idle' | 'busy' | 'error' | 'ok'; message: string };

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function emptyRow(): Transaction {
  return { date: '', description: '', debit: '', credit: '', balance: '' };
}

export default function BankStatementConverter() {
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [status, setStatus] = useState<Status>({ kind: 'idle', message: '' });
  const [rows, setRows] = useState<Transaction[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function processFile(file: File) {
    setStatus({ kind: 'busy', message: 'Reading PDF…' });
    setRows([]);
    setFileName(file.name);
    setFileSize(file.size);

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setStatus({ kind: 'error', message: 'That file doesn\'t look like a PDF. Please choose a .pdf bank statement.' });
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setStatus({ kind: 'error', message: `This file is ${formatBytes(file.size)} — the limit is ${formatBytes(MAX_FILE_BYTES)}. Try a shorter statement (fewer months/pages) or split it first.` });
      return;
    }

    try {
      const pdfjsLib = await import('pdfjs-dist');
      const workerUrl = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default;
      pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

      const buffer = await file.arrayBuffer();
      let doc;
      try {
        doc = await pdfjsLib.getDocument({ data: buffer }).promise;
      } catch (e: any) {
        if (e?.name === 'PasswordException') {
          setStatus({
            kind: 'error',
            message: 'This PDF is password-protected. Remove the password first (most banks let you do this from their download screen, or use a PDF tool you trust), then upload it again — encrypted files can\'t be read here.',
          });
          return;
        }
        throw e;
      }

      try {
        const allLines: string[] = [];
        for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
          const page = await doc.getPage(pageNum);
          const content = await page.getTextContent();
          const items = content.items as { str: string; transform: number[] }[];
          allLines.push(...itemsToLines(items));
        }

        const totalText = allLines.join('').trim();
        if (!totalText) {
          setStatus({
            kind: 'error',
            message: 'No text could be found in this PDF. It\'s likely a scanned image rather than a text-based statement — this tool reads text-based PDFs only and doesn\'t support OCR yet.',
          });
          return;
        }

        const transactions = linesToTransactions(allLines);
        if (transactions.length === 0) {
          setStatus({
            kind: 'error',
            message: `Found text on ${doc.numPages} page${doc.numPages === 1 ? '' : 's'}, but couldn't identify any transaction rows automatically. Your bank's layout may not match the common patterns this tool looks for — you can still add rows manually below.`,
          });
          setRows([emptyRow()]);
          return;
        }

        setRows(transactions);
        setStatus({
          kind: 'ok',
          message: `Found ${transactions.length} possible transaction${transactions.length === 1 ? '' : 's'} across ${doc.numPages} page${doc.numPages === 1 ? '' : 's'}. Review every row below — extraction is best-effort, not guaranteed accurate.`,
        });
      } finally {
        // pdf.js keeps worker-side memory allocated for a document until
        // it's explicitly destroyed — release it as soon as we're done
        // reading it rather than waiting on garbage collection, so
        // uploading several statements in one session doesn't accumulate
        // worker memory.
        doc.destroy();
      }
    } catch (e) {
      setStatus({
        kind: 'error',
        message: 'Couldn\'t read this PDF. It may be corrupted or in a format this tool doesn\'t support — try re-downloading the statement from your bank and uploading it again.',
      });
    }
  }

  function onInputChange(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) processFile(file);
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) processFile(file);
  }

  function updateRow(index: number, field: keyof Transaction, value: string) {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  }

  function deleteRow(index: number) {
    setRows((prev) => prev.filter((_, i) => i !== index));
  }

  function addRow() {
    setRows((prev) => [...prev, emptyRow()]);
  }

  function loadSample() {
    setFileName('sample-statement.pdf (demo data)');
    setFileSize(0);
    setRows(SAMPLE_TRANSACTIONS);
    setStatus({ kind: 'ok', message: 'Showing sample data so you can see the output format — no file was uploaded.' });
  }

  function reset() {
    setFileName('');
    setFileSize(0);
    setRows([]);
    setStatus({ kind: 'idle', message: '' });
    if (inputRef.current) inputRef.current.value = '';
  }

  function downloadCsv() {
    const csv = transactionsToCsv(rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bank-statement.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div class="bsc">
      <label
        class={`bsc-upload-zone${isDragOver ? ' is-dragover' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={onDrop}
      >
        <input ref={inputRef} type="file" accept="application/pdf,.pdf" onChange={onInputChange} aria-label="Upload bank statement PDF" />
        <span class="bsc-upload-ico" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M12 16V4M7 9l5-5 5 5" />
            <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
          </svg>
        </span>
        <p><strong>Click to upload</strong> or drag and drop a PDF bank statement</p>
        <small>Text-based PDF only, up to {formatBytes(MAX_FILE_BYTES)} · nothing is uploaded — it stays on your device</small>
      </label>

      {fileName && (
        <div class="bsc-file-row">
          <span>📄 <b>{fileName}</b>{fileSize > 0 && ` — ${formatBytes(fileSize)}`}</span>
          <button type="button" onClick={reset}>Remove</button>
        </div>
      )}

      <div aria-live="polite">
        {status.message && (
          <p class={`bsc-status bsc-status--${status.kind === 'ok' ? 'ok' : status.kind === 'error' ? 'error' : status.kind === 'busy' ? 'busy' : ''}`}>
            {status.message}
          </p>
        )}
      </div>

      {rows.length === 0 && status.kind !== 'busy' && (
        <div class="bsc-empty">
          No transactions yet. Upload a PDF above, or{' '}
          <button type="button" class="bsc-btn" style="display:inline;padding:4px 10px" onClick={loadSample}>
            load sample data
          </button>{' '}
          to preview the table format.
        </div>
      )}

      {rows.length > 0 && (
        <>
          <div class="bsc-table-wrap">
            <table class="bsc-table">
              <caption>Extracted transactions — every field is editable. Fix anything that looks wrong before exporting.</caption>
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Description</th>
                  <th scope="col">Debit</th>
                  <th scope="col">Credit</th>
                  <th scope="col">Balance</th>
                  <th scope="col"><span class="visually-hidden">Remove row</span></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i}>
                    <td><input value={row.date} onInput={(e) => updateRow(i, 'date', (e.target as HTMLInputElement).value)} aria-label={`Row ${i + 1} date`} /></td>
                    <td><input value={row.description} onInput={(e) => updateRow(i, 'description', (e.target as HTMLInputElement).value)} aria-label={`Row ${i + 1} description`} /></td>
                    <td><input value={row.debit} onInput={(e) => updateRow(i, 'debit', (e.target as HTMLInputElement).value)} aria-label={`Row ${i + 1} debit`} inputMode="decimal" /></td>
                    <td><input value={row.credit} onInput={(e) => updateRow(i, 'credit', (e.target as HTMLInputElement).value)} aria-label={`Row ${i + 1} credit`} inputMode="decimal" /></td>
                    <td><input value={row.balance} onInput={(e) => updateRow(i, 'balance', (e.target as HTMLInputElement).value)} aria-label={`Row ${i + 1} balance`} inputMode="decimal" /></td>
                    <td>
                      <button type="button" class="bsc-row-delete" onClick={() => deleteRow(i)} aria-label={`Delete row ${i + 1}`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div class="bsc-toolbar">
            <button type="button" class="bsc-btn" onClick={addRow}>+ Add row</button>
            <span class="bsc-spacer" />
            <button type="button" class="bsc-btn bsc-btn--primary" onClick={downloadCsv}>Download CSV</button>
          </div>
        </>
      )}
    </div>
  );
}
