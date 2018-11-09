export interface FileError extends Error {

}

export interface FileSystemEntry {
	/** A `FileSystem` object representing the file system in which the entry is located. */
	readonly filesystem: any;
	/** A `USVString` object which provides the full, absolute path from the file system's root to the entry; it can also be thought of as a path which is relative to the root directory, prepended with a "/" character. */
	readonly fullPath: string;
	/** A `Boolean` which is true if the entry represents a directory; otherwise, it's false. */
	readonly isDirectory: boolean;
	/** A `Boolean` which is true if the entry represents a file. If it's not a file, this value is false. */
	readonly isFile: boolean;
	/** A `USVString` containing the name of the entry (the final part of the path, after the last "/" character). */
	readonly name: string;
}

export interface FileSystemFileEntry extends FileSystemEntry {
	file(successCallback?: (result: File) => any, errorCallback?: (result: FileError) => any): void;
}

export interface FileSystemDirectoryEntry extends FileSystemEntry {
	/** Creates a `FileSystemDirectoryReader` object which can be used to read the entries in this directory. */
	createReader(): FileSystemDirectoryReader;
	/** Returns a `FileSystemDirectoryEntry` object representing a directory located at a given path, relative to the directory on which the method is called. */
	getDirectory(): FileSystemDirectoryEntry;
	/** Returns a `FileSystemFileEntry` object representing a file located within the directory's hierarchy, given a path relative to the directory on which the method is called. */
	getFile(): FileSystemFileEntry;
}

export interface FileSystemDirectoryReader {
	/** Returns a an array containing some number of the directory's entries. Each item in the array is an object based on `FileSystemEntry`—typically either `FileSystemFileEntry` or `FileSystemDirectoryEntry`. */
	readEntries(successCallback?: (results: FileSystemEntry[]) => any, errorCallback?: (result: FileError) => any): void;
}
