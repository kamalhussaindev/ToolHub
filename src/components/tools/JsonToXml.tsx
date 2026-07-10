import { useEffect, useState } from 'preact/hooks';
import { XMLBuilder } from 'fast-xml-parser';
import CodePanel from '../CodePanel';

const EXAMPLE = `{
  "note": {
    "@_importance": "high",
    "to": "Tove",
    "from": "Jani",
    "heading": "Reminder",
    "body": "Don't forget me this weekend!",
    "tags": {
      "tag": ["personal", "urgent"]
    }
  }
}`;

export default function JsonToXml() {
  const [input, setInput] = useState(EXAMPLE);
  const [rootName, setRootName] = useState('root');
  const [pretty, setPretty] = useState(true);
  const [attrPrefix, setAttrPrefix] = useState('@_');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      // If the top level is a plain object, its keys become root tags directly —
      // this is what makes round-tripping with the XML to JSON converter exact.
      // Arrays or primitives can't stand alone as XML, so those get wrapped in
      // the root element name below.
      const isPlainObject = parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed);
      const toBuild = isPlainObject ? parsed : { [rootName || 'root']: parsed };

      const builder = new XMLBuilder({
        attributeNamePrefix: attrPrefix || '@_',
        textNodeName: '#text',
        ignoreAttributes: false,
        format: pretty,
        indentBy: '  ',
      });
      setOutput(builder.build(toBuild));
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not parse this JSON.');
      setOutput('');
    }
  }, [input, rootName, pretty, attrPrefix]);

  return (
    <CodePanel
      inputLabel="JSON input"
      outputLabel="XML output"
      inputValue={input}
      onInputChange={setInput}
      outputValue={output}
      error={error}
      onClear={() => setInput('')}
      onLoadExample={() => setInput(EXAMPLE)}
    >
      <label>
        Root element name (used only for arrays/values)
        <input type="text" value={rootName} onInput={(e) => setRootName((e.target as HTMLInputElement).value)} />
      </label>
      <label>
        Attribute prefix
        <input type="text" value={attrPrefix} onInput={(e) => setAttrPrefix((e.target as HTMLInputElement).value)} />
      </label>
      <label>
        <input type="checkbox" checked={pretty} onChange={(e) => setPretty((e.target as HTMLInputElement).checked)} />
        Pretty-print
      </label>
    </CodePanel>
  );
}
