export class Logger {
  private readonly logColor = '\x1b[36m%s\x1b[0m'; // Cyan color for logs
  private readonly errorColor = '\x1b[31m%s\x1b[0m'; // Red color for errors
  private readonly warnColor = '\x1b[33m%s\x1b[0m'; // Yellow color for warnings
  private readonly infoColor = '\x1b[32m%s\x1b[0m'; // Green color for info
  private readonly debugColor = '\x1b[34m%s\x1b[0m'; // Blue color for debug

  constructor(private readonly identifier: string) { }

  log(message: string): void {
    console.log(this.logColor, `[${this.identifier}] ${message}`);
  }

  error(message: string): void {
    console.error(this.errorColor, `[${this.identifier}] ${message}`);
  }

  warn(message: string): void {
    console.warn(this.warnColor, `[${this.identifier}] ${message}`);
  }

  info(message: string): void {
    console.info(this.infoColor, `[${this.identifier}] ${message}`);
  }

  debug(message: string): void {
    console.debug(this.debugColor, `[${this.identifier}] ${message}`);
  }
}