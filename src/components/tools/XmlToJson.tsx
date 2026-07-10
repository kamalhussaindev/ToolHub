import { useEffect, useState } from 'preact/hooks';
import { XMLParser, XMLValidator } from 'fast-xml-parser';
import CodePanel from '../CodePanel';

const EXAMPLE = `<note importance="high">
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
  <tags>
    <tag>personal</tag>
    <tag>urgent</tag>
  </tags>
</note>`;

export default function XmlToJson() {
  const [input, setInput] = useState(EXAMPLE);
  const [ignoreAttributes, setIgnoreAttributes] = useState(false);
  const [parseValues, setParseValues] = useState(true);
  const [pretty, setPretty] = useState(true);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    const validation = XMLValidator.validate(input);
    if (validation !== true) {
      setError(`${validation.err.msg} (line ${validation.err.line})`);
      setOutput('');
      return;
    }

    try {
      const parser = new XMLParser({
        ignoreAttributes,
        attributeNamePrefix: '@_',
        textNodeName: '#text',
        parseTagValue: parseValues,
        parseAttributeValue: parseValues,
        trimValues: true,
      });
      const result = parser.parse(input);
      setOutput(pretty ? JSON.stringify(result, null, 2) : JSON.stringify(result));
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not parse this XML.');
      setOutput('');
    }
  }, [input, ignoreAttributes, parseValues, pretty]);

  return (
    <CodePanel
      inputLabel="XML input"
      outputLabel="JSON output"
      inputValue={input}
      onInputChange={setInput}
      outputValue={output}
      error={error}
      onClear={() => setInput('')}
      onLoadExample={() => setInput(EXAMPLE)}
    >
      <label>
        <input
          type="checkbox"
          checked={ignoreAttributes}
          onChange={(e) => setIgnoreAttributes((e.target as HTMLInputElement).checked)}
        />
        Ignore attributes
      </label>
      <label>
        <input
          type="checkbox"
          checked={parseValues}
          onChange={(e) => setParseValues((e.target as HTMLInputElement).checked)}
        />
        Parse numbers/booleans
      </label>
      <label>
        <input type="checkbox" checked={pretty} onChange={(e) => setPretty((e.target as HTMLInputElement).checked)} />
        Pretty-print
      </label>
    </CodePanel>
  );
}
