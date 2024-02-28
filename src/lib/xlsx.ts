import { read, utils } from 'xlsx';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const readFile = (file: File): Promise<any[]> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = (e: ProgressEvent<FileReader>) => {
			try {
				const data = new Uint8Array(e?.target?.result as ArrayBuffer);
				const workbook = read(data, { type: 'array' });
				const sheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[sheetName];
				const json = utils.sheet_to_json(worksheet, { header: 1 });
				resolve(json);
			} catch (error) {
				reject(error);
			}
		};

		reader.readAsArrayBuffer(file);
	});
};
