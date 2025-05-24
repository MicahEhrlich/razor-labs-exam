import { severityRank, type Diagnostic } from "./types";

export function sortByDate(diagnostics: Diagnostic[], reverse?: boolean): Diagnostic[] {
    if (reverse) {
        return diagnostics.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
    } else {
        return diagnostics.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
    }
}

export function sortByDateAndSeverity(diagnostics: Diagnostic[]): Diagnostic[] {
    return diagnostics.sort((a, b) => {
        const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
        if (dateDiff !== 0) return dateDiff;
        return severityRank[b.severity] - severityRank[a.severity];
    });
}

export function getEarliestDate(diagnostics: Diagnostic[]): string {
    return diagnostics.reduce((earliest, current) => {
        return new Date(current.date) < new Date(earliest) ? current.date : earliest;
    }, diagnostics[0].date);
}