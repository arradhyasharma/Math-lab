// =========================================
// MATHLAB — SHARED THEME + HOMEPAGE
// =========================================
(function () {
    const themeToggle = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem("mathlab-theme");

    if (savedTheme === "dark") document.body.classList.add("dark-theme");

    function updateThemeButton() {
        if (!themeToggle) return;
        const dark = document.body.classList.contains("dark-theme");
        themeToggle.textContent = dark ? "Light mode" : "Dark mode";
        themeToggle.setAttribute("aria-pressed", String(dark));
    }

    updateThemeButton();

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-theme");
            localStorage.setItem(
                "mathlab-theme",
                document.body.classList.contains("dark-theme") ? "dark" : "light"
            );
            updateThemeButton();
        });
    }

    const plotButton = document.getElementById("plot-button");
    if (!plotButton) return;

    const xInput = document.getElementById("point-x");
    const yInput = document.getElementById("point-y");
    const point = document.getElementById("plotted-point");
    const guideX = document.getElementById("point-guide-x");
    const guideY = document.getElementById("point-guide-y");
    const label = document.getElementById("point-label");
    const result = document.getElementById("plot-result");

    function plotPoint() {
        const x = Number(xInput.value);
        const y = Number(yInput.value);

        if (xInput.value.trim() === "" || yInput.value.trim() === "" ||
            !Number.isFinite(x) || !Number.isFinite(y)) {
            result.textContent = "Enter both coordinates.";
            result.setAttribute("role", "alert");
            return;
        }
        if (x < -10 || x > 10 || y < -7 || y > 7) {
            result.textContent = "Use X: −10 to 10 and Y: −7 to 7.";
            result.setAttribute("role", "alert");
            return;
        }

        const cx = 260 + 20 * x;
        const cy = 190 - 20 * y;
        point.setAttribute("cx", cx);
        point.setAttribute("cy", cy);
        guideX.setAttribute("x1", cx);
        guideX.setAttribute("x2", cx);
        guideX.setAttribute("y1", cy);
        guideX.setAttribute("y2", 190);
        guideY.setAttribute("x1", 260);
        guideY.setAttribute("x2", cx);
        guideY.setAttribute("y1", cy);
        guideY.setAttribute("y2", cy);

        label.setAttribute("x", Math.min(468, Math.max(8, cx + 12)));
        label.setAttribute("y", Math.max(18, Math.min(365, cy - 9)));
        label.textContent = "(" + x + ", " + y + ")";

        let location;
        if (x === 0 && y === 0) location = "the origin";
        else if (x === 0) location = "the Y-axis";
        else if (y === 0) location = "the X-axis";
        else if (x > 0 && y > 0) location = "Quadrant I";
        else if (x < 0 && y > 0) location = "Quadrant II";
        else if (x < 0 && y < 0) location = "Quadrant III";
        else location = "Quadrant IV";

        result.textContent = "Point (" + x + ", " + y + ") — " + location;
        result.removeAttribute("role");
    }

    plotButton.addEventListener("click", plotPoint);
    [xInput, yInput].forEach(input => input.addEventListener("keydown", e => {
        if (e.key === "Enter") plotPoint();
    }));
})();
