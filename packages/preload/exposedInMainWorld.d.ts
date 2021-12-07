interface Window {
    /**
     * Expose Environment versions.
     * @example
     * console.log( window.versions )
     */
    readonly versions: NodeJS.ProcessVersions;
    readonly ipcRenderer: { send: (channel: any, data: any) => void; receive: (channel: any, func: any) => void; };
}
