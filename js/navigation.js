function initButtons() {
    d3.select('#prev').on('click', () => {
        location.href = "./";
    });
    d3.select('#next').on('click', () => {
        location.href = "./plot-2";
    });
}