import { useEffect, useState } from 'preact/hooks';
import * as yaml from 'js-yaml';
import CodePanel from '../CodePanel';

const EXAMPLE = `title: Reminder
importance: high
tags:
  - personal
  - urgent
due: 2026-08-01
sent: false
---
title: Second document
note: YAML supports multiple documents separated by "---"
`;

function sortKeysReplacer(_key: string, value: unknown): unknown {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((sorted, k) => {
        sorted[k] = (value as Record<string, unknown>)[k];
        return sorted;
      }, {});
  }
  return value;
}

export default function YamlToJson() {
  const [input, setInput] = useState(EXAMPLE);
  const [pretty, setPretty] = useState(true);
  const [sortKeys, setSortKeys] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }
    try {
      const documents = yaml.loadAll(input);
      const result = documents.length > 1 ? documents : documents[0];
      const replacer = sortKeys ? sortKeysReplacer : undefined;
      setOutput(pretty ? JSON.stringify(result, replacer, 2) : JSON.stringify(result, replacer));
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not parse this YAML.');
      setOutput('');
    }
  }, [input, pretty, sortKeys]);

  return (
    <CodePanel
      inputLabel="YAML input"
      outputLabel="JSON output"
      inputValue={input}
      onInputChange={setInput}
      outputValue={output}
      error={error}
      onClear={() => setInput('')}
      onLoadExample={() => setInput(EXAMPLE)}
    >
      <label>
        <input type="checkbox" checked={pretty} onChange={(e) => setPretty((e.target as HTMLInputElement).checked)} />
        Pretty-print
      </label>
      <label>
        <input
          type="checkbox"
          checked={sortKeys}
          onChange={(e) => setSortKeys((e.target as HTMLInputElement).checked)}
        />
        Sort keys
      </label>
    </CodePanel>
  );
}
