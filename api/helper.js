import { spawn } from 'node:child_process';

export function escapeJsonString(str) {
        try {
            JSON.parse(str);
            return str;
        } catch {
            str = str
                .replace(/\"/g, '\\"')
                .replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/\t/g, "\\t")
                .replace(/\//g, "\\/")
                .replace(/\\/g, "\\\\")
                .replace(/\`/g, "\\`");

            try {
                JSON.parse(str);
                return str;
            } catch (e) {
                try {
                    JSON.parse(str + "}");
                    return str + "}";
                } catch (e) {
                    try {
                        JSON.parse("{" + str);
                        return "{" + str;
                    } catch (e) {
                        try {
                            JSON.parse("{" + str + "}");
                            return "{" + str + "}";
                        } catch (e) {
                            console.error(`"Failed to parse JSON after multiple attempts: ${e}`.red);
                        }
                    }
                }
            }
        }
    }



export function open(target) {
    if (typeof target !== 'string') {
        throw new TypeError('Expected a `target`');
    }

    const cliArguments = [];

    if (process.platform === 'win32') {
        cliArguments.push('/c', 'start', '""', '/b');
        target = target.replace(/&/g, '^&');
        cliArguments.push(target);
        const subprocess = spawn('cmd', cliArguments);

        subprocess.unref();

        return subprocess;
    }
}

export const isLocal = process.platform === 'win32'
