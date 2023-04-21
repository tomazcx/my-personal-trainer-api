import fs from 'fs';
import path from 'path';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
	public async saveFile(file: string): Promise<string> {
		await fs.promises.rename(
			path.resolve(__dirname, '..', '..', '..', '..', '..', 'tmp', file),
			path.resolve(__dirname, '..', '..', '..', '..', '..', 'tmp', file),
		);

		return file;
	}

	public async deleteFile(file: string): Promise<void> {
		const filePath = path.resolve(__dirname, '..', '..', '..', '..', '..', 'tmp', file)

		try {
			await fs.promises.stat(filePath);
		} catch (error) {
			return;
		}

		await fs.promises.unlink(filePath);
	}
}

export default DiskStorageProvider;
