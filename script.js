const markdownInput = document.getElementById("markdownInput");
const linkedinOutput = document.getElementById("linkedinOutput");
const copyButton = document.getElementById("copyButton");
const copyStatus = document.getElementById("copyStatus");

const boldMap = createUnicodeMap({
  upper: 0x1d400,
  lower: 0x1d41a,
  digits: 0x1d7ce,
});
const italicMap = createUnicodeMap({
  upper: 0x1d434,
  lower: 0x1d44e,
});
const boldItalicMap = createUnicodeMap({
  upper: 0x1d468,
  lower: 0x1d482,
  digits: 0x1d7ce,
});

const sample = `## Beispiel\n\n**Fett** und *kursiv* funktionieren auf LinkedIn durch Unicode-Zeichen.\n\n- Listen bleiben als Text erhalten.\n- Emojis bleiben erhalten 🚀`;
markdownInput.value = sample;
updatePreview();

markdownInput.addEventListener("input", updatePreview);
copyButton.addEventListener("click", handleCopy);

function updatePreview() {
  const formatted = convertMarkdownToLinkedIn(markdownInput.value);
  linkedinOutput.textContent = formatted;
  copyStatus.textContent = "";
  copyStatus.classList.remove("error");
}

function handleCopy() {
  const formatted = convertMarkdownToLinkedIn(markdownInput.value);
  navigator.clipboard
    .writeText(formatted)
    .then(() => {
      copyStatus.textContent = "In die Zwischenablage kopiert.";
      copyStatus.classList.remove("error");
    })
    .catch(() => {
      copyStatus.textContent = "Konnte nicht kopieren. Bitte manuell auswählen.";
      copyStatus.classList.add("error");
    });
}

function convertMarkdownToLinkedIn(text) {
  const lines = text.replace(/\r\n?/g, "\n").split("\n");
  const converted = lines.map((line) => {
    let workingLine = line.replace(/^#{1,6}\s*/, "");
    workingLine = workingLine.replace(/\*\*\*(.+?)\*\*\*/g, (_, content) => applyMap(content, boldItalicMap));
    workingLine = workingLine.replace(/\*\*(.+?)\*\*/g, (_, content) => applyMap(content, boldMap));
    workingLine = workingLine.replace(/\*(.+?)\*/g, (_, content) => applyMap(content, italicMap));
    return workingLine;
  });

  return converted.join("\n");
}

function createUnicodeMap({ upper, lower, digits }) {
  const map = new Map();

  for (let index = 0; index < 26; index += 1) {
    map.set(String.fromCharCode(65 + index), String.fromCodePoint(upper + index));
    map.set(String.fromCharCode(97 + index), String.fromCodePoint(lower + index));
  }

  if (digits !== undefined) {
    for (let index = 0; index < 10; index += 1) {
      map.set(String.fromCharCode(48 + index), String.fromCodePoint(digits + index));
    }
  }

  return map;
}

function applyMap(content, map) {
  return Array.from(content)
    .map((char) => map.get(char) ?? char)
    .join("");
}
