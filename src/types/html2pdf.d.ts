declare module 'html2pdf.js' {
  interface Html2Pdf {
    from: (element: HTMLElement) => {
      save: (filename?: string) => void;
    };
  }

  const html2pdf: () => Html2Pdf;
  export default html2pdf;
}
