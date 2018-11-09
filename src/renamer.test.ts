import each from 'jest-each';
import { Renamer } from './renamer';

describe('Renamer.clean()', () => {
	each([
		[0x0000, false], // NUL
		[0x0001, false], // SOH
		[0x0002, false], // STX
		[0x0003, false], // ETX
		[0x0004, false], // EOT
		[0x0005, false], // ENQ
		[0x0006, false], // ACK
		[0x0007, false], // BEL
		[0x0008, false], // BS
		[0x0009, false], // HT
		[0x000a, false], // LF
		[0x000b, false], // VT
		[0x000c, false], // FF
		[0x000d, false], // CR
		[0x000e, false], // SO
		[0x000f, false], // SI

		[0x0010, false], // DLE
		[0x0011, false], // DC1
		[0x0012, false], // DC2
		[0x0013, false], // DC3
		[0x0014, false], // DC4
		[0x0015, false], // NAK
		[0x0016, false], // SYN
		[0x0017, false], // ETB
		[0x0018, false], // CAN
		[0x0019, false], // EM
		[0x001a, false], // SUB
		[0x001b, false], // ESC
		[0x001c, false], // FS
		[0x001d, false], // GS
		[0x001e, false], // RS
		[0x001f, false], // US

		[0x0020, true], // SP
		[0x0021, true], // !
		[0x0022, false], // "
		[0x0023, true], // #
		[0x0024, true], // $
		[0x0025, true], // %
		[0x0026, true], // &
		[0x0027, true], // '
		[0x0028, true], // (
		[0x0029, true], // )
		[0x002a, false], // *
		[0x002b, true], // +
		[0x002c, true], // ,
		[0x002d, true], // -
		[0x002e, true], // .
		[0x002f, false], // /

		[0x0030, true], // 0
		[0x0031, true], // 1
		[0x0032, true], // 2
		[0x0033, true], // 3
		[0x0034, true], // 4
		[0x0035, true], // 5
		[0x0036, true], // 6
		[0x0037, true], // 7
		[0x0038, true], // 8
		[0x0039, true], // 9
		[0x003a, false], // :
		[0x003b, true], // ;
		[0x003c, false], // <
		[0x003d, true], // =
		[0x003e, false], // >
		[0x003f, false], // ?

		[0x0040, true], // @
		[0x0041, true], // A
		[0x0042, true], // B
		[0x0043, true], // C
		[0x0044, true], // D
		[0x0045, true], // E
		[0x0046, true], // F
		[0x0047, true], // G
		[0x0048, true], // H
		[0x0049, true], // I
		[0x004a, true], // J
		[0x004b, true], // K
		[0x004c, true], // L
		[0x004d, true], // M
		[0x004e, true], // N
		[0x004f, true], // O

		[0x0050, true], // P
		[0x0051, true], // Q
		[0x0052, true], // R
		[0x0053, true], // S
		[0x0054, true], // T
		[0x0055, true], // U
		[0x0056, true], // V
		[0x0057, true], // W
		[0x0058, true], // X
		[0x0059, true], // Y
		[0x005a, true], // Z
		[0x005b, true], // [
		[0x005c, false], // \
		[0x005d, true], // ]
		[0x005e, true], // ^
		[0x005f, true], // _

		[0x0060, true], // `
		[0x0061, true], // a
		[0x0062, true], // b
		[0x0063, true], // c
		[0x0064, true], // d
		[0x0065, true], // e
		[0x0066, true], // f
		[0x0067, true], // g
		[0x0068, true], // h
		[0x0069, true], // i
		[0x006a, true], // j
		[0x006b, true], // k
		[0x006c, true], // l
		[0x006d, true], // m
		[0x006e, true], // n
		[0x006f, true], // o

		[0x0070, true], // p
		[0x0071, true], // q
		[0x0072, true], // r
		[0x0073, true], // s
		[0x0074, true], // t
		[0x0075, true], // u
		[0x0076, true], // v
		[0x0077, true], // w
		[0x0078, true], // x
		[0x0079, true], // y
		[0x007a, true], // z
		[0x007b, true], // {
		[0x007c, false], // |
		[0x007d, true], // }
		[0x007e, true], // ~
		[0x007f, true], // DEL
	]).test('%i allowed? %s', (code, allowed) => {
		const ch = String.fromCharCode(code);
		const actual = Renamer.clean(ch);
		expect(actual === ch).toBe(allowed);
	});
});
