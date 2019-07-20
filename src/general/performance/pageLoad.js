// Get Navigation Timing entries:
const pageNav =
    performance.getEntriesByType('navigation')[0];

// Get Resource Timing entries:
performance.getEntriesByType('resource');

export function getDNSLookupTime() {
    return pageNav.domainLookupEnd - pageNav.domainLookupStart;
}

export function getConnectionTime() {
    return pageNav.connectEnd - pageNav.connectStart;
}

export function getTLSTime() {
    if (pageNav.secureConnectionStart <= 0) {
        return pageNav.secureConnectionStart;
    }

    return pageNav.connectEnd - pageNav.secureConnectionStart;
}

export function getFetchTime() {
    return pageNav.responseEnd - pageNav.fetchStart;
}

export function getWorkerTime() {
    if (pageNav.workerStart <= 0) return pageNav.workerStart;

    return pageNav.responseEnd - pageNav.workerStart;
}

export function getTotalRequestResponseTime() {
    return pageNav.responseEnd - pageNav.requestStart;
}

export function getResponseTime() {
    return pageNav.responseEnd - pageNav.responseStart;
}

export function getTTFB() {
    return pageNav.responseStart - pageNav.requestStart;
}

export function getUnloadTime() {
    return pageNav.unloadEventEnd - pageNav.unloadEventStart;
}

export function getRedirectTime() {
    return pageNav.redirectEnd - pageNav.redirectStart;
}

export function getDOMContentLoadTime() {
    return (
        pageNav.domContentLoadedEventEnd - pageNav.domContentLoadedEventStart
    );
}

export function getDOMCompleteTime() {
    return pageNav.domComplete;
}

export function getDOMInteractiveTime() {
    return pageNav.domInteractive;
}

export function getLoadEventTime() {
    return pageNav.loadEventEnd - pageNav.loadEventStart;
}

export function getHeaderSize() {
    return pageNav.transferSize - pageNav.encodedBodySize;
}

export function getCompressionRatio() {
    return pageNav.decodedBodySize / pageNav.encodedBodySize;
}
