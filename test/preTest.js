document.querySelectorAll('pre[need-line-numbers="true"]').forEach((pre) => {
    const code = pre.querySelector("code");
    if (!code) return;
    const lines = code.textContent.split("\n");
    if (lines[lines.length - 1] === "") lines.pop();

    const codeFrame = document.createElement("div");
    codeFrame.classList.add("code-frame");

    const codeView = document.createElement("div");
    codeView.classList.add("code-view");

    const codeLineNumbers = document.createElement("div");
    codeLineNumbers.classList.add("code-numbders");
    // codeLineNumbers.classList.add("order-1");

    const codeContent = document.createElement("div");
    codeContent.classList.add("code-content");
    // codeContent.classList.add("order-2");

    const codeContentPre = document.createElement("pre");
    codeContentPre.classList.add("code-content-pre");
    const codeContentCode = document.createElement("code");
    codeContentCode.classList = code.classList;
    codeContentCode.classList.add("code-content-code");

    const hlLines = pre.getAttribute("highlight-lines");
    let hlLineIndexs;
    if (hlLines) {
        const hlArgs = hlLines.split(" ");
        if (hlArgs[hlArgs.length - 1 === ""]) hlArgs.pop();
        hlLineIndexs = hlArgs.map(Number);
    }

    lines.forEach((line, index) => {
        const span = document.createElement("div");
        span.classList.add("code-content-line");
        span.textContent = line;

        const num = document.createElement("div");
        num.classList.add("code-numbers-num");
        num.textContent = index + 1;

        if (hlLineIndexs.includes(index + 1)) {
            span.classList.add("code-line-highlight");
            num.classList.add("code-line-highlight");
        }

        codeContentCode.appendChild(span);
        codeLineNumbers.appendChild(num);
    });

    codeContentPre.appendChild(codeContentCode);
    codeContent.appendChild(codeContentPre);

    codeView.appendChild(codeLineNumbers);
    codeView.appendChild(codeContent);
    // //
    // const codeBorder = document.createElement("div");
    // codeBorder.classList.add("code-view-border");
    // codeView.appendChild(codeBorder);
    // //

    codeFrame.appendChild(codeView);

    pre.replaceWith(codeFrame);
});
