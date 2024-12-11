// Initialize CodeMirror Editors
const htmlEditor = CodeMirror.fromTextArea(document.getElementById("htmlEditor"), {
    mode: "htmlmixed",
    lineNumbers: true,
    theme: "dracula",
});

const cssEditor = CodeMirror.fromTextArea(document.getElementById("cssEditor"), {
    mode: "css",
    lineNumbers: true,
    theme: "dracula",
});

const jsEditor = CodeMirror.fromTextArea(document.getElementById("jsEditor"), {
    mode: "javascript",
    lineNumbers: true,
    theme: "dracula",
});

// SPA Navigation
function goToOutput() {
    const html = htmlEditor.getValue();
    const css = cssEditor.getValue();
    const js = jsEditor.getValue();

    // Combine HTML, CSS, and JS
    const combinedCode = `
        <html>
            <head>
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script>${js}</script>
            </body>
        </html>
    `;

    const outputFrame = document.getElementById("output");
    outputFrame.srcdoc = combinedCode;

    // Switch to output page
    document.getElementById("editor-page").classList.remove("active");
    document.getElementById("output-page").classList.add("active");
}

function goToEditor() {
    // Switch to editor page
    document.getElementById("editor-page").classList.add("active");
    document.getElementById("output-page").classList.remove("active");
}

// Terminal Toggle
function toggleTerminal() {
    const terminal = document.getElementById("terminal");
    terminal.classList.toggle("active");
}

// Open in Browser
function openInBrowser() {
    const html = htmlEditor.getValue();
    const css = cssEditor.getValue();
    const js = jsEditor.getValue();

    const combinedCode = `
        <html>
            <head>
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script>${js}</script>
            </body>
        </html>
    `;

    const blob = new Blob([combinedCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url);
}

// Export as ZIP
document.getElementById("exportButton").addEventListener("click", () => {
    const htmlCode = htmlEditor.getValue();
    const cssCode = cssEditor.getValue();
    const jsCode = jsEditor.getValue();

    // Create a new JSZip instance
    const zip = new JSZip();

    // Add files to the ZIP
    zip.file("index.html", htmlCode);
    zip.file("style.css", cssCode);
    zip.file("script.js", jsCode);

    // Generate the ZIP file
    zip.generateAsync({ type: "blob" }).then((content) => {
        // Trigger file download
        const a = document.createElement("a");
        a.href = URL.createObjectURL(content);
        a.download = "code.zip";
        a.click();
    });
});