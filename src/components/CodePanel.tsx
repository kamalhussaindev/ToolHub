import { useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import './code-panel.css';

export interface CodePanelProps {
  inputLabel: string;
  outputLabel: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  outputValue: string;
  error?: string;
  onClear: () => void;
  onLoadExample: () => void;
  children?: ComponentChildren;
}

export default function CodePanel({
  inputLabel,
  outputLabel,
  inputValue,
  onInputChange,
  outputValue,
  error,
  onClear,
  onLoadExample,
  children,
}: CodePanelProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(outputValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable; silently ignore.
    }
  }

  return (
    <div class="code-panel-card">
      {children && <div class="code-panel__options">{children}</div>}

      <div class="code-panel__grid">
        <div class="code-panel__pane">
          <div class="code-panel__pane-header">
            <label for="code-panel-input">{inputLabel}</label>
          </div>
          <textarea
            id="code-panel-input"
            spellcheck={false}
            value={inputValue}
            onInput={(e) => onInputChange((e.target as HTMLTextAreaElement).value)}
          />
        </div>
        <div class="code-panel__pane">
          <div class="code-panel__pane-header">
            <span id="code-panel-output-label">{outputLabel}</span>
            <button type="button" class="btn btn-secondary code-panel__copy-btn" onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy output'}
            </button>
          </div>
          <textarea
            id="code-panel-output"
            aria-labelledby="code-panel-output-label"
            readOnly
            spellcheck={false}
            value={outputValue}
          />
        </div>
      </div>

      <p class="code-panel__error" role="alert" aria-live="polite">
        {error ?? ''}
      </p>

      <div class="code-panel__toolbar">
        <button type="button" class="btn btn-secondary" onClick={onLoadExample}>
          Load example
        </button>
        <button type="button" class="btn btn-secondary" onClick={onClear}>
          Clear
        </button>
      </div>

      <p class="code-panel__trust">🔒 Your data never leaves your browser — all conversion happens locally.</p>
    </div>
  );
}
