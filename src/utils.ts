import type { Diagonostic } from "./types";

export function sortByDate(diagonostics: Diagonostic[]): Diagonostic[] {
    return diagonostics.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}