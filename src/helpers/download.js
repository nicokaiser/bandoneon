export default function download(svgElement, filename) {
    // https://mybyways.com/blog/convert-svg-to-png-using-your-browser

    const margin = 30;
    const canvas = document.createElement('canvas');
    canvas.width = (svgElement.getBoundingClientRect().width + margin) * 2;
    canvas.height = (svgElement.getBoundingClientRect().height + margin) * 2;
    const data = new XMLSerializer().serializeToString(svgElement);
    const win = window.URL || window.webkitURL || window;
    const img = new Image();
    const blob = new Blob([data], { type: 'image/svg+xml' });
    const url = win.createObjectURL(blob);

    img.onload = () => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img,
            margin,
            margin,
            canvas.width - 2 * margin,
            canvas.height - 2 * margin
        );
        win.revokeObjectURL(url);
        let uri = canvas
            .toDataURL('image/png')
            .replace('image/png', 'octet/stream');
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        a.href = uri;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(uri);
        document.body.removeChild(a);
    };

    img.src = url;
}
