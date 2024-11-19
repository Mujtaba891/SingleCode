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

document.getElementById("deployButton").addEventListener("click", () => {
    const htmlCode = htmlEditor.getValue();
    const cssCode = cssEditor.getValue();
    const jsCode = jsEditor.getValue();

    // Combine the code
    const combinedCode = `
        <html>
            <head>
                <style>${cssCode}</style>
            </head>
            <body>
                ${htmlCode}
                <script>${jsCode}</script>
            </body>
        </html>
    `;

    // Simulate subdomain creation (using a random identifier)
    const subdomain = `user-${Math.floor(Math.random() * 100000)}.singlecodemd.vercel.app`;

    // In a real-world scenario, you would send this combined code to a backend service that deploys it on Vercel.
    alert(`Your project has been deployed to: https://${subdomain}`);
    console.log("Deployed Code:", combinedCode);

    // Optionally redirect or copy the link to clipboard
    const deployLink = `https://${subdomain}`;
    window.open(deployLink, "_blank"); // Open in a new tab
});

document.getElementById("deployButton").addEventListener("click", () => {
    const deployInputSection = document.getElementById("deployInputSection");
    deployInputSection.style.display = "block"; // Show the input section
});

document.getElementById("confirmDeployButton").addEventListener("click", () => {
    const subdomainInput = document.getElementById("subdomainInput").value.trim();

    if (!subdomainInput) {
        alert("Please enter a valid website name!");
        return;
    }

    // Combine the user's code
    const htmlCode = htmlEditor.getValue();
    const cssCode = cssEditor.getValue();
    const jsCode = jsEditor.getValue();

    const combinedCode = `
        <html>
            <head>
                <style>${cssCode}</style>
            </head>
            <body>
                ${htmlCode}
                <script>${jsCode}</script>
            </body>
        </html>
    `;

    // Simulate deployment (in real-world, you'd send this code to a backend API)
    const subdomain = `${subdomainInput.toLowerCase().replace(/[^a-z0-9-]/g, "")}.singlecodemd.vercel.app`;

    alert(`Your project has been deployed to: https://${subdomain}`);
    console.log("Deployed Code:", combinedCode);

    // Optionally open the link
    const deployLink = `https://${subdomain}`;
    window.open(deployLink, "_blank"); // Open in a new tab
});