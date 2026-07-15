const CONFIG = {
    tags: ["h1", "h2", "h3"],
    tocContainer_ID: "toc",
    content_Attribute: "tocSource",
    safety_scroll_offset: 1,
};

let baseIndent = 10;
CONFIG.tags.forEach((x) => {
    const tagIndent = parseInt(x.substring(1), 10);
    if (tagIndent < baseIndent) baseIndent = tagIndent;
});

const container = document.getElementById(CONFIG.tocContainer_ID);
const content = document.querySelector(`article[${CONFIG.content_Attribute}]`);
if (container && content) {
    const headers = content.querySelectorAll(CONFIG.tags.join(","));
    if (headers) {
        let tocHTML = "";
        headers.forEach((h, index) => {
            let id = h.id;
            if (!id) {
                id = h.textContent
                    .trim()
                    .toLowerCase()
                    .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
                    .replace(/^-+|-+$/g, "");
                if (!id) id = `section-${index}`;
                h.id = id;
            }
            const indent = parseInt(h.tagName.substring(1), 10) - baseIndent;
            tocHTML += `<a href="#${id}" class="toc-item level-${indent}">${"    ".repeat(indent)}${h.textContent.trim()}</a>`;
        });
        container.innerHTML = tocHTML;

        const tocLinks = container.querySelectorAll(".toc-item");
        tocLinks.forEach((a) => {
            a.addEventListener("click", function (e) {
                e.preventDefault();
                const targetId = a.getAttribute("href").substring(1);
                const targetElement = document.getElementById(targetId);
                if (!targetElement) return;
                const targetPosition =
                    targetElement.getBoundingClientRect().top +
                    window.pageYOffset -
                    (window.innerWidth > 1024 ? 80 : 64);
                console.log(targetPosition);
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });
                closeMenu();
            });
        });

        window.addEventListener("scroll", OnScroll, { passive: true });
        window.addEventListener("load", () => {
            updateActiveLink(headers, tocLinks);
        });
        let resizeTimer;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                updateActiveLink(headers, tocLinks);
            }, 100);
        });
        let ticking = false;
        function OnScroll() {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateActiveLink(headers, tocLinks);
                    ticking = false;
                });
                ticking = true;
            }
        }
    }
}

function updateActiveLink(headers, links) {
    let currentIndex = -1;
    const scrollY =
        window.pageYOffset +
        (window.innerWidth > 1024 ? 80 : 64) +
        CONFIG.safety_scroll_offset;
    console.log(scrollY);

    if (!headers || !links) return;
    for (let i = headers.length - 1; i >= 0; i--) {
        const h = headers[i];
        const rect = h.getBoundingClientRect();
        const top = rect.top + window.pageYOffset;
        if (top <= scrollY) {
            currentIndex = i;
            break;
        }
    }

    if (currentIndex === -1) currentIndex = 0;

    links.forEach((a, index) => {
        if (index === currentIndex) {
            a.classList.add("toc-active");
        } else {
            a.classList.remove("toc-active");
        }
    });
}
