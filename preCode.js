document.querySelectorAll('pre[data-line-numbers="true"]').forEach((pre) => {
    const code = pre.querySelector("code");
    if (!code) return;

    const lines = code.textContent.split("\n");
    if (lines[lines.length - 1 === ""]) lines.pop();

    // const lineNumberDigitCount = String(lines.length).length;
    // const style = document.createElement("style");
    // style.textContent = `.line-numbers-wrapper ::before { width: ${lineNumberDigitCount}rem; }`;
    // document.head.appendChild(style);

    const hlLines = pre.getAttribute("highlight-lines");

    let hlLineIndexs;
    if (hlLines) {
        const hlArgs = hlLines.split(" ");
        if (hlArgs[hlArgs.length - 1 === ""]) hlArgs.pop();
        hlLineIndexs = hlArgs.map(Number);
    }

    const wrapper = document.createElement("div");
    wrapper.className = "line-numbers-wrapper";

    lines.forEach((line, index) => {
        const row = document.createElement("div");
        row.className = "pre-code-line";

        if (hlLineIndexs.includes(index + 1))
            row.classList.add("highlight-line");

        row.textContent = line || "";

        wrapper.appendChild(row);
    });

    code.innerHTML = "";
    code.appendChild(wrapper);
});
